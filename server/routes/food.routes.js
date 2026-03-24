const router = require("express").Router();

const foodController = require("../controllers/food.controller");

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");

const validate = require("../middlewares/validation.middleware");

const {
    createFoodSchema
} = require("../validations/food.validation");

router.post(
    "/:restaurantId",
    auth,
    role("restaurant"),
    validate(createFoodSchema),
    upload.single("image"),
    foodController.addFood
);

router.get(
    "/restaurant/:restaurantId",
    foodController.getRestaurantMenu
);

router.put(
    "/:id",
    auth,
    role("restaurant"),
    foodController.updateFood
);

router.delete(
    "/:id",
    auth,
    role("restaurant"),
    foodController.deleteFood
);

module.exports = router;