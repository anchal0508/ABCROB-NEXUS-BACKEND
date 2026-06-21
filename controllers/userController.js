const userService = require("../services/userService");
const jwt = require('jsonwebtoken');

const addUser = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            const error = new Error('All fields (name, email, password) are required');
            error.statusCode = 400;
            throw error;
        }

        const userResponse = await userService.registerUser({ name, email, password });

        const token = jwt.sign(
            { id: userResponse.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE_IN }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            success: true,
            data: {
                user: {
                    id: userResponse.id,
                    name: userResponse.name,
                    email: userResponse.email,
                    role: userResponse.role,
                }
            }
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    addUser,
}