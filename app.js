// Imported modules
import db from './config/db.js'; // For database connection
import express from 'express'; // For the web
import bodyParser from 'body-parser'; // Capturing form data
import session from 'express-session'; // Session management
import mysqlSession from 'express-mysql-session'; // Storage for session management
import dotenv from 'dotenv'; // Managing environment variables
import path from 'path';
import fs from 'fs'; // File system module
import cors from 'cors';
import { fileURLToPath } from 'url'; // For ES Module `__dirname`

app.use(
  cors({
    origin: '*', // Update with your frontend origin
    credentials: true,
  })
);

// Set up __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize env management
dotenv.config();

// Initialize the app
const app = express();

// Configure middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Use json
app.use(bodyParser.urlencoded({ extended: true })); // Capture form data

// Configure session
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({}, db);

// Configure session middleware
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

// Routes
import patientRoutes from './routes/patientRoutes.js';
import providerRoutes from './routes/providerRoutes.js';
import contactRoutes from './routes/contact.js';
import consultationRoutes from './routes/consultation.js';
import newsletterRoutes from './routes/newsletter.js';

app.use('/telemedicine/api/patients', patientRoutes);
app.use('/telemedicine/api/providers', providerRoutes);
app.use('/telemedicine/api/contact', contactRoutes); // Changed from '/submit'
app.use('/telemedicine/api/consultations', consultationRoutes); // Mount under consultations
app.use('/telemedicine/api/newsletter', newsletterRoutes);
// app.use(consultationRoutes);

// app.post('/telemedicine/api/patients/register', (req, res) => {
//   res.status(201).json({ message: 'User registered successfully!' });
// });

// app.post('/telemedicine/api/patient/submit', (req, res) => {
//   res
//     .status(201)
//     .json({ message: 'Your message has been submitted successfully.' });
// });

// app.post('/consultations/book', (req, res) => {
//   res.status(201).json({ message: 'Consultation booked successfully!' });
// });

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

// Define the port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
