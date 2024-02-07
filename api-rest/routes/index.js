const express = require('express');
const router = express.Router();

const authRoute = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const isAuth = require('../middleware/isAuthentificated');

router.use('/', authRoute);
router.use('/api/projects', isAuth, projectRoutes);

module.exports = router;
