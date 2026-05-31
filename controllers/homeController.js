
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

const login = async (req, res) => {
    try {
        const { email, pass } = req.body;

        const userByEmail = await User.findOne({
            where: {
                email: email
            }
        });
        if (!userByEmail) {
            return res.status(404).json({ message: "User not Registered...!" });
        }
       else if (userByEmail.pass !== pass)
            return res.status(403).json({ message: "Wrong Password...!" });
        
       else {
        res.status(200).json({
            message: "Successfully loggedIn",
            data: userByEmail,
            success: true
        })
       }

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in login', error.message);
    }
}


const createUser = async (req, res) => {
    try {
        const { name, email, role, pass } = req.body;
        const user = await User.create({
            name: name,
            email: email,
            role: role,
            pass: pass
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "-----xxxxxx-------No user has added-----xxxxxx-------" });
    }
}

module.exports = {
    getHomePage,
    getSignUpPage,
    login,
    createUser,
    dashboard
}