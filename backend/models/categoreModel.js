const mongoose = require("mongoose");

const categoreSchema = new mongoose.Schema({
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
  childs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategore",
    },
  ],
  description: {
    type: String,
    require: true,
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
  categorystatus: {
    type: Boolean,
    default: true,
  },
  creditAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Categore", categoreSchema);
