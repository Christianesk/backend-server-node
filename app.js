//Requires
var express = require('express');
var mongoose = require('mongoose');


//Variable Initialization

var app = express();
const PORT_SERVER = 3000;

//Database Connection
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;

    console.log(`Database:\x1b[32m online\x1b[0m `);
});


//Routes

app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        message: 'Request succesful'
    })

});

//Listen to requests
app.listen(PORT_SERVER, () => {
    console.log(`express server running in port ${PORT_SERVER} \x1b[32m online\x1b[0m `);
});
