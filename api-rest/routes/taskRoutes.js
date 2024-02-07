const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/project/:id', taskController.getAllTaskByProjectId);
router.get('/:id', taskController.getTaskById);
router.post('/add', taskController.createTask);
router.put('/update/:id', taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTask);

module.exports = router;