const router = require('express').Router();
const Product = require('../models/product.js');
const user = require('../models/user.js');
const cart = require('../models/cart.js');
const order = require('../models/order.js');

// creat order route
router.post('/', async (req, res) => {
    try {
        // Finding user cart by user id
        const userCart = await cart.findOne({
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
        const newOrder = new order({
            user: req.body.userId,
            items: orderItems,
            shippingAddress: req.body.shippingAddress,
            totalPrice: userCart.totalPrice
        });

        // Saving the order
        const savedOrder = await newOrder.save();

        // Deleting the user's cart after order is saved
        await cart.deleteOne({ user: req.body.userId });

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
});

    



module.exports = router;