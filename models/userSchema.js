const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
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
        maxlength: 255
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
userSchema.methods.genrateAuthToken = function () {
    let limit = 60 * 20; // 180 seconds
    let expires = Math.floor(Date.now() / 1000) + limit;
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, exp: expires }, process.env.jwtSecretKey); //! should go through mosh's code
    return token;
}
function validate(param) {
    const Schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .min(3)
            .max(30)
            .required().email(),
        password: Joi.string().required().min(4).max(15),
        isAdmin: Joi.boolean()
    });
    return Schema.validate({ name: param.name, email: param.email, password: param.password, isAdmin: param.isAdmin });
}

const User = mongoose.model('user', userSchema);

module.exports.User = User;
module.exports.validate = validate;