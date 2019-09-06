var express = require('express');
var loginController = require('../controllers/login.controller');
var mdAuthentication = require('../middlewares/authentication');


var app = express();

/**
* Author: Christian Mena
* Description: Method that renew token
**/
app.get('/renewToken',mdAuthentication.checkToken,loginController.renewToken);

/**
* Author: Christian Mena
* Description: Method for create User Login
**/
app.post('/', loginController.createUserLogin);

/**
* Author: Christian Mena
* Description: Method for create User Login with google
**/

app.post('/google', loginController.createUserLoginWithGoogle);



module.exports = app;