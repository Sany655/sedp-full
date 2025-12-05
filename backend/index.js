const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./config/db');
const { errHandler, notFound } = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const teamRoutes = require('./routes/teamRoutes');
const locationRoutes = require('./routes/locationRoutes');
const areaRoutes = require('./routes/areaRoutes');
const territoryRoutes = require('./routes/territoryRoutes');
const rffRoutes = require('./routes/rffRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const policyRoutes = require('./routes/policyRoutes');
const designationRoutes = require('./routes/designationRoutes');
const holidayRoutes = require('./routes/holidayRoutes');
const attendanceDeviceRoutes = require('./routes/attendanceDeviceRoutes');
const volunteerTeamRoutes = require('./routes/volunteerTeamRoutes');
const taskRoutes = require('./routes/taskRoutes');
const eventRoutes = require('./routes/event/eventRoutes');
const eventTypeRoutes = require('./routes/event/eventTypeRoutes');
const eventTargetGroupRoutes = require('./routes/event/eventTargetGroupRoutes');
const campaignMilestoneRoutes = require('./routes/campaignMilestoneRoutes');
const path = require('path');
const bodyParser = require('body-parser');
const { getAppMetadata } = require('./controllers/metadataController');
const { manageZktecoDevice } = require('./utils/connectZKTecho');

dotenv.config();
const PORT = process.env.PORT || 8005;
const app = express();

// manageZktecoDevice();
//db connection
try {
  sequelize.authenticate();
  console.log('Mysql Connected...');
  // await sequelize.sync({ alter: true }); //x dont make force:true , it will recreate table 
  // console.log('All models synced to DB...');
} catch (error) {
  console.log('DB Connection Error!');
}

//middleware
app.use(cors({
  credentials: true,
  // origin: [process.env.DEV_DOMAIN, process.env.LIVE_DOMAIN],
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', '*'],
  exposedHeaders: ['Set-Cookie']

}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//apis

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/attendance', attendanceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/territories', territoryRoutes);
app.use('/api/rff-points', rffRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/devices', attendanceDeviceRoutes);
app.use('/api/volunteer-teams', volunteerTeamRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/events/types', eventTypeRoutes);
app.use('/api/events/target-groups', eventTargetGroupRoutes);

app.use('/api/campaign-milestones', campaignMilestoneRoutes);
app.use('/api/campaign-types', require('./routes/campaignTypeRoutes'));

//use for integrated application
// if (process.env.NODE_ENV === 'prod') {
//   app.use(express.static(path.join(__dirname, '../frontend/build'))); // Adjust path here
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html')); // Adjust path here
//   });
// }

app.get('/api/app/metadata', getAppMetadata);

//health check
app.get('/health-check', (req, res, next) => {
  const healthStatus = {
    uptime: process.uptime(),
    msg: 'OK',
    timestamp: Date.now()
  }

  try {
    res.send(healthStatus);
  } catch (error) {
    healthStatus.msg = error;
    res.status(503).send();
  }

});

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Welcome to Remark Attendance API' });
});

app.use(notFound);
app.use(errHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));