const router = require('express').Router();
const { addUser, loginUser, getUserProfile, logoutUser } = require('../controllers/userController');

router.post('/addUser', addUser);

router.post('/login', loginUser);

router.get('/profile', getUserProfile);

router.post('/logout', logoutUser);

module.exports = router;
