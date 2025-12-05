const asyncHandler = require("../middleware/asyncHandler");
const db = require('../models/index');
const ErrorResponse = require("../utils/errorresponse");
const { Voter } = db;
const { Op } = require('sequelize');

//@route    POST /api/voters
//@desc     Create a new voter
//@access   Protected
const createVoter = asyncHandler(async (req, res, next) => {
    const { 
        name, 
        age, 
        gender, 
        nid, 
        phone, 
        profession,
        division, 
        district, 
        upazilla, 
        union,
        ward,
        voter_center 
    } = req.body;

    // Check if voter with same NID already exists
    const existingVoter = await Voter.findOne({ where: { nid } });
    if (existingVoter) {
        return next(new ErrorResponse('A voter with this NID already exists!', 400));
    }

    const voter = await Voter.create({
        name,
        age,
        gender,
        nid,
        phone: phone || null,
        profession: profession || null,
        division,
        district,
        upazilla,
        union,
        ward,
        voter_center
    });

    return res.status(201).json({
        success: true,
        msg: "Voter created successfully!",
        data: voter
    });
});

//@route    GET /api/voters
//@desc     Get all voters with optional filters
//@access   Protected
const getAllVoters = asyncHandler(async (req, res, next) => {
    const { 
        division_id, 
        district_id, 
        upazilla_id, 
        union_id,
        search,
        page = 1,
        limit = 50
    } = req.query;

    // Build where clause
    const whereClause = {};

    // Filter by location
    if (division_id) {
        whereClause['division.id'] = division_id;
    }
    if (district_id) {
        whereClause['district.id'] = district_id;
    }
    if (upazilla_id) {
        whereClause['upazilla.id'] = upazilla_id;
    }
    if (union_id) {
        whereClause['union.id'] = union_id;
    }

    // Search functionality
    if (search) {
        whereClause[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { nid: { [Op.like]: `%${search}%` } },
            { phone: { [Op.like]: `%${search}%` } }
        ];
    }

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows: voters } = await Voter.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: offset,
        order: [['created_at', 'DESC']]
    });

    res.status(200).json({
        success: true,
        message: 'Voters fetched successfully!',
        count: voters.length,
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / parseInt(limit)),
        data: voters
    });
});

//@route    GET /api/voters/:id
//@desc     Get a single voter by ID
//@access   Protected
const getVoterById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const voter = await Voter.findByPk(id);

    if (!voter) {
        return next(new ErrorResponse('Voter not found!', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Voter fetched successfully!',
        data: voter
    });
});

//@route    PATCH /api/voters/:id
//@desc     Update a voter
//@access   Protected
const updateVoter = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, age, gender, phone, profession } = req.body;

    const voter = await Voter.findByPk(id);

    if (!voter) {
        return next(new ErrorResponse('Voter not found!', 404));
    }

    const updatedData = {};
    let isChanged = false;

    if (name?.trim() && voter.name !== name.trim()) {
        updatedData.name = name.trim();
        isChanged = true;
    }

    if (age && voter.age !== age) {
        updatedData.age = age;
        isChanged = true;
    }

    if (gender && voter.gender !== gender) {
        updatedData.gender = gender;
        isChanged = true;
    }

    if (phone !== undefined && voter.phone !== phone) {
        updatedData.phone = phone;
        isChanged = true;
    }

    if (profession !== undefined && voter.profession !== profession) {
        updatedData.profession = profession;
        isChanged = true;
    }

    if (!isChanged) {
        return res.status(200).json({
            success: true,
            msg: "No changes detected!",
            data: voter
        });
    }

    await voter.update(updatedData);

    return res.status(200).json({
        success: true,
        msg: "Voter updated successfully!",
        data: voter
    });
});

//@route    DELETE /api/voters/:id
//@desc     Delete a voter permanently
//@access   Protected
const deleteVoter = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const voter = await Voter.findByPk(id);

    if (!voter) {
        return next(new ErrorResponse('Voter not found!', 404));
    }

    await voter.destroy();

    return res.status(200).json({
        success: true,
        msg: `Voter ${voter.name} deleted successfully!`
    });
});

//@route    GET /api/voters/stats
//@desc     Get voter statistics
//@access   Protected
const getVoterStats = asyncHandler(async (req, res, next) => {
    const totalVoters = await Voter.count();

    const genderStats = await Voter.findAll({
        attributes: [
            'gender',
            [db.sequelize.fn('COUNT', db.sequelize.col('gender')), 'count']
        ],
        group: ['gender']
    });

    const ageGroups = await Voter.findAll({
        attributes: [
            [db.sequelize.literal(`CASE 
                WHEN age BETWEEN 18 AND 25 THEN '18-25'
                WHEN age BETWEEN 26 AND 35 THEN '26-35'
                WHEN age BETWEEN 36 AND 50 THEN '36-50'
                WHEN age > 50 THEN '50+'
                ELSE 'Unknown'
            END`), 'age_group'],
            [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
        ],
        group: ['age_group']
    });

    res.status(200).json({
        success: true,
        message: 'Voter statistics fetched successfully!',
        data: {
            total: totalVoters,
            byGender: genderStats,
            byAgeGroup: ageGroups
        }
    });
});

module.exports = {
    createVoter,
    getAllVoters,
    getVoterById,
    updateVoter,
    deleteVoter,
    getVoterStats
};
