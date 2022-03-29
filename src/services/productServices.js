const Product = require('../models/Product')

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

        return updatedProduct
    }

    async deletedProduct(userId) {
        const deletedProduct = await Product.findByIdAndDelete({ _id: userId })

        return deletedProduct
    }

    async getProduct(userId) {
        const product = await Product.findById({ _id: userId })

        return product
    }

    async getAllProducts(productQuery, categoryQuery) {
        const queryNew = {new: productQuery }
        const queryCategory = {category: categoryQuery}

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

        return products
    }
}

module.exports = new ProductServices()