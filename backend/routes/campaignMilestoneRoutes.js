const express = require('express');
const router = express.Router();
const {
    createMilestone,
    getAllMilestones,
    updateMilestone,
    deleteMilestone
} = require('../controllers/campaignMilestoneController');
const { protect } = require('../middleware/authMiddleware');
const validator = require('../middleware/validator');
const { createMilestoneValidationRules, updateMilestoneValidationRules } = require('../dtos/campaignMilestoneDto');

router.use(protect);

router.route('/')
    .post(createMilestoneValidationRules(), validator, createMilestone)
    .get(getAllMilestones);

router.route('/:id')
    .patch(updateMilestoneValidationRules(), validator, updateMilestone)
    .delete(deleteMilestone);

module.exports = router;
