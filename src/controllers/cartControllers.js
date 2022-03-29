const cartServices = require('../services/cartServices')

class CartControllers {
    async addToCart(req, res) {
        const savedCart = await cartServices.addToCart(req.body)
        res.status(200).send(savedCart)
    }

    async updateCart(req, res) {
        const updatedCart = await cartServices.updateCart(req.params.id, req.body)
        res.status(200).send(updatedCart)
    }

    async deleteCart(req, res){
        await cartServices.updateCart(req.params.id)
        res.status(200).send('Cart has been deleted')
    }

    async getCart(req, res){
        const cart = await cartServices.getCart(req.params.userId)
        res.status(200).send(cart)
    }

    async getAllCarts(req, res){
        const allCarts = await cartServices.getAllCarts()
        res.status(200).send(allCarts)
    }
}

module.exports = new CartControllers()