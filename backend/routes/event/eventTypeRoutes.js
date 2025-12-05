const express = require('express');
const router = express.Router();

let title = 'Event Type';

const { protect, authorize } = require('../../middleware/authMiddleware');
const validator = require('../../middleware/validator');

const {
    createEventType,
    getEventTypes,
    getEventType,
    updateEventType,
    deleteEventType
} = require('../../controllers/event/eventTypeController');

const {
    createEventTypeValidationRules,
    updateEventTypeValidationRules,
    deleteEventTypeValidationRules
} = require('../../dtos/event/eventTypeDto');


// CREATE
router
    .route('/')
    .post(
        protect,
        authorize('admin', 'super-admin'),
        createEventTypeValidationRules(title),
        validator,
        createEventType
    );

// READ ALL
router
    .route('/')
    .get(protect, getEventTypes);

// READ SINGLE
router
    .route('/:id')
    .get(
        protect,
        getEventType
    );

// UPDATE
router
    .route('/:id')
    .patch(
        protect,
        authorize('admin', 'super-admin'),
        updateEventTypeValidationRules(title),
        validator,
        updateEventType
    );

// DELETE
router
    .route('/:id/delete')
    .delete(
        protect,
        authorize('admin', 'super-admin'),
        deleteEventTypeValidationRules(title),
        validator,
        deleteEventType
    );

module.exports = router;
