const { Sequelize } = require('sequelize');

// Supabase se mila hua URI yahan dalein aur [YOUR-PASSWORD] ko apne real password se replace karein
const sequelize = new Sequelize('postgresql://postgres.zuaynoadjpvftdtgkoyp:A1jadu_hai%@://supabase.com', {
    dialect: 'postgres',
    logging: false // Terminal me extra logs band karne ke liye (optional)
});

(async () => {
    try {
        await sequelize.authenticate(); // Yahan await zaroor lagayein
        console.log("Database has been connected to Supabase....!");
    } catch (error) {
        console.error("DB not connected...", error);
    }
})();

module.exports = sequelize;
