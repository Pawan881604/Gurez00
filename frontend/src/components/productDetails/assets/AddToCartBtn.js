import { DialogActions, Button } from "@material-ui/core";
import React from "react";
import { FaHeart, FaOpencart } from "react-icons/fa6";

const AddToCartBtn = ({ product, addToCartHandler, buyHandler }) => {
  return (
    <>
      <div className="product-sticky-content">
        <DialogActions>
          <div className="addtocart-button">
            <Button
              disabled={product && product.stock < 1 ? true : false}
              onClick={addToCartHandler}
            >
              <FaOpencart className="cart-svg" />
              Add to Cart
            </Button>
          </div>
        </DialogActions>
      </div>
    </>
  );
};

export default AddToCartBtn;
