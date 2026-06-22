const userService = require("../services/userService");
const jwt = require('jsonwebtoken');

const addUser = async (req, res, next) => {
    try {
        // 🌟 आपके कहे अनुसार फ़ील्ड्स को बिल्कुल सटीक सेट कर दिया गया है
        const { name, email, role, phone, dob, password } = req.body;
        
        if (!name || !email || !password) {
            const error = new Error('All fields (name, email, password) are required');
            error.statusCode = 400;
            throw error;
        }

        // 🌟 अब ये सभी फ़ील्ड्स सीधे आपकी सर्विस फ़ंक्शन में पास हो रही हैं
        const userResponse = await userService.registerUser({ 
            name, 
            email, 
            role: role || "CUSTOMER", // यदि फ्रंटएंड से रोल न आए तो डिफ़ॉल्ट कस्टमर रहेगा
            phone, 
            dob, 
            password 
        });

        const token = jwt.sign(
            { id: userResponse.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE_IN || '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            data: {
                user: {
                    id: userResponse.id,
                    name: userResponse.name,
                    email: userResponse.email,
                    role: userResponse.role,
                    phone: userResponse.phone,
                    dob: userResponse.dob
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
