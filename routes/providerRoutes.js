const express = require('express');
const { check } = require('express-validator'); // Validator
const router = express.Router(); // Help in directing requests
const {
  registerProvider,
  loginPatient,
  logoutPatient,
  updatePatient,
  getPatient,
} = require('../controllers/patientController'); // Internal modules

// Registration
router.post(
  '/register',
  [
    check('first_name', 'First name is require').not().isEmpty(),
    check('last_name', 'Last name is require').not().isEmpty(),
    check('specialty', 'Last name is require').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('phone', 'Please enter a valid phone number').matches(/^\d{10}$/),
    check('password', 'Please must be 6 characters long').isLength({ min: 6 }),
  ],
  registerProvider
);

// Login route
router.post('/login', loginProvider);
