var express = require('express');
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SECRET_KEY = require('../config/config').SECRET_KEY;


var app = express();


app.post('/', (req, res) => {

    var body = req.body;

    User.findOne({ email: body.email },  (err, userDB) => {


                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error shearching user',
                        errors: err
                    });
                }
                //for email
                if (!userDB) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Incorrect credentials',
                        errors: err
                    });
                }
                //for password
                if (!bcrypt.compareSync(body.password, userDB.password)) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Incorrect credentials',
                        errors: err
                    });
                }

                userDB.password = ':)';
                //Create token
                var token = jwt.sign({ user: userDB }, SECRET_KEY, { expiresIn: 14400 });//4hours

                res.status(200).json({
                    ok: true,
                    user: userDB,
                    token: token,
                    id: userDB._id
                });
            });



});



module.exports = app;