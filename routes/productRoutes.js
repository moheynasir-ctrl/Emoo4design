const express = require('express');
const router = express.Router();

// Mock data for demonstration (replace with your database logic)
let products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
];

// GET all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET single product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// POST create product
router.post('/', (req, res) => {
    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.status(201).json(product);
});

// PUT update product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product);
});

// DELETE product
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');
    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = router;