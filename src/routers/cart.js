const express = require('express')
const router = new express.Router()
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken')
const cartControllers = require('../controllers/cartControllers')


router.post('/carts', verifyToken, cartControllers.addToCart)

router.patch('/carts/:id', verifyTokenAndAuthorization, cartControllers.updateCart)

router.delete('/carts/:id', verifyTokenAndAuthorization, cartControllers.deleteCart)

router.get('/carts/:userId', verifyTokenAndAuthorization, cartControllers.getCart)

router.get('/carts', verifyTokenAndAdmin, cartControllers.getAllCarts)

module.exports= router