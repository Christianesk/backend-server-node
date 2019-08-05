var express = require('express');

var app = express();

//Routes

app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        message: 'Request succesful'
    });

});

module.exports = app;