import React from "react";
import { useDispatch } from "react-redux";

import { FaXmark } from "react-icons/fa6";
import { removeWishItem } from "../../../actions/wishListAction";
const RemoveWishItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeEventListener = (id) => {
    dispatch(removeWishItem(id));
  };
  return (
    <>
      <div className="wish-item-remove">
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

export default RemoveWishItem;
