require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const homeRouter = require('./routers/homeRouter');
const db = require('./config/postgres'); 


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);

const PORT = process.env.PORT || 3000;

// Force Sync setup jo tables banayega
db.sync({ alter: true })
    .then(() => {
        console.log("Database synced and tables created successfully! 🚀");
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running successfully on port ${PORT}...`);
        });
    })
    .catch((err) => {
        console.error('CRITICAL: DB did not Sync...', err.message);
    });
