const catchAsyncError = require("../middleware/catchAsyncError");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorhandler");
const MasrterCouponModel = require("../models/MasrterCouponModel");
const productModels = require("../models/productModels");
const orderModels = require("../models/orderModels");
exports.createCouponMaster = catchAsyncError(async (req, res, next) => {
  const {
    allowFreeShipping,
    camount,
    couponExpiryDate,
    description,
    dtype,
    emails,
    excludeCategories,
    excludeProducts,
    excludeSaleItems,
    individualUseOnly,
    limitUsageToXItems,
    minimumSpend,
    maximumSpend,
    productCategories,
    products,
    usageLimitPerCoupon,
    usageLimitPerUser,
    name,
    uuid,
  } = req.body;
  const user = req.user._id;

  const newMasterCoupon = await MasrterCouponModel.create({
    master_coupon_uuid: uuid,
    master_coupon_code: name,
    master_coupon_name: name,
    master_coupon_desc: description,
    master_coupon_type: dtype,
    master_coupon_email: emails,
    master_coupon_limitUsageToXItems: limitUsageToXItems,
    master_coupon_amount: camount,
    master_coupon_start_date: new Date(), // Use Date object for the current date and time
    master_coupon_end_date: couponExpiryDate,
    master_coupon_allowFreeShipping: allowFreeShipping,
    master_coupon_min_spend: minimumSpend,
    master_coupon_max_spend: maximumSpend,
    master_coupon_excludeSaleItems: excludeSaleItems,
    master_coupon_products: products || [],
    // master_coupon_excludeProducts: excludeProducts,
    master_coupon_categories: productCategories || [],
    // master_coupon_exclude_Categories: excludeCategories || [],
    master_coupon_total_usage_limit: usageLimitPerCoupon,
    master_coupon_total_userwise_limit: usageLimitPerUser || [],
    master_coupon_created_date: new Date(), // Use Date object for the current date and time
    master_coupon_modifed_date: new Date(), // Use Date object for the current date and time
    master_coupon_individualUseOnly: individualUseOnly,
    user,
  });
  console.log(newMasterCoupon);
  res.status(201).json({
    success: true,
    message: "Coupon added successfully",
    // newMasterCoupon,
  });
});

exports.getAllMasterCoupon = catchAsyncError(async (req, res, next) => {
  const allcoupon = await MasrterCouponModel.find().populate([
    { path: "user", model: "User" },
  ]);

  res.status(200).json({
    success: true,
    allcoupon,
  });
});

exports.verifyMasterCoupon = catchAsyncError(async (req, res, next) => {
  const { coupon, ids } = req.body;
  let data;
  const couponData = await MasrterCouponModel.findOne({
    master_coupon_code: coupon,
  });

  if (!couponData) {
    data=null;
    return next(new ErrorHandler("Invalid coupon.", 404));
  }

  const valid_date = isWithinDateRange(couponData);
  if (!valid_date) {
    data=null;
    return next(new ErrorHandler("Coupon has been expired.", 404));
  }
  
  if (couponData.master_coupon_type === "Percentage discount") {
    data = applyCartPercentageDiscount("percentage", couponData);
  } else if (couponData.master_coupon_type === "Fixed basket discount") {
    data = applyCartFixedBasketDiscount("fix items", couponData);
  }

  res.status(200).json({
    success: true,
    coupon: data,
  });
});

function isWithinDateRange(coupon) {
  const date = Date.now();
  const current_date = new Date(date);
  const start_date = coupon.master_coupon_start_date;
  const end_date = coupon.master_coupon_end_date;

  if (end_date !== null) {
    if (start_date < current_date && current_date < end_date) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

function applyCartPercentageDiscount(type, coupon) {
  coupondata = {
    type: type,
    name: coupon.master_coupon_name,
    disscount: coupon.master_coupon_amount,
    uuid: coupon.master_coupon_uuid,
    productid: null,
    message: "Coupon applied successfully!",
  };
  return coupondata;
}

function applyCartFixedBasketDiscount(type, coupon) {
  coupondata = {
    type: type,
    name: coupon.master_coupon_name,
    uuid: coupon.master_coupon_uuid,
    disscount: coupon.master_coupon_amount,
    productid: null,
    message: "Coupon applied successfully!",
  };
  return coupondata;
}

// exports.verifyMasterCoupon = catchAsyncError(async (req, res, next) => {
//   const { coupon, ids } = req.body;
//   const stringArray = [ids];
//   const numbersArray = stringArray[0]
//     .split(",")
//     .map((str) => parseInt(str, 10));
//   // let c = isExist.master_coupon_products[0]
//   //   .split(",")
//   //   .map((str) => parseInt(str, 10));

//   const data = await applyCoupon(coupon, stringArray);

//   async function applyCoupon(coupon, numbersArray, user) {
//     if (await isValidCoupon(coupon)) {
//       const current = Date.now();
//       const currentDate = new Date(current);

//       if (await isWithinDateRange(currentDate, coupon)) {
//         const couponData = await MasrterCouponModel.findOne({
//           master_coupon_code: coupon,
//         });
//         const Orders = await orderModels.find({ coupon });
//         const limit = 500;
//         if (
//           await isBelowUsageLimit(
//             couponData.master_coupon_total_usage_limit,
//             // Orders.length
//             limit
//           )
//         ) {
//           const couponData = await MasrterCouponModel.findOne({
//             master_coupon_code: coupon,
//           });

//           // Apply discount based on coupon type
//           if (couponData.master_coupon_type === "Percentage discount") {
//             return applyCartPercentageDiscount(
//               "percentage",
//               couponData.master_coupon_name,
//               couponData.master_coupon_amount,
//               couponData.master_coupon_uuid
//             );
//           } else if (
//             couponData.master_coupon_type === "Fixed basket discount"
//           ) {
//             return applyCartFixedBasketDiscount(
//               "fix items",
//               couponData.master_coupon_name,
//               couponData.master_coupon_amount,
//               couponData.master_coupon_uuid
//             );
//           } else if (
//             couponData.master_coupon_type === "Fixed product discount"
//           ) {
//             return applyFixedProductDiscount(
//               "fix product",
//               couponData.master_coupon_name,
//               couponData.master_coupon_amount,
//               couponData.master_coupon_products,
//               couponData.master_coupon_uuid
//             );
//           } else if (couponData.master_coupon_type === "Discount By User") {
//             return applyDiscountByUser("user", couponData.master_coupon_amount);
//           }
//         }
//       } else {
//         return "Coupon is not valid within the date range.";
//       }
//     } else {
//       return "Invalid coupon.";
//     }
//   }

//   async function isValidCoupon(coupon) {
//     const isExist = await MasrterCouponModel.findOne({
//       master_coupon_code: coupon,
//     });
//     return isExist;
//   }

//   async function isWithinDateRange(date, coupon) {
//     const isExist = await MasrterCouponModel.findOne({
//       master_coupon_code: coupon,
//     });

//     const start = isExist.master_coupon_start_date;
//     const end = isExist.master_coupon_end_date;

//     if (start < date && date < end) {
//       return isExist;
//     } else {
//       return "Coupon has benn expire.";
//     }
//   }

//   async function isBelowUsageLimit(limit, couponLength) {
//     if (couponLength < limit) {
//       return true;
//     } else {
//       return "This coupon expire";
//     }
//   }

//   async function applyCartPercentageDiscount(type, name, discountAmount, uuid) {
//     coupondata = {
//       type: type,
//       name: name,
//       disscount: discountAmount,
//       uuid,
//       productid: null,
//       message: "Coupon applied successfully!",
//     };
//     return coupondata;
//   }

//   async function applyCartFixedBasketDiscount(
//     type,
//     name,
//     discountAmount,
//     uuid
//   ) {
//     coupondata = {
//       type: type,
//       name: name,
//       uuid,
//       disscount: discountAmount,
//       productid: null,
//       message: "Coupon applied successfully!",
//     };
//     return coupondata;
//   }

//   async function applyFixedProductDiscount(
//     type,
//     name,
//     discountAmount,
//     numbersArray,
//     uuid
//   ) {
//     coupondata = {
//       type: type,
//       name: name,
//       disscount: discountAmount,
//       uuid,
//       productid: numbersArray ? numbersArray : null,
//       message: "Coupon applied successfully!",
//     };
//     return coupondata;
//   }
//   async function applyDiscountByUser(type, discountAmount) {
//     coupondata = {
//       type: type,
//       // name: discountAmount,
//       disscount: discountAmount,
//       productid: null,
//       message: "Coupon applied successfully!",
//     };
//     return coupondata;
//   }
//   res.status(200).json({
//     success: true,
//     coupon: data,
//   });
// });

// exports.deleteBlogCategore = catchAsyncError(async (req, res, next) => {
//
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return next(new ErrorHandler("Invalid ID format", 400));
//     }

//     const existingPost = await MasrterCoupon.findById(id);

//     if (!existingPost) {
//       return next(new ErrorHandler("Post not found", 404));
//     }

//     await existingPost.deleteOne();
//     res.status(200).json({
//       success: true,
//       message: "post has been deleted",
//     });
//   } catch (err) {
//     return next(new ErrorHandler(`Internal server error: ${err}`, 500));
//   }
// });

// exports.updateBlogCategore = catchAsyncError(async (req, res, next) => {
//
//     const { name, slug, title, description } = req.body;
//     let metaLink = slug.split(" ").join("-").toLowerCase();
//     const user = req.user._id;
//     const { id } = req.params;

//     const data = {
//       name,
//       slug: metaLink,
//       title,
//       description,
//       user,
//     };

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return next(new ErrorHandler("Invalid ID format", 400));
//     }

//     const updatedCategory = await MasrterCoupon.findByIdAndUpdate(id, data, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     });

//     res.status(200).json({
//       success: true,
//       updatedCategory,
//     });
//   } catch (err) {
//     return next(new ErrorHandler(`Internal server error: ${err}`, 500));
//   }
// });
