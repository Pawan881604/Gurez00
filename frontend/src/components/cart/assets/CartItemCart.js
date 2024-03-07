import React from "react";
import { NavLink } from "react-router-dom";
import Currency from "../../layout/currency/Currency";

export const CartItemCart = ({ item }) => {
  return (
    <>
      <div className="cart-img">
        <img src={item.image} alt="imagesss" />
      </div>
      <div className="cart-title">
        <p>
          <NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
        </p>
      </div>
      <div className="cart-price">
        <Currency price={item.price} />
      </div>
    </>
  );
};
