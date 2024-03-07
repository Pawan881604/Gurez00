const mongoose = require("mongoose");

const orderDetailsSchema = new mongoose.Schema({
  order_detail_uuid: {
    type: String,
  },
  order_detail_id: {
    type: Number,
  },
  order_info_uuid: {
    type: String,
    ref: "order",
  },
  product_Items: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
  product_id: [
    {
      type: Number,
      ref: "Product",
    },
  ],
  product_uuid: [
    {
      type: String,
      ref: "Product",
    },
  ],
  order_info_detail_price: {
    type: Number,
    default:0,
  },

  order_detail_quantity: {
    type: Number,
    default:0,
  },
  order_detail_created_date: {
    type: Date,
  },
  order_detail_modifed_date: {
    type: String,
    default:null,
  },
  order_detail_is_deleted: {
    type: String,
    default: "No",
  },
});

module.exports = mongoose.model("Order_Details", orderDetailsSchema);
