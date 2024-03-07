import { DialogActions, Button } from "@material-ui/core";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddQuantitBtns = ({ decreaseQuantity, quentity, increaseQuantity }) => {
  return (
    <>
      <div className="product-divider">
        <div className="stock-cont">
          <DialogActions>
            <Button onClick={decreaseQuantity}>
              <FaMinus />
            </Button>
          </DialogActions>
          <input value={quentity} readOnly type="number" />
          <DialogActions>
            <Button onClick={increaseQuantity}>
              <FaPlus />
            </Button>
          </DialogActions>
        </div>
      </div>
    </>
  );
};

export default AddQuantitBtns;
