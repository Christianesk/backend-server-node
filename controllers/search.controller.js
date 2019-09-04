var Hospital = require('../models/hospital');
var Doctor = require('../models/doctor');
var User = require('../models/user');

const searchController = [];




/**
* Author: Christian Mena
* Description: Search by collection
**/
searchController.findByCollection = (req, res) => {

    var search = req.params.search;
    var regex = new RegExp(search, 'i');
    var table = req.params.table;

    var promise;

    switch (table) {
        case 'users':
            promise = findUsers(search, regex);
            break;
        case 'doctors':
            promise = findDoctors(search, regex);
            break;
        case 'hospitals':
            promise = findHospitals(search, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                message: 'The type of searches are only: user, doctors and hospitals',
                error: { message: 'type of collection invalid' }
            });
    }

    promise.then(data =>{
        res.status(200).json({
            ok: true,
            [table]: data
        });
    });

};

/**
* Author: Christian Mena
* Description: General Search
**/
searchController.findAllCollections = (req, res) => {

    var search = req.params.search;
    var regex = new RegExp(search, 'i');

    Promise.all([findHospitals(search, regex), findDoctors(search, regex), findUsers(search, regex)])
        .then(response => {
            res.status(200).json({
                ok: true,
                hospitals: response[0],
                doctors: response[1],
                users: response[2]
            });
        });
};

function findHospitals(search, regex) {

    return new Promise((resolve, reject) => {
        Hospital.find({ name: regex })
            .populate('user', 'name email img')
            .exec((err, hospitals) => {

                if (err) {
                    reject('Error loading hospitals ', err);
                } else {
                    resolve(hospitals);
                }

            });
    });

}

function findDoctors(search, regex) {

    return new Promise((resolve, reject) => {
        Doctor.find({ name: regex })
            .populate('user', 'name email img')
            .populate('hospital')
            .exec((err, doctors) => {

                if (err) {
                    reject('Error loading doctors ', err);
                } else {
                    resolve(doctors);
                }

            });
    });

}

function findUsers(search, regex) {

    return new Promise((resolve, reject) => {
        User.find({}, 'name email role img')
            .or([{ 'name': regex }, { 'email': regex }])
            .exec((err, user) => {
                if (err) {
                    reject('Error loading users', err)
                } else {
                    resolve(user);
                }
            });
    });

}


module.exports = searchController;