var jwt = require('jsonwebtoken');

var SECRET_KEY = require('../config/config').SECRET_KEY;

/**
* Author: Christian Mena
* Description: Verify Token
**/

exports.checkToken = (req, res, next) => {
    var token = req.query.token;

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'Invalid Token',
                errors: err
            });
        }

        
        req.user = decoded.user;
        next();
    });
}
