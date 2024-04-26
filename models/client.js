const mongoose = require('mongoose');
const ClientSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    
    date: {
        type: Date,
        required: true,
       // immutable: true
        
    },
    ref: {
        type: String,
        required: true,
        immutable: true,
        unique: true
        
    },
    cname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    identity: {
        type: String,
        required: true,
        unique: true
    },

    telephone: {
        type: String,
        required: true
    },
    
    kin : {
        type: String,
        required: true
    },
    attorney : {
        type: String,
        required: true
    },
    referer : {
        type: String,
        required: true
    },
    nmatter : {
        type: String,
        required: true
        
    },
    fee : {
        type: String,
        required: true
        
    },
    dcapture : {
        type: String,
        required: true
        
    },
    partiesn : {
        type: String,
        required: true
        
    },
    kincontact : {
        type: String,
        required: false
        
    },
    status : {
        type: String,
        default: "pending"
        
    },
    filetype : {
        type: String,
        required:true
        
    },
    fcolor : {
        type: String,
        required:true
        
    },
     createdOn : {
        type: Date,
        required:true
        
    },
    
});

module.exports = mongoose.model('client', ClientSchema)