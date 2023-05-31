const router = require('express').Router();
const Product = require('../models/product.js');
const User = require('../models/user.js');
const Cart = require('../models/cart.js');
const Order = require('../models/order.js');
const { default: mongoose } = require('mongoose');

// creat order route
router.post('/', async (req, res) => {
    try {
        // Finding user cart by user id
        const userCart = await Cart.findOne({
            user: req.body.userId
        }).populate("items.product");
      
        // If user cart is empty
        if (!userCart) {
            return res.status(400).json("Cart is empty");
        }

        // Adding each item of the cart to the order items
        const orderItems = userCart.items.map((item) => {
            return {
                quantity: item.quantity,
                product: item.product._id
            };
        });

        // Adding shipping address to the order and also total price from the cart
        const newOrder = new Order({
            user: req.body.userId,
            items: orderItems,
            shippingAddress: req.body.shippingAddress,
            totalPrice: userCart.totalPrice
        });

        // Saving the order
        const savedOrder = await newOrder.save();

        // Deleting the user's cart after order is saved
        await Cart.deleteOne({ user: req.body.userId });

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
});
//  getiing order base on order number
router.get('/:orderNumber', async (req, res) => {
    
    try {
        // cheack if order number is valid
        if (!mongoose.Types.ObjectId.isValid(req.params.orderNumber)) {
            return res.status(400).json('Invalid order number');
        }
      const order = await Order.findOne({ _id: req.params.orderNumber })
        .populate('items.product');
      if (!order) {
        return res.status(404).json('Order not found');
      }
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json('Internal Server Error');
    }
  });
    



module.exports = router;