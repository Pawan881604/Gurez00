const mongoose = require("mongoose");

const subCategoreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
    unique: true,
  },
  title: {
    type: String,
    require: true,
  },
  parent:{
    type: String,
    default:null
  },
  description: {
    type: String,
    require: true,
  },
  parent:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categore",
    required: true,
  },
  user: {
    type: Number,
    ref: "User",
    required: true,
  },
  seo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SEO",

  },
  subcategorystatus: {
    type: Boolean,
    default: true,
  },
  creditAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("SubCategore", subCategoreSchema);
