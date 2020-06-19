const mongoose = require('mongoose')

const adminUserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'store manager'
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: String
    },
    registedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('AdminUser', adminUserSchema)