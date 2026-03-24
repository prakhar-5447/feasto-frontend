const router = require("express").Router();

const orderController = require("../controllers/order.controller");

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

router.post(
    "/place",
    auth,
    orderController.placeOrder
);

router.get(
    "/my-orders",
    auth,
    orderController.getUserOrders
);

router.get(
    "/restaurant/:restaurantId",
    auth,
    role("restaurant"),
    orderController.getRestaurantOrders
);

router.put(
    "/:id/status",
    auth,
    role("restaurant"),
    orderController.updateOrderStatus
);

module.exports = router;