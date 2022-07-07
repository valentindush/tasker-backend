const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    owner: {
        type: string,
        required: true
    },
    type:{
        type: string,
        required: true
    },
    description: {
        type: string,
        required: true
    },
    completed: {
        type: boolean,
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