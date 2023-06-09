const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');
const {refresh} = require('../middlewear/auth.js');


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
    
    const product = await Product.findById(req.body.productId);
    
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }

    let cart = await Cart.findOne({ user }).populate('items.product');
   
    if (cart == null) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: req.body.quantity}],
        totalPrice: product.price * req.body.quantity,
      });
    }
    else {
      const item = cart.items.find(item => item.product._id.toString() === product._id.toString());
      if (item) {
        item.quantity += req.body.quantity;
      } else {
        
        cart.items.push({ product: product._id, quantity: req.body.quantity });
        
      }
      
      // Calculate the total price
      cart.totalPrice += product.price * req.body.quantity;
     
    }
    
    
   
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// delete an item from the cart by user id and product id
router.delete('/:productId/:token',refresh, async (req, res) => {
 
  try {
    
    const userId = req.userId;
    const productId = req.params.productId;
    const deleteQuantity = 1;

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
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product._id.toString() === productId.toString());
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    

    if (item.quantity <= deleteQuantity) {
      cart.items = cart.items.filter(item => item.product._id.toString() !== productId.toString());
    } else {
      item.quantity -= deleteQuantity;
    }

    // Calculate the total price and total items
    let totalPrice = 0;
    let totalItems = 0;
    for (let i = 0; i < cart.items.length; i++) {
      totalPrice += cart.items[i].product.price * cart.items[i].quantity;
      totalItems += cart.items[i].quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItems = totalItems;
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
   
  }
});

// get the cart for a user by userId and populate the items with the product details
router.post('/getcart', async (req, res) => {
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
