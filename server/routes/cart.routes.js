const express = require('express');
const router = express.Router();

const cartController = require("../controllers/cart.controller");

const { protect } = require('../middlewares/auth.middleware');

const validate = require("../middlewares/validation.middleware");

const {
    addToCartSchema
} = require("../validations/cart.validation");

router.post(
    "/add",
    protect,
    validate(addToCartSchema),
    cartController.addToCart
);

module.exports = router;