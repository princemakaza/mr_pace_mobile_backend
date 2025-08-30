const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
    return jwt.sign(
        { _id: user._id, userName: user.userName, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const registerUser = async (userData) => {
    const existingUser = await User.findOne({ 
        $or: [{ email: userData.email }, { userName: userData.userName }] 
    });
    
    if (existingUser) {
        throw new Error('Email or username already exists');
    }

    const user = new User(userData);
    await user.save();
    
    const token = generateAuthToken(user);
    return { user, token };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid login credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }

    const token = generateAuthToken(user);
    return { user, token };
};

const getAllUsers = async () => {
    return await User.find({});
};

const getUserById = async (userId) => {
    return await User.findById(userId);
};

const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};