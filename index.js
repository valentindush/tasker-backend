require('dotenv').config()
const express = require('express')
const e = require('express')
const { usersRoute } = require('./routes/user')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB')
})

app.use('/api/auth',usersRoute)

app.listen(4000, () => console.log('listening on port 4000'))
