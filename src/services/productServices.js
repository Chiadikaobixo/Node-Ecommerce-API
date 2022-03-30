const Product = require('../models/Product')
const CustomError = require('../utils/customError')

class ProductServices {
    async postProduct(data) {
        const newProduct = new Product(data)
        const savedProduct = await newProduct.save()

        return savedProduct
    }

    async updatedProduct(userId, data) {
        const updatedProduct = await Product.findByIdAndUpdate({ _id: userId },
            { $set: data },
            { new: true }
        )
        if (!updatedProduct) throw new CustomError('product not found', 404)
        return updatedProduct
    }

    async deletedProduct(userId) {
        const deletedProduct = await Product.findByIdAndDelete({ _id: userId })
        if (!deletedProduct) throw new CustomError('product not found', 404)

        return deletedProduct
    }

    async getProduct(userId) {
        const product = await Product.findById({ _id: userId })
        if (!product) throw new CustomError('No product found!', 404)

        return product
    }

    async getAllProducts(productQuery, categoryQuery) {
        const queryNew = { new: productQuery }
        const queryCategory = { category: categoryQuery }

        let products
        if (queryNew) {
            products = await Product.find().sort({ timestamps: -1 }).limit(3)
        } else if (queryCategory) {
            products = await Product.find({
                categories: {
                    $in: [queryCategory]
                }
            })
        } else {
            products = await Product.find()
        }

        if (!products) throw new CustomError('no products found!', 404)

        return products
    }
}

module.exports = new ProductServices()