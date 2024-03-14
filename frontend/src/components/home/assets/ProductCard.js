import { Link, NavLink, useNavigate } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import LazyLoadImages from "../../layout/lazyload/LazyLoadImages";
import { CiHeart } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import {
  wishListAction,
  CreateBookmarkAction,
} from "../../../actions/wishListAction";
import Currency from "../../layout/currency/Currency";
import { useState } from "react";
import QuickView from "./producquickview/QuickView";
import { v4 as uuidv4, v4 } from "uuid";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const options = {
    value: product.ratings,
    precision: 0.5,
    size: "medium",
    readOnly: true,
  };

  const [quickOpen, setQuickOpen] = useState(false);
  const productId = product._id;

  const buyNow = (id, quentity) => {
    dispatch(addItemsToCart(id, quentity));

    // Navigate("/cart");
  };

  const date = new Date(String(product.createdate).substr(0, 10));
  const currentDate = new Date();
  const timeDifferent = Math.abs(currentDate - date);

  const wishlist_product_uuid = uuidv4();
  const wishlist_product_id = product._id;

  const addToWishtHandler = (id,price) => {
    dispatch(wishListAction(id,price));
    dispatch(CreateBookmarkAction(wishlist_product_id, wishlist_product_uuid));
    // alert.success("Item Added to Wishlist");
  };

  return (
    <>
      {quickOpen && (
        <QuickView productId={productId} setQuickOpen={setQuickOpen} />
      )}
      <div className="product-card">
        <div className="product-card-row">
          <div className="prod-img-cont">
            <div className="prod-card-img">
              <LazyLoadImages
                product={
                  product && product.product_images && product.product_images[0]
                }
              />
              <div className="prod-wish">
                <p onClick={() => setQuickOpen(true)}>Quick View</p>
              </div>
              <div className="prod-cart">
                <IoBagCheckOutline
                  onClick={() => buyNow(product._id && product._id, 1)}
                />
              </div>
              <div className="prod-wishs">
                <CiHeart
                  onClick={() => addToWishtHandler(product._id && product._id,product.product_sale_price)}
                />
              </div>
            </div>
            <div className="product-discount">
              {product.product_regular_price ? (
                <span>
                  {Math.abs(
                    (
                      ((product.product_sale_price - product.product_regular_price) / product.product_regular_price) *
                      100
                    ).toFixed(1)
                  )}
                  % OFF
                </span>
              ) : null}
            </div>

            <div className="product-nO">
              {Math.floor(timeDifferent / (1000 * 60 * 60 * 24)) < 15 ? (
                <span>new</span>
              ) : null}
            </div>
          </div>
          <div className="product-details">
            <div className="product-cat space-set">
              <p>
                {product.product_subcategory &&
                  product.product_subcategory.map((item, i) => (
                    <span key={i}>
                    
                      <NavLink
                   
                        to={`/product-category/${
                          product.product_category[0] &&
                          product.product_category[0].slug
                        }/${item.slug}`}
                      >
                        {item.name}
                      </NavLink>
                      ,
                    </span>
                  ))}
              </p>
            </div>
            <div className="product-price space-set">
              <p>
                <span>
                  <Currency
                    price={product.product_regular_price}
                  />
                </span>
                -
                <span>
                  <Currency
                    price={product.product_sale_price}
                  />
                </span>
              </p>
            </div>
            <h3>
              <Link
                className="product-card space-set font-size-cont"
                to={`/product/${product.slug}`}
              >
                {product.product_name.substr(0, 50)}...
              </Link>
            </h3>
            <div className="rev-are space-set">
              <Rating {...options} />
              <span className="rev-tot">
                (
                {product.reviewsids && product.reviewsids.length < 1
                  ? "No reviews"
                  : product.reviewsids && product.reviewsids.length}
                )
              </span>
            </div>
            {/* <p className="card-p">
              <NavLink
                to={`/product-category/${
                  product.category[0] && product.category[0].slug
                }`}
              >
                {product.category[0] && product.category[0].name}
              </NavLink>
            </p> */}
            {/* <div className="product-cat space-set">
              <p>
                {product.subcategory &&
                  product.subcategory.map((item, i) => (
                    <>
                      <NavLink
                      key={i}
                        to={`/product-category/${
                          product.category[0] && product.category[0].slug
                        }/${item.slug}`}
                      >
                        {item.name}
                      </NavLink>,
                    </>
                  ))}
              </p>
            </div> */}
          </div>
          {/* <div className="product-card_btn space-set">
            <button onClick={() => buyNow(product.slug, 1)}>Buy Now</button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
