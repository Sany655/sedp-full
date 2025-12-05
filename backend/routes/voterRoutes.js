const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator');
const { 
    createVoter, 
    getAllVoters, 
    getVoterById,
    updateVoter, 
    deleteVoter,
    getVoterStats
} = require('../controllers/voterController');
const { 
    createVoterValidationRules, 
    updateVoterValidationRules,
    deleteVoterValidationRules,
    getVoterValidationRules
} = require('../dtos/voterDto');

// Stats route (should come before /:id to avoid conflicts)
router.route('/stats').get(getVoterStats);

// Main CRUD routes
router.route('/')
    .post(createVoterValidationRules(), validator, createVoter)
    .get(getAllVoters);

router.route('/:id')
    .get(getVoterValidationRules(), validator, getVoterById)
    .patch(updateVoterValidationRules(), validator, updateVoter)
    .delete(deleteVoterValidationRules(), validator, deleteVoter);

module.exports = router;
