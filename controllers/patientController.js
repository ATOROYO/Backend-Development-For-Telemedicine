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
};
