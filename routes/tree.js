const express = require('express');

const router = express.Router();

router.get('/list', (req, res) => {
    res.send('tree list here / get request');
});

module.exports = router;
