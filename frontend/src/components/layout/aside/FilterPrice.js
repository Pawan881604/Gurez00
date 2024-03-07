import React from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const FilterPrice = ({ inputevent, price }) => {
  return (
    <>
      <Typography>Price</Typography>
      <div className="price-filter-cont">
        <p>
          <span>₹ {price[0]}</span>-<span>₹ {price[1]}</span>
        </p>
      </div>
      <Slider
        value={price}
        onChange={inputevent}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        min={0}
        max={1000}
        //  style={sliderStyles}
      />
    </>
  );
};

export default FilterPrice;
