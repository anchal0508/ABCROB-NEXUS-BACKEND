const {Sequelize , DataTypes} = require('sequelize');
const sequelize = require('../config/postgres');



const Category = sequelize.define('category', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    category_name: {
        type: DataTypes.STRING
    },
    
});


module.exports = Category;