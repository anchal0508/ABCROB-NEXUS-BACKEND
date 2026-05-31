const {Sequelize , DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connections');



const Enrollment = sequelize.define('enrollment', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },    
    enrollDate: {
        type: DataTypes.DATEONLY
    },    
});


module.exports = Enrollment;