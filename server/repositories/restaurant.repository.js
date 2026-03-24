const Restaurant = require("../models/restaurant.model");

exports.findNearbyRestaurants = async (lng, lat, radius) => {

    const restaurants = await Restaurant.find({

        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: radius
            }
        }

    });

    return restaurants;

};

exports.getRestaurants = async (query) => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter = {};

    if (query.priceRange) {
        filter.priceRange = query.priceRange;
    }

    if (query.minRating) {
        filter.avgRating = { $gte: query.minRating };
    }

    const sort = {};

    if (query.sort) {
        sort[query.sort] = -1;
    }

    const restaurants = await Restaurant.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    const total = await Restaurant.countDocuments(filter);

    return {
        restaurants,
        total,
        page,
        limit
    };

};

exports.createRestaurant = async (data) => {
    return await Restaurant.create(data);
};

exports.findByOwner = async (ownerId) => {
    return await Restaurant.findOne({ owner: ownerId });
};

exports.updateRestaurant = async (id, data) => {
    return await Restaurant.findByIdAndUpdate(id, data, { new: true });
};

exports.findById = async (id) => {
    return await Restaurant.findById(id);
};