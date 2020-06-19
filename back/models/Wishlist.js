const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    productName: {
        type: String
    },
    productPrize: {
        type: Number
    }

})

module.exports = mongoose.model('Wishlist', wishlistSchema)
