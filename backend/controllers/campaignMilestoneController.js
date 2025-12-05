const asyncHandler = require("../middleware/asyncHandler");
const db = require('../models/index');
const ErrorResponse = require("../utils/errorresponse");
const { CampaignMilestone, CampaignType, CampaignMilestoneType } = db;

//@route    POST /api/campaign-milestones
//@desc     Create a new Milestone
//@access   Private
const createMilestone = asyncHandler(async (req, res, next) => {
    const { title, description, startDate, endDate, typeList } = req.body;
    const user_id = req.user.id;

    const milestone = await CampaignMilestone.create({
        title,
        description,
        startDate,
        endDate,
        user_id
    });

    if (typeList && Array.isArray(typeList)) {
        for (const item of typeList) {
            if (item.type) {
                const [type, created] = await CampaignType.findOrCreate({
                    where: { name: item.type },
                    defaults: { name: item.type }
                });

                await CampaignMilestoneType.create({
                    campaign_milestone_id: milestone.id,
                    campaign_type_id: type.id,
                    count: item.count || 1,
                    area: item.area
                });
            }
        }
    }

    const fullMilestone = await CampaignMilestone.findByPk(milestone.id, {
        include: [
            {
                model: CampaignMilestoneType,
                as: 'milestoneTypes',
                include: [
                    {
                        model: CampaignType,
                        as: 'type'
                    }
                ]
            }
        ]
    });

    return res.status(201).json({
        success: true,
        msg: "Milestone created successfully!",
        data: fullMilestone
    });
});

//@route    GET /api/campaign-milestones
//@desc     Get all Milestones
//@access   Private
const getAllMilestones = asyncHandler(async (req, res, next) => {
    const milestones = await CampaignMilestone.findAll({
        order: [['startDate', 'ASC']],
        include: [
            {
                model: CampaignMilestoneType,
                as: 'milestoneTypes',
                include: [
                    {
                        model: CampaignType,
                        as: 'type'
                    }
                ]
            }
        ]
    });

    res.status(200).json({
        success: true,
        count: milestones.length,
        data: milestones,
    });
});

//@route    PATCH /api/campaign-milestones/:id
//@desc     Update a Milestone
//@access   Private
const updateMilestone = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { title, description, startDate, endDate, user_id, typeList } = req.body;

    const milestone = await CampaignMilestone.findByPk(id);

    if (!milestone) {
        return next(new ErrorResponse('Milestone not found', 404));
    }

    await milestone.update({
        title,
        description,
        startDate,
        endDate,
        user_id
    });

    if (typeList && Array.isArray(typeList)) {
        // Remove existing types
        await CampaignMilestoneType.destroy({
            where: { campaign_milestone_id: id }
        });

        // Add new types
        for (const item of typeList) {
            if (item.type) {
                const [type, created] = await CampaignType.findOrCreate({
                    where: { name: item.type },
                    defaults: { name: item.type }
                });

                await CampaignMilestoneType.create({
                    campaign_milestone_id: milestone.id,
                    campaign_type_id: type.id,
                    count: item.count || 1,
                    area: item.area
                });
            }
        }
    }

    const fullMilestone = await CampaignMilestone.findByPk(milestone.id, {
        include: [
            {
                model: CampaignMilestoneType,
                as: 'milestoneTypes',
                include: [
                    {
                        model: CampaignType,
                        as: 'type'
                    }
                ]
            }
        ]
    });

    return res.status(200).json({
        success: true,
        msg: "Milestone updated successfully!",
        data: fullMilestone
    });
});

//@route    DELETE /api/campaign-milestones/:id
//@desc     Delete a Milestone
//@access   Private
const deleteMilestone = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const milestone = await CampaignMilestone.findByPk(id);

    if (!milestone) {
        return next(new ErrorResponse('Milestone not found', 404));
    }

    await milestone.destroy();

    return res.status(200).json({
        success: true,
        msg: "Milestone deleted successfully!",
    });
});

module.exports = {
    createMilestone,
    getAllMilestones,
    updateMilestone,
    deleteMilestone
};
