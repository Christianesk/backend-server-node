var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SECRET_KEY = require('../config/config').SECRET_KEY;

var loginController = {};

//Google
var CLIENT_ID = require('../config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

/**
* Author: Christian Mena
* Description: Method for create User Login
**/
loginController.createUserLogin = (req, res) => {

    var body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {


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
        loadFieldsInUser(userDB,res);
    });



};

/**
* Author: Christian Mena
* Description: Method for create User Login with google
**/

loginController.createUserLoginWithGoogle = async (req, res) => {

    var token = req.body.token;

    var googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                message: 'Invalid Token',
            });
        });


    User.findOne({ email: googleUser.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error shearching user',
                errors: err
            });
        }

        if (userDB) {
            if (userDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    message: 'You must use your normal authentication'
                });
            } else {
                //Create token
                loadFieldsInUser(userDB,res);
            }
        } else {
            //The user does not exist must be created
            var user = new User();

            user.name = googleUser.name;
            user.email = googleUser.email;
            user.img = googleUser.img;
            user.google = true;
            user.password = ':)';


            user.save((err, userDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error shearching user',
                        errors: err
                    });
                }

                loadFieldsInUser(userDB,res);
            });

        }
    });


};

/**
* Author: Christian Mena
* Description: Authentication google
**/

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}


/**
* Author: Christian Mena
* Description: Method to load fields in model User
**/
function loadFieldsInUser(userDB,res) {
    var token = jwt.sign({ user: userDB }, SECRET_KEY, { expiresIn: 14400 });//4hours

    res.status(200).json({
        ok: true,
        user: userDB,
        token: token,
        id: userDB._id
    });
}


module.exports = loginController;