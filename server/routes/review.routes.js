const express = require('express');
const router = express.Router();

const reviewController = require("../controllers/review.controller");

const { protect } = require('../middlewares/auth.middleware');

const validate = require("../middlewares/validation.middleware");

const { reviewSchema } =
    require("../validations/review.validation");

router.post(
    "/:restaurantId",
    protect,
    validate(reviewSchema),
    reviewController.createReview
);

router.get(
    "/restaurant/:restaurantId",
    reviewController.getRestaurantReviews
);

router.put(
    "/:id",
    protect,
    reviewController.updateReview
);

router.delete(
    "/:id",
    protect,
    reviewController.deleteReview
);

module.exports = router;