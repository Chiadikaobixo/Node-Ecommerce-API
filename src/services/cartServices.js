const Cart = require('../models/Cart')

class CartServices {
    async addToCart(data) {
        const newCart = new Cart(data)
        const savedCart = await newCart.save()

        return savedCart
    }

    async updateCart(userId, data) {
        const updatedCart = await Cart.findByIdAndUpdate({ _id: userId },
            { $set: data },
            { new: true }
        )

        return updatedCart
    }

    async deleteCart(userId) {
        const deletedCart = await Cart.findByIdAndDelete({_id: userId})

        return deletedCart
    }

    async getCart(userId) {
        const cart = await Cart.findOne({ userId: userId})

        return cart
    }

    async getAllCarts(){
        const carts = await Cart.find()

        return carts
    }
}

module.exports = new CartServices()