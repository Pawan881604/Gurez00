const express = require("express");
const router = express.Router();

const { getAllSeo } = require("../controllers/seoController");

router.route("/all-seo").get(getAllSeo);

module.exports = router;
