// Imported modules
import mysql from 'mysql2';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connection to the database
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getUser() {
  const [rows] = await pool.query('SELECT * FROM patients');
  return rows;
}

const result = await getUser();
console.log(result);

export default pool;
