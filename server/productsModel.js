const products = require('./data/products.json');

function findAll() {
    return new Promise((resolve) => {
        resolve(products)
    });
}

module.exports = {
    findAll,
};
