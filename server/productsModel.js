const products = require('./data/products.json');

function findAll() {
    return new Promise((resolve) => {
        resolve(products)
    });
}

function findById(id) {
    return new Promise((resolve) => {
        const foundProduct = products.find(p => p.id === id)
        resolve(foundProduct);
    });
}

module.exports = {
    findAll, findById,
};
