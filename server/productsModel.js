let products = require('./data/products.json');
const fs = require('fs');

function findAll() {
    return new Promise((resolve) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve) => {
        const foundProduct = products.find(p => p.id === id)
        resolve(foundProduct);
    });
}

function remove(id) {
    return new Promise((resolve) => {
        products = products.filter(p => p.id !== id);
        writeDataToFile(products);
        resolve();
    });
}

function writeDataToFile(content){
    fs.writeFileSync('./data/products.json', JSON.stringify(content))
}

module.exports = {
    findAll, 
    findById, 
    remove,
};
