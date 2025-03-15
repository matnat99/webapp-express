const express = require("express");
const router = express.Router();
const movieController = require("../controllers/moviesController");

// INDEX
router.get("/", movieController.index);

// SHOW
router.get("/:id", movieController.show);

// SHOW
router.post("/:id/reviews", movieController.storeReview);

module.exports = router;
