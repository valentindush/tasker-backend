const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    deadline: {
        type: Date,
        required: true
    }
    
})

module.exports.taskSchema = mongoose.model('tasks', taskSchema);