import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import LatestProducts from "./assets/LatestProducts";
import PopularProduct from "./assets/PopularProduct";

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

  return (
    <>
      <section id="homepage" className="section-cont ">
      <div className="coll-title">
        {/* <h2>Latest Products</h2> */}
      </div>
        <div className=" prod-cont cont-area-h  sell-div" >
         <div> <h2 style={{marginBottom:"20px"}}>Sale Products</h2>
          <LatestProducts products={products} /></div>
         <div> <h2 style={{marginBottom:"20px"}}>Latest Products</h2>
          <LatestProducts products={products} /></div>
         <div>
         <h2 style={{marginBottom:"20px"}}>Best of the Week</h2> <LatestProducts products={products} /></div>
         <div>
         <h2 style={{marginBottom:"20px"}}>Popular</h2> <LatestProducts products={products} /></div>
       


        </div>
      </section>
    </>
  );
};

export default SaleSection;