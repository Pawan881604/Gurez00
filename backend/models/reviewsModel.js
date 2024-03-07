const mongoose = require("mongoose");
const CountModel = require("./CountModel");
const Images = require("./imageGelleryModel");

const reviewsSchema = new mongoose.Schema({

  reviewid:Number,
  user: {
    type: Number,
    ref: "user",
    // require: true,
  },
  imageid: {
    type: String,
  },
  rating: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  productid:{
    type: Number,
  },
  totalreviews:{
    type: String,
  },
  createdate: {
    type: Date,
    default: Date.now,
  },
});

reviewsSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    // const Counter = mongoose.model('Counter');
    const counter = await CountModel.findOneAndUpdate(
      { entityName: "User" }, // Use a unique name for each entity
      { $inc: { reviews: 1 } },
      { new: true, upsert: true }
    );

    this.reviewid = counter.reviews;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("reviewsSchema", reviewsSchema);
