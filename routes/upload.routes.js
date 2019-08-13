var uploadController = require('../controllers/upload.controller');
var express = require('express');


var app = express();


//Routes

app.put('/:type/:id', uploadController.loadFile);

module.exports = app;