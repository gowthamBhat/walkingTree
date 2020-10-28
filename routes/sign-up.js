const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userSchema');


const router = express.Router();
router.get('/', (req, res) => {
    res.json({ "everythings": "working" });
});

router.post('/', async (req, res) => {

    try {
        let users = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        });
        users = await users.save();
        res.send(users);
    } catch (error) {
        console.log(error);

        res.status(501).send('something went wrong on the server side');
    }
})

module.exports = router;
