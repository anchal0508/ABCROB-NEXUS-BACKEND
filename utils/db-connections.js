const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myFirstDb', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});




(async () => {
    try {
        sequelize.authenticate();
        console.log("Databse has been connected....!")
    } catch (error) {
        console.log("DB not connected...");
    }

})();


module.exports = sequelize;