const productsModel = require('./productsModel')

async function getProducts(_req, res) {
    try {
        const products = await productsModel.findAll()

        res.json(products)

    } catch (error) {
        console.log(error);
    }
}

async function getProductById(req, res) {
    try {
        const product = await productsModel.findById(req.params.id);

        if (!product) {
            res.status(404).json({ message: "Product not found!" })
        }

        res.json(product);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProductById
};