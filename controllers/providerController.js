// Imported moules
const db = require('../config/db'); // Database connection
const bcrypt = require('bcryptjs'); // Hashing passwords
const { validationResult } = require('express-validator'); // Validator

// Register a provider
exports.registerProvider = async (req, res) => {
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
    // Check if provider exist
    const [provider] = await db.execute(
      'SELECT email FROM providers WHERE email = ?',
      [email]
    );
    if (provider.length > 0) {
      return res.status(400).json({ message: 'The user already exist! ' });
    }

    // Prepare our data - hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the record
    await db.execute(
      'INSERT INTO providers (first_name,last_name, specialty, email, phone, password) VALUES (?,?,?,?,?',
      [firstName, lastName, specialty, email, phone, password]
    );

    // Response
    return res
      .status(201)
      .json({ message: 'New user registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status().json({
      message: 'An error occured during registration',
      error: error.message,
    });
  }
};

// Login the provider
exports.loginProvider = async () => {
  // Fetching email and password from request body
  const { email, password } = req.body;

  try {
    // Check if provider exist
    const [provider] = await db.execute(
      'SELECT * FROM providers WHERE email = ?',
      [email]
    );
    if (provider.length === 0) {
      return res.status(400).json({ message: 'The user does not exist! ' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, provider[0].password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid email/password combination' });
    }

    // Create a session
    req.session.providerId = provider[0].providerId;
    req.session.firstName = provider[0].firstName;
    req.session.lastName = provider[0].lastName;
    req.session.email = provider[0].email;
    req.session.phone = provider[0].phone;

    return res.status(200).json({ message: 'Successfull login' });

    // Login error
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occured during login',
      error: error.message,
    });
  }
};

// Logout the provider
exports.logoutProvider = (req, res) => {
  res.session.destroy(err => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'An error occured', error: err.message });
    }
    return res.status(200).json({ message: 'Successfully logged out' });
  });
};

// Get provider information
exports.getProvider = async (req, res) => {
  // Check whether user is loged in / authorised
  if (!req.session.providerId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Fetch user
    const [provider] = await db.execute(
      'SELECT * FROM providers WHERE provider_id = ?',
      [email]
    );
    if (provider.length === 0) {
      return res.status(400).json({ message: 'User not found! ' });
    }

    return res.status(200).json({
      message: 'Provider details fetched for update',
      provider: provider[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occured while fetching provider details',
      error: error.message,
    });
  }
};

// Update the provider information
exports.updateProvider = async (req, res) => {
  if (!req.session.providerId) {
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
  const { firstName, lastName, specialty, email, phone, password } = req.body;

  // Prepare our data - hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Update the patient details
    await db.execute(
      'UPDATE providers SET first_name = ?, last_name = ?, specialty = ?, email = ?, phone = ?, password = ? WHERE patient_id = ?',
      [
        firstName,
        lastName,
        specialty,
        email,
        phone,
        hashedPassword,
        req.session.patientId,
      ]
    );
    return res
      .status(200)
      .json({ message: 'User detail updated successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'An error occur during update!', error: error.message });
  }
};
