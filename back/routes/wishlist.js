const express = require('express')
const router = express.Router()
const Wishlist = require('../models/Wishlist')


// Getting all
router.get('/', async (req,res) => {
    try{
        const wishlists = await Wishlist.find()
        res.json(wishlists)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getWishlist , (req,res) => {
    res.json(res.wishlist)
})

// Getting wish list with spec user
router.get('/find/:id' , async (req,res) => {
    let wishList = [];
    try {
        wishList = await Wishlist.find({
            "userId" : req.params.id
        });
        if ( wishList == null ) {
            return res.status(404).json({ message: 'Cannot find wishlist' })
        }
        else {
            res.json(wishList);
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }
})

// Creating One
router.post('/', async (req,res) => {
    const wishlist = new Wishlist({
        productId: req.body.productId,
        userId: req.body.userId,
        productName:req.body.productName,
        productPrize:req.body.productPrize
    })

    try{
        const newWishlist = await wishlist.save()
        res.status(201).json(newWishlist)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update One Using PUT
router.put('/:id', function(req,res,next){
    Wishlist.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Wishlist.findOne({_id:req.params.id}).then(function(wishlist){
            res.send(wishlist);
        })
    });  
});

// Deleting One
router.delete('/:id', getWishlist , async (req,res) => {
    try{
        await res.wishlist.remove()
        res.status(200).json({message: 'Deleted Wishlist'})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

async function getWishlist (req, res, next) {
    let wishlist
    try {
        wishlist = await Wishlist.findById(req.params.id)
        if ( wishlist == null ) {
            return res.status(404).json({ message: 'Cannot find Wishlist' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

    res.wishlist = wishlist
    next()
}


module.exports = router
