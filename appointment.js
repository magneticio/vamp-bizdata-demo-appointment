'use strict';

require('dotenv').config();

const validator = require('validator');

const express = require('express');
const useragent = require('express-useragent');
const app = express();

const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;
const dbAppointmentsCollection = 'appointments';
const dbAppointmentSlotsCollection = 'appointment-slots';

const UserManagementClient = require("./user-management-client");

const { MeterProvider } = require('@opentelemetry/sdk-metrics-base');
const { DiagConsoleLogger, DiagLogLevel, diag } = require('@opentelemetry/api');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// Optional and only needed to see the internal diagnostic logging (during development)
//diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const exporter = new PrometheusExporter(
  {
    host: process.env.HOST,
    port: process.env.PROMETHEUS_PORT,
    startServer: true,
  },
  () => {
    console.log(
      `Prometheus scrape endpoint: ${process.env.HOST}:${process.env.PROMETHEUS_PORT}${PrometheusExporter.DEFAULT_OPTIONS.endpoint}`,
    );
  },
);

const meter = new MeterProvider({
  exporter,
  interval: 5000,
}).getMeter('appointment-observer');

const apiTotalRequestsMetric = meter.createValueObserver('api_req_total', {
  description: 'Sync value observer for the total API requests',
});

const apppointmentsAvailableMetric = meter.createValueObserver('appointments_available', {
  description: 'Sync value observer for the number of available appointments',
});

const apiAppointmentsBookedMetric = meter.createValueObserver('api_appointments_booked', {
  description: 'Sync value observer for the number of booked appointments',
});

const apiAppointmentsAttendedMetric = meter.createValueObserver('api_appointments_attended', {
  description: 'Sync value observer for the number of attended appointments',
});

const apppointmentsPendingMetric = meter.createValueObserver('appointments_pending', {
  description: 'Sync value observer for the number of pending appointments',
});

meter.createBatchObserver((observerBatchResult) => {
    const appointments = db.collection(dbAppointmentsCollection);

    Promise.all([
      getAppointmentSlots(),
      appointments.count()
    ])
    .then(([availableSlots, appointmentCount]) => {
      console.log('Batching metrics');
      observerBatchResult.observe({ app: 'appointment' }, [
        apiTotalRequestsMetric.observation(appointmentRequests),
        apiAppointmentsBookedMetric.observation(appointmentsBooked),
        apiAppointmentsAttendedMetric.observation(appointmentsAttended),
        apppointmentsAvailableMetric.observation(availableSlots),
        apppointmentsPendingMetric.observation(appointmentCount)
      ]);
    });
  }, {
    maxTimeoutUpdateMS: 2500,
  }
);

var appointmentRequests = 0;
var appointmentsBooked = 0;
var appointmentsAttended = 0;

// Appointment counter
let appointmentSlotsCollection = null;

const incAppointmentSlots = (inc) => {
  return appointmentSlotsCollection.findOneAndUpdate(
    {
      _id: 1,
    },
    {
      $inc: {
        available: inc
      }
    },
    {
      upsert: true,
      returnDocument: "after"
    }
  );
};

const decAppointmentSlots = () => {
  return appointmentSlotsCollection.findOneAndUpdate(
    {
      _id: 1,
      available: {
        $gt: 0
      }
    },
    {
      $inc: {
        available: -1
      }
    }
  );
};

const getAppointmentSlots = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      appointmentSlotsCollection.findOne({ _id: 1 })
        .then(appointmentSlots => {
          resolve(appointmentSlots.available);
        });
    }, 2000);
  });
};

const userManagement = new UserManagementClient(process.env.USER_MANAGEMENT_URI);

app.use(useragent.express())
app.use(express.json())

app.get('/healthz', (req, res) => {
  res.send('OK');
});

// Appointments API
app.post('/appointments/book', (req, res) => {
  appointmentRequests++;
  if (req.body.medicalId && req.body.userId) {
    decAppointmentSlots()
      .then(result => {
        console.log(result);
        if (!result.value) {
          throw new Error("No appointments available");
        }
        console.log(req.body);

        const newAppointment = { medicalId: req.body.medicalId, userId: req.body.userId };  
        const appointments = db.collection(dbAppointmentsCollection);
        return appointments.findOneAndUpdate({ medicalId: req.body.medicalId }, { $set: newAppointment }, { upsert: true });
      })
      .then(result => {
        console.log(result);
        if (result.lastErrorObject.updatedExisting) {
          // existing appointment
          res.send({ appointmentId: result.value._id.toString(), newBooking: false });
        } else {
          // new appointment
          appointmentsBooked++;
          res.send({ appointmentId: result.lastErrorObject.upserted.toString(), newBooking: true });
        }
      })
      .catch((error) => {
          // handle error
          console.log(error);
          res.send({ error: error.message });
      });
  } else {
    res.send("medicalId and userId are required");
  }
});

app.post('/appointments/attend', (req, res) => {
  appointmentRequests++;

  const data = req.body;
  console.log(data);

  if (data.medicalId && data.perscription && validator.isHexadecimal(data.appointmentId) && data.appointmentId.length == 24) {
    const appointments = db.collection(dbAppointmentsCollection);

    // find appointment by id
    var appointmentId = ObjectId(data.appointmentId);
    appointments.findOne({ _id: appointmentId })
      .then(appointment => {
        if (!appointment) {
          throw new Error("Appointment not found");
        }

        // find user by id and add medical data
        userManagement.updateMedicalData(appointment.userId, data.medicalId, data.perscription);
      })
      .then(userId => {
        // delete appointment
        return appointments.deleteOne({ _id: appointmentId });
      })
      .then(result => {
        appointmentsAttended++;
        res.send({ appointmentId: data.appointmentId, updated: result.acknowledged });
      })
      .catch((error) => {
        // handle error
        console.log(error);

        res.send({ appointmentId: data.appointmentId, updated: false, error: error.message });
      });
  } else {
    res.status(400).send("appointmentId, medicalId and perscription are required");
  }
});

app.post('/appointments/add', (req, res) => {
  appointmentRequests++;
  const data = req.body;
  if (data.appointments && data.appointments !== NaN && data.appointments > 0) {
      incAppointmentSlots(data.appointments)
        .then(result => {
          console.log(result);
          res.send({ available: result.value.available, added: data.appointments});
        })
        .catch((error) => {
          // handle error
          console.log(error);
  
          res.send({ error: error.message });
        });
  } else {
    res.status(400).send("appointments is required");
  }
});

// Mongo Connection
const dbClient = new MongoClient(process.env.DB_URI, { useUnifiedTopology: true });
let db = null;

async function connectDB() {
    try {
        await dbClient.connect();
        db = await dbClient.db(process.env.DB_NAME);
        db.command({ ping: 1 });
        console.log("Connected successfully to mongo server");
        
        // Create index
        await db.collection(dbAppointmentsCollection).createIndex({ medicalId: 1 });

        // Initialise appointment counter
        appointmentSlotsCollection = db.collection(dbAppointmentSlotsCollection);
    } catch (e) {
        console.error(e);
    }
}

async function main() {
    await connectDB().catch(console.dir);
    incAppointmentSlots(1);
    app.listen(process.env.HTTP_PORT, process.env.HOST, () => {
      console.log(`Server running at ${process.env.HOST}:${process.env.HTTP_PORT}`);
    });
}

main();