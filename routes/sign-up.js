const express = require('express');
const mongoose = require('mongoose');
const { User, validate } = require('../models/userSchema');
const bcrypt = require('bcrypt');
const saltRounds = 9;


const router = express.Router();
router.get('/', (req, res) => {
    res.json({ "everythings": "working" });
});

router.post('/', async (req, res) => {

    try {
        const isError = validate(req.body);
        if (isError.error)
            return res.status(400).send(isError.error.details[0].message);

        let users = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        });
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(users.password, salt);

        users.password = hash;
        users = await users.save();

        res.send(users);
    } catch (error) {
        console.log(error);

        res.status(501).send('something went wrong on the server side');
    }
})


module.exports = router;
