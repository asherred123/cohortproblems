const express = require('express');
const deptmodel = require('../models/dept.js');
const staffmodel = require('../models/staff.js');
var router = express.Router();


router.get('/add/:code', async function(req, res, next) {
    try {
        const code = req.params.code;
        const result = await deptCollection.insertOne({ code: code });
        res.status(201).send({ "code": code });
    } catch (error) {
        next(error);
    }
});



/* GET dept listing. */

router.get('/all', async (req, res, next) => {
    try {
        const departments = await deptCollection.find({}).toArray();
        res.status(200).json(departments);
    } catch (error) {
        next(error);
    }
});


router.get('/all/withstaff', async (req, res, next) => {
    try {
        const departments = await deptCollection.aggregate([
            {
                $lookup: {
                    from: 'staff',
                    localField: '_id',
                    foreignField: 'deptId',
                    as: 'staff'
                }
            }
        ]).toArray();
        res.status(200).json(departments);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
