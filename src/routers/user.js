const express = require('express')
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../middleware/verifyToken')
const router = new express.Router()
const userControllers = require('../controllers/userControllers')


router.patch('/users/:id', verifyTokenAndAuthorization, userControllers.updatedUser)

router.delete('/users/:id', verifyTokenAndAuthorization, userControllers.deleteUser)

router.get('/users/:id', verifyTokenAndAdmin, userControllers.getUser)

router.get('/users', verifyTokenAndAdmin, userControllers.getAllUsers)

router.get('/stats', verifyTokenAndAdmin, userControllers.getUsersStat)

module.exports = router