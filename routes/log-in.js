const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
require('dotenv').config();

router.get('/', userAuth, (req, res) => {
    // console.log(req.header('x-token'));
    jwtExpData = req.jwtExp;
    res.json({
        "work": "ingggg",
        "exp": jwtExpData
    });
});


router.post('/', async (req, res) => {
    try {
        const users = await User.findOne({ email: req.body.email, password: req.body.password });
        if (users) {
            // let limit = 60 * 3; // 180 seconds
            // let expires = Math.floor(Date.now() / 1000) + limit;

            // const payload = {
            //     _id: users._id,
            //     exp: expires
            // }
            // const token = jwt.sign(payload, process.env.jwtSecretKey);
            const token = users.genrateAuthToken();
            resObject = {
                data: {
                    "output": "you are logged in",
                    "token": token
                }
            };
            res.send(resObject);

        }
        else
            res.status(400).send('email or password is wrong');

    } catch (error) {
        res.send('something went wrong');
        console.log(error);
    }
});


module.exports = router;
