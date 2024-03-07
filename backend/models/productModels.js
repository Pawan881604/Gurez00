const mongoose = require("mongoose");
const CountModel = require("./CountModel");

const productSchema = new mongoose.Schema({
  _id: Number,
  // name: {
  //   type: String,

  //   trim: true,
  // },
  slug: {
    type: String,
  },
  // description: {
  //   type: String,
  // },
  // article: {
  //   type: String,
  // },
  price: {
    type: Number,
  },
  // maxprice: {
  //   type: Number,
  // },
  ratings: {
    type: Number,
    default: 0,
  },
  // imageId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Images" }],

  // category: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Categore",
  //   },
  // ],
  // subcategory: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "SubCategore",
  //   },
  // ],
  // stock: {
  //   type: Number,

  //   default: 1,
  // },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  // seoid: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "SEO",
  // },
  productstatus: {
    type: String,
    default: "Active",
  },
  reviewsids: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviewsSchema" }],

  user: {
    type: Number,
    ref: "User",
  },
  createdate: {
    type: Date,
    default: Date.now,
  },

  //-------------------------------------------------

  product_name: {
    type: String,
  },
  product_uuid: {
    type: String,
  },
  product_meta_uuid: {
    type: String,
  },
  product_description: {
    type: String,
  },
  product_article: {
    type: String,
  },
  product_regular_price: {
    type: Number,
  },
  product_sale_price: {
    type: Number,
  },
  Default_value:{
    type: String,
  },
  product_ratings: {
    type: Number,
    default: 0,
  },
  product_Type: {
    type: String,
  },
  product_SKU: {
    type: String,
  },
  product_Stock: {
    type: Boolean,
    default: true,
  },
  product_Sold_Individually: {
    type: Boolean,
    default: true,
  },
  product_Availability_Date: {
    type: String,
  },
  product_Weight: {
    type: String,
  },
  product_Dimensions: {
    type: String,
  },
  product_Shipping_class: {
    type: String,
  },
  product_images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Images" }],
  product_category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categore",
    },
  ],
  product_subcategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategore",
    },
  ],

  product_createdate: {
    type: Date,
    default: Date.now,
  },
  product_is_deleted: {
    type: String,
    default: "No",
  },
});

productSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    // const Counter = mongoose.model('Counter');
    const counter = await CountModel.findOneAndUpdate(
      { entityName: "User" }, // Use a unique name for each entity
      { $inc: { productCount: 1 } },
      { new: true, upsert: true }
    );

    this._id = counter.productCount;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Product", productSchema);
