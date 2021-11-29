'use strict';

const messages = require('./protos/user-management/user-management_pb');
const services = require('./protos/user-management/user-management_grpc_pb');
const grpc = require('@grpc/grpc-js');

module.exports = class UserManagementClient {
    constructor(endpoint) {
        this.client = new services.UserManagementSvcClient(endpoint, grpc.credentials.createInsecure());
    }

    getClient() {
        return this.client;
    }

    getUserByMedicalId(req, res) {
        return new Promise((resolve) => {
            var registerForAppointmentReq = new messages.RegisterForAppointmentRequest();
            registerForAppointmentReq.setName(req.body.name);
            registerForAppointmentReq.setEmail(req.body.email);
            registerForAppointmentReq.setMedicalId(req.body.medicalId);
            this.client.registerForAppointment(registerForAppointmentReq, (err, response) => {
                console.log(response.array)
                resolve(response.array[0]);
            });
        });
    }

    updateMedicalData(userId, medicalId, data) {
        return new Promise((resolve) => {
            var updateMedicalDataReq = new messages.UpdateMedicalDataRequest();
            updateMedicalDataReq.setUserId(userId);
            var medicalData = new messages.MedicalData();
            medicalData.setId(medicalId);
            medicalData.setData(data);
            updateMedicalDataReq.setMedicalData(medicalData);
            this.client.updateMedicalData(updateMedicalDataReq, (err, response) => {
                console.log(response.array)
                resolve(response.array[0]);
            });
        });
    }
}