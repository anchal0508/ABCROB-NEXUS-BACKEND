const { Sequelize } = require('sequelize');

// Supabase se mili poori Session ya Transaction Pooler URL yahan direct paste karein
// Isme apna real password manually likh dena (bina kisi %25 ya encoding ke, jaisa normal password hai)
const connectionString = "postgresql://postgres.irvjebwkrfcctmoimvcz:A1_jadu_hai@://supabase.com";

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
