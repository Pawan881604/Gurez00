import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import LatestProducts from "./assets/LatestProducts";
import PopularProduct from "./assets/PopularProduct";
import ReviewAnimation from "../layout/loader/ReviewAnimation";

const SaleSection = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loding, error, products, newproducts } = useSelector(
    (state) => state.products
  );
  console.log(products);
  const { error: fProductError, product: t_s_product } = useSelector(
    (state) => state.productFeature
  );
  const length = [1, 2, 3, 4];
  return (
    <>
      <section id="homepage" className="section-cont ">
        <div className=" prod-cont cont-area-h  sell-div">
          <div className="Latest-content">
            <h2 style={{ marginBottom: "20px" }}>Sale Products</h2>
            {loding ? (
              length.map((item, i) => <ReviewAnimation key={i} />)
            ) : (
              <LatestProducts products={products} />
            )}
          </div>
          <div className="Latest-content">
            {" "}
            <h2 style={{ marginBottom: "20px" }}>Latest Products</h2>
            {loding ? (
              length.map((item, i) => <ReviewAnimation key={i} />)
            ) : (
              <LatestProducts products={products} />
            )}
          </div>
          <div className="Latest-content">
            <h2 style={{ marginBottom: "20px" }}>Best of the Week</h2>{" "}
            {loding ? (
              length.map((item, i) => <ReviewAnimation key={i} />)
            ) : (
              <LatestProducts products={products} />
            )}
          </div>
          <div className="Latest-content">
            <h2 style={{ marginBottom: "20px" }}>Popular</h2>{" "}
            {loding ? (
              length.map((item, i) => <ReviewAnimation key={i} />)
            ) : (
              <LatestProducts products={products} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SaleSection;
