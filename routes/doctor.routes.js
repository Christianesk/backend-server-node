var express = require('express');
var doctorController = require('../controllers/doctor.controller');
var mdAuthentication = require('../middlewares/authentication');


var app = express();

/**
* Author: Christian Mena
* Description: Method that gets all doctors
**/
app.get('/', doctorController.getAllDoctor);

/**
* Author: Christian Mena
* Description: Method that update a doctor for id
**/
app.put('/:id', mdAuthentication.checkToken, doctorController.updateDoctorById);

/**
* Author: Christian Mena
* Description: Method that create a new doctor
**/
app.post('/', mdAuthentication.checkToken, doctorController.createDoctor);

/**
* Author: Christian Mena
* Description: Methot that delete an doctor
**/
app.delete('/:id', mdAuthentication.checkToken, doctorController.deleteDoctor);

module.exports = app;