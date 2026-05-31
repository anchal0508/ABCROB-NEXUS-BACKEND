const {Sequelize , DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connections');



const Course = sequelize.define('course', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER,
    },
    duration: {
        type: DataTypes.STRING
    },    
});


module.exports = Course;