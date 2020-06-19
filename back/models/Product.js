const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    discountPrice: {
        type: Number,
        default: 0
    },
    mainCategory: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
})

module.exports = mongoose.model('Product', productSchema)