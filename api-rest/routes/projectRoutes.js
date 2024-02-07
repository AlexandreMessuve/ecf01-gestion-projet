const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAllProject);
router.get('/:id', projectController.getProjectById);
router.post('/add', projectController.createProject);
router.put('/update/:id', projectController.updateProject);
router.delete('/delete/:id', projectController.deleteProject);

module.exports = router;