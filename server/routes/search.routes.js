const router = require("express").Router();

const searchController = require("../controllers/search.controller");

router.get(
    "/restaurants",
    searchController.searchRestaurants
);

module.exports = router;