const path = require('path');
const fs = require('fs');

var imagesController = [];


imagesController.get = (req, res, next) => {

    var type = req.params.type;
    var img = req.params.img;

    var pathImage = path.resolve(__dirname, `../uploads/${type}/${img}`);

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    }else{
        var pathNoimage = path.resolve( __dirname,'../assets/no-img.jpg');
        res.sendFile(pathNoimage);
    }
}


module.exports = imagesController;