// const products = require("../models/productModels");
const reviewsSchema = require("../models/reviewsModel");
const ErrorHandler = require("../utils/errorhandler");
const {
  Types: { ObjectId },
} = require("mongoose");

const catchAsyncError = require("../middleware/catchAsyncError");
const CountModel = require("../models/CountModel");
const productModels = require("../models/productModels");

//--------create new review and update the reviews

exports.createProductReviews = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const user = req.user;
  const product = await productModels.findById(productId);

  const reviews = {
    user: user._id,
    rating,
    productid: productId,
    comment,
  };

  let isExistReview = await reviewsSchema.findOne({
    productid: productId,
    user: user._id,
  });

  if (!isExistReview) {
    const newReview = await reviewsSchema.create(reviews);

    if (product) {
      product.reviewsids.push(newReview._id);
      await product.save();
    }

    let revilength = await reviewsSchema.find({
      productid: productId,
    });

    const length = revilength.length;
    const sum = revilength.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / length;
    product.ratings = average;
    await product.save();
    res.status(201).json({
      message: "Review created successfully",
      newReview,
    });
    return;
  }

  isExistReview.rating = rating;
  isExistReview.comment = comment;
  await isExistReview.save();

  let revilength = await reviewsSchema.find({
    productid: productId,
  });
  const length = revilength.length;
  const sum = revilength.reduce((acc, review) => acc + review.rating, 0);
  const average = sum / length;
  product.ratings = average;
  await product.save();

  res.status(200).json({
    message: "Review updated successfully",
    isExistReview,
  });
});

//--------get All reviews

exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const productReview = await reviewsSchema
    .find()
    .populate([{ path: "user", model: "User" }]);

  if (!productReview) {
    return next(new ErrorHandler("Product review not found", 404));
  }

  res.status(200).json({
    success: true,
    productReview,
  });
});

// //--------Delete reviews

// exports.DeleteProductReviews = catchAsyncError(async (req, res, next) => {
//
//     let Product = await products.findById(req.query.productId);
//     if (!Product) {
//       return next(new ErrorHandler("Product not found", 404));
//     }
//     const reviews = Product.reviews.filter((rev) => {
//       return rev._id.toString() !== req.query.id.toString();
//     });

//     let review_avg = 0;

//     reviews.forEach((rev) => {
//       review_avg += rev.rating;
//     });

//     const ratings = reviews.length > 0 ? review_avg / reviews.length : 0; // Check if reviews array is empty

//     const numOfReviews = reviews.length;

//     await products.findByIdAndUpdate(
//       req.query.productId,
//       {
//         reviews,
//         ratings,
//         numOfReviews,
//       },
//       {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       reviews: reviews,
//       message: "Review removed",
//     });
//   } catch (error) {
//     return next(new ErrorHandler(" Internal Error prodduct not delete", 500));
//   }
// });
