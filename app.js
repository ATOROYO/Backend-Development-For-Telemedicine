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

// Configure session
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Configure Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 Hour
    },
  })
);

// route
app.use("/telemedicine/api/patient", require("./routes/patientRoutes"));
