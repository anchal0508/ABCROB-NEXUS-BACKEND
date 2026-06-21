const { Sequelize } = require('sequelize');
require('dotenv').config(); // Yeh line local development ke liye zaroori hai

// Ab yeh bilkul secure hai, koi aapka password nahi dekh payega
const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: console.log, 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
