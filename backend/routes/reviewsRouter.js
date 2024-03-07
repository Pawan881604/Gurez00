const express = require("express");

const router = express.Router();
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");
const upload = require("../middleware/multer");
const {
  createProductReviews,
  getAllReviews,
} = require("../controllers/reviewsController");

router
  .route("/create/product-review")
  .put(isAuthenticatedUser, createProductReviews);

router.route("/review/product-review").get(getAllReviews);

module.exports = router;
