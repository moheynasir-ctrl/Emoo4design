const express = require('express');
const router = express.Router();

// Mock database
let products = [];

// Get all products
router.get('/', (req, res) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get single product by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
});

// Create new product
router.post('/', (req, res) => {
    try {
        const newProduct = { id: products.length + 1, ...req.body };
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update product
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    try {
        products[index] = { ...products[index], ...req.body };
        res.status(200).json(products[index]);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete product
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    products.splice(index, 1);
    res.status(204).send();
});

module.exports = router;