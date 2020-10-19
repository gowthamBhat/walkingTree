const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Tree = require('../models/treeSchema');

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
router.post('/list', async (req, res) => {
    try {
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
router.put('/list/:id', async (req, res) => {
    try {
        console.log(req.params.id);

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
module.exports = router;
