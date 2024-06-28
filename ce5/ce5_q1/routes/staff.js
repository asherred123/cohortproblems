const express = require('express');
const staffmodel = require('../models/staff.js');
const deptmodel = require('../models/dept.js');
const { db } = require('../models/db.js');
var router = express.Router();


/* insert a staff, should have used POST instead of GET */
router.get('/add/:id/:name/:code', async function(req, res, next) {
    try {
        const id = req.params.id;
        const name = req.params.name;
        const code = req.params.code;
        const staff = new staffmodel.Staff(id, name, code);
        const result = await staffmodel.insertMany([staff]);  // insertMany expects an array
        res.status(201).send({ "id": id, "name": name, "dept": code });
    } catch (error) {
        next(error);
    }
});

/* GET staff listing. */

router.get('/all/', async function(req, res, next) {
    try {
        const staffs = await staffmodel.all();
        res.status(200).json(staffs);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
