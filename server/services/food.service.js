const foodRepository = require("../repositories/food.repository");

exports.createFood = async (data, restaurantId) => {

    const food = await foodRepository.createFood({
        ...data,
        restaurant: restaurantId
    });

    return food;
};

exports.getRestaurantMenu = async (restaurantId) => {

    return await foodRepository.findByRestaurant(restaurantId);

};

exports.updateFood = async (foodId, data) => {

    return await foodRepository.updateFood(foodId, data);

};

exports.deleteFood = async (foodId) => {

    return await foodRepository.deleteFood(foodId);

};