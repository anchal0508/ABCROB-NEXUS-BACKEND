const { Sequelize } = require('sequelize');

// [YOUR-PASSWORD] ki jagah apna real password dalein (bina brackets ke)
const connectionString = "postgresql://postgres.irvjebwkrfcctmoimvcz:OHKQs18LjpDk2ejT@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";

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
