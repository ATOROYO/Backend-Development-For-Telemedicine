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

// Registration
router.post(
  "/register",
  [
    check("first_name", "First name is require").not().isEmpty(),
    check("last_name", "Last name is require").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("phone", "Please enter a valid phone number").matches(/^\d{10}$/),
    check("password", "Please must be 6 characters long").isLength({ min: 6 }),
  ],
  registerPatient
);

// Login route
router.post("/login", loginPatient);
