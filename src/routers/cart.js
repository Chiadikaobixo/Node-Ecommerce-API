const express = require('express')
const router = new express.Router()
const Cart = require('../models/Cart')
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken')

router.post('/carts', verifyToken, async(req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).send(savedCart)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/carts/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).send(updatedCart)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/carts/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).send('Cart has been deleted')
    } catch (e) {
        res.status(500).send()
    }
})

router.get('carts/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId})

        res.status(200).send(cart)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/carts', verifyTokenAndAdmin, async(req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).send(carts)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports= router