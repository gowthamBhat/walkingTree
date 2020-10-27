const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;