var express = require('express');
var imagesController = require('../controllers/images.controller');

var app = express();

//Routes

app.get('/:type/:img', imagesController.get);

module.exports = app;