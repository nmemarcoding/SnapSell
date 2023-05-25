const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');



// GET all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific cart by ID
router.get('/:id', getCart, (req, res) => {
  res.json(res.cart);
});

// GET a cart by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (cart == null) {
      return res.status(404).json({ message: 'Cannot find cart for user' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE or UPDATE a cart
router.post('/', async (req, res) => {
    const userId = req.body.user;
    const item = req.body.item;
  
    try {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      let cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (cart == null) {
        // Create a new cart if one doesn't exist for the user
        cart = new Cart({
          user: userId,
          items: [item]
        });
      } else {
        // Check if the item already exists in the cart
        const existingItem = cart.items.find(cartItem => cartItem.product._id.toString() === item.product.toString());
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.items.push(item);
        }
      }
  
      const updatedCart = await cart.save();
      res.status(201).json(updatedCart);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// DELETE a cart
router.delete('/:id', getCart, async (req, res) => {
  try {
    await res.cart.remove();
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE an item from the cart by user ID and item ID
router.delete('/user/item', async (req, res) => {
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    try {
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (cart == null) {
        return res.status(404).json({ message: 'Cannot find cart for user' });
      }
  
      // Find the item in the cart
      const item = cart.items.find(item => item.product._id.toString() === itemId);
      if (item == null) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      // Decrement the quantity of the item in the cart
      if (item.quantity > 0) {
        item.quantity--;
      } if(item.quantity === 0) {
        cart.items = cart.items.filter(item => item.product._id.toString() !== itemId);
      }
  
      const updatedCart = await cart.save();
      res.json(updatedCart);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Middleware function to get a specific cart by ID
async function getCart(req, res, next) {
  let cart;
  try {
    cart = await Cart.findById(req.params.id);
    if (cart == null) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.cart = cart;
  next();
}

module.exports = router;