import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/loader/Loader";
// import { clearErrors, getOrderDetails } from "../../../actions/OrderAction";
import { NavLink, useParams } from "react-router-dom";
import TimeAndDate from "../../layout/time/TimeAndDate";
import MetaData from "../../layout/metaData/MetaData";
// import { getPaymentData } from "../../../actions/Paymentaction";
import { FaRegCheckCircle } from "react-icons/fa";
import Currency from "../../layout/currency/Currency";

export const OrderDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.orderDetails);

  let { shippingInfo, paymentInfo, orderItem } = orders ? orders : {};
  console.log(orders);

  useEffect(() => {
    if (error) {
      alert.error(error);
      // dispatch(clearErrors());
    }
    // dispatch(getOrderDetails(id));
    // dispatch(getPaymentData());
  }, [dispatch, error, alert, id]);

  return (
    <>
      <MetaData
        title={"My Order Details"}
        content={"My Order Details"}
        keywords={"My Order Details"}
      />
      <section className="section-cont">
        <div id="order-details" className="cont-area-h">
          {loading ? (
            <Loader />
          ) : orders && orders ? (
            <>
              <div className="order-d-page">
                <h1>Order's Details</h1>
                <div className="order-thank">
                  <FaRegCheckCircle />
                  <p>
                    <strong>THANK YOU!</strong>
                    Thank you for shopping with us. Your account has been
                    charged and your transaction is successful. We will be
                    processing your order soon.
                  </p>
                </div>

                <h2>
                  <NavLink to={`/order/${orders && orders._id}/123`}>
                    123{" "}
                  </NavLink>
                </h2>
                <div className="order-containor">
                  <div className="order-header">
                    <ul className="overview-ul">
                      <li className="overview-item">
                        <span>Order ID:</span> <strong> #{orders._id}</strong>
                      </li>
                      <li className="overview-item">
                        <span>Status:</span>{" "}
                        <strong>{orders.orderStatus}</strong>
                      </li>
                      <li className="overview-item">
                        <span>Date:</span>
                        <strong>
                          <TimeAndDate time={orders.order_info_created_date} />
                        </strong>
                      </li>
                      <li className="overview-item">
                        <span>Email: </span>{" "}
                        <strong>
                          {orders.shippingInfo && orders.shippingInfo.email}
                        </strong>
                      </li>
                      <li className="overview-item">
                        <span>Total:</span>{" "}
                        <strong>
                          <Currency price={orders.order_info_total_price} />{" "}
                        </strong>
                      </li>
                      <li className="overview-item">
                        <span>Payment Method: </span>{" "}
                        <strong>
                          {orders.paymentInfo && orders.paymentInfo.mode}
                        </strong>
                      </li>
                    </ul>
                  </div>
                  <div className="orders">
                    <h2>ORDER DETAILS</h2>
                    <div className="order-li">
                      {orderItem &&
                        orderItem.map((item, i) => {
                          return (
                            <div key={i} className="order-item">
                              <div className="order-li-item-price">
                                <p>
                                  <strong>{item.name}</strong>
                                  <span>{item.price}</span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Quantity:</strong>
                                  <span>
                                    {item.price}x{item.quantity}
                                  </span>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      <div className="order-li-item-price">
                        <p>
                          <strong>GST:</strong>
                          <span>
                            {Math.ceil(orders && orders.order_info_gst)}
                          </span>
                        </p>
                      </div>
                      <div className="order-li-item-price">
                        <p>
                          <strong>Shipping Price:</strong>
                          <span>{orders && orders.shippingPrice}</span>
                        </p>
                      </div>
                      <div className="order-li-item-price">
                        <p>
                          <strong>Payment method:</strong>
                          <span>
                            {orders.paymentInfo && orders.paymentInfo.mode}
                          </span>
                        </p>
                      </div>
                      <div className="order-li-item-price order-li-border">
                        <p>
                          <strong>Total:</strong>
                          <span>{orders && orders.order_info_total_price}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="order-details">
                    <div className="billing-details">
                      <h2>Billing details</h2>
                      <div className="Billing-details-area">
                        {shippingInfo && shippingInfo ? (
                          <>
                            <p>{shippingInfo.fullName}</p>
                            <p>{shippingInfo.phoneNo}</p>
                            <p>{shippingInfo.address}</p>
                            <p>{shippingInfo.city}</p>
                            <p>{shippingInfo.pinCode}</p>
                            <p>{shippingInfo.state}</p>
                            <p>{shippingInfo.country}</p>
                          </>
                        ) : (
                          <p>Shipping details not found</p>
                        )}
                        <p>
                          <span>Shipping charges</span>
                          <span>{orders.shippingPrice}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pay-mode">
                      <h2>Payment via</h2>

                      <div className="pay-mod-details">
                        {paymentInfo && paymentInfo ? (
                          <>
                            <p>
                              <span>Mode:</span>
                              <span>{paymentInfo.mode}</span>
                            </p>
                            <p>
                              <span>Payment Id:</span>
                              <span>{paymentInfo.id}</span>
                            </p>
                            <p>
                              <span>Payment status:</span>
                              <span>{paymentInfo.status}</span>
                            </p>
                          </>
                        ) : (
                          <p>Ooops.. Data not found</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Order not fond</p>
          )}
        </div>
      </section>
    </>
  );
};
