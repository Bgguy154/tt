const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    days: { type: [String], required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    timetable: { type: Array, default: [] }, // Store timetable as an array of objects
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
