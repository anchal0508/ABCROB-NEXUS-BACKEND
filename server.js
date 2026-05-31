// Imported packages
const express = require('express');
const cors = require('cors');
const path = require('path');
const homeRouter = require('./routers/homeRouter');
const db = require('./utils/db-connections');
require('./models/index.js')

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))




app.use('/', homeRouter);

// server.js ke sabse bottom waale part ko isse replace karein
const PORT = process.env.PORT || 3000;

db.sync({ alter: true }).then(() => {
    // Port ko string '0.0.0.0' par bind karna Render ke liye compulsory hai
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running successfully on port ${PORT}...`);
    });
}).catch((err) => {
    console.log('DB did not Sync...', err.message);
});
