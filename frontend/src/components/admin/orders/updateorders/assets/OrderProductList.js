import React, { useEffect } from "react";

const OrderProductList = ({ orders }) => {

  return (
    <>
      {orders &&
        orders.map((item, i) => (
          <div className="order-item-area-cont" key={i}>
            <div className="order-item-area">
              <div className="order-img-area">
                <img src={`http://localhost:8000/${item.image}`} alt={i} />
              </div>
              <div className="order-item-content-area">
                <div className="order-item-name">
                  <p>{item.name}</p>
                </div>
                <div className="order-item-price">
                  <span>{item.price}</span>
                  <span>x</span>
                  <span>{item.quantity}:</span>
                  <span>{item.price * item.quantity}</span>
                </div>
              </div>
            </div>
            <div className="order-item-amount-total">
              <div className="order-item-subtotal">
                <span>Items Subtotal: </span>{" "}
                <span>{item.price * item.quantity}</span>
              </div>
              <div className="order-item-subtotal">
                <span>Shipping: </span>
                <span>₹0.00</span>
              </div>
              <div className="order-item-subtotal">
                <span>Order Total: </span>
                <span>{item.price * item.quantity + 0}</span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default OrderProductList;
