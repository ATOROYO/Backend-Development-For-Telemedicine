// const express = require('express');
// const { check } = require('express-validator'); // Validator
// const router = express.Router(); // Help in directing requests
// const {
//   registerProvider,
//   loginProvider,
//   logoutProvider,
//   updateProvider,
//   getProvider,
// } = require('../controllers/providerController'); // Internal modules

// // Registration
// router.post(
//   '/register',
//   [
//     check('first_name', 'First name is require').not().isEmpty(),
//     check('last_name', 'Last name is require').not().isEmpty(),
//     check('specialty', 'Last name is require').not().isEmpty(),
//     check('email', 'Please enter a valid email').isEmail(),
//     check('phone', 'Please enter a valid phone number').matches(/^\d{10}$/),
//     check('password', 'Please must be 6 characters long').isLength({ min: 6 }),
//   ],
//   registerProvider
// );

// // Login route
// router.post('/login', loginProvider);

// // Get  provider route
// router.get('/provider', getProvider);

// router.put(
//   '/provider/update',
//   [
//     check('first_name', 'First name is require').not().isEmpty(),
//     check('last_name', 'Last name is require').not().isEmpty(),
//     check('specialty', 'Last name is require').not().isEmpty(),
//     check('email', 'Please enter a valid email').isEmail(),
//     check('phone', 'Please enter a valid phone number').matches(/^\d{10}$/),
//     check('password', 'Please must be 6 characters long').isLength({ min: 6 }),
//   ],
//   updateProvider
// );

// // Logout provider route
// router.get('/logout', logoutProvider);

// module.exports = router;

// ///////////
import express from 'express';
import { check } from 'express-validator'; // Validator
import {
  registerProvider,
  loginProvider,
  logoutProvider,
  updateProvider,
  getProvider,
} from '../controllers/providerController.js'; // Internal modules

const router = express.Router(); // Help in directing requests

// Registration
router.post(
  '/register',
  [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('specialty', 'Specialty is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('phone', 'Please enter a valid phone number').matches(/^\d{10}$/),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6,
    }),
  ],
  registerProvider
);

// Login route
router.post('/login', loginProvider);

// Get provider route
router.get('/provider', getProvider);

// Update provider route
router.put(
  '/provider/update',
  [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('specialty', 'Specialty is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('phone', 'Please enter a valid phone number').matches(/^\d{10}$/),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6,
    }),
  ],
  updateProvider
);

// Logout provider route
router.get('/logout', logoutProvider);

export default router;
