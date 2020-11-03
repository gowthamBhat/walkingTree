const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Tree, validate } = require('../models/treeSchema');

const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');


router.get('/list', async (req, res) => {
    // try {
    //     const trees = await Tree.find().sort('name');
    //     res.send(trees);
    // } catch (error) {
    //     res.status(501).send('something went wrong');
    //     console.log(error);

    // }
    try {
        const trees = await Tree.find().sort('name');
        console.log(trees);

        res.render('treeList', { trees: trees })
    } catch (error) {
        res.send('something went wrong');
    }
});
router.post('/list', userAuth, async (req, res) => {

    try {
        const val = validate(req.body);
        if (val.error) return res.status(400).send(val.error.details[0].message);
        let trees = new Tree({
            name: req.body.name,
            commonName: req.body.commonName
        });
        trees = await trees.save();
        res.send(trees);
    } catch (error) {
        res.status(501).send('something went wrong');
        console.log(error);

    }
});
router.put('/list/:id', userAuth, async (req, res) => {

    try {
        const val = validate(req.body);
        if (val.error) return res.status(400).send(val.error.details[0].message);

        const tree = await Tree.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            commonName: req.body.commonName
        }, { new: true });
        res.send(tree);
    } catch (error) {
        console.log(error);
        res.status(501).send('something went wrong');
    }

});

router.delete('/list/:id', [userAuth, adminAuth], async (req, res) => {
    try {

        const user = await Tree.findByIdAndRemove(req.params.id);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(404).send('id not found');
    }

});

module.exports = router;
