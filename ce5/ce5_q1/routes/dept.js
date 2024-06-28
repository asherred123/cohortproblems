const express = require('express');
const deptmodel = require('../models/dept.js');
const staffmodel = require('../models/staff.js');
const { db } = require('../models/db.js');
var router = express.Router();


router.get('/add/:code', async function(req, res, next) {
    try {
        const code = req.params.code;
        const result = await db.collection('dept').insertOne({ code: code });
        res.status(201).send({ "code": code });
    } catch (error) {
        next(error);
    }
});



/* GET dept listing. */

router.get('/all/', async function(req, res, next) {
    try {
        const depts = await deptmodel.all();
        res.send(depts);
    } catch (error) {
        next(error);
    }
});



router.get('/all/withstaff/', async function(req, res, next) {
    try {
        const depts = await deptmodel.all();
        for (let dept of depts) {
            dept.staffs = await staffmodel.find({ dept: dept.code });
        }
        res.send(depts);
    } catch (error) {
        next(error);
    }
});



module.exports = router;
