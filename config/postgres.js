const { Sequelize } = require('sequelize');
require('dotenv').config();

// Har ek variable ko alag se pass karein, bina URI string banaye
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.SUPABASE_DB_HOST,
    username: process.env.SUPABASE_DB_USER || 'postgres',
    password: process.env.SUPABASE_DB_PASSWORD,
    database: process.env.SUPABASE_DB_NAME || 'postgres',
    port: parseInt(process.env.SUPABASE_DB_PORT) || 5432,
    logging: console.log, 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
