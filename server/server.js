//TODO Import the required modules
const express = require('express');
const cors = require('cors');

//TODO Import the required functions from the productsController module
const { getProducts, getProductById, deleteProduct, createProduct } = require('./productsController');

//TODO Create a new Express application
const app = express();

//TODO Enable CORS middleware
app.use(cors());

//TODO Enable JSON request body parsing middleware
app.use(express.json());

//TODO Register route handlers for the API endpoints
app.get('/api/products', getProducts);
app.get('/api/products/:id', getProductById);
app.delete('/api/products/:id', deleteProduct);
app.post('/api/products', createProduct);

//TODO Start the server and listen on port 5052
app.listen(5052, () => console.log('Server started'));
