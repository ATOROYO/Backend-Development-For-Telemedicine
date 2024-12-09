const express = require('express');
const router = express.Router();

// Mock database
const subscribers = [];

router.post('/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  // Save email (replace with real database logic)
  subscribers.push(email);

  return res.status(200).json({ message: 'Subscription successful.' });
});

module.exports = router;
