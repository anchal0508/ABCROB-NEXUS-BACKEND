'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // यह 'up' फ़ंक्शन है जो Render पर डिप्लॉय होते ही Supabase में 'users' टेबल बनाएगा
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "CUSTOMER",
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true // आपकी इच्छा के अनुसार इसे नल (null) रखा जा सकता है
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  // यह 'down' फ़ंक्शन है जो ज़रूरत पड़ने पर टेबल को डिलीट (Drop) करने के काम आता है
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
