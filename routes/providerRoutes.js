const express = require('express');
const { check } = require('express-validator'); // Validator
const router = express.Router(); // Help in directing requests
const {
  registerPatient,
  loginPatient,
  logoutPatient,
  updatePatient,
  getPatient,
} = require('../controllers/patientController'); // Internal modules
