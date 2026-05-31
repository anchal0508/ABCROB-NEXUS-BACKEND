require('dotenv').config();
// Imported packages
const express = require('express');
const cors = require('cors');
const path = require('path');
const homeRouter = require('./routers/homeRouter');
const db = require('./config/postgres');
const app = express();
// Middlewares

require('./models/index');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))




app.use('/', homeRouter);

// server.js ke sabse bottom waale part ko isse replace karein
const PORT =   3000;

 
    // Port ko string '0.0.0.0' par bind karna Render ke liye compulsory hai
    app.listen(PORT ,() => {
        console.log(`Server running successfully on port ${PORT}...`);
    })