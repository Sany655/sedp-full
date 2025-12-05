const express = require('express');
const router = express.Router();

let title = 'Event Target Group';

const { protect, authorize } = require('../../middleware/authMiddleware');
const validator = require('../../middleware/validator');

const {
    getEventTargetGroups,
    deleteEventTargetGroup,
    updateEventTargetGroup,
    createEventTargetGroup
} = require('../../controllers/event/eventTargetGroupController');


const { 
    createEventTargetGroupValidationRules,
    updateEventTargetGroupValidationRules,
    deleteEventTargetGroupValidationRules
} = require('../../dtos/event/eventTargetGroupRoutes');
const { getEventTypes } = require('../../controllers/event/eventTypeController');


// CREATE
router
    .route('/')
    .post(
        protect,
        authorize('admin', 'super-admin'),
        createEventTargetGroupValidationRules(title),
        validator,
        createEventTargetGroup
    );

// READ ALL
router
    .route('/')
    .get(protect, getEventTargetGroups);

// READ SINGLE
router
    .route('/:id')
    .get(
        protect,
        getEventTypes
    );

// UPDATE
router
    .route('/:id')
    .patch(
        protect,
        authorize('admin', 'super-admin'),
        updateEventTargetGroupValidationRules(title),
        validator,
        updateEventTargetGroup
    );

// DELETE
router
    .route('/:id/delete')
    .delete(
        protect,
        authorize('admin', 'super-admin'),
        deleteEventTargetGroupValidationRules(title),
        validator,
        deleteEventTargetGroup
    );

module.exports = router;
