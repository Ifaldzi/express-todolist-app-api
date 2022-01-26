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
    },
    dueDate: {
        type: Date
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

TaskScheme.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        return ret
    }
})

module.exports = mongoose.model('Task', TaskScheme)