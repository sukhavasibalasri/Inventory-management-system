const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        default: '',
        trim: true,
    },
    purpose: {
        type: String,
        default: '',
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
