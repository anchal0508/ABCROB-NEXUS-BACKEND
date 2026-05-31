const { Sequelize } = require('sequelize');

// Parameters ko alag rakhne se password ka special character error nahi dega
const sequelize = new Sequelize('postgres', 'postgres', 'A1jadu_hai%@', {
    host: 'aws-1-ap-northeast-1.pooler.supabase.com',
    port: 6543,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Supabase remote cloud server ke liye zaroori hai
        }
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database has been connected to Supabase successfully....!");
    } catch (error) {
        console.error("DB not connected... Error details:", error);
    }
})();

module.exports = sequelize;
