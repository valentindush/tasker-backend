require('dotenv').config()
const express = require('express')
const e = require('express')
const { usersRoute } = require('./routes/user')
const mongoose = require('mongoose')
const { tasksRouter } = require('./routes/task')
const cors = require('cors')
const bodyParser  = require('body-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth',usersRoute)
app.use('/api/task',tasksRouter)



mongoose.connect(process.env.DB_CONNECTION)
.then((e)=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log("error connecting to db")
})
app.listen(4000, () => console.log('listening on port 4000'))

