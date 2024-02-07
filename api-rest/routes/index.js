const express = require('express');
const router = express.Router();

const authRoute = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');
const isAuth = require('../middleware/isAuthentificated');

router.use('/', authRoute);
router.use('/api/projects', isAuth, projectRoutes);
router.use('/api/tasks', isAuth, taskRoutes);

module.exports = router;
