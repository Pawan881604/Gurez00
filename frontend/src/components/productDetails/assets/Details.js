import React, { useEffect, useState } from "react";
import { CiHome } from "react-icons/ci";
import { NavLink, useParams } from "react-router-dom";
import { StarComponent } from "./StarComponent";
import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import Currency from "../../layout/currency/Currency";
const Details = ({
  product,
  setVariantPriceValue,
  variantPriceValue,
  setLabel,
}) => {
  const { loading, postmeta } = useSelector((state) => state.postMeta);
  const [label_toggle,set_label_toggle]= useState(true)
  //review lenght
  const reviewLength =
    product && product.reviewsids && product.reviewsids.length;
  const sum =
    product && product.reviewsids
      ? product.reviewsids.reduce((acc, review) => acc + review.rating, 0)
      : 0;
  // average of review
  const average = sum / reviewLength;

  const formattedPrice = new Intl.NumberFormat("en-IN").format(
    parseFloat(product && product.product_regular_price)
  );
  const formattedMaxPrice = new Intl.NumberFormat("en-IN").format(
    parseFloat(product && product.product_sale_price)
  );

  const sale_price = product && product.product_sale_price;
  const regular_price = product && product.product_regular_price;
  // if has variant defalut value

  const [labelValue, setLabelValue] = useState("");
  const DefaultValueFun = (labelValue) => {
    let value = [];

    postmeta &&
      postmeta.meta_value &&
      postmeta.meta_value.filter((item, i) => {
        const key = Object.keys(item);

        if (key[0] === labelValue) {
          value[0] = item[key][0].sale_price;
          value[1] = item[key][0].regular_price;
        }
      });
    return value;
  };

  useEffect(() => {
    if (labelValue) setVariantPriceValue(DefaultValueFun(labelValue));
  }, [labelValue && labelValue]);

  return (
    <>
      <div className="summary entry-summary">
        <div className="product-navigation">
          <ul>
            <li>
              <NavLink to={"/"}>
                <CiHome />
              </NavLink>
            </li>
            <li>
              <IoIosArrowForward />
            </li>
            <li>
              <NavLink
                to={`/product-category/${
                  product &&
                  product.product_category &&
                  product.product_category[0] &&
                  product.product_category[0].slug
                }`}
              >
                {product &&
                  product.product_category &&
                  product.product_category &&
                  product.product_category[0] &&  product.product_category[0].name}
              </NavLink>
            </li>
            <li>
              <IoIosArrowForward />
            </li>
            <li>{String(product && product.product_name).substr(0, 15)}...</li>
          </ul>
        </div>
        <h1 className="product_title entry-title">
          {product && product.product_name}
        </h1>
        <div className="product_meta">
          <span>
            <b>Id:</b> #{product && product._id}
          </span>
          <span>
            <b>CATEGORY:</b>

            {product && product.product_subcategory !== null
              ? product &&
                product.product_subcategory &&
                product.product_subcategory.map((item, i) => (
                  <>
                    <NavLink
                      key={i}
                      to={`/product-category/${
                        product.product_category[0] &&
                        product.product_category[0].slug
                      }/${item.slug}`}
                    >
                      {item.name}
                    </NavLink>
                    ,
                  </>
                ))
              : null}

            <NavLink
              to={
                product && product.product_subcategory !== null
                  ? `/product-category/${
                      product &&
                      product.product_category &&
                      product.product_category.slug
                    }/${
                      product &&
                      product.product_subcategory &&
                      product.product_subcategory.slug
                    }`
                  : `/product-category/${
                      product &&
                      product.product_category &&
                      product.product_category.slug
                    }`
              }
            >
              {product && product.product_subcategory !== null
                ? product &&
                  product.product_subcategory &&
                  product.product_subcategory.name
                : product &&
                  product.product_category &&
                  product.product_category.name}
            </NavLink>
          </span>
        </div>
        <div className="product-price row">
          <p>
            <span>
              <Currency price={formattedMaxPrice} />
            </span>
          </p>
          <p>
            <span>
              <Currency price={formattedPrice} />
            </span>
          </p>
        </div>
        <div className="ratings">
          <StarComponent review={average} />
          <div className="numOfReviews">
            (
            <span>
              {product && product.reviewsids && product.reviewsids.length}
            </span>
            <span>Reviews</span> )
          </div>
        </div>
        <div className="short-description">
          <div
            dangerouslySetInnerHTML={{
              __html: product && product.product_description,
            }}
          />
        </div>
        {product && product.product_Type !== "Variable product" ? (
          <div className="price">
            <p>
              <ins></ins>
              <span>₹{formattedMaxPrice}.00</span>-
              <del>
                <span> ₹{formattedPrice}.00</span>
              </del>
            </p>
          </div>
        ) : (
          <div className="variations">
            <div className="label">
              <label>{postmeta && postmeta.meta_key}</label>
              <select onClick={(e) => { setLabel(e.target.value); set_label_toggle(false); }} onChange={(e) => setLabelValue(e.target.value)}>
                <option value={""}>Choose one</option>
                {postmeta &&
                  postmeta.meta_value &&
                  postmeta.meta_value.map((item, i) => {
                    const key = Object.keys(item)[0];
                    const productValue = product && product.Default_value;
                    const selectedIndex = postmeta.meta_value.findIndex(
                      (item, j) => {
                        const key = Object.keys(item)[0];

                        return key === productValue;
                      }
                    );
                    
                   if(i === selectedIndex && label_toggle ){
                    setLabel(key)
                   }
                    return (
                      <option  key={i} selected={i === selectedIndex}>
                        {key}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="variation-price">
              <span>
                {" "}
                <ins>
                  <Currency
                    price={
                      variantPriceValue.length === 0
                        ? sale_price
                        : variantPriceValue[0]
                    }
                  />
                </ins>
              </span>
              <span>
                <del>
                  <Currency
                    price={
                      variantPriceValue.length === 0
                        ? regular_price
                        : variantPriceValue[1]
                    }
                  />
                </del>
              </span>
            </div>
          </div>
        )}
        <div className="stocks-q">
          <p>
            status:
            <b
              style={{
                color: `${
                  product && product.product_Stock === false ? "red" : "#73c631"
                }`,
              }}
            >
              {product && product.product_Stock === false
                ? "Out of stock"
                : "Instock"}
            </b>
          </p>
        </div>
      </div>
    </>
  );
};

export default Details;
