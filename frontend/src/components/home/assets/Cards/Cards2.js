import React from "react";
import { NavLink } from "react-router-dom";
import LazyLoadImages from "../../../layout/lazyload/LazyLoadImages";
import Currency from "../../../layout/currency/Currency";
import { Rating } from "@material-ui/lab";

const Cards2 = ({ product }) => {
  const options = {
    value: product.ratings,
    precision: 0.5,
    size: "medium",
    readOnly: true,
  };

  return (
    <div className="card-containor">
      <div className="product-list-sm">
        <div className="list-sm-img">
          <LazyLoadImages
            product={
              product && product.product_images && product.product_images[0]
            }
          />
        </div>
        <div className="list-sm-title">
          <h3 style={{ margin: 0 }}>
            <NavLink style={{ fontWeight: 500 }} to={"/"}>
              {" "}
              {product.product_name}
            </NavLink>
          </h3>
          <div className="list-sm-price">
            <p>
              <span>
                <Currency price={product.product_regular_price} />
              </span>
              -
              <span>
                <Currency price={product.product_sale_price} />
              </span>
            </p>
          </div>
          <div className="list-sm-rev">
            <Rating {...options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards2;
