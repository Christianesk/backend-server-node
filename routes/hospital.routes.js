var express = require('express');
var hospitalController = require('../controllers/hospital.controller');
var mdAuthentication = require('../middlewares/authentication');


var app = express();

/**
* Author: Christian Mena
* Description: Method that gets all hospitals
**/
app.get('/', hospitalController.getAllHospital);

/**
* Author: Christian Mena
* Description: Method that update a hospital for id
**/
app.put('/:id', mdAuthentication.checkToken, hospitalController.updateHospitalById);

/**
* Author: Christian Mena
* Description: Method that create a new hospital
**/
app.post('/', mdAuthentication.checkToken, hospitalController.createHospital);

/**
* Author: Christian Mena
* Description: Methot that delete an hospital
**/
app.delete('/:id', mdAuthentication.checkToken, hospitalController.deleteHospital);

module.exports = app;