const Food = require("../models/food.model");

exports.createFood = async (data) => {
    return await Food.create(data);
};

exports.findByRestaurant = async (restaurantId) => {
    return await Food.find({ restaurant: restaurantId });
};

exports.findById = async (id) => {
    return await Food.findById(id);
};

exports.updateFood = async (id, data) => {
    return await Food.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteFood = async (id) => {
    return await Food.findByIdAndDelete(id);
};