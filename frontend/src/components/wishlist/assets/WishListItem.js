import React from "react";
import LazyLoadImages from "../../layout/lazyload/LazyLoadImages";
import RemoveWishItem from "./RemoveWishItem";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../../actions/cartAction";
export const WishListItem = ({ item }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const buyNow = (id, qunty) => {
    dispatch(addItemsToCart(id, qunty));
    Navigate("/cart");
  };
  const formattedPrice = new Intl.NumberFormat('en-IN').format(parseFloat(item.price));
  return (
    <>
      <div className="w-item">
        <LazyLoadImages product={item} />

        <div className="w-item-tittle">
          <h2>
            <NavLink to={`/shop/${item.category}/${item.link}`}>
              {item.name}
            </NavLink>
          </h2>
        </div>
        <div className="w-item-fun">
          <RemoveWishItem item={item} />
          <div>₹{formattedPrice}.00</div>
          <div><Button onClick={() => buyNow(item.link, 1)}>Buy now</Button></div>
        </div>
      </div>
    </>
  );
};
