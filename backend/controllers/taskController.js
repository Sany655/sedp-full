const asyncHandler = require("../middleware/asyncHandler");
const db = require('../models/index');
const ErrorResponse = require("../utils/errorresponse");
const { Task } = db;


//@route    /api/Tasks
//@desc     POST: create a new Task
//@access   protected by admin
const createTask = asyncHandler(async (req, res, next) => {
    const { title, description, priority, duetime,type, status } = req.body;
    // defensive logging (one-liners)
  console.log({ title, description, priority, duetime, type, status });

  // Basic validation
  if (!title || !title.toString().trim()) {
    return next(new ErrorResponse('title is required', 400));
  }
  let priorityto = 0;

  if(priority=='High')
    priorityto = 3;
  else if(priority == "Medium"){
    priorityto = 2;
  }
  else{
    priorityto = 1;
  }
  // Normalize/convert values
  const payload = {
    title: title.toString().trim(),
    description: description ? description.toString() : null,
    priority: priorityto ? priorityto : 1,
    // try to parse duetime. If invalid, keep null to avoid Sequelize errors
    duetime: duetime ? new Date(duetime) : null,
    type: type ? type.toString() : null,
    status: status ? status.toString() : null
  };

   // create
  try{
    const task = await Task.create(payload);
  console.log('whats the issue', task);

    return res.status(201).json({
        success: true,
        msg: "Task created successfully!",
        data: task
    });
  }
  catch(ex){
    console.log('exception issue: ', ex);

  }
})


//@route    /api/Tasks?location_id
//@desc     GET:fetch all Tasks
//@access   public(optional protection given)
const getAllTasks = asyncHandler(async (req, res, next) => {

  const tasks = await Task.findAll();
  console.log('all tasks: ', tasks);
  
  res.status(200).json({
    success: true,
    message: 'Tasks fetched successfully!',
    count: tasks.length,
    data: tasks,
  });
});


//@route    /api/Tasks/:id
//@desc     PATCH: update a Task
//@access   protected by admin
const editTask = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { title, description, priority, duetime, status } = req.body;
    const task = await Task.findByPk(id);

    if (!task) {
        return next(new ErrorResponse('No Task Found to Update!', 404));
    }

    const updatedTask = {};
    let isChanged = false;

    if (title?.trim() && task.title !== title) {
        updatedTask.title = title.trim();
        isChanged = true;
    }

    if (description && task.description !== description) {
        updatedTask.description = description;
        isChanged = true;
    }
    if (priority && task.priority !== priority) {
        updatedTask.priority = priority;
        isChanged = true;
    }
    if (duetime && task.duetime !== duetime) {
        updatedTask.duetime = duetime;
        isChanged = true;
    }
    if (status !== undefined && task.status !== status) {
        updatedTask.status = status;
        isChanged = true;
    }


    if (!isChanged) {
        return res.status(200).json({
            success: true,
            msg: "Nothing Updated!",
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                duetime: task.duetime,
                status: task.status
            }
        });
    }

    await task.update(updatedTask);

    return res.status(200).json({
        success: true,
        msg: "Task updated successfully!",
        data: {
            id: task.id,
            title: updatedTask.title || task.title,
            description: updatedTask.description || task.description,
            priority: updatedTask.priority || task.priority,
            duetime: updatedTask.duetime || task.duetime,
            status: updatedTask.status || task.status
        }
    });
})


//@route    /api/Task/:id/delete
//@desc     DELETE: delete a Task Permanently
//@access   protected by admin
const deleteTaskPermanently = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findByPk(id);

    if (!task) {
        return next(new ErrorResponse('No Task Found to Delete!', 404));
    }

    await task.destroy();

    return res.status(200).json({
        success: true,
        msg: `${task.title} task deleted successfully!`,
    });
})


module.exports = {
   createTask,
   getAllTasks,
   editTask,
   deleteTaskPermanently
}