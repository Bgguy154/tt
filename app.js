const express = require('express');
const connectDB = require('./config');
const authRoutes = require('./routes/auth');
const classroomRoutes = require('./routes/classroom');
const timetableRoutes = require('./routes/timetable');

const app = express();
app.use(express.json());

connectDB();
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'none'"],
    imgSrc: ["'self'", "http://localhost:3000"],
    scriptSrc: ["'self'"],
    // Add other directives as needed
  },
}));


// Setup routes
app.use('/auth', authRoutes);
app.use('/classroom', classroomRoutes);
app.use('/timetable', timetableRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
