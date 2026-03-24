const restaurantRepository = require("../repositories/restaurant.repository");
const restaurantService = require("../services/restaurant.service");

exports.getNearbyRestaurants = async (req, res, next) => {

    try {

        const { lat, lng } = req.query;

        const restaurants =
            await restaurantRepository.findNearbyRestaurants(lng, lat, 5000);

        res.json({
            success: true,
            data: restaurants
        });

    } catch (error) {
        next(error);
    }

};

exports.createRestaurant = async (req, res, next) => {

    try {

        const restaurant = await restaurantService.createRestaurant({

            ...req.body,
            owner: req.user.id

        });

        res.status(201).json({
            success: true,
            data: restaurant
        });

    } catch (error) {
        next(error);
    }

};

exports.getMyRestaurant = async (req, res, next) => {

    try {

        const restaurant =
            await restaurantService.getMyRestaurant(req.user.id);

        res.json({
            success: true,
            data: restaurant
        });

    } catch (error) {
        next(error);
    }

};

exports.getRestaurants = async (req, res, next) => {

    try {

        const result = await restaurantService.getRestaurants(req.query);

        res.json({
            success: true,
            total: result.total,
            page: result.page,
            limit: result.limit,
            data: result.restaurants
        });

    } catch (error) {

        next(error);

    }

};

exports.updateRestaurant = async (req, res, next) => {

    try {

        const restaurant =
            await restaurantService.updateRestaurant(
                req.params.id,
                req.body
            );

        res.json({
            success: true,
            data: restaurant
        });

    } catch (error) {
        next(error);
    }

};