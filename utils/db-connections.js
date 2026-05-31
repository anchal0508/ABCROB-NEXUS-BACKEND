const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'A1jadu_hai%@', {
    host: '://supabase.com', // Host yahi rahega
    port: 5432,                                       // Port ko 6543 se badal kar 5432 kar diya
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
        console.error("DB not connected... Error details:", error);
    }
})();

module.exports = sequelize;
