const express = require('express');
const router = express.Router();

const { protect, authorize, optionalAuth } = require('../middleware/authMiddleware');
const validator = require('../middleware/validator');
const { createTask, deleteTaskPermanently, editTask, getAllTasks } = require('../controllers/taskController');
const { createTaskValidationRules, deleteTaskValidationRules } = require('../dtos/taskDto');


router.route('/').post(protect, validator, createTask);
router.route('/:id/delete').delete(protect, validator, deleteTaskPermanently);
router.route('/:id').patch(protect, editTask);
router.route('/').get(protect, getAllTasks);

module.exports = router;
