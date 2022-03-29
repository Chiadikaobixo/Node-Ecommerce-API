const productServices = require('../services/productServices')

class ProductControllers {
    async postProduct(req, res){
       const savedProduct = await productServices.postProduct(req.body)
       res.status(200).send(savedProduct)
    }

    async updatedProduct(req, res){
        const updatedProduct = await productServices.updatedProduct(req.params.id, req.body)
        res.status(200).send(updatedProduct)
    }

    async deletedProduct(req, res){
        await productServices.deletedProduct(req.params.id)
        res.status(200).send('Product has been deleted!')
    }

    async getProduct(req, res){
        const product = await productServices.getProduct(req.params.id)

        res.status(200).send(product)
    }

    async getAllProducts(req, res){
        const allProducts = await productServices.getAllProducts()
        res.status(200).send(allProducts)
    }
}

module.exports = new ProductControllers()