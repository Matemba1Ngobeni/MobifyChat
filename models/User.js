const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    
    name : {
        type: String,
        required: true,
        unique: false
    },
    surname : {
        type: String,
        required: true,
        unique: false
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema)
