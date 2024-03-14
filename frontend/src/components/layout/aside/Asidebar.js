import React from "react";
import FilterPrice from "./FilterPrice";
import Categories from "./Categories";
import RatingsFilter from "./RatingsFilter";
import "./style.css";
import { FaGripLines } from "react-icons/fa6";
import ClearFilter from "./ClearFilter";

const Asidebar = ({
  //------------props
  inputevent,
  price,
  
  ratingsHeandle,
  ratings,
  clearFilterHeandler,
  clearFilter,
}) => {
  return (
    <>
      <div className="aside-filter">
        <div className="inner-aside-filter">
          <span>
            <FaGripLines />
          </span>
          <span>Filter</span>
        </div>
        <hr />
      </div>
      <div className="mob--cont">
        <div className="aside-price-categories">
          <Categories
     
           
            clearFilter={clearFilter}
          />
        </div>
        <div className="aside-price-filter">
          <FilterPrice price={price} inputevent={inputevent} />
        </div>
        <RatingsFilter ratingsHeandle={ratingsHeandle} ratings={ratings} />
        <ClearFilter
          clearFilterHeandler={clearFilterHeandler}
          clearFilter={clearFilter}
        />
      </div>
    </>
  );
};

export default Asidebar;
