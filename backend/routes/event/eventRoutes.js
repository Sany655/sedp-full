const express = require('express');
const router = express.Router();

let title = 'Event';

const { protect, authorize, optionalAuth } = require('../../middleware/authMiddleware');
const validator = require('../../middleware/validator');
const { createEvent, getEvents, deleteEvent, updateEvent } = require('../../controllers/event/eventController');
const { createEventValidationRules } = require('../../dtos/event/eventDto');



router.route('/').post(protect, authorize('admin', 'super-admin'), createEventValidationRules(title), validator, createEvent);
// router.route('/assign').post(protect, authorize('admin', 'super-admin'), assignTeamMember);
router.route('/:id/delete').delete(protect, authorize('admin', 'super-admin'),  deleteEvent);
router.route('/:id').patch(protect, authorize('admin', 'super-admin'), updateEvent);
router.route('/').get(protect, getEvents);

module.exports = router;
