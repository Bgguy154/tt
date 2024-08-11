const express = require('express');
const Classroom = require('../models/Classroom');
const router = express.Router();

// Create Timetable
router.post('/create', async (req, res) => {
    const { classroomId, periods } = req.body;
    const classroom = await Classroom.findById(classroomId);

    if (classroom) {
        const isValid = periods.every(period => {
            return period.startTime >= classroom.startTime && period.endTime <= classroom.endTime;
        });

        if (isValid) {
            classroom.timetable = periods;
            await classroom.save();
            res.send(`Timetable created for classroom`);
        } else {
            res.status(400).send('Timetable periods are out of bounds');
        }
    } else {
        res.status(400).send('Classroom not found');
    }
});

module.exports = router;
