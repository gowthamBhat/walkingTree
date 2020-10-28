const jwt = require('jsonwebtoken');

function adminAuth(req, res, next) {
    // if (req.decode) {
    //     const user = req.decode
    //     if (user.isAdmin === true) {
    //         next();
    //     }
    //     else {
    //         res.status(400).send('not allowed to modify this request');
    //         return;
    //     }
    // }
    // else {
    //     res.status(400).send('not allowed to modify this request');
    // }
    if (!req.user.isAdmin)
        return res.status(403).send('user not authorised to perform this action');
    if (req.user.isAdmin == false)
        return res.status(403).send('not authorised only admin have rights');

    next();
    //403 forbidden, 402 un-authorised
}

module.exports = adminAuth;