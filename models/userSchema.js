const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
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
userSchema.methods.genrateAuthToken = function () {
    let limit = 60 * 3; // 180 seconds
    let expires = Math.floor(Date.now() / 1000) + limit;
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, exp: expires }, process.env.jwtSecretKey); //! should go through mosh's code
    return token;
}

const User = mongoose.model('user', userSchema);
module.exports = User;