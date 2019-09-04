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

/**
* Author: Christian Mena
* Description: Verify Admin
**/

exports.verifyAdminRole = (req, res, next) => {

    var user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            message: 'Invalid Token',
            errors: {message: 'Invalid Token '}
        });
    }
}

/**
* Author: Christian Mena
* Description: Verify Admin or same user
**/

exports.verifyAdminRoleOrSameUser = (req, res, next) => {

    var user = req.user;
    var id = req.params.id;

    if (user.role === 'ADMIN_ROLE' || user._id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            message: 'Invalid Token',
            errors: {message: 'Invalid Token '}
        });
    }
}
