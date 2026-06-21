const { Sequelize } = require('sequelize');
require('dotenv').config();

// Direct connection string used
const sequelize = new Sequelize(process.env.DIRECT_URL, {
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
