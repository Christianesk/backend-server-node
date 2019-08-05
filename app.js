//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//Variable Initialization

var app = express();
const PORT_SERVER = 3000;

//BodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Import Routes
var appRoutes = require('./routes/app.routes');
var userRoutes = require('./routes/user.routes');
var loginRoutes = require('./routes/login.routes');



//Database Connection
mongoose.connection.openUri(
    'mongodb://localhost:27017/hospitalDB',
    {
        useCreateIndex: true,
        useNewUrlParser: true
    }, 
    (err, res) => {
        if (err) throw err;

        console.log(`Database:\x1b[32m online\x1b[0m `);
    });




//Importing Routes
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);





//Listen to requests
app.listen(PORT_SERVER, () => {
    console.log(`express server running in port ${PORT_SERVER} \x1b[32m online\x1b[0m `);
});
