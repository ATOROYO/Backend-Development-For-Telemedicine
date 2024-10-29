// Imported moules
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// Register a patient
exports.registerPatient = async (req, res) => {
  const errors = validationResult(req);

  // Check if any erros present in validation
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Please correct input errors", errors: errors.array() });
  }

  // Fetching input parameters from the request body
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    // Check if patient exist
    const [patient] = await db.execute(
      "SELECT email FROM patients WHERE EMAIL = ?",
      [email]
    );
    if (patient.length > 0) {
      return res.status(400).json({ message: "The user already exist! " });
    }

    // Prepare our data - hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the record
    awaitdb.execute(
      "INSERT INTO patients (first_name,last_name, email, phone, password) VALUES (?,?,?,?,?",
      [firstName, lastName, email, phone, password]
    );

    // Response
    return res
      .status(201)
      .json({ message: "New user registered successfully." });
  } catch (error) {
    console.error(error);
    res
      .status()
      .json({
        message: "An error occured during registration",
        error: error.message,
      });
  }
};
