const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secretKey = "asdfasdf65dsdf5df6agfdghgyujkyut75ertrga3dgdft46er5";
const authinticate = async (req, res, next) => {
    const userAuth = req.header("Authorization") ;
    const token = userAuth && userAuth.startWith('Bearer') ? userAuth.split(' ')[1] : userAuth;

    const user = jwt.verify(token, secretKey);
    User.findByPk(user.id).then((user)=>{
        req.user  = user;
        next();
    })
}