const foodService = require("../services/food.service");

exports.addFood = async (req, res, next) => {

    try {

        const food = await foodService.createFood({

            ...req.body,
            restaurant: req.params.restaurantId,
            image: req.file ? req.file.path : null

        });

        res.status(201).json({
            success: true,
            data: food
        });

    } catch (error) {
        next(error);
    }

};

exports.getRestaurantMenu = async (req, res, next) => {

    try {

        const foods = await foodService.getRestaurantMenu(
            req.params.restaurantId
        );

        res.json({
            success: true,
            data: foods
        });

    } catch (error) {
        next(error);
    }

};

exports.updateFood = async (req, res, next) => {

    try {

        const food = await foodService.updateFood(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            data: food
        });

    } catch (error) {
        next(error);
    }

};

exports.deleteFood = async (req, res, next) => {

    try {

        await foodService.deleteFood(req.params.id);

        res.json({
            success: true,
            message: "Food deleted"
        });

    } catch (error) {
        next(error);
    }

};