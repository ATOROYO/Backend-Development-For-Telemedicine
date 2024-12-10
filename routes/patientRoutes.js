import express from 'express';
import {
  registerPatient,
  loginPatient,
  logoutPatient,
  updatePatient,
  getPatient,
} from '../controllers/patientController.js'; // Internal modules
import { check } from 'express-validator'; // Validator

const router = express.Router(); // Help in directing requests

// Registration
router.post(
  '/register',
  [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('phone', 'Please enter a valid phone number').matches(/^\d{10}$/),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6,
    }),
  ],
  registerPatient
);

// Login route
router.post('/login', loginPatient);

// Get patient route
router.get('/patient', getPatient);

// Update the patient route
router.put(
  '/patient/update',
  [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('phone', 'Please enter a valid phone number').matches(/^\d{10}$/),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6,
    }),
  ],
  updatePatient
);

// Logout patient route
router.get('/logout', logoutPatient);

export default router;
