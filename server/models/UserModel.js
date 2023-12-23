const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['disabled', 'inactive', 'active'],
        default: 'inactive'
    },
    userType: {
        type: String,
        enum: ['SuperAdmin', 'Admin', 'ZoneManager','BazarManager','Supervisor'],
        required: true
    }
});

const User = mongoose.model('User', userModel);

module.exports = User;
