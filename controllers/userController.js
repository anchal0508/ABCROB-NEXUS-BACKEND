const userService = require("../services/userService");
const jwt = require('jsonwebtoken');

const sendTokenCookie = (user, statusCode, res) => {
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_IN || '24h' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 
    });

    return res.status(statusCode).json({
        success: true,
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                dob: user.dob,
                profilePhoto: user.profilePhoto || null
            }
        }
    });
};

//  SIGNUP CONTROLLER
const addUser = async (req, res, next) => {
    try {
        const { name, email, role, phone, dob, password } = req.body;

        if (!name || !email || !password) {
            const error = new Error('All fields (name, email, password) are required');
            error.statusCode = 400;
            throw error;
        }

        const userResponse = await userService.registerUser({
            name,
            email,
            role: role || "CUSTOMER",
            phone,
            dob,
            password
        });

        sendTokenCookie(userResponse, 201, res);

    } catch (error) {
        next(error);
    }
};

// LOGIN CONTROLLER
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userResponse = await userService.loginUser(email, password);

        sendTokenCookie(userResponse, 200, res);
    } catch (error) {
        next(error);
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            const error = new Error('Not authenticated, no token found');
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userService.findUserById(decoded.id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            data: { user }
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token invalid or expired" });
        }
        next(error);
    }
};

//  LOGOUT CONTROLLER
const logoutUser = async (req, res, next) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully! 👋"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addUser,
    loginUser,
    getUserProfile,
    logoutUser
};
