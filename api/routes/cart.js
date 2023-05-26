const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');

// create a new cart item or update the quantity if the item already exists
router.post('/', async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid productId' });
    }
    
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    let cart = await Cart.findOne({ user }).populate('items.product');
   
    if (cart == null) {
      cart = new Cart({ user });
    }
    
    const product = await Product.findById(req.body.productId);
    
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
    
    const item = cart.items.find(item => item.product._id.toString() === product._id.toString());
    if (item) {
      item.quantity += req.body.quantity;
    } else {
      cart.items.push({ product: product._id, quantity: req.body.quantity });
    }
    
    // Calculate the total price
    let totalPrice = 0;
    for (let i = 0; i < cart.items.length; i++) {
      totalPrice += product.price * cart.items[i].quantity;
    }
    
    cart.totalPrice = totalPrice;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get the cart for a user by userId and populate the items with the product details
router.get('/', async (req, res) => {
  try {
    const userId = req.body.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const cart = await Cart.findOne({ user }).populate('items.product');
    if (cart == null) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;