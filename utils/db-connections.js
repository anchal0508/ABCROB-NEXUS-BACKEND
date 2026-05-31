const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'A1jadu_hai%@', {
    host: '://supabase.com',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
            // Yeh line tenant identity fix karegi aur error door karegi
            servername: '://supabase.com'
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
