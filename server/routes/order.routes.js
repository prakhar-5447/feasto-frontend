const express = require('express');
const router = express.Router();

const orderController = require("../controllers/order.controller");

const { protect } = require('../middlewares/auth.middleware');

const role = require("../middlewares/role.middleware");

router.post(
    "/place",
    protect,
    orderController.placeOrder
);

router.get(
    "/my-orders",
    protect,
    orderController.getUserOrders
);

router.get(
    "/restaurant/:restaurantId",
    protect,
    role("restaurant"),
    orderController.getRestaurantOrders
);

router.put(
    "/:id/status",
    protect,
    role("restaurant"),
    orderController.updateOrderStatus
);

module.exports = router;