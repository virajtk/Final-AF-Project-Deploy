const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true
   
    },
    contactNo: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String,
        required: true
    },
    registeredDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)
