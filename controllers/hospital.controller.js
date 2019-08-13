var Hospital = require('../models/hospital');

var hospitalController = {};


/**
* Author: Christian Mena
* Description: Method that gets all hospitals
**/
hospitalController.getAllHospital = (req, res, next) => {

    var from = req.query.from || 0;
    from = Number(from);

    Hospital.find({}, 'name email img role')
        .skip(from)
        .limit(5)
        .populate('user', 'name email')
        .exec(
            (err, hospitals) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error loading Hospitals',
                        errors: err
                    });
                }

                Hospital.count({}, (err, count) => {
                    res.status(200).json({
                        ok: true,
                        hospitals,
                        total: count
                    });
                });
            });
};

/**
* Author: Christian Mena
* Description: Method that update a hospital for id
**/
hospitalController.updateHospitalById = (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error finding hospital',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                message: 'The hospital with id: ' + id + ' does not exist',
                errors: { message: 'There is no hospital with that id' }
            });
        }

        hospital.name = body.name;
        hospital.user = req.user._id;

        hospital.save((err, hospitalSaved) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error when updating hospital',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                hospital: hospitalSaved
            });
        });


    });
};

/**
* Author: Christian Mena
* Description: Method that create a new hospital
**/
hospitalController.createHospital = (req, res) => {

    var body = req.body;

    var hospital = new Hospital({
        name: body.name,
        user: req.user._id
    });


    hospital.save((err, hospitalSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error creating hospital',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalSaved
        });
    });
};

/**
* Author: Christian Mena
* Description: Methot that delete an hospital
**/
hospitalController.deleteHospital = (req, res) => {
    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, hospitalDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error deleting hospital',
                errors: err
            });
        }

        if (!hospitalDeleted) {
            return res.status(400).json({
                ok: false,
                message: 'There is no hospital with that id',
                errors: { message: 'There is no hospital with that id' }
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospitalDeleted
        });
    });


};

module.exports = hospitalController;