// Imported modules
const db = require('./config/db'); // For database connection
const express = require('express'); // For the web
const bodyParser = require('body-parser'); // Capturing form data
const session = require('express-session'); // Seession management
const MySQLStore = require('connect-mysql2')(session); // Storage for session management
const dotenv = require('dotenv'); // Managing environment variables
const path = require('path');

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});

console.log(dbConfig);
console.log(sessionConfig);
