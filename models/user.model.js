const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    PasswordHash: {
        type: String,
        required: true
    },
    Subscription: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);