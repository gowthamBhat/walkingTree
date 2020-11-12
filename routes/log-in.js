const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const Joi = require('joi');
const bcrypt = require('bcrypt');
require('dotenv').config();

router.get('/', userAuth, (req, res) => {
    // console.log(req.header('x-token'));
    jwtExpData = req.jwtExp;
    res.json({
        "work": "ingggg",
        "exp": jwtExpData
    });
});

// function validate(data) {
//     const schema = {
//         email: Joi.string().min(3).max(255).required().email(),
//         password: Joi.string().min(4).max(255)
//     }
//     return Joi.validate(data, schema);
// }
function validate(param) {
    const Schema = Joi.object({

        email: Joi.string()
            .min(3)
            .max(30)
            .required().email(),
        password: Joi.string().required().min(4).max(100)
    });
    return Schema.validate({ email: param.email, password: param.password });
}

router.post('/', async (req, res) => {
    try {
        const val = validate(req.body);

        if (val.error) return res.status(400).send(val.error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) throw "invalid email or password";

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) throw "invalid email or password";

        const token = user.genrateAuthToken();
        resObject = {
            data: {
                "output": "you are logged in",
                "token": token
            }
        };
        res.send(resObject);


    } catch (error) {
        res.send('email or password is wrong');
        console.log(error);
    }
});


module.exports = router;
