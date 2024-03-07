import React, { useEffect, useState } from "react";
import { CartItemCart } from "./assets/CartItemCart";
import QunContBtn from "./assets/QunContBtn";
import { SubTotal } from "./assets/SubTotal";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import RemoveItem from "./assets/RemoveItem";
import "./cart.css";
import MetaData from "../layout/metaData/MetaData";
import Currency from "../layout/currency/Currency";

const Cart = () => {
  const Navigate = useNavigate();
  const { cartItem } = useSelector((state) => state.cart);
  const [cItem, setCitem] = useState(0);
console.log(cItem)
 
  const checkOutEvent = () => {
    Navigate("/shipping");
  };

  useEffect(() => {
    setCitem(cartItem.length);
  }, [cartItem]);

  return (
    <>
      <MetaData title={"My cart"} content={"My cart"} keywords={"My cart"} />
      <section className="section-cont">
        <div id="cart-cont" className="cont-area-h">
          {cItem === 0 ? (
            <>
              <div className="cart-emty">
                <h1>Cart is Emty</h1>
                <p>
                  <NavLink to={"/shop"}>View product</NavLink>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="page-cart">
                <div className="cart-page-header">
                  <h1>Your Shopping Cart</h1>
                </div>
                <div className="cart-containor">
                  {cartItem &&
                    cartItem.map((item, i) => (
                      <div className="cart-cart-cont" key={i}>
                        <CartItemCart item={item} />
                        <QunContBtn item={item} />
                        <SubTotal item={item.price} quantity={item.quantity} />
                        <RemoveItem item={item} />
                      </div>
                    ))}
                </div>
                <div className="gross-profit">
                  <div className="groos-profit-row">
                    <Currency
                      price={cartItem.reduce((acc, item) => {
                        return acc + item.quantity * item.price;
                      }, 0)}
                    />
                  </div>
                  <div className="checkout-btn">
                    <button onClick={checkOutEvent}>Checkout</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
