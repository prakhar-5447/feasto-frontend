const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({

    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    }

});

const orderSchema = new mongoose.Schema({

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

    items: [orderItemSchema],

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "PLACED",
            "ACCEPTED",
            "PREPARING",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED"
        ],
        default: "PLACED"
    }

}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);