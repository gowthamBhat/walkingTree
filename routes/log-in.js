const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userSchema');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ "work": "ingggg" });
});

router.post('/', async (req, res) => {
    try {
        const users = await User.findOne({ email: req.body.email, password: req.body.password });
        if (users)
            res.send('logged in');
        else
            res.status(400).send('email or password is wrong');

    } catch (error) {
        res.send('something went wrong');
        console.log(error);
    }
});

module.exports = router;