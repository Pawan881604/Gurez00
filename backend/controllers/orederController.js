const catchAsyncError = require("../middleware/catchAsyncError");
const CountModel = require("../models/CountModel");
const OrdersPaymentsInfoModel = require("../models/OrdersPaymentsInfoModel");
const orderDetailsMode = require("../models/orderDetailsMode");
const axios = require("axios");
const order = require("../models/orderModels");
const orderShippingInfoModel = require("../models/orderShippingInfoModel");
const product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const { sendOrderEmail, sendOrderStatusEmail } = require("../utils/sendEmail");

//------create new order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const { order_details, payment_mode } = req.body;
  const count = await CountModel.findOne({ entityName: "User" });
  const order_info = JSON.parse(order_details);

  const {
    shippinginfo,
    orderItem,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    uuid,
    coupon_uuid,
    coupon_discounttype,
    coupon_discount,
    totalQuantity,
  } = order_info;

  const Order = await order.create({
    _id: count && count.count !== null ? count.orderCount : 1,
    order_info_uuid: uuid,
    order_info_total_price: totalPrice,
    order_info_total_order_quantity: totalQuantity,
    order_info_total_discount: coupon_discount,
    order_info_total_coupon_discount: coupon_discount,
    order_info_discount_type: coupon_discounttype,
    order_info_shipping_charges: shippingPrice,
    order_info_gst: taxPrice,
    master_coupon_uuid: coupon_uuid,
    order_info_grand_total: itemPrice + taxPrice + shippingPrice,
    user: req.user._id,
    order_info_status: payment_mode === "COD" ? "Proccessing" : "FAILURE",
    order_info_mode: payment_mode ,
  });
  const shippingStatus = await orderShippingInfoModel.create({
    shipping_uuid: shippinginfo.shipping_uuid,
    fullName: shippinginfo.fullName,
    phoneNo: shippinginfo.phoneNo,
    email: shippinginfo.email,
    address: shippinginfo.address,
    country: shippinginfo.country,
    state: shippinginfo.state,
    city: shippinginfo.city,
    pinCode: shippinginfo.pinCode,
    order_info_uuid: Order.order_info_uuid,
  });
  // // const orderConfermation = {
  // //   shippingInfo: shippinginfo,
  // //   orderItem,
  // //   mode,
  // // };

  // // sendOrderEmail(orderConfermation);
  // //   order details
  const product_uuid = [];
  let product_Total_Price = 0;
  let product_Total_Quantity = 0;

  orderItem &&
    orderItem.forEach((item, i) => {
      product_uuid.push(item.product_uuid);
      product_Total_Price += item.price * item.quantity;
      product_Total_Quantity += item.quantity;
    });
  const order_Details_length = await orderDetailsMode.countDocuments();
  const orderDetails = await orderDetailsMode.create({
    order_detail_id: order_Details_length + 1,
    order_info_uuid: uuid,
    product_uuid: product_uuid,
    order_info_detail_price: product_Total_Price,
    order_detail_quantity: product_Total_Quantity,
    order_detail_created_date: Order.order_info_created_date,
  });

  res.status(201).json({
    success: true,
    Order,
  });
});

// get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const Order = await order.findById(req.params.id).populate([
    { path: "user", model: "User" },
    // { path: "shippingInfo", model: "shippingInfo" },
    // { path: "paymentInfo", model: "OrderPaymentInfo" },
  ]);

  if (!Order) {
    return next(new ErrorHandler("order not found with this is", 404));
  }
  res.status(201).json({
    success: true,
    Order,
  });
});

// get logged in user order
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const Orders = await order.find({ user: req.user._id });
  Orders.reverse();
  res.status(201).json({
    success: true,
    Orders,
  });
});

// get all ordwers   ----------- admin

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const Orders = await order.find();
  let totalAmount = 0;
  let max = [];
  // Orders.forEach((order) => {
  //   totalAmount += order.totalPrice;
  //   order.orderItem.forEach((item) => {
  //     max.push(item.productId);
  //   });
  // });

  // const productFrequency = max.reduce((acc, productId) => {
  //   acc[productId] = (acc[productId] || 0) + 1;
  //   return acc;
  // }, {});

  Orders.reverse();
  res.status(201).json({
    success: true,
    // totalAmount,
    Orders,
    // productFrequency,
  });
});

// Update order status ----------- admin

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const Order = await order.findById(req.params.id);

  const { paymentInfo, orderItem } = Order;

  const {
    status,
    name,
    address,
    pinCode,
    city,
    country,
    state,
    email,
    phoneNo,
    link,
  } = req.body;

  const data = {
    orderStatus: status,
    shippingInfo: {
      fullName: name,
      phoneNo,
      email,
      address,
      country,
      state,
      city,
      pinCode,
    },
  };

  if (!Order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  Order.orderStatus = data.orderStatus;
  Order.shippingInfo = data.shippingInfo;

  if (Order.orderStatus === "Delivered") {
    //  return next(new ErrorHandler("We have already delivered this order", 404));
    Order.deliveredAt = Date.now();
  }

  if (Order.orderStatus === "Shipped") {
    const errors = [];
    for (const o of Order.orderItem) {
      try {
        await updateStatus(o.productId, o.quantity, link);
        const orderS = {
          status: Order.orderStatus,
          paymentInfo,
          orderItem,
          text: "Your order is currently being processed and will be shipped soon. You will receive a tracking number once it's shipped.",
        };
        sendOrderStatusEmail(orderS);
      } catch (error) {
        errors.push(error.message);
      }
    }
    if (errors.length > 0) {
      return next(new ErrorHandler(errors.join("\n"), 400));
    }
  }
  if (Order.orderStatus === "Return" || Order.orderStatus === "Cancle") {
    const errors = [];
    for (const o of Order.orderItem) {
      try {
        await updateStock(o.productId, o.quantity, Order.orderStatus, link);
        if (Order.orderStatus === "Return") {
          const orderS = {
            status: Order.orderStatus,
            paymentInfo,
            orderItem,
            text: "Once we receive the returned item, our team will inspect it. You will receive a confirmation email regarding the completion of the return process.",
          };
          sendOrderStatusEmail(orderS);
        }
      } catch (error) {
        errors.push(error.message);
      }
    }
    if (errors.length > 0) {
      return next(new ErrorHandler(errors.join("\n"), 400));
    }
  }

  // if (req.body.status === "Delivered") {
  //   Order.deliveredAt = Date.now();
  // }

  await Order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    Order,
  });
});

async function updateStatus(id, quantity, productId) {
  try {
    for (let i = 0; i < id.length; i++) {
      const prodId = id[i];
      const quant = quantity[i];
      const Product = await product.findOne({ "seo.metalink": prodId });

      if (!Product) {
        throw new Error(`Product not found for ID: ${prodId}`);
      }

      Product.stock -= quant;
      await Product.save({ validateBeforeSave: false });
    }
  } catch (err) {
    throw new Error(`Internal server error: ${err}`);
  }
}

async function updateStock(id, quantity, status, productId) {
  try {
    for (let i = 0; i < id.length; i++) {
      const prodId = id[i];
      const quant = quantity[i];

      const Product = await product.findOne({ "seo.metalink": prodId });
      if (!Product) {
        throw new Error(`Product not found for ID: ${prodId}`);
      }
      Product.stock += quant;
      await Product.save({ validateBeforeSave: false });
    }
  } catch (err) {
    throw new Error(`Internal server error: ${err}`);
  }
}

// Delete order   ----------- admin

exports.deleteOrders = catchAsyncError(async (req, res, next) => {
  const Order = await order.findById(req.params.id);
  if (!Order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  await Order.deleteOne();
  res.status(201).json({
    success: true,
    message: "order-delete",
  });
});

//---------------------- shipping address

exports.shipping_info = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const shipping = await orderShippingInfoModel.findOne({
    order_info_uuid: id,
  });
  res.status(201).json({
    success: true,
    shipping,
  });
});

exports.order_details_info = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const order_details = await orderDetailsMode.findOne({
    order_info_uuid: id,
  });
  res.status(201).json({
    success: true,
    order_details,
  });
});
