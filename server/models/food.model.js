const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },

    name: String,

    image: {
        type: String
    },

    description: String,

    price: Number,

    category: String,

    isAvailable: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.models.Food || mongoose.model("Food", foodSchema);