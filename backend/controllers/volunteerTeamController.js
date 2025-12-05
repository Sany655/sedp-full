const asyncHandler = require("../middleware/asyncHandler");
const db = require('../models/index');
const ErrorResponse = require("../utils/errorresponse");
const { User, VolunteerTeamMember, VolunteerTeam } = db;
const { Op } = require('sequelize');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const { model } = require("mongoose");
dayjs.extend(customParseFormat);
//@route    /api/vounteer-teams
//@desc     POST: create a new company
//@access   protected by admin
const createTeam = asyncHandler(async (req, res, next) => {
    const {
        team_name,
        leader_id,
        description,
        type,
        location,
        status
    } = req.body;

    // Check if policy already exists
    const isExist = await VolunteerTeam.findOne({ where: { name: team_name } });
    if (isExist) {
        return next(new ErrorResponse('Team already exists', 400));
    }

    // Create policy
    const newTeam = await VolunteerTeam.create({
        name: team_name,
        description,
        leader_id,
        type,
        location,
        status,
        createdBy:req.user
    });

    // Select fields to return
    const selectedData = {
        team_name: newTeam.name,
        description:newTeam.description,
        type:newTeam.type,
        status:newTeam.status,
        location:newTeam.location
    };

    // Send response
    return res.status(200).json({
        success: true,
        msg: "Team created successfully!",
        data: selectedData
    });
});


//@route    /api/vounteer-teams
//@desc     GET:fetch all vounteer_team
//@access   public(optional protection given)
const getVolunteerTeams = asyncHandler(async (req, res, next) => {
    const vounteer_team = await VolunteerTeam.findAll({
        include:[
            {
                model:VolunteerTeamMember,
                as:"members",
                include:{
                    model:User,
                    as:"user",
                    attributes:['id','name']
                }
            }
        ]
    });

    if (!vounteer_team) {
        return next(new ErrorResponse('No Team Found!', 404));
    }

    return res.status(200).json({
        success: true,
        msg: "Vounteer team fetched successfully!",
        data: vounteer_team
    });
})


//@route    /api/vounteer_team/:id
//@desc     PATCH: update a policy
//@access   protected by admin
// const editPolicy = asyncHandler(async (req, res, next) => {
//     const id = req.params.id;
//     const {
//         policy_name,
//         working_days,
//         off_days,
//         work_start_time,
//         work_end_time,
//         late_grace_period,
//         overtime_threshold
//     } = req.body;

//     const policy = await AttendencePolicy.findByPk(id);
//     if (!policy) {
//         return next(new ErrorResponse('No policy found to update!', 404));
//     }

//     const updatedPolicy = {};
//     let isChanged = false;

//     if (policy_name?.trim() && policy.name !== policy_name.trim()) {
//         updatedPolicy.name = policy_name.trim();
//         isChanged = true;
//     }

//     if (Array.isArray(working_days) && JSON.stringify(policy.working_days) !== JSON.stringify(working_days)) {
//         updatedPolicy.working_days = working_days;
//         isChanged = true;
//     }

//     if (Array.isArray(off_days) && JSON.stringify(policy.off_days) !== JSON.stringify(off_days)) {
//         updatedPolicy.off_days = off_days;
//         isChanged = true;
//     }

//     if (work_start_time && policy.work_start_time !== work_start_time) {
//         updatedPolicy.work_start_time = work_start_time;
//         isChanged = true;
//     }

//     if (work_end_time && policy.work_end_time !== work_end_time) {
//         updatedPolicy.work_end_time = work_end_time;
//         isChanged = true;
//     }

//     if (
//         typeof late_grace_period === 'number' &&
//         policy.late_grace_period !== late_grace_period
//     ) {
//         updatedPolicy.late_grace_period = late_grace_period;
//         isChanged = true;
//     }

//     if (
//         typeof overtime_threshold === 'number' &&
//         policy.overtime_threshold !== overtime_threshold
//     ) {
//         updatedPolicy.overtime_threshold = overtime_threshold;
//         isChanged = true;
//     }

//     if (!isChanged) {
//         return res.status(200).json({
//             success: true,
//             msg: "Nothing updated!",
//             data: {
//                 id: policy.id,
//                 policy_name: policy.policy_name
//             }
//         });
//     }

//     await policy.update(updatedPolicy);

//     return res.status(200).json({
//         success: true,
//         msg: "Policy updated successfully!",
//         data: {
//             id: policy.id,
//             policy_name: policy.name
//         }
//     });
// });



//@route    /api/vounteer_team/:id/delete
//@desc     DELETE: delete a policy Permanently
//@access   protected by admin
// const deletePolicyPermanently = asyncHandler(async (req, res, next) => {
//     const id = req.params.id;
//     const policy = await AttendencePolicy.findByPk(id);

//     if (!policy) {
//         return next(new ErrorResponse('No policy Found to Delete!', 404));
//     }

//     await policy.destroy();

//     return res.status(200).json({
//         success: true,
//         msg: `${policy.name} deleted successfully!`,
//     });
// })


//@route    /api/vounteer-teams/assign
//@desc     POST: assign a team to user
//@access   protected by admin
const assignTeamMember = asyncHandler(async (req, res, next) => {
    const { user_ids, volunteer_team_id} = req.body;

    if (!Array.isArray(user_ids) || user_ids.length === 0) {
        return next(new ErrorResponse('No users provided for assignment', 400));
    }

    // Get all existing vounteer_team for given users and policy ID
    const existingTeamMember = await VolunteerTeamMember.findAll({
        where: {
            volunteer_team_id,
            user_id: { [Op.in]: user_ids }
        },
        attributes: ['user_id']
    });

    const alreadyAssignedUserIds = existingTeamMember.map(p => p.user_id);

    // Filter out users who already have the policy assigned
    const filteredUserIds = user_ids.filter(id => !alreadyAssignedUserIds.includes(id));

    if (filteredUserIds.length === 0) {
        return next(new ErrorResponse('Team already assigned to all users!', 400));
    }

    // Prepare data for bulkCreate
    const teamData = filteredUserIds.map(user_id => ({
        user_id,
        volunteer_team_id,
    }));

    await VolunteerTeamMember.bulkCreate(teamData);

    return res.status(200).json({
        success: true,
        msg: `Team assigned successfully!`,
        newlyAssigned: filteredUserIds,
        alreadyAssigned: alreadyAssignedUserIds
    });
});



module.exports = {
    createTeam,
    getVolunteerTeams,
    // editPolicy,
    // deletePolicyPermanently,
    assignTeamMember
}