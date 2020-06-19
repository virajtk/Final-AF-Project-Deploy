const express = require('express')
const router = express.Router()
const ProductCategory = require('../models/ProductCategory')

// Getting all
router.get('/', async (req,res) => {
    try{
        const productCategory = await ProductCategory.find()
        res.json(productCategory)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getProductCategory , (req,res) => {
    res.json(res.productCategory)
})

// Creating One
router.post('/', async (req,res) => {
    const productCategory = new ProductCategory({
        subCategory: req.body.subCategory,
        mainCategory: req.body.mainCategory,
        description: req.body.description
    })

    try{
        const newProductCategory = await productCategory.save()
        res.status(201).json(newProductCategory)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Updating One
router.patch('/:id', getProductCategory , async (req,res) => {
    if (req.body.subCategory != null) {
        res.productCategory.subCategory = req.body.subCategory
    }
    if (req.body.mainCategory != null) {
        res.productCategory.mainCategory = req.body.mainCategory
    }
    if (req.body.description != null) {
        res.productCategory.description = req.body.description
    }
    try {
        const updatedProductCategory = await res.productCategory.save()
        res.status(200).json(updatedProductCategory)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update One Using PUT
router.put('/:id', function(req,res,next){
    ProductCategory.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        ProductCategory.findOne({_id:req.params.id}).then(function(productCategory){
            res.send(productCategory);
        })
    });  
});


// Deleting One
router.delete('/:id', getProductCategory , async (req,res) => {
    try{
        await res.productCategory.remove()
        res.status(200).json({message: 'Deleted Product Category'})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

async function getProductCategory (req, res, next) {
    let productCategory
    try {
        productCategory = await ProductCategory.findById(req.params.id)
        if ( productCategory == null ) {
            return res.status(404).json({ message: 'Cannot find Product Category' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

    res.productCategory = productCategory
    next()
}


module.exports = router