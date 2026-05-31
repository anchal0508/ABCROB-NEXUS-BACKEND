const { Sequelize } = require('sequelize');

// Aapki .env file ke exact variables ko read kiya ja raha hai
const host = process.env.POSTGRES_HOST;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DATABASE;
const port = process.env.POSTGRES_PORT || 5432;

// In sabhi ko jodkar ek unified Connection URL banaya jo routing bypass karega
const connectionUri = `postgresql://${user}:${password}@${host}:${port}/${database}`;

const sequelize = new Sequelize(connectionUri, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database has been connected to Supabase successfully from VS Code! 🎉");
    } catch (error) {
        console.error("DB connection error:", error.message);
    }
})();

module.exports = sequelize;
