// Imported modules
const express = require("express");
const {
  registerPatient,
  loginPatient,
  logoutPatient,
  updatePateint,
} = require("../controllers/patientController");
const { check } = require("express-validator");
const router = express.Router();
