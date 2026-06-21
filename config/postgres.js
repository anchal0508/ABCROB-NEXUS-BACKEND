const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com', // Yahan aws-1 kar dein
    username: 'postgres.irvjebwkrfcctmoimvcz',       
    password: 'Aapka_Real_Password',                 
    database: 'postgres',
    port: 5432,                                      
    logging: console.log, 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
