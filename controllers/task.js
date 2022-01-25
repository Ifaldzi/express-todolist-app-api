const Task = require('../models/Task')
const asyncWrapper = require('../middleware/aysnc')
const { createCustomError } = require('../errors/CustomError')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find()
    return res.status(200).json({
        success: true,
        data: tasks
    })
})

const createTask = asyncWrapper(async (req, res) => {
    const taskData = req.body
    const task = await Task.create(taskData)
    res.status(201).json({
        success: true,
        data: task
    })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findById(taskID)
    
    if (!task) {
        console.log('not exist');
        return next(createCustomError("Task with given id doesn't exist", 404))
    }

    return res.status(200).json({
        success: true,
        data: task
    })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    console.log(req.body, taskID);
    const task = await Task.findByIdAndUpdate(taskID, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) {
        return res.status(404).json({
            success: false,
            error: "Task with given id doesn't exist"
        })
    }

    return res.status(200).json({
        success: true,
        data: task
    })
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findByIdAndDelete(taskID)

    if (!task) {
        return res.status(404).json({
            success: false,
            error: "Task with given id doesn't exist"
        })
    }

    return res.status(200).json({
        success: true,
        data: null
    })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}