// routes/contact.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection

// Route to handle contact form submission
router.post('/submit', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Insert data into the contact_requests table
    await pool.execute(
      'INSERT INTO contact_requests (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    res
      .status(200)
      .json({ message: 'Your message has been submitted successfully.' });
  } catch (error) {
    console.error('Error inserting contact form data:', error);
    res
      .status(500)
      .json({ message: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
