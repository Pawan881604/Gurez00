import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearError,
  getCategorie,
  getProduct,
} from "../../actions/ProductAction";
import ProductCard from "../home/assets/ProductCard";
import "./style.css";
import Loader from "../layout/loader/Loader";
import { FaAngleRight } from "react-icons/fa6";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import MetaData from "../layout/metaData/MetaData";
import { FaAlignLeft } from "react-icons/fa6";
import Asidebar from "../layout/aside/Asidebar";
import ErrorPage from "../404Page/ErrorPage";
import { getAllCategories } from "../../actions/CategoreAction";

const SubCategory = () => {
  const { category, id } = useParams();
  const subcategory = id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading: catLoading,
    allcategroes,
    error: caterror,
  } = useSelector((state) => state.allCategroe);

  const { loding, products, productsCount, error, resultPerPage } = useSelector(
    (state) => state.products
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //this use state for mob
  const [sideBarActive, setsideBarActive] = useState(false);

  //current page
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // categories
  const [categorie, setCategories] = useState("");
  const categories = ["beauty item", "packing material", "pet products"];

  const categoriesHeandler = (e) => {
    // console.log(categorie)
    setCategories(e);
    setsideBarActive(false);
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
    setCategories(category);
    setRatings(0);
    setClearFilter(true);
    setsideBarActive(false);
  };

  const mobFillterFun = () => {
    setsideBarActive(!sideBarActive);
  };

  //---------- filter categore by url

  const catArray = [...allcategroes];
  const cat = catArray.find((item) => item.slug === category);
  const subCatArray = cat;
  const subcat =
    subCatArray &&
    subCatArray.childs &&
    subCatArray.childs.find((item) => item.slug === subcategory);
  const isValidCategory = cat && cat;
  const isValidId = isValidCategory && subcat && subcat;
  //---------- filter categore by url end

  useMemo(() => {
    if (
      !catLoading &&
      ((isValidCategory ?? []).length === 0 || (isValidId ?? []).length === 0)
    ) {
      navigate("/404");
    }
  }, [isValidCategory, catLoading]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError);
    }
    if (clearFilter) {
      setClearFilter(false);

      dispatch(
        getProduct(
          currentPage,
          price,
          ratings,
          cat && cat._id,
          subcat && subcat._id
        )
      );
    }
    dispatch(getAllCategories());
    // dispatch(getCategorie(currentPage, category));
    dispatch(
      getProduct(
        currentPage,
        price,
        ratings,
        cat && cat._id,
        subcat && subcat._id
      )
    );
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
    category,
    subcategory,
    alert,
    currentPage,
    error,
    price,
    ratings,
  ]);

  let productCategory = "";
  if (products) {
    for (let i = 0; i < products.length; i++) {
      productCategory = products[0].category;
    }
  }

  return (
    <>
      {/* <MetaData
            title={productCategory}
            content={productCategory}
            keywords={productCategory}
          /> */}
      {/* <MetaData title={'Product'} /> */}
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
                  {catLoading ? (
                    <Loader />
                  ) : (
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
                  )}
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
                    products
                      .filter((item) => item.productstatus === "Active")
                      .map((product, i) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

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

export default SubCategory;
