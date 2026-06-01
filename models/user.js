const {Sequelize , DataTypes} = require('sequelize');
const sequelize = require('../config/postgres');



const User = sequelize.define('users', {
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