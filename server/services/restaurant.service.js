const restaurantRepository = require("../repositories/restaurant.repository");

exports.createRestaurant = async (data, ownerId) => {

    const restaurant = await restaurantRepository.createRestaurant({
        ...data,
        owner: ownerId
    });

    return restaurant;
};

exports.getMyRestaurant = async (ownerId) => {

    return await restaurantRepository.findByOwner(ownerId);

};

exports.getRestaurants = async (query) => {

    return await restaurantRepository.getRestaurants(query);

};

exports.updateRestaurant = async (restaurantId, data) => {

    return await restaurantRepository.updateRestaurant(restaurantId, data);

};