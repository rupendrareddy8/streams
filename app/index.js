const express = require('express');
const db = require('./config/db.js')
// Routes Import
const todo = require("./todo/index.js");


const router = express.Router();

// Adding Routes
router.use('/todo', todo);


module.exports = router
