const router = require("express").Router();

const reviewController = require("../controllers/review.controller");

const auth = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validation.middleware");

const { reviewSchema } =
    require("../validations/review.validation");

router.post(
    "/:restaurantId",
    auth,
    validate(reviewSchema),
    reviewController.createReview
);

router.get(
    "/restaurant/:restaurantId",
    reviewController.getRestaurantReviews
);

router.put(
    "/:id",
    auth,
    reviewController.updateReview
);

router.delete(
    "/:id",
    auth,
    reviewController.deleteReview
);

module.exports = router;