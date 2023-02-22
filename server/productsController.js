const Products = require('./productsModel')

async function getProducts(req, res) {
    try {
        const products = await Products.findAll()

        res.json(products)

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
};