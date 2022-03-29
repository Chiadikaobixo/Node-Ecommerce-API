const express = require('express')
const router = new express.Router()
const { verifyTokenAndAdmin } = require('../middleware/verifyToken')
const productControllers = require('../controllers/productControllers')


router.post('/products', verifyTokenAndAdmin, productControllers.postProduct)

router.patch('/products/:id', verifyTokenAndAdmin, productControllers.updatedProduct)

router.delete('/products/:id', verifyTokenAndAdmin, productControllers.deletedProduct)

router.get('/products/:id', productControllers.getProduct)

router.get('/products', productControllers.getAllProducts)

module.exports= router