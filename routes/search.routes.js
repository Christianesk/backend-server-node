var express = require('express');
var searchController = require('../controllers/search.controller');

var app = express();



/**
* Author: Christian Mena
* Description: Search by collection
**/
app.get('/collection/:table/:search',searchController.findByCollection);

/**
* Author: Christian Mena
* Description: General Search
**/
app.get('/all/:search', searchController.findAllCollections);



module.exports = app;