const express = require('express')
require('dotenv').config()

const connectDB = require('./db/connection')
const taskRoute = require('./routes/task')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
const authRoute = require('./routes/auth')

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use('/api/tasks', taskRoute)
app.use('/api', authRoute)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`server is running on port ${port} ....`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()