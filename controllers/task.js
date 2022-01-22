const Task = require('../models/Task')
const asyncWrapper = require('../middleware/aysnc')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find()
    return res.status(200).json({
        success: true,
        data: tasks
    })
})

const createTask = async (req, res) => {
    try {
        const taskData = req.body
        const task = await Task.create(taskData)
        res.status(201).json({
            success: true,
            data: task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        }) 
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        console.log(taskID);
        const task = await Task.findById(taskID)
        // return res.send('tes')
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        }) 
    }
}

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