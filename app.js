// Imported modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("connect-mysql2")(session);
const dotenv = require("dotenv");
dotenv.config();

// Initialize the app
const app = express();

// Configure middleware
app.use(bodyParser.json()); // Use json
app.use(bodyParser.urlencoded({ extended: true })); // Capture form data
