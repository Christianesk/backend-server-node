var Doctor = require('../models/doctor');

var doctorController = {};


/**
* Author: Christian Mena
* Description: Method that gets all doctors
**/
doctorController.getAllDoctor = (req, res, next) => {

    var from = req.query.from || 0;
    from = Number(from);

    Doctor.find({}, 'name email img role')
        .skip(from)
        .limit(5)
        .populate('user', 'name email')
        .populate('hospital')
        .exec(
            (err, doctors) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error loading doctors',
                        errors: err
                    });
                }

                Doctor.count({}, (err, count) => {
                    res.status(200).json({
                        ok: true,
                        doctors,
                        total: count
                    });
                });

            });
};

/**
* Author: Christian Mena
* Description: Method that gets doctor by Id
**/
doctorController.getDoctorById = (req, res, next) => {

    var id = req.params.id;
    Doctor.findById(id)
        .populate('user', 'name email img')
        .populate('hospital')
        .exec((err, doctor) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error finding doctor',
                    errors: err
                });
            }

            if (!doctor) {
                return res.status(400).json({
                    ok: false,
                    message: 'The doctor with id: ' + id + ' does not exist',
                    errors: { message: 'There is no doctor with that id' }
                });
            }

            res.status(200).json({
                ok: true,
                doctor
            });

        });


};


/**
* Author: Christian Mena
* Description: Method that update a doctor for id
**/
doctorController.updateDoctorById = (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Doctor.findById(id, (err, doctor) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error finding doctor',
                errors: err
            });
        }

        if (!doctor) {
            return res.status(400).json({
                ok: false,
                message: 'The doctor with id: ' + id + ' does not exist',
                errors: { message: 'There is no doctor with that id' }
            });
        }

        doctor.name = body.name;
        doctor.user = req.user._id;
        doctor.hospital = body.hospital;

        doctor.save((err, doctorSaved) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error when updating doctor',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                doctor: doctorSaved
            });
        });


    });
};

/**
* Author: Christian Mena
* Description: Method that create a new doctor
**/
doctorController.createDoctor = (req, res) => {

    var body = req.body;

    var doctor = new Doctor({
        name: body.name,
        user: req.user._id,
        hospital: body.hospital
    });


    doctor.save((err, doctorSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error creating doctor',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            doctor: doctorSaved
        });
    });
};

/**
* Author: Christian Mena
* Description: Methot that delete an doctor
**/
doctorController.deleteDoctor = (req, res) => {
    var id = req.params.id;

    Doctor.findByIdAndRemove(id, (err, doctorDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error deleting doctor',
                errors: err
            });
        }

        if (!doctorDeleted) {
            return res.status(400).json({
                ok: false,
                message: 'There is no doctor with that id',
                errors: { message: 'There is no doctorl with that id' }
            });
        }

        res.status(200).json({
            ok: true,
            doctor: doctorDeleted
        });
    });


};

module.exports = doctorController;