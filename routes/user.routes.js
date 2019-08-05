var express = require('express');
var User = require('../models/user');
var bcrypt = require('bcryptjs');

var mdAuthentication = require('../middlewares/authentication');


var app = express();



/**
* Author: Christian Mena
* Description: Method that gets all users
**/

app.get('/', (req, res, next) => {

    User.find({}, 'name email img role')
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error loading Users',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    users
                });

            });
});



/**
* Author: Christian Mena
* Description: Method that update a user for id
**/

app.put('/:id', mdAuthentication.checkToken , (req, res) => {

    var id = req.params.id;
    var body = req.body;

    User.findById(id, 'name email img role')
        .exec(
            (err, user) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error finding User',
                        errors: err
                    });
                }

                if (!user) {
                    return res.status(400).json({
                        ok: false,
                        message: 'The User with id: ' + id + ' does not exist',
                        errors: { message: 'There is no user with that id' }
                    });
                }

                user.name = body.name;
                user.email = body.email;
                user.role = body.role;

                user.save((err, userSaved) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            message: 'Error when updating user',
                            errors: err
                        });
                    }


                    res.status(201).json({
                        ok: true,
                        user: userSaved
                    });
                });


            });
});

/**
* Author: Christian Mena
* Description: Method that create a new user
**/

app.post('/', mdAuthentication.checkToken , (req, res) => {

    var body = req.body;

    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });


    user.save((err, userSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error creating User',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            user: userSaved,
            userToken: req.user
        });
    });
});

/**
* Author: Christian Mena
* Description: Methot that delete an user
**/

app.delete('/:id', mdAuthentication.checkToken , (req, res) => {
    var id = req.params.id;

    User.findByIdAndRemove(id, (err, userDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error deleting User',
                errors: err
            });
        }

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                message: 'There is no user with that id',
                errors: { message: 'There is no user with that id' }
            });
        }

        res.status(200).json({
            ok: true,
            user: userDeleted
        });
    });


});

module.exports = app;