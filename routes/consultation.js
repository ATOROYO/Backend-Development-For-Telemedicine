import express from 'express';
import db from '../config/db.js'; // Assuming your database connection is in a separate file

const router = express.Router();

// Handle consultation booking
router.post('/book', async (req, res) => {
  const {
    name,
    email,
    phone,
    specialty,
    doctor,
    appointment_date,
    appointment_time,
  } = req.body;

  // Validation
  if (
    !name ||
    !email ||
    !phone ||
    !specialty ||
    !appointment_date ||
    !appointment_time
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const query = `
      INSERT INTO consultation_requests (name, email, phone, specialty, doctor_id, appointment_date, appointment_time)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name,
      email,
      phone,
      specialty,
      doctor || null,
      appointment_date,
      appointment_time,
    ];

    await db.execute(query, values);
    res.status(201).json({ message: 'Consultation booked successfully!' });
  } catch (error) {
    console.error('Error booking consultation:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while booking the consultation.' });
  }
});

//
router.get('/doctors', async (req, res) => {
  const { specialty } = req.query;
  const [doctors] = await db.execute(
    'SELECT * FROM providers WHERE specialty = ?',
    [specialty]
  );
  res.json(doctors);
});

export default router;
