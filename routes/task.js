const express = require('express')
const router = express.Router()

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/task')

const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.get('/', getAllTasks)
router.post('/', createTask)
router.get('/:id', getTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router