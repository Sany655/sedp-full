const asyncHandler = require("../../middleware/asyncHandler");
const db = require('../../models/index');
const ErrorResponse = require("../../utils/errorresponse");
const { Event } = db;

const title = 'Event';


// =============================
// CREATE EVENT
// =============================
const createEvent = asyncHandler(async (req, res, next) => {

    // Check if name already exists
    const isExist = await Event.findOne({ where: { name: req.body.name } });
    if (isExist) {
        return next(new ErrorResponse(`${title} already exists`, 400));
    }

    const newItem = await Event.create({ ...req.body });

    return res.status(201).json({
        success: true,
        msg: `${title} created successfully!`,
        data: newItem
    });
});


// =============================
// GET ALL EVENTS
// =============================
const getEvents = asyncHandler(async (req, res, next) => {
    const events = await Event.findAll();

    return res.status(200).json({
        success: true,
        msg: `${title}s fetched successfully!`,
        data: events
    });
});


// =============================
// GET SINGLE EVENT BY ID
// =============================
const getEventById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const event = await Event.findByPk(id);

    if (!event) {
        return next(new ErrorResponse(`${title} not found!`, 404));
    }

    return res.status(200).json({
        success: true,
        msg: `${title} fetched successfully!`,
        data: event
    });
});


// =============================
// UPDATE EVENT
// =============================
const updateEvent = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const event = await Event.findByPk(id);

    if (!event) {
        return next(new ErrorResponse(`${title} not found to update!`, 404));
    }

    await event.update({ ...req.body });

    return res.status(200).json({
        success: true,
        msg: `${title} updated successfully!`,
        data: event
    });
});


// =============================
// DELETE EVENT
// =============================
const deleteEvent = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const event = await Event.findByPk(id);

    if (!event) {
        return next(new ErrorResponse(`${title} not found to delete!`, 404));
    }

    await event.destroy();

    return res.status(200).json({
        success: true,
        msg: `${title} deleted successfully!`
    });
});


// =============================
module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
