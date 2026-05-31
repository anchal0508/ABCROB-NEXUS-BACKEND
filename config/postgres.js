const { Sequelize } = require('sequelize');

const host = process.env.POSTGRES_HOST || 'aws-1-ap-southeast-1.pooler.supabase.com';
const user = process.env.POSTGRES_USER || 'postgres.irvjebwkrfcctmoimvcz';
const password = process.env.POSTGRES_PASSWORD || 'A1jadu_hai_';
const database = process.env.POSTGRES_DATABASE || 'postgres';
const port = parseInt(process.env.POSTGRES_PORT) || 5432;

const connectionUri = `postgresql://${user}:${password}@${host}:${port}/${database}`;

const sequelize = new Sequelize(connectionUri, {
    dialect: 'postgres',
    logging: console.log, // Is baar logs chalu rakhein taaki tables banti hui terminal par dikhein
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
