const express = require("express");
const multer = require("multer");
const router = express.Router();
const movieController = require("../controllers/moviesController");

const storage = multer.diskStorage({
  destination: "public/img",
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// INDEX
router.get("/", movieController.index);

// SHOW
router.get("/:id", movieController.show);

// STORE REVIEW
router.post("/:id/reviews", movieController.storeReview);

// STORE MOVIE
router.post("/", upload.single("image"), movieController.store);

module.exports = router;
