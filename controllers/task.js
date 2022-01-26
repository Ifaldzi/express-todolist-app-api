const Task = require('../models/Task')
const asyncWrapper = require('../middleware/aysnc')
const { createCustomError } = require('../errors/CustomError')

const getAllTasks = asyncWrapper(async (req, res) => {
    let tasks = await Task.find( { user: req.user.id })
    tasks = tasks.sort((a, b) => {
        if (a.dueDate && b.dueDate ) {
            return a.dueDate - b.dueDate
        } 
        else if (a.dueDate) return -1
        else if (b.dueDate) return 1

        return a.cretedAt - b.createdAt
    })
    return res.status(200).json({
        success: true,
        data: tasks
    })
})

const createTask = asyncWrapper(async (req, res) => {
    const taskData = req.body
    const userID = req.user.id
    const task = await Task.create({ ...taskData, user: userID })
    res.status(201).json({
        success: true,
        data: task
    })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findById(taskID)
        .and({ user: req.user.id })
        .populate('user', 'username')
    
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
    const task = await Task.findByIdAndUpdate(taskID, req.body, {
        new: true,
        runValidators: true
    }).and( { user: req.user.id } ).populate('user', 'username')

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
    const task = await Task.findByIdAndDelete(taskID).and({user: req.user.id})

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