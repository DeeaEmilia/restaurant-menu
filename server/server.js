const express = require('express');
const cors = require('cors');
// let products = require('./data/products.json');

const {getProducts} = require('./productsController')

const app = express();

app.use(express.json());
// HTTP Verbs / methods
// get - are nevoie doar de url (/api/products) si returneaza un raspuns
// post - are nevoie de url si body (body-ul este un json); creeaza un nou entry
// put - are nevoie de url si body; updateaza un entry in functie de id-ul pe care il dam
// delete - are nevoie de url; sterge un entry

// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// app.post('/api/products', (req, res) => {
//   const product = req.body;
//   console.log(product);
//   res.json({ product });
// });

app.get('/api/products', getProducts);

app.listen(5052, () => console.log('Server started'));
