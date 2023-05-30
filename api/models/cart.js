const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number
  }],
  totalPrice: {
    type: Number,
    default: 0
  },
  totalItems: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

// Add a pre-save hook to calculate the total price and total items
CartSchema.pre('save', function(next) {
  let totalPrice = 0;
  let totalItems = 0;
  for (let i = 0; i < this.items.length; i++) {
    totalItems += this.items[i].quantity;
  }
  this.totalItems = totalItems;
  next();
});

module.exports = mongoose.model("Cart", CartSchema);