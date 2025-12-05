const express = require('express');
const router = express.Router();

const { protect, authorize, optionalAuth } = require('../middleware/authMiddleware');
const validator = require('../middleware/validator');
const { createDesignationValidationRules, deleteDesignationValidationRules } = require('../dtos/designationDto');
const { createDesignation, deleteDesignationPermanently, editDesignation, getDesignations, assignDesignationBulk } = require('../controllers/designationController');

router.route('/').post(protect, authorize('admin', 'super-admin'), createDesignationValidationRules(), validator, createDesignation);
router.route('/:id/delete').delete(protect, authorize('admin', 'super-admin'), deleteDesignationValidationRules(), validator, deleteDesignationPermanently);
router.route('/:id').patch(protect, authorize('admin', 'super-admin'), editDesignation);
router.route('/assign').put(protect, authorize('admin', 'super-admin'), assignDesignationBulk);
router.route('/').get(protect, getDesignations);

module.exports = router;
