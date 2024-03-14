import React from "react";
import { FaCartArrowDown } from "react-icons/fa6";
import TimeAndDate from "../../layout/time/TimeAndDate";
import { NavLink } from "react-router-dom";
import Currency from "../../layout/currency/Currency";
export const OrderCard = ({ orders }) => {
  console.log(orders);
  return (
    <>
      <div className="order-card-containor">
        <div className="order-card-row">
          {orders &&
            orders.map((item, i) => (
              <div key={i} className="order-card">
                <NavLink to={`/order/${item._id}`}>
                  <div
                    className={`order-card-inner-row ${
                      item.order_info_status === "Processing"
                        ? "process"
                        : item.order_info_status === "Shipped"
                        ? "shipped"
                        : item.order_info_status === "Delivered"
                        ? "delivered"
                        : item.order_info_status === "Cancle"
                        ? "cancle"
                        : item.order_info_status === "Return"
                        ? "return"
                        : null
                    }`}
                  >
                    <div className="order-id">
                      <span>
                        <FaCartArrowDown />
                      </span>
                      <span>#{item._id}</span>
                    </div>
                    <div className="order-card-status">
                      <span>{item.order_info_status}</span>
                      <span>
                        <Currency price={item.order_info_total_price} />{" "}
                      </span>
                      <span>{item.order_info_total_order_quantity}</span>
                      <TimeAndDate time={item.order_info_created_date} />
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};