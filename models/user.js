'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "CUSTOMER",
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salut = await bcrypt.genSalt(process.env.PASSWORD_SALT = 12);
          user.password = await bcrypt.hash(user.password, salut);
        }
      }
    }
  });
  return User;
};