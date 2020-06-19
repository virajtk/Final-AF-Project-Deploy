const express = require('express')
const router = express.Router()
const AdminUser = require('../models/AdminUser')

// Getting all
router.get('/', async (req,res) => {
    try{
        const adminUsers = await AdminUser.find()
        res.json(adminUsers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getAdminUser , (req,res) => {
    res.json(res.adminUser)
})

// Creating One
router.post('/', async (req,res) => {
    const adminUser = new AdminUser({
        fullName: req.body.fullName,
        userName: req.body.userName,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        contactNo: req.body.contactNo
    })

    try{
        const newAdminUser = await adminUser.save()
        res.status(201).json(newAdminUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Updating One
router.patch('/:id', getAdminUser , async (req,res) => {
    if (req.body.fullName != null) {
        res.adminUser.fullName = req.body.fullName
    }
    if (req.body.userName != null) {
        res.adminUser.userName = req.body.userName
    }
    if (req.body.password != null) {
        res.adminUser.password = req.body.password
    }
    if (req.body.role != null) {
        res.adminUser.role = req.body.role
    }
    if (req.body.email != null) {
        res.adminUser.email = req.body.email
    }
    if (req.body.contactNo != null) {
        res.adminUser.contactNo = req.body.contactNo
    }
    try {
        const updatedAdminUser = await res.adminUser.save()
        res.status(200).json(updatedAdminUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update One Using PUT
router.put('/:id', function(req,res,next){
    AdminUser.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        AdminUser.findOne({_id:req.params.id}).then(function(adminUser){
            res.send(adminUser);
        })
    });  
});

// Deleting One
router.delete('/:id', getAdminUser , async (req,res) => {
    try{
        await res.adminUser.remove()
        res.status(200).json({message: 'Deleted Admin User'})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

async function getAdminUser (req, res, next) {
    let adminUser
    try {
        adminUser = await AdminUser.findById(req.params.id)
        if ( adminUser == null ) {
            return res.status(404).json({ message: 'Cannot find Admin User' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

    res.adminUser = adminUser
    next()
}


module.exports = router