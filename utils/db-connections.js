const { Sequelize } = require('sequelize');

// Seedhe Supabase ka details bina kisi .env file ke
const sequelize = new Sequelize('postgres', 'postgres', 'A1jadu_hai%@', {
    host: '://supabase.com',
    port: 5432, // Port 5432 sabse best hai cloud database ke liye
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Cloud database connections ke liye yeh line compulsory hai
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
