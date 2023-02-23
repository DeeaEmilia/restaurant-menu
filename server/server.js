// Import the required modules
const express = require('express');
const cors = require('cors');

// Import the required functions from the productsController module
const { getProducts, getProductById, deleteProduct, createProduct } = require('./productsController');

// Create a new Express application
const app = express();

// Enable CORS middleware
app.use(cors());

// Enable JSON request body parsing middleware
app.use(express.json());

// Register route handlers for the API endpoints
app.get('/api/products', getProducts);
app.get('/api/products/:id', getProductById);
app.delete('/api/products/:id', deleteProduct);
app.post('/api/products', createProduct);

// Start the server and listen on port 5052
app.listen(5052, () => console.log('Server started'));
