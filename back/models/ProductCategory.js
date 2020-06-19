const mongoose = require('mongoose')

const productCategorySchema = new mongoose.Schema({
    subCategory: {
        type: String,
        required: true,
    },
    mainCategory: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
})

module.exports = mongoose.model('ProductCategory', productCategorySchema)