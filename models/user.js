'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcryptjs'); 

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // यहाँ आप अपनी भविष्य की एसोसिएशन्स डिफाइन कर सकते हैं
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

    phone: {
      type: DataTypes.STRING,
      allowNull: true // 🌟 इसे सुधारा गया है ताकि बिना फोन नंबर के भी यूजर रजिस्टर हो सके
    },

    dob: {
      type: DataTypes.DATEONLY, 
      allowNull: true,         
      validate: {
        isDate: true,          
      }
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
        // 🌟 पक्का करते हैं कि पासवर्ड प्लेन टेक्स्ट है और पहले से हैश नहीं है
        if (user.password && !user.password.startsWith('$2a$')) {
          const saltRounds = parseInt(process.env.PASSWORD_SALT) || 12;
          const salt = await bcrypt.genSalt(saltRounds);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        // 🌟 सिर्फ तभी हैश करेंगे जब पासवर्ड सच में बदला गया हो
        if (user.changed('password') && !user.password.startsWith('$2a$')) {
          const saltRounds = parseInt(process.env.PASSWORD_SALT) || 12;
          const salt = await bcrypt.genSalt(saltRounds);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });
  return User;
};
