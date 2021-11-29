// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// protos/user-management/user-management.proto
//
'use strict';
var grpc = require('@grpc/grpc-js');
var user$management_pb = require('./user-management_pb.js');

function serialize_vamp_bizdata_demo_user_management_GetUserRequest(arg) {
  if (!(arg instanceof user$management_pb.GetUserRequest)) {
    throw new Error('Expected argument of type vamp_bizdata_demo_user_management.GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vamp_bizdata_demo_user_management_GetUserRequest(buffer_arg) {
  return user$management_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vamp_bizdata_demo_user_management_LoginRequest(arg) {
  if (!(arg instanceof user$management_pb.LoginRequest)) {
    throw new Error('Expected argument of type vamp_bizdata_demo_user_management.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vamp_bizdata_demo_user_management_LoginRequest(buffer_arg) {
  return user$management_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vamp_bizdata_demo_user_management_RegisterForAppointmentRequest(arg) {
  if (!(arg instanceof user$management_pb.RegisterForAppointmentRequest)) {
    throw new Error('Expected argument of type vamp_bizdata_demo_user_management.RegisterForAppointmentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vamp_bizdata_demo_user_management_RegisterForAppointmentRequest(buffer_arg) {
  return user$management_pb.RegisterForAppointmentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vamp_bizdata_demo_user_management_RegisterRequest(arg) {
  if (!(arg instanceof user$management_pb.RegisterRequest)) {
    throw new Error('Expected argument of type vamp_bizdata_demo_user_management.RegisterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vamp_bizdata_demo_user_management_RegisterRequest(buffer_arg) {
  return user$management_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vamp_bizdata_demo_user_management_UpdateMedicalDataRequest(arg) {
  if (!(arg instanceof user$management_pb.UpdateMedicalDataRequest)) {
    throw new Error('Expected argument of type vamp_bizdata_demo_user_management.UpdateMedicalDataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vamp_bizdata_demo_user_management_UpdateMedicalDataRequest(buffer_arg) {
  return user$management_pb.UpdateMedicalDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vamp_bizdata_demo_user_management_UserResponse(arg) {
  if (!(arg instanceof user$management_pb.UserResponse)) {
    throw new Error('Expected argument of type vamp_bizdata_demo_user_management.UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vamp_bizdata_demo_user_management_UserResponse(buffer_arg) {
  return user$management_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vamp_bizdata_demo_user_management_VerifyRequest(arg) {
  if (!(arg instanceof user$management_pb.VerifyRequest)) {
    throw new Error('Expected argument of type vamp_bizdata_demo_user_management.VerifyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vamp_bizdata_demo_user_management_VerifyRequest(buffer_arg) {
  return user$management_pb.VerifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vamp_bizdata_demo_user_management_VerifyResponse(arg) {
  if (!(arg instanceof user$management_pb.VerifyResponse)) {
    throw new Error('Expected argument of type vamp_bizdata_demo_user_management.VerifyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vamp_bizdata_demo_user_management_VerifyResponse(buffer_arg) {
  return user$management_pb.VerifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserManagementSvcService = exports.UserManagementSvcService = {
  register: {
    path: '/vamp_bizdata_demo_user_management.UserManagementSvc/register',
    requestStream: false,
    responseStream: false,
    requestType: user$management_pb.RegisterRequest,
    responseType: user$management_pb.UserResponse,
    requestSerialize: serialize_vamp_bizdata_demo_user_management_RegisterRequest,
    requestDeserialize: deserialize_vamp_bizdata_demo_user_management_RegisterRequest,
    responseSerialize: serialize_vamp_bizdata_demo_user_management_UserResponse,
    responseDeserialize: deserialize_vamp_bizdata_demo_user_management_UserResponse,
  },
  registerForAppointment: {
    path: '/vamp_bizdata_demo_user_management.UserManagementSvc/registerForAppointment',
    requestStream: false,
    responseStream: false,
    requestType: user$management_pb.RegisterForAppointmentRequest,
    responseType: user$management_pb.VerifyResponse,
    requestSerialize: serialize_vamp_bizdata_demo_user_management_RegisterForAppointmentRequest,
    requestDeserialize: deserialize_vamp_bizdata_demo_user_management_RegisterForAppointmentRequest,
    responseSerialize: serialize_vamp_bizdata_demo_user_management_VerifyResponse,
    responseDeserialize: deserialize_vamp_bizdata_demo_user_management_VerifyResponse,
  },
  login: {
    path: '/vamp_bizdata_demo_user_management.UserManagementSvc/login',
    requestStream: false,
    responseStream: false,
    requestType: user$management_pb.LoginRequest,
    responseType: user$management_pb.UserResponse,
    requestSerialize: serialize_vamp_bizdata_demo_user_management_LoginRequest,
    requestDeserialize: deserialize_vamp_bizdata_demo_user_management_LoginRequest,
    responseSerialize: serialize_vamp_bizdata_demo_user_management_UserResponse,
    responseDeserialize: deserialize_vamp_bizdata_demo_user_management_UserResponse,
  },
  verify: {
    path: '/vamp_bizdata_demo_user_management.UserManagementSvc/verify',
    requestStream: false,
    responseStream: false,
    requestType: user$management_pb.VerifyRequest,
    responseType: user$management_pb.VerifyResponse,
    requestSerialize: serialize_vamp_bizdata_demo_user_management_VerifyRequest,
    requestDeserialize: deserialize_vamp_bizdata_demo_user_management_VerifyRequest,
    responseSerialize: serialize_vamp_bizdata_demo_user_management_VerifyResponse,
    responseDeserialize: deserialize_vamp_bizdata_demo_user_management_VerifyResponse,
  },
  getUser: {
    path: '/vamp_bizdata_demo_user_management.UserManagementSvc/getUser',
    requestStream: false,
    responseStream: false,
    requestType: user$management_pb.GetUserRequest,
    responseType: user$management_pb.VerifyResponse,
    requestSerialize: serialize_vamp_bizdata_demo_user_management_GetUserRequest,
    requestDeserialize: deserialize_vamp_bizdata_demo_user_management_GetUserRequest,
    responseSerialize: serialize_vamp_bizdata_demo_user_management_VerifyResponse,
    responseDeserialize: deserialize_vamp_bizdata_demo_user_management_VerifyResponse,
  },
  updateMedicalData: {
    path: '/vamp_bizdata_demo_user_management.UserManagementSvc/updateMedicalData',
    requestStream: false,
    responseStream: false,
    requestType: user$management_pb.UpdateMedicalDataRequest,
    responseType: user$management_pb.VerifyResponse,
    requestSerialize: serialize_vamp_bizdata_demo_user_management_UpdateMedicalDataRequest,
    requestDeserialize: deserialize_vamp_bizdata_demo_user_management_UpdateMedicalDataRequest,
    responseSerialize: serialize_vamp_bizdata_demo_user_management_VerifyResponse,
    responseDeserialize: deserialize_vamp_bizdata_demo_user_management_VerifyResponse,
  },
};

exports.UserManagementSvcClient = grpc.makeGenericClientConstructor(UserManagementSvcService);
