var express = require('express');
var loginController = require('../controllers/login.controller');


var app = express();

/**
* Author: Christian Mena
* Description: Method for create User Login
**/
app.post('/', loginController.createUserLogin);



module.exports = app;