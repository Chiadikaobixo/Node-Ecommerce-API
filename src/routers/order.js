const express = require('express')
const router = new express.Router()
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken')
const orderControllers = require('../controllers/orderControllers')


router.post('/orders', verifyToken, orderControllers.newOrder)

router.patch('/orders/:orderId', verifyTokenAndAdmin, orderControllers.updateOder)

router.delete('/orders/:orderId', verifyTokenAndAdmin, orderControllers.deleteOrder)

router.get('/orders/:userId', verifyTokenAndAuthorization, orderControllers.getOrder)

router.get('/orders', verifyTokenAndAdmin, orderControllers.getAllOrders)

router.get('/income', verifyTokenAndAdmin, orderControllers.incomeStats)

module.exports = router