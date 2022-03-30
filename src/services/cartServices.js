const Cart = require('../models/Cart')
const CustomError = require('../utils/customError')

class CartServices {
    async addToCart(data) {
        const newCart = new Cart(data)
        const savedCart = await newCart.save()

        return savedCart
    }

    async updateCart(cartId, data) {
        const updatedCart = await Cart.findByIdAndUpdate({ _id: cartId },
            { $set: data },
            { new: true }
        )

        if (!updatedCart) throw new CustomError('Cart not found!', 404)

        return updatedCart
    }

    async deleteCart(cartId) {
        const deletedCart = await Cart.findByIdAndDelete({_id: cartId})
        if (!deletedCart) throw new CustomError('Cart not found!', 404)

        return deletedCart
    }

    async getCart(userId) {
        const cart = await Cart.findOne({ userId: userId})
        if (!cart) throw new CustomError('Cart not found!', 404)

        return cart
    }

    async getAllCarts(){
        const carts = await Cart.find()
        if (!carts) throw new CustomError('Cart not found!', 404)

        return carts
    }
}

module.exports = new CartServices()