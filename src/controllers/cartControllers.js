const cartServices = require('../services/cartServices')
const response = require('../utils/response')

class CartControllers {
    async addToCart(req, res) {
        const savedCart = await cartServices.addToCart(req.body)
        res.status(201).send(response('added to cart',savedCart))
    }

    async updateCart(req, res) {
        const updatedCart = await cartServices.updateCart(req.params.cartId, req.body)
        res.status(200).send(response('cart updated', updatedCart))
    }

    async deleteCart(req, res){
        const deletedCart = await cartServices.deleteCart(req.params.cartId)
        res.status(200).send(response('Cart has been deleted', deletedCart))
    }

    async getCart(req, res){
        const cart = await cartServices.getCart(req.params.userId)
        res.status(200).send(response('user cart', cart))
    }

    async getAllCarts(req, res){
        const allCarts = await cartServices.getAllCarts()
        res.status(200).send(response('all users cart',allCarts))
    }
}

module.exports = new CartControllers()