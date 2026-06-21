const { Sequelize } = require('sequelize'); // <-- Yeh line miss ho gayi thi
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.SUPABASE_DB_HOST,
    username: process.env.SUPABASE_DB_USER,
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
