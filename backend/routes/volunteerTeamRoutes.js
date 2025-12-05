const express = require('express');
const router = express.Router();

const { protect, authorize, optionalAuth } = require('../middleware/authMiddleware');
const validator = require('../middleware/validator');
const { deletePolicyPermanently, editPolicy } = require('../controllers/attendancePolicyController');
const { createTeam, assignTeamMember, getVolunteerTeams } = require('../controllers/volunteerTeamController');
const { createTeamValidationRules } = require('../dtos/teamDto');



router.route('/').post(protect, authorize('admin', 'super-admin'), createTeamValidationRules(), validator, createTeam);
router.route('/assign').post(protect, authorize('admin', 'super-admin'), assignTeamMember);
router.route('/:id/delete').delete(protect, authorize('admin', 'super-admin'),  deletePolicyPermanently);
router.route('/:id').patch(protect, authorize('admin', 'super-admin'), editPolicy);
router.route('/').get(protect, getVolunteerTeams);

module.exports = router;
