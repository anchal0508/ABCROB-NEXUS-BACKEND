const User = require('./user');
const Course = require('./course');
const Category = require('./category');
const Payment = require('./payment');
const Enrollment = require('./enrollment');




User.belongsToMany(Course, {through: Enrollment});
Course.belongsToMany(User, {through: Enrollment});

Category.hasMany(Course);
Course.belongsTo(Category);

User.hasMany(Payment);
Payment.belongsTo(User);

 


module.exports = {
    User,
    Course,
    Enrollment,
    Payment,
    Category
}