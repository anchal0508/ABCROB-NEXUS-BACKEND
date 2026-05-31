const { Sequelize } = require('sequelize');

// Direct configuration: No .env, no string parsing errors
const sequelize = new Sequelize('postgres', 'postgres', 'A1jadu_hai%@', {
    host: 'aws-1-ap-northeast-1.pooler.supabase.com',
    port: 5432,
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
        console.log("Database has been connected to Supabase successfully....!");
    } catch (error) {
        console.error("DB not connected... Error details:", error.message);
    }
})();

module.exports = sequelize;
