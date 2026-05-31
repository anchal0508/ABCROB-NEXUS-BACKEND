const {Sequelize , DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connections');



const User = sequelize.define('user', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    role: {
        type: DataTypes.STRING
    },
    pass: {
        type: DataTypes.STRING
    }
});


module.exports = User;