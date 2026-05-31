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

db.sync().then(() => {
    app.listen(3000, () => console.log('Online...'));
}).catch((err) => {
    console.log('DB did not Sync...', err.message);
})
