const express = require('express');
const router = express.Router();

const foodController = require("../controllers/food.controller");

const { protect } = require('../middlewares/auth.middleware');

const upload = require("../middlewares/upload.middleware");

const validate = require("../middlewares/validation.middleware");

const {
    createFoodSchema
} = require("../validations/food.validation");

router.post(
    "/:restaurantId",
    protect,
    validate(createFoodSchema),
    upload.single("image"),
    foodController.addFood
);

router.get(
    "/:restaurantId",
    foodController.getRestaurantMenu
);

router.put(
    "restaurant/item/:id",
    protect,
    foodController.updateFood
);

router.delete(
    "restaurant/item/:id",
    protect,
    foodController.deleteFood
);

module.exports = router;