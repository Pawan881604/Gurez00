import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { ClearError, getProduct } from "../../actions/ProductAction";
import Loader from "../layout/loader/Loader";
import ProductCard from "../home/assets/ProductCard";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import { FaAlignLeft } from "react-icons/fa6";
import Asidebar from "../layout/aside/Asidebar";
import MetaData from "../layout/metaData/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../actions/CategoreAction";

const Shop = () => {
  const { shop } = useParams();

  const Navigate = useNavigate();
  const { loding, products, productsCount, error, resultPerPage } = useSelector(
    (state) => state.products
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //this use state for mob
  const [sideBarActive, setsideBarActive] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();

  //current page
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // categories
  const [categorie, setCategories] = useState(shop === "shop" ? "" : shop);
  const categories = ["beauty item", "packing material", "pet products"];

  const categoriesHeandler = (e) => {
    // console.log(categorie)
    setCategories(e);
    setsideBarActive(false);
    Navigate(`/${e}`);
  };

  // Rating filter
  const [ratings, setRatings] = useState(0);
  const ratingsHeandle = (e, newRatings) => {
    setRatings(newRatings);
  };

  //current price
  const [price, setPrice] = useState([0, 1000]);
  const priceHeandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  //clear all filter

  const [clearFilter, setClearFilter] = useState(false);

  const clearFilterHeandler = (e) => {
    setCurrentPage(1);
    setPrice([0, 1000]);
    setCategories("");
    setRatings(0);
    setClearFilter(true);
    setsideBarActive(false);
  };

  const path = ["dolls", "animals", "shop"];

  const isShopValid = path.includes(shop);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError);
    }
    if (clearFilter) {
      setClearFilter(false);

      dispatch(getProduct(currentPage, price, categorie, ratings));
    }
    dispatch(getAllCategories());

    dispatch(getProduct(currentPage, price, ratings));

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    dispatch,
    currentPage,
    categorie,
    price,
    ratings,
    error,
    alert,
    clearFilter,
  ]);

  const mobFillterFun = () => {
    setsideBarActive(!sideBarActive);
  };

  return (
    <>
      {/* //  {isShopValid ? ( */}
      <>
        {/* <MetaData title={"Shop"} content={"Shop"} keywords={"Shop"} /> */}
        <section className="section-cont">
          <div className="product-cont-row shop-page">
            <div id="prod-cont" className="prod-cont cont-area-h">
              <aside
                className={`aside-bar-cont  ${
                  sideBarActive ? "sidebar-active" : ""
                }`}
              >
                <div className="sidebar-cont">
                  <div className="side-bar">
                    <Asidebar
                      price={price} // filter price input slider
                      inputevent={priceHeandler} // filter price event handler
                      categories={categories} // filter  categories
                      categoriesHeandler={categoriesHeandler} // filter event categoriesHeandler
                      ratingsHeandle={ratingsHeandle} //Rating filter input handler
                      ratings={ratings} // rating filter
                      clearFilterHeandler={clearFilterHeandler} //clearFilterHeandler filter input handler
                      clearFilter={clearFilter} // clearFilterHeandler usestate
                    />
                  </div>
                </div>
              </aside>
              {windowWidth < 900 ? (
                <div className="mob-filter">
                  <p onClick={mobFillterFun}>
                    <FaAlignLeft /> Filter
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              <div className="prod-cont-row p-sho-cont">
                {loding ? (
                  <Loader />
                ) : (
                  <>
                    {products &&
                      products.filter(item=>item.productstatus==="Active").map((product, i) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
      {/* ) : (
        Navigate("/404")
      )} */}

      {resultPerPage < productsCount && (
        <div className="pagination-box">
          <Pagination
            totalItemsCount={productsCount}
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-items"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </>
  );
};

export default Shop;
