import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../../actions/cartAction";
import { FaXmark } from "react-icons/fa6";

const RemoveItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeEventListener = (id) => {
    dispatch(removeCartItem(id));
  };

  return (
    <>
      <div className="cart-item-remove">
        <p
          onClick={() => {
            removeEventListener(item.productId);
          }}
        >
          <FaXmark />
        </p>
      </div>
    </>
  );
};

export default RemoveItem;
