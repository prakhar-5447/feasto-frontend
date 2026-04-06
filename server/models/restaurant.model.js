const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    description: { type: String },

    address: { type: String },

    cuisine: [String],

    priceRange: {
        type: Number,
        min: 1,
        max: 5
    },

    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    avgRating: {
        type: Number,
        default: 0
    },

    totalReviews: {
        type: Number,
        default: 0
    },

    isOpen: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

restaurantSchema.index({ location: "2dsphere", name: "text", cuisine: "text" });

module.exports = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);