const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')


// Getting all
router.get('/', async (req,res) => {
    try{
        const carts = await Cart.find()
        res.json(carts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getCart , (req,res) => {
    res.json(res.cart)
})


// Creating One
router.post('/', async (req,res) => {
    const cart = new Cart({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        address: req.body.address,
        address2: req.body.address2,
        zip: req.body.zip,
        state:req.body.state,
        // credit: req.body.credit,
        // debit: req.body.debit,
        // paypal: req.body.paypal,
        cc_name: req.body.cc_name,
        cc_number: req.body.cc_number,
        cc_cvv: req.body.cc_cvv,
        // cc_expiration: req.body.cc_expiration,
        // productName: req.body.productName,
        // totalValue: req.body.totalValue,

    })

    try{
        const newCart = await cart.save()
        res.status(201).json(newCart)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getCart , async (req,res) => {
    if (req.body.firstName != null) {
        res.cart.firstName = req.body.firstName
    }
    if (req.body.lastName != null) {
        res.cart.lastName = req.body.lastName
    }
    if (req.body.username != null) {
        res.cart.username = req.body.username
    }
    if (req.body.address != null) {
        res.cart.address = req.body.address
    }
    if (req.body.address2 != null) {
        res.cart.address2 = req.body.address2
    }
    if (req.body.zip != null) {
        res.cart.zip = req.body.zip
    }
    if (req.body.state != null) {
        res.cart.state = req.body.state
    }
    // if (req.body.credit != null) {
    //     res.cart.credit = req.body.credit
    // }
    // if (req.body.debit != null) {
    //     res.cart.debit = req.body.debit
    // }
    // if (req.body.paypal != null) {
    //     res.cart.paypal = req.body.paypal
    // }
    // if (req.body.cc_name != null) {
    //     res.cart.cc_name = req.body.cc_name
    // }
    // if (req.body.cc_number != null) {
    //     res.cart.cc_number = req.body.cc_number
    // }
    // if (req.body.cc_cvv != null) {
    //     res.cart.cc_cvv = req.body.cc_cvv
    // }
    // if (req.body.cc_expiration != null) {
    //     res.cart.cc_expiration = req.body.cc_expiration
    // }
    // if (req.body.productName != null) {
    //     res.cart.productName = req.body.productName
    // }
    // if (req.body.totalValue != null) {
    //     res.cart.totalValue = req.body.totalValue
    // }
    try {
        const updatedCart = await res.cart.save()
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getCart , async (req,res) => {
    try{
        await res.cart.remove()
        res.status(200).json({message: 'Deleted Cart'})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

async function getCart (req, res, next) {
    let cart
    try {
        cart = await Cart.findById(req.params.id)
        if ( cart == null ) {
            return res.status(404).json({ message: 'Cannot find Cart' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

    res.cart = cart
    next()
}


module.exports = router
