const mongoose = require('mongoose')

const TaskScheme = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    detail: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskScheme)