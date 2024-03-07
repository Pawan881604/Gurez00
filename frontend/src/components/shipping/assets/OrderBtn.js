import React, { useState } from "react";
import "./orderBtn.css";
export const OrderBtn = ({ paymentHeandleCod }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        paymentHeandleCod(e);
      }, 10000);
    }
  };

  const orderClassName = isAnimating ? "order animate" : "order";

  return (
    <>
      <button className={orderClassName} onClick={handleClick}>
        <span className="default">Place Order</span>
        <span className="success">
          Order Placed
          <svg viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <div className="box"></div>
        <div className="truck">
          <div className="back"></div>
          <div className="front">
            <div className="window"></div>
          </div>
          <div className="light top"></div>
          <div className="light bottom"></div>
        </div>
        <div className="lines"></div>
      </button>
    </>
  );
};
