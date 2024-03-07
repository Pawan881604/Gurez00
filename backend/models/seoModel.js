const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
  metatitle: {
    type: String,
    maxlength: [60, "Title should be lower then 60 characters"],
    required: true,
  },
  keyword: {
    type: [String],
  },
  metadec: {
    type: String,
    maxlength: [160, "Description should be lower then 160 characters"],
    required: true,
  },
  metalink: {
    type: String,
    unique: true,
    maxlength: [60, "Link should be lower then 60 characters"],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  blogid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogPost",
    // require: true,
  },
  productid: {
    type: Number,
    ref: "Product",
    // require: true,
  },
  productcatid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categore",
    // require: true,
  },
  productsubcatid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categore",
    // require: true,
  },
});

module.exports = mongoose.model("SEO", seoSchema);
