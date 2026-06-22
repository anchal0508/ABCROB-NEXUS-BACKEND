const router = require('express').Router();
const  { addUser}  = require('../controllers/userController');
const auth = require('../middleWare/auth');

router.post('/addUser', auth, addUser);




module.exports = router;