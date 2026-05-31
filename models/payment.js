const {Sequelize , DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connections');



const Payment = sequelize.define('payment', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    gateWayOrderId: {
        type: DataTypes.STRING
    },
    transactionId: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.INTEGER
    },
    paymentStatus: {
        type: DataTypes.STRING    //('success' / 'failed' / 'refunded')
    },
});


module.exports = Payment;