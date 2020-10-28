const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
    const token = req.header('x-token');
    if (!token) {
        res.status(401).send('you need to login to access this URL');
        return
    }

    try {
        const decode = jwt.verify(token, process.env.jwtSecretKey);
        if (!decode) {
            res.status(401).send('you need to login to access this URL');
            return
        }

        let current = Math.floor(Date.now() / 1000);
        let diff = current - decode.exp;
        req.jwtExp = diff;
        req.user = decode;
        next();
    }
    catch (error) {
        res.status(400).send('token varification failed, u have no permission to access the resourses');
    }
}

module.exports = auth;