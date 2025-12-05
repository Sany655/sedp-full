const express = require('express');
const router = express.Router();
const { getAllCampaignTypes, createCampaignType } = require('../controllers/campaignTypeController');
const { protect } = require('../middleware/authMiddleware'); // Assuming auth middleware exists

router.route('/')
    .get(protect, getAllCampaignTypes)
    .post(protect, createCampaignType);

module.exports = router;
