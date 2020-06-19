const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const ProductCategory = require('../models/ProductCategory')
const ReviewsAndRatings = require('../models/ReviewsAndRatings')

// Getting all
router.get('/all', async (req,res) => {
    try{
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getProduct , (req,res) => {
    res.json(res.product)
})

// Getting Selected Category
router.get('/findProductType/:mainCategory', async (req,res) => {

    let productTypeList = [];
    try {
        productTypeList = await ProductCategory.find({
            "mainCategory" : req.params.mainCategory
        });
        if ( productTypeList == null ) {
            return res.status(404).json({ message: 'Cannot find Product' })
        }
        else {
            res.json(productTypeList);
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

});


// Getting Last Added Product
router.get('/latest', async (req,res) => {
    try{
        const latestProduct = await Product.findOne()
        res.json(latestProduct)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting Selected Product
router.get('/findByMainCategory/:mainCategory', async (req,res) => {

    let productList = [];
    try {
        productList = await Product.find({
            "mainCategory" : req.params.mainCategory
        });
        if ( productList == null ) {
            return res.status(404).json({ message: 'Cannot find Product' })
        }
        else {
            res.json(productList);
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

});


// Getting Selected SubCategory
router.get('/findBySubCategory/:productType', async (req,res) => {

    let productDetailsList = [];
    try {
        productDetailsList = await Product.find({
            "productType" : req.params.productType
        });
        if ( productDetailsList == null ) {
            return res.status(404).json({ message: 'Cannot find Product' })
        }
        else {
            res.json(productDetailsList);
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

});

//Getting Review for selected item
router.get('/getItemReview/:itemID', async (req,res) => {

    let reviewList = [];
    try {
        reviewList = await ReviewsAndRatings.find({
            "itemID" : req.params.itemID
        });
        if ( reviewList == null ) {
            return res.status(404).json({ message: 'Cannot find Product' })
        }
        else {
            res.json(reviewList);
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

});

//Creating Review for selected item
router.post('/addItemReview', async (req,res) => {
    const review = new ReviewsAndRatings({
        itemID: req.body.itemID,
        clientName: req.body.clientName,
        review: req.body.review,
        rating: req.body.rating,
    })

    try{
        const newReview = await review.save()
        res.status(201).json(newReview)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Creating One
router.post('/addproduct', async (req,res) => {
    const product = new Product({
        productName: req.body.productName,
        brand: req.body.brand,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        discountPrice: req.body.discountPrice,
        mainCategory: req.body.mainCategory,
        productType: req.body.productType,
        color: req.body.color,
    })

    try{
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getProduct , async (req,res) => {
    if (req.body.productName != null) {
        res.product.productName = req.body.productName
    }
    if (req.body.brand != null) {
        res.product.brand = req.body.brand
    }
    if (req.body.description != null) {
        res.product.description = req.body.description
    }
    if (req.body.price != null) {
        res.product.price = req.body.price
    }
    if (req.body.discount != null) {
        res.product.discount = req.body.discount
    }
    if (req.body.mainCategory != null) {
        res.product.mainCategory = req.body.mainCategory
    }
    if (req.body.productType != null) {
        res.product.productType = req.body.productType
    }
    if (req.body.color != null) {
        res.product.color = req.body.color
    }
    try {
        const updatedProduct = await res.product.save()
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update One Using PUT
router.put('/:id', function(req,res,next){
    Product.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Product.findOne({_id:req.params.id}).then(function(Product){
            res.send(Product);
        })
    });
});

// Deleting One
router.delete('/:id', getProduct , async (req,res) => {
    try{
        await res.product.remove()
        res.status(200).json({message: 'Deleted Product'})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

async function getProduct (req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id)
        if ( product == null ) {
            return res.status(404).json({ message: 'Cannot find Product' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

    res.product = product
    next()
}


module.exports = router