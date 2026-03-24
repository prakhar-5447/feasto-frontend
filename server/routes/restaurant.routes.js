const router = require("express").Router();

const restaurantController = require("../controllers/restaurant.controller");

const auth = require("../middlewares/auth.middleware");

const role = require("../middlewares/role.middleware");

const validate = require("../middlewares/validation.middleware");

router.get("/nearby", restaurantController.getNearbyRestaurants);

const {
    createRestaurantSchema
} = require("../validations/restaurant.validation");

router.post(
    "/",
    auth,
    role("restaurant"),
    validate(createRestaurantSchema),
    restaurantController.createRestaurant
);

router.get(
    "/my",
    auth,
    role("restaurant"),
    restaurantController.getMyRestaurant
);

router.put(
    "/:id",
    auth,
    role("restaurant"),
    restaurantController.updateRestaurant
);

router.get(
    "/",
    restaurantController.getRestaurants
);

module.exports = router;