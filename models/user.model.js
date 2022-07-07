const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true,
    },
    names: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
})

module.exports.userSchema = mongoose.model('user', userSchema);