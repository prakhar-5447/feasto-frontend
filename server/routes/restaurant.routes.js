const express = require('express');
const router = express.Router();

const restaurantController = require("../controllers/restaurant.controller");

const { protect } = require('../middlewares/auth.middleware');

const role = require("../middlewares/role.middleware");

const validate = require("../middlewares/validation.middleware");

const {
    createRestaurantSchema
} = require("../validations/restaurant.validation");

router.get("/nearby", restaurantController.getNearbyRestaurants);

router.post(
    "/",
    protect,
    role("restaurant_partner"),
    validate(createRestaurantSchema),
    restaurantController.createRestaurant
);

router.get(
    "/my",
    protect,
    role("restaurant_partner"),
    restaurantController.getMyRestaurant
);

router.put(
    "/:id",
    protect,
    role("restaurant_partner"),
    restaurantController.updateRestaurant
);

router.get(
    "/",
    restaurantController.getRestaurants
);

module.exports = router;