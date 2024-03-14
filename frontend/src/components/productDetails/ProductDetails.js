import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa6";
import { ClearError, getProductDetails } from "../../actions/ProductAction";
import {
  reviewsClearError,
  newReview,
  createReview,
} from "../../actions/ReviewsAction";
import Loader from "../layout/loader/Loader";
import ReviewCard from "../productDetails/assets/ReviewCard";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import "./style/style.css";
import { NEW_REVIEW_RESET } from "../../constants/ProductConstants";
import { ReviewStar } from "./assets/ReviewStar";

import ImageLightbox from "./assets/ImageLightbox";
import Details from "./assets/Details";
import AddQuantitBtns from "./assets/AddQuantitBtns";
import AddToCartBtn from "./assets/AddToCartBtn";
import AddReview from "./assets/AddReview";
import SinglePageArticle from "./assets/SinglePageArticle";
import ImageSlider from "./assets/ImageSlider";
import RelatedProducts from "./assets/RelatedProducts";
import { v4 as uuidv4, v4 } from "uuid";
import {
  CreateBookmarkAction,
  wishListAction,
} from "../../actions/wishListAction";
import generateUuid from "../../utils/Uuidv4";
import { getProductPostMeta } from "../../actions/PostmetaAction";
import { Button } from "@material-ui/core";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const [label, setLabel] = useState("");

  // //--------------- useSelector ----------------------------
  const { loding, product, error } = useSelector(
    (state) => state.productDetails
  );
  const [showContent, setShowContent] = useState(true);
  const { success, error: reverror } = useSelector((state) => state.review);
  let defaultPrice = product && product.product_sale_price;
  const [variantPriceValue, setVariantPriceValue] = useState([]);
  // //--------------- useSelector ----------------------------

  // //-------------------- use state------------------------
  const [quentity, setQuentity] = useState(1);

  // //-------------------- use state------------------------

  //-----increase quentity

  const increaseQuantity = () => {
    if (product.stock <= quentity) return;
    const quty = quentity + 1;
    setQuentity(quty);
  };

  //-----decrease quentity

  const decreaseQuantity = () => {
    if (1 >= quentity) return;
    const quty = quentity - 1;
    setQuentity(quty);
  };

  //---add to cart item
  const addToCartHandler = () => {
    console.log(id, quentity);
    dispatch(
      addItemsToCart(
        id,
        quentity,
        variantPriceValue.length === 0 ? defaultPrice : variantPriceValue[0],
        label
      )
    );
    alert.success("Item Added to Cart");
  };
  //-------add to wishlist item

  const wishlist_product_uuid = generateUuid();
  const wishlist_product_id = product && product._id;
  const productUuid = product && product.product_uuid;
  const productType = product && product.product_Type;

  const addToWishtHandler = () => {
    dispatch(
      wishListAction(
        id,
        variantPriceValue.length === 0 ? defaultPrice : variantPriceValue[0],
        label
      )
    );
    dispatch(CreateBookmarkAction(wishlist_product_id, wishlist_product_uuid));
    alert.success("Item Added to Wishlist");
  };

  //--------buy handler
  const buyHandler = () => {
    dispatch(
      addItemsToCart(
        id,
        quentity,
        variantPriceValue.length === 0 ? defaultPrice : variantPriceValue[0],
        label
      )
    );
    Navigate("/cart");
  };

  // --------------------this is for ratings-------------------

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    dispatch(createReview(rating, comment, product && product._id));

    setOpen(false);
  };

  // // --------------------this is for ratings End-------------------

  const [imgIndex, setImgIndex] = useState(0);

  const imgSlideFun = (i) => {
    setImgIndex(i);
  };

  useMemo(() => {
    dispatch(getProductDetails(id));
    if (productType === "Variable product") {
      dispatch(getProductPostMeta(productUuid));
    }
  }, [dispatch, id, productUuid && productUuid, productType && productType]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (reverror) {
      alert.error(reverror);
      dispatch(reviewsClearError());
    }
    if (success) {
      alert.success("Review add successfully submited");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, alert, success, reverror]);

  return (
    <>
      {loding ? (
        <Loader />
      ) : (
        <>
          <div className="product-page">
          <section className="section-cont prod-details-page">
            <div className="product-cont">
              <div className="product-single">
                <div className="product-main">
                  <div className="product-main-left">
                    <div className="product-gallery">
                      <div className="main-product-gallery">
                        <div className="main-product-gallery-left">
                          <ImageLightbox
                            images={product && product.product_images}
                            imgSlideFun={imgSlideFun}
                          />
                        </div>
                        <div className="main-product-gallery-right">
                          <ImageSlider
                            product={product && product}
                            imgIndex={imgIndex}
                            imgSlideFun={imgSlideFun}
                            variantPriceValue={variantPriceValue}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-main-right">
                    <div className="product-details">
                      <Details
                        product={product && product}
                        setVariantPriceValue={setVariantPriceValue}
                        variantPriceValue={variantPriceValue}
                        setLabel={setLabel}
                      />
                      <div className="product-purchase">
                        <AddQuantitBtns
                          decreaseQuantity={decreaseQuantity}
                          quentity={quentity}
                          increaseQuantity={increaseQuantity}
                        />
                        <AddToCartBtn
                          product={product}
                          addToCartHandler={addToCartHandler}
                        />
                      </div>
                      <div className="prod-wish">
                        <Button onClick={buyHandler}>Buy Now</Button>
                      </div>
                    </div>
                    <AddReview
                      addToWishtHandler={addToWishtHandler}
                      submitReviewToggle={submitReviewToggle}
                      open={open}
                      setRating={setRating}
                      rating={rating}
                      comment={comment}
                      setComment={setComment}
                      reviewSubmitHandler={reviewSubmitHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="product-review-main">
            <div className="product-des-and-rate">
              <div className="product-des-and-rate-tab">
                <ul>
                  <li
                    className={showContent ? "prod-active-class" : null}
                    onClick={() => setShowContent(true)}
                  >
                    Description
                  </li>
                  <li
                    className={!showContent ? "prod-active-class" : null}
                    onClick={() => setShowContent(false)}
                  >
                    Reviews (
                    {product && product.reviewsids && product.reviewsids.length}
                    )
                  </li>
                </ul>
              </div>
              <div className={showContent ? "prod-des-show" : "prod-des-hide"}>
                <SinglePageArticle product={product} />
              </div>
              <div
                className={
                  !showContent
                    ? "prod-des-show -review-area"
                    : "prod-des-hide -review-area"
                }
              >
                <h2>REVIEWS</h2>

                <div className="review-cont">
                  <ReviewStar product={product} />

                  <div className="rev-col">
                    {product &&
                    product.reviewsids &&
                    product.reviewsids.length > 0 ? (
                      <>
                        <div className="review-row">
                          {product.reviewsids.map((review, i) => {
                            return (
                              <ReviewCard
                                key={i}
                                review={review}
                                length={
                                  product &&
                                  product.reviewsids &&
                                  product.reviewsids.length
                                }
                              />
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <p className="noReview">NO Reviews yest</p>
                    )}
                  </div>
                </div>
              </div>
              <RelatedProducts product={product} />
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
