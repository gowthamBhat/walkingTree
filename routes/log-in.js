const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.header('x-token'));

    res.json({ "work": "ingggg" });
});

router.post('/', async (req, res) => {
    try {
        const users = await User.findOne({ email: req.body.email, password: req.body.password });
        if (users) {
            const payload = { id: users._id }
            const token = jwt.sign(payload, "mySecretKey");
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