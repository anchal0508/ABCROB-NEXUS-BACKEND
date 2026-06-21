const router = require('express').Router();
const  { addUser}  = require('../controllers/userController');

router.get('/addUser', addUser);




module.exports = router;