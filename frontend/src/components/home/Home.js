import React, { useEffect } from "react";
import HeroSection from "./assets/HeroSection";
import "./style.css";
import {
  ClearError,
  featureProduct,
  getProduct,
} from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Product from "./assets/ProductCard";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import { CategorySection } from "./assets/CategorySection";
import CoupenSection from "./assets/CoupenSection";
import MetaData from "../layout/metaData/MetaData";
import Cards from "./assets/Cards";
import HeroSlider from "./assets/HeroSlider";
import NewProducts from "./assets/NewProducts";
import SaleSection from "./SaleSection";
import ProductAnimation from "../layout/loader/ProductAnimation";
import Deli from "./assets/Deli";

export const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loding, error, products, newproducts } = useSelector(
    (state) => state.products
  );
  const { error: fProductError } = useSelector((state) => state.productFeature);
  const length = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (fProductError) {
      alert.error(error);
      dispatch(ClearError());
    }
    dispatch(getProduct());
    // dispatch(featureProduct());
  }, [dispatch, error, alert, fProductError]);

  return (
    <>
      <MetaData
        title={"Home"}
        content={"Discover toy fectory"}
        keywords={"toys"}
      />
      {/* {loding ? (
        <Loader />
      ) : (
        <> */}
      {/* <HeroSection />  */}
      <HeroSlider />
      <Cards />
      {/* <CategorySection /> */}

      <section id="homepage" className="section-cont">
        <div className="coll-title">
          <h2>New Products</h2>
        </div>
        <div id="prod-cont" className="prod-cont cont-area-h">
          <div className="row flex-wrap">
            {loding
              ? length.map((item, i) => <ProductAnimation key={i} />)
              : newproducts &&
                newproducts
                  .slice(0, 8)
                  .filter((item) => item.productstatus === "Active")
                  .map((product, i) => (
                    <div className="card-col prod-collem" key={i}>
                      <NewProducts product={product} />
                    </div>
                  ))}
          </div>
        </div>
      </section>

      <section id="homepage" className="section-cont">
        <div className="img-containor">
          <div id="prod-cont" className="prod-cont cont-area-h">
            <div className="prod-cont-row grid-container">
              <div>
                <img src="./Beauty-Care.jpg" alt="Beauty-Care" />
              </div>
              <div>
                <img src="./Beauty-Care.jpg" alt="Beauty-Care" />
              </div>
              <div>
                <img src="./Beauty-Care.jpg" alt="Beauty-Care" />
              </div>
              <div>
                <img src="./Beauty-Care.jpg" alt="Beauty-Care" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CoupenSection />
      <section id="homepage" className="section-cont">
        <div className="coll-title">
          <h2>Feature Products</h2>
        </div>

        <div id="prod-cont" className="prod-cont cont-area-h">
          <div className="row flex-wrap">
            {loding
              ? length.map((item, i) => <ProductAnimation key={i} />)
              : products &&
                products
                  .slice(0, 8)
                  .filter((item) => item.productstatus === "Active")
                  .map((product, i) => (
                    <div className="card-col prod-collem" key={i}>
                      <Product product={product} />
                    </div>
                  ))}
          </div>
        </div>
      </section>
      <SaleSection />
      <Deli />
      {/* </>
      )} */}
    </>
  );
};
