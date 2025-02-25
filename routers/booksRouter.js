const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// INDEX
router.get("/", bookController.index);

module.exports = router;
