const { User } = require('../models/index');
const bcrypt = require('bcryptjs'); // Password verification ke liye standard package

class UserService {
    /**
     * Find a user by their email address (Dynamic Attribute Isolation)
     * @param {string} email 
     * @param {boolean} includePassword - Set true only for authentication/login flow
     */
    async findUserByEmail(email, includePassword = false) {
        if (!email) return null;

        // Dynamic attributes selection logic
        const queryOptions = {
            where: { 
                email: email.toLowerCase().trim() 
            }
        };

        // Standard flow mein password excluded rahega, true pass karne par include ho jayega
        if (!includePassword) {
            queryOptions.attributes = { exclude: ['password'] };
        }

        return await User.findOne(queryOptions);
    }

    /**
     * Register a brand new user in the system
     * @param {Object} userData 
     */
    async registerUser(userData) {
        const { name, email, password } = userData;
        const sanitizedEmail = email.toLowerCase().trim();

        // Pass default false (password exclude rahega safely duplicate checking ke liye)
        const existingUser = await this.findUserByEmail(sanitizedEmail, false);
        if (existingUser) {
            const error = new Error('Email is already registered');
            error.statusCode = 409;
            throw error;
        }

        const newUser = await User.create({ 
            name: name.trim(), 
            email: sanitizedEmail, 
            password: password 
        });

        // Response object ko sanitize karna database insertion ke turant baad
        const sanitizedUser = newUser.toJSON();
        delete sanitizedUser.password;
        return sanitizedUser;
    }

    /**
     * Authenticater / Login Workflow
     * @param {string} email 
     * @param {string} plainPassword 
     */
    async loginUser(email, plainPassword) {
        if (!email || !plainPassword) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }

        // 🚨 CRITICAL SETUP: Explicitly pass true to get password hash from Supabase/DB
        const user = await this.findUserByEmail(email, true);

        // Security practice: Email galat ho ya password, error hamesha generic bhejte hain
        // Isse hackers ko pata nahi chalta ki user exist karta hai ya nahi
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401; // 401: Unauthorized
            throw error;
        }

        // Bcrypt using raw encryption salt matching triggers
        const isMatch = await bcrypt.compare(plainPassword, user.password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        // Security Layer: Cleanup instances before compiling session payloads
        const userProfile = user.toJSON();
        delete userProfile.password;

        return userProfile; // Returning clean cleared session details
    }
}

module.exports = new UserService();
