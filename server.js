require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models/index');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors({
    origin: 'https://anchalkoshta5.netlify.app/',
    credentials: true
}));


const userRouter = require('./routers/userRouter');

app.use('/api/users', userRouter);


// Global Error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";

    console.log("Global Error Logged: ", err.stack)

    res.status(statusCode).json({
        success: false,
        message: message,
        status: statusCode,

        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});



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
