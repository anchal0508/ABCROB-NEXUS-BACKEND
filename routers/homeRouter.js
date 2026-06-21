const router = require('express').Router();
const  {getHomePage, getSignUpPage, login, createUser, dashboard}  = require('../controllers/homeController');

router.get('/', getHomePage);
router.get('/signupPage', getSignUpPage);
router.get('/classes', dashboard);


router.post('/api/classes/loginuser', login);
router.post('/api/classes/addUser', createUser);


module.exports = router;