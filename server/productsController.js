//TODO Import the `productsModel` module
const productsModel = require('./productsModel');

//TODO This function gets all products from the database and sends a JSON response
async function getProducts(_req, res) {
  try {
    const products = await productsModel.findAll();

    // Send a JSON response with the list of products
    res.json(products);
  } catch (error) {
    console.log(error);
  }
}

//TODO This function gets a product by ID from the database and sends a JSON response
async function getProductById(req, res) {
  try {
    const product = await productsModel.findById(req.params.id);

    if (!product) {
      // If no matching product is found, send a 404 response with an error message
      res.status(404).json({ message: "Product not found!" });
    } else {
      // Otherwise, send a JSON response with the product object
      res.json(product);
    }
  } catch (error) {
    console.log(error);
  }
}

//TODO This function deletes a product by ID from the database and sends a JSON response
async function deleteProduct(req, res) {
  try {
    const productID = req.params.id;
    const product = await productsModel.findById(productID);

    if (!product) {
      // If no matching product is found, send a 404 response with an error message
      res.status(404).json({ message: "Product not found!" });
    } else {
      // Otherwise, delete the product from the database and send a success message
      await productsModel.remove(productID);
      res.json(`Product ${product.name} with ID ${productID} was removed.`);
    }
  } catch (error) {
    console.log(error);
  }
}

//TODO This function creates a new product in the database and sends a JSON response
async function createProduct(req, res) {
  try {
    // destructure the relevant fields from the request body
    const { name, image, ingredients, recipe } = req.body;

    // create a new object with the product data
    const product = { name, image, ingredients, recipe };

    // call the `create` method on the `productsModel` with the new product
    const newProduct = await productsModel.create(product);

    // send a JSON response with the new product
    res.json(newProduct);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
};