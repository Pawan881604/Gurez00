import React, { useEffect, useMemo } from "react";
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
import {
  getOrderDetails,
  order_details_info,
  order_shipping_info,
} from "../../../actions/OrderAction";
import { get_payment_info } from "../../../actions/Paymentaction";

export const OrderDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, orders, shiping_info, order_details, error } = useSelector(
    (state) => state.orderDetails
  );
  const { payment_info } = useSelector((state) => state.payment);
  console.log(orders);

  let { shippingInfo, paymentInfo } = orders ? orders : {};

  const orderItem = order_details && order_details.product_Items;

  useMemo(() => {
    dispatch(getOrderDetails(id));
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      // dispatch(clearErrors());
    }

    dispatch(order_shipping_info(orders && orders.order_info_uuid));
    dispatch(order_details_info(orders && orders.order_info_uuid));
    dispatch(get_payment_info(orders && orders.order_info_uuid));
  }, [dispatch, error, alert, id, orders]);

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
                        <strong>{orders.order_info_status}</strong>
                      </li>
                      <li className="overview-item">
                        <span>Date:</span>
                        <strong>
                          <TimeAndDate time={orders.order_info_created_date} />
                        </strong>
                      </li>
                      <li className="overview-item">
                        <span>Email: </span>{" "}
                        <strong>{orders.user && orders.user.email}</strong>
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
                          {orders.order_info_mode && orders.order_info_mode}
                        </strong>
                      </li>
                    </ul>
                  </div>
                  <div className="orders">
                    <h2>ORDER DETAILS</h2>
                    <div className="order-li">
                      <h2>Products</h2>
                      {orderItem &&
                        orderItem.map((item, i) => {
                          return (
                            <div key={i} className="order-item">
                              <div className="order-li-item-price">
                                <p>
                                  <strong>
                                    {item.name}
                                    <br></br>
                                    <b style={{ fontWeight: 400 }}>
                                      {item.label}
                                    </b>
                                  </strong>
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
                          <span>
                            {orders && orders.order_info_shipping_charges}
                          </span>
                        </p>
                      </div>
                      <div className="order-li-item-price">
                        <p>
                          <strong>Payment method:</strong>
                          <span>
                            {orders.order_info_mode && orders.order_info_mode}
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
                        {shiping_info && shiping_info ? (
                          <>
                            <div className="order-item">
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Name</strong>
                                  <span>{shiping_info.fullName}</span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Phone No.</strong>
                                  <span>{shiping_info.phoneNo}</span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Address</strong>
                                  <span>{shiping_info.address}</span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>City</strong>
                                  <span>{shiping_info.city}</span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Pincode</strong>
                                  <span>{shiping_info.pinCode}</span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>State</strong>
                                  <span>{shiping_info.state}</span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>country</strong>
                                  <span>{shiping_info.country}</span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>State</strong>
                                  <span>{shiping_info.state}</span>
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <p>Shipping details not found</p>
                        )}
                      </div>
                    </div>

                    <div className="pay-mode">
                      <h2>Payment via</h2>

                      <div className="pay-mod-details">
                        {payment_info && payment_info ? (
                          <>
                           <div className="order-item">
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Mode</strong>
                                  <span>{payment_info.payment_type}</span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Payment Id</strong>
                                  <span>
                                {payment_info &&
                                  payment_info.paynent_response &&
                                  payment_info.paynent_response[0].id}
                              </span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Payment status</strong>
                                  <span>{payment_info.payment_info_status}</span>
                                </p>
                              </div>
                              </div>
                          
                          
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