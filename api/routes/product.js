const router = require('express').Router();
const Product = require('../models/product.js');
const admin = require('../middlewear/auth.js');


// creat a product with auth middleware
router.post('/', admin, async (req, res) => {
    // avoid creating a product with the same title
    const productExist = await Product.findOne({
        title: req.body.title
    });
    if (productExist) {
        return res.status(400).json("Product already exists");
    }
    
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}
);





module.exports = router;
