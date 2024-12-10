import db from '../config/db.js'; // Database connection
import bcrypt from 'bcryptjs'; // Hashing passwords
import { validationResult } from 'express-validator'; // Validator

// Register a provider
export const registerProvider = async (req, res) => {
  const errors = validationResult(req);

  // Check if any errors present in validation
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Please correct input errors', errors: errors.array() });
  }

  // Fetching input parameters from the request body
  const { firstName, lastName, specialty, email, phone, password } = req.body;

  try {
    // Check if provider exists
    const [provider] = await db.execute(
      'SELECT email FROM providers WHERE email = ?',
      [email]
    );
    if (provider.length > 0) {
      return res.status(400).json({ message: 'The user already exists!' });
    }

    // Prepare data - hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the record
    await db.execute(
      'INSERT INTO providers (first_name, last_name, specialty, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, specialty, email, phone, hashedPassword]
    );

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

// Login the provider
export const loginProvider = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if provider exists
    const [provider] = await db.execute(
      'SELECT * FROM providers WHERE email = ?',
      [email]
    );
    if (provider.length === 0) {
      return res.status(400).json({ message: 'The user does not exist!' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, provider[0].password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid email/password combination' });
    }

    // Create a session
    req.session.providerId = provider[0].provider_id;
    req.session.firstName = provider[0].first_name;
    req.session.lastName = provider[0].last_name;
    req.session.email = provider[0].email;
    req.session.phone = provider[0].phone;

    return res.status(200).json({ message: 'Successful login' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred during login',
      error: error.message,
    });
  }
};

// Logout the provider
export const logoutProvider = (req, res) => {
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

// Get provider information
export const getProvider = async (req, res) => {
  if (!req.session.providerId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Fetch provider details
    const [provider] = await db.execute(
      'SELECT * FROM providers WHERE provider_id = ?',
      [req.session.providerId]
    );
    if (provider.length === 0) {
      return res.status(400).json({ message: 'User not found!' });
    }

    return res.status(200).json({
      message: 'Provider details fetched successfully',
      provider: provider[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while fetching provider details',
      error: error.message,
    });
  }
};

// Update the provider information
export const updateProvider = async (req, res) => {
  if (!req.session.providerId) {
    return res
      .status(401)
      .json({ message: 'Unauthorized user, please login to continue' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Please correct input errors', errors: errors.array() });
  }

  const { firstName, lastName, specialty, email, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.execute(
      'UPDATE providers SET first_name = ?, last_name = ?, specialty = ?, email = ?, phone = ?, password = ? WHERE provider_id = ?',
      [
        firstName,
        lastName,
        specialty,
        email,
        phone,
        hashedPassword,
        req.session.providerId,
      ]
    );

    return res
      .status(200)
      .json({ message: 'Provider details updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred during update',
      error: error.message,
    });
  }
};
