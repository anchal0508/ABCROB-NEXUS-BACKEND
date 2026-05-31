
const { asyncWrapProviders } = require('async_hooks');
const path = require('path');

const getHomePage = async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "view", "index.html"));
}

const getSignUpPage = async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "view", "signupPage.html"));
}


const dashboard = async(req, res)=>{
    res.sendFile(path.join(__dirname, "..", "view", "classes.html"));
}

 
 

module.exports = {
    getHomePage,
    getSignUpPage,
    dashboard
}