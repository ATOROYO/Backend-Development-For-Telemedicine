import db from '../config/db.js'; // Database connection
import bcrypt from 'bcryptjs'; // Hashing passwords
import { validationResult } from 'express-validator'; // Validator

// Register a patient
export const registerPatient = async (req, res) => {
  const errors = validationResult(req);

  // Check if any errors present in validation
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Please correct input errors', errors: errors.array() });
  }

  // Fetching input parameters from the request body
  const { first_name, last_name, email, phone, password } = req.body;

  try {
    // Check if patient exists
    const [patient] = await db.execute(
      'SELECT email FROM patients WHERE email = ?',
      [email]
    );
    if (patient.length > 0) {
      return res.status(400).json({ message: 'The user already exists!' });
    }

    // Prepare our data - hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the record
    await db.execute(
      'INSERT INTO patients (first_name, last_name, email, phone, password) VALUES (?,?,?,?,?)',
      [first_name, last_name, email, phone, hashedPassword]
    );

    console.log(first_name, last_name, email, phone, hashedPassword);

    // Response
    return res
      .status(201)
      .json({ message: 'New user registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred during registration',
      error: error.message,
    });
  }
};

// Login the patient
export const loginPatient = async (req, res) => {
  // Fetching email and password from request body
  const { email, password } = req.body;

  try {
    // Check if patient exists
    const [patient] = await db.execute(
      'SELECT * FROM patients WHERE email = ?',
      [email]
    );
    if (patient.length === 0) {
      return res.status(400).json({ message: 'The user does not exist! ' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, patient[0].password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid email/password combination' });
    }

    // Create a session
    req.session.patient_id = patient[0].patient_id;
    req.session.first_name = patient[0].first_name;
    req.session.last_name = patient[0].last_name;
    req.session.email = patient[0].email;
    req.session.phone = patient[0].phone;

    return res.status(201).json({ message: 'Successful login' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred during login',
      error: error.message,
    });
  }
};

// Logout the patient
export const logoutPatient = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'An error occurred', error: err.message });
    }
    return res.status(200).json({ message: 'Successfully logged out' });
  });
};

// Get user information for editing
export const getPatient = async (req, res) => {
  // Check whether user is logged in/authorized
  if (!req.session.patient_id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Fetch user
    const [patient] = await db.execute(
      'SELECT * FROM patients WHERE patient_id = ?',
      [req.session.patient_id]
    );
    if (patient.length === 0) {
      return res.status(400).json({ message: 'User not found!' });
    }

    return res.status(200).json({
      message: 'Patient details fetched for update',
      patient: patient[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while fetching patient details',
      error: error.message,
    });
  }
};

// Update the patient information
export const updatePatient = async (req, res) => {
  if (!req.session.patient_id) {
    return res
      .status(401)
      .json({ message: 'Unauthorized user, please login to continue' });
  }

  const errors = validationResult(req);
  // Check if any errors present in validation
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Please correct input errors', errors: errors.array() });
  }

  // Fetch user details from request body
  const { first_name, last_name, email, phone, password } = req.body;

  try {
    // Prepare our data - hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the patient details
    await db.execute(
      'UPDATE patients SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ? WHERE patient_id = ?',
      [
        first_name,
        last_name,
        email,
        phone,
        hashedPassword,
        req.session.patient_id,
      ]
    );
    return res
      .status(200)
      .json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred during update!',
      error: error.message,
    });
  }
};
