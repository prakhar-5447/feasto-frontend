const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 50
        },

        role: {
            type: String,
            enum: [
                "customer",
                "restaurant_partner"
            ],
            required: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            index: true,
            match: [/^\d{10}$/, 'Phone must be exactly 10 digits']
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            sparse: true,
            validate: {
                validator: function (v) {
                    if (!v) return true; // ✅ allow empty
                    return /^\S+@\S+\.\S+$/.test(v);
                },
                message: 'Invalid email'
            }
        },

        avatar: {
            type: String,
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
        },

        lastLogin: {
            type: Date
        }

    },
    {
        timestamps: true // adds createdAt, updatedAt
    }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);