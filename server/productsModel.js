let products = require('./data/products.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); //? import the uuid library

//TODO This function returns a list of all products
function findAll() {
    // Resolve the Promise with the products list
    return new Promise((resolve) => {
      resolve(products);
    });
  }

//TODO This function finds a product in the list with the given ID and returns it
function findById(id) {
    // Find the product with the given ID in the products list
    const foundProduct = products.find(p => p.id === id);
  
    // Resolve the Promise with the found product (which may be undefined if no matching product is found)
    return new Promise((resolve) => {
      resolve(foundProduct);
    });
  }

//TODO This function removes a product with the given ID from the list of products
function remove(id) {
    // Filter the products list to remove the product with the given ID
    products = products.filter(p => p.id !== id);
  
    // Write the updated list of products to a file
    writeDataToFile(products);
  
    // Resolve the Promise with no value (i.e., undefined)
    return new Promise((resolve) => {
      resolve();
    });
  }

//TODO This function creates a new product
function create(product) {
  return new Promise((resolve) => {
    // create a new object with a unique ID and the product data
    const newProduct = { id: uuidv4(), ...product };

    // save the new product to a database or file
    products.push(newProduct);

    // this adds the newly created product to the products array
    writeDataToFile(products);

    // resolve the Promise with the new product
    resolve(newProduct);
  });
}
  

//TODO This function writes the given content to a file
function writeDataToFile(content) {
    // Write the content to the products.json file
    fs.writeFileSync('./data/products.json', JSON.stringify(content));
  }

module.exports = {
    findAll, 
    findById, 
    remove,
    create,
};
