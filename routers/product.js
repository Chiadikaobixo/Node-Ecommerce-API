const express = require('express')
const router = new express.Router()
const Product = require('../models/Product')
const { verifyTokenAndAdmin } = require('../src/middleware/verifyToken')

router.post('/products', verifyTokenAndAdmin, async(req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(200).send(savedProduct)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/products/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).send(updatedProduct)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/products/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).send('Product has been deleted')
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.status(200).send(product)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/products', async (req, res) => {
    const queryNew = req.query.new
    const queryCategory = req.query.category
    try {
        let products
        if(queryNew){
            products = await Product.find().sort({ timestamps: -1}).limit(2)
        }else if(queryCategory){
            products = await Product.find({
                categories: {
                    $in: [queryCategory]
                }
            })
        }else{
            products = await Product.find()
        }

        res.status(200).send(products)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports= router