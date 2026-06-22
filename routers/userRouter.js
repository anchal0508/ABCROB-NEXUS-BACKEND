const router = require('express').Router();
const  { addUser}  = require('../controllers/userController');

router.post('/addUser', addUser);




module.exports = router;