const express = require('express');
const Classroom = require('../models/Classroom');
const User = require('../models/User');
const router = express.Router();

// Create Classroom
router.post('/create', async (req, res) => {
    const { name, startTime, endTime, days } = req.body;
    const newClassroom = new Classroom({ name, startTime, endTime, days });
    await newClassroom.save();
    res.send(`Classroom ${name} created`);
});

// Assign Teacher to Classroom
router.post('/assign-teacher', async (req, res) => {
    const { teacherId, classroomId } = req.body;
    const classroom = await Classroom.findById(classroomId);
    if (classroom && !classroom.teacher) {
        classroom.teacher = teacherId;
        await classroom.save();
        res.send(`Teacher assigned to classroom`);
    } else {
        res.status(400).send('Classroom not found or already has a teacher');
    }
});

// Assign Student to Classroom
router.post('/assign-student', async (req, res) => {
    const { studentId, classroomId } = req.body;
    const classroom = await Classroom.findById(classroomId);
    if (classroom) {
        classroom.students.push(studentId);
        await classroom.save();
        res.send(`Student assigned to classroom`);
    } else {
        res.status(400).send('Classroom not found');
    }
});

module.exports = router;
