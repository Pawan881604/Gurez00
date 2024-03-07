const mongoose = require("mongoose");
const CountModel = require("./CountModel");

const shippingInfoSchema = new mongoose.Schema({
  shipping_uuid:{
    type: String,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: "India",
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  order_info_uuid:{
    type: String,
    ref: "order",
  }
});

module.exports = mongoose.model("shipping_Info", shippingInfoSchema);
