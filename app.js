// Imported modules
const db = require('./config/db'); // For database connection
const express = require('express'); // For the web
const bodyParser = require('body-parser'); // Capturing form data
const session = require('express-session'); // Seession management
const MySQLStore = require('express-mysql-session')(session); // Storage for session management
const dotenv = require('dotenv'); // Managing environment variables
const path = require('path');
const fs = require('fs'); // File system module

// Initialize env management
dotenv.config();

// Initialize the app
const app = express();

// Configure middleware
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.json()); // Use json
app.use(bodyParser.urlencoded({ extended: true })); // Capture form data

// Configure session
const sessionStore = new MySQLStore({}, db);
// const sessionStore = new MySQLStore({
//   host: process.env.DB_HOST,
//   port: process.env.PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

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
app.use('/telemedicine/api/patients', require('./routes/patientRoutes'));
app.use('/telemedicine/api/providers', require('./routes/providerRoutes'));
app.use('/telemedicine/api/submit', require('./routes/contact'));
app.use(
  '/telemedicine/api/consultations/book',
  require('./routes/consultation')
);
app.use('/telemedicine/api/newsletter', require('./routes/newsletter'));

app.post('/telemedicine/api/patient/register', (req, res) => {
  res.status(201).json({ message: 'User registered successfully!' });
});

app.post('/telemedicine/api/patient/submit', (req, res) => {
  res
    .status(201)
    .json({ message: 'Your message has been submitted successfully.' });
});

app.post('/consultations/book', (req, res) => {
  res.status(201).json({ message: 'Consultation booked successfully!' });
});

// Dynamic route to catch other HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/patient-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'patient-login.html'));
});

app.get('/consultation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'consultation.html'));
});

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
