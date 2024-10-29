// Imported modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("connect-mysql2")(session);
const dotenv = require("dotenv");
dotenv.config();
