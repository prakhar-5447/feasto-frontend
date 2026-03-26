const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({

  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true
  },

  quantity: {
    type: Number,
    default: 1
  }

});

const cartSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },

  items: [cartItemSchema],

  totalPrice: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);