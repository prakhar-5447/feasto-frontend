const router = require("express").Router();

const cartController = require("../controllers/cart.controller");

const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware");

const {
    addToCartSchema
} = require("../validations/cart.validation");

router.post(
    "/add",
    auth,
    validate(addToCartSchema),
    cartController.addToCart
);

module.exports = router;