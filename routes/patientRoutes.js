// Imported modules
const express = require("express");
const {
  registerPatient,
  loginPatient,
  logoutPatient,
  updatePateint,
  getPatient,
} = require("../controllers/patientController"); // Internal modules
const { check } = require("express-validator"); // Validator
const router = express.Router(); // Help in directing requests

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

// Get  patient route
router.get("/patient", getPatient);

// Update the patient route
router.put(
  "/patient/update",
  [
    check("first_name", "First name is require").not().isEmpty(),
    check("last_name", "Last name is require").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("phone", "Please enter a valid phone number").matches(/^\d{10}$/),
    check("password", "Please must be 6 characters long").isLength({ min: 6 }),
  ],
  updatePateint
);

// Logout patient route
router.get("/logout", logoutPatient);

module.exports = router;
