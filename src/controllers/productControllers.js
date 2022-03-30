const productServices = require('../services/productServices')
const response = require('../utils/response')

class ProductControllers {
    async postProduct(req, res){
       const savedProduct = await productServices.postProduct(req.body)
       res.status(201).send(response('product Created', savedProduct))
    }

    async updatedProduct(req, res){
        const updatedProduct = await productServices.updatedProduct(req.params.id, req.body)
        res.status(200).send(response('updated product', updatedProduct))
    }

    async deletedProduct(req, res){
        const deletedProduct = await productServices.deletedProduct(req.params.id)
        res.status(200).send(response('product has been deleted!', deletedProduct))
    }

    async getProduct(req, res){
        const product = await productServices.getProduct(req.params.id)
        res.status(200).send(response('product data', product))
    }

    async getAllProducts(req, res){
        const allProducts = await productServices.getAllProducts()
        res.status(200).send(response('all product data', allProducts))
    }
}

module.exports = new ProductControllers()