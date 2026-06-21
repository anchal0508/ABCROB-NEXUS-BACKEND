const { Sequelize } = require('sequelize');

// Supabase details yahan directly fill karein (bina URL string banaye)
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: '://supabase.com', // Apna exact host name check karke likhein
    username: 'postgres.irvjebwkrfcctmoimvcz',       // Apna exact user ID likhein
    password: 'Aapka_Real_Password',                 // Apna real password likhein (bina kisi %25 ke, jaisa simple password hai)
    database: 'postgres',
    port: 5432,                                      // Session Pooler ka standard port 5432 hai
    logging: console.log, 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
