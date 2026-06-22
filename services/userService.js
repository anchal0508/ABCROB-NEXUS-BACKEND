const { User } = require('../models/index');
const bcrypt = require('bcryptjs'); 

class UserService {
    /**
     * Find a user by their email address (Dynamic Attribute Isolation)
     */
    async findUserByEmail(email, includePassword = false) {
        if (!email) return null;

        const queryOptions = {
            where: { 
                email: email.toLowerCase().trim() 
            }
        };

        if (!includePassword) {
            queryOptions.attributes = { exclude: ['password'] };
        }

        return await User.findOne(queryOptions);
    }

    /**
     *  For Context API, profile check finding user by ID
     */
    async findUserById(id) {
        if (!id) return null;
        return await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
    }

    /**
     * Register a brand new user in the system
     */
    async registerUser(userData) {
        const { name, email, password, phone, dob, role } = userData;
        const sanitizedEmail = email.toLowerCase().trim();

        const existingUser = await this.findUserByEmail(sanitizedEmail, false);
        if (existingUser) {
            const error = new Error('Email is already registered');
            error.statusCode = 409;
            throw error;
        }

        const newUser = await User.create({ 
            name: name.trim(), 
            email: sanitizedEmail, 
            password: password,
            phone: phone || null,
            dob: dob || null,
            role: role || "CUSTOMER"
        });

        const sanitizedUser = newUser.toJSON();
        delete sanitizedUser.password;
        return sanitizedUser;
    }

    /**
     * Authenticator / Login Workflow
     */
    async loginUser(email, plainPassword) {
        if (!email || !plainPassword) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }

        const user = await this.findUserByEmail(email, true);

        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401; 
            throw error;
        }

        const isMatch = await bcrypt.compare(plainPassword, user.password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const userProfile = user.toJSON();
        delete userProfile.password;

        return userProfile; 
    }
}

module.exports = new UserService();
