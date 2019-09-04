var express = require('express');
var userController = require('../controllers/user.controller');
var mdAuthentication = require('../middlewares/authentication');


var app = express();


/**
* Author: Christian Mena
* Description: Method that gets all users
**/
app.get('/', userController.getAllUser);

/**
* Author: Christian Mena
* Description: Method that update a user for id
**/
app.put('/:id',[ mdAuthentication.checkToken,mdAuthentication.verifyAdminRoleOrSameUser] , userController.updateUserById);

/**
* Author: Christian Mena
* Description: Method that create a new user
**/
app.post('/', userController.createUser);

/**
* Author: Christian Mena
* Description: Methot that delete an user
**/
app.delete('/:id',[ mdAuthentication.checkToken,mdAuthentication.verifyAdminRole] , userController.deleteUser);

module.exports = app;