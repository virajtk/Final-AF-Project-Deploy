const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    address: {
        type: String
    },
    address2: {
        type: String
    },
    zip: {
        type: String
    },
    state: {
        type: String
    },
    productName:{
        type: String
    },
    credit: {
        type: Boolean
    },
    debit: {
        type: Boolean
    },
    paypal: {
        type: Boolean
    },
    cc_name: {
        type: String
    },
    cc_number: {
        type: Number
    },
    cc_cvv: {
        type: String
    },
    cc_expiration: {
        type: Date
    },
    // cartItems: {
    //     type: array
    // },
    totalValue: {
        type: Number
    },


});

module.exports = mongoose.model('Cart', cartSchema);
