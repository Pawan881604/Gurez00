import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../aside/Aside";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../layout/loader/Loader";
import {
  clearErrors,
  getMyorders,
  getOrderDetails,
  order_details_info,
  order_shipping_info,
  updateOrder,
} from "../../../../actions/OrderAction";
import UpdateOrderForm from "./assets/UpdateOrderForm";
import {
  getPaymentData,
  get_payment_info,
} from "../../../../actions/Paymentaction";
import MetaData from "../../../layout/metaData/MetaData";
import OrderAttribution from "./sidebar/OrderAttribution";

export const UpdateOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();
  const { loading, orders, error } = useSelector((state) => state.orderDetails);
  const {
    loading: update_loading,
    isUpdate,
    error: update_error,
  } = useSelector((state) => state.adminOrders);
  const { cartItem, shippingInfo: cartShippingInfo } = useSelector(
    (state) => state.cart
  );

  const [inputValue, setInputValue] = useState({
    status: "",
    name: "",
    address: "",
    city: "",
    pinCode: "",
    country: "",
    state: "",
    email: "",
    phoneNo: "",
    billingname: "",
    billingemail: "",
    billingcontact: "",
    orderid: "",
    billingorderstatus: "",
  });

  const inputChangeEventHandle = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const orderStatusSubmitHandle = (e) => {
    const {
      status,
      name,
      address,
      city,
      pinCode,
      country,
      state,
      email,
      phoneNo,
    } = inputValue;
    e.preventDefault();
    dispatch(
      updateOrder(
        id,
        status,
        name,
        address,
        city,
        pinCode,
        country,
        state,
        email,
        phoneNo,
        orders && orders.orderItem && orders.orderItem[0].link
      )
    );
  };

  useMemo(() => {
    dispatch(getOrderDetails(id));
  }, []);

  console.log(orders);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (orders) {
      setInputValue({
        name: orders && orders.shippingInfo && orders.shippingInfo.fullName,
        address: orders && orders.shippingInfo && orders.shippingInfo.address,
        city: orders && orders.shippingInfo && orders.shippingInfo.city,
        pinCode: orders && orders.shippingInfo && orders.shippingInfo.pinCode,
        state: orders && orders.shippingInfo && orders.shippingInfo.state,
        country: orders && orders.shippingInfo && orders.shippingInfo.country,
        email: orders && orders.shippingInfo && orders.shippingInfo.email,
        phoneNo: orders && orders.shippingInfo && orders.shippingInfo.phoneNo,
        status: orders && orders.order_info_status,
      });
      dispatch(get_payment_info(orders && orders.order_info_uuid));
      dispatch(order_shipping_info(orders && orders.order_info_uuid));
      dispatch(order_details_info(orders && orders.order_info_uuid));
    
    }
  }, [
    dispatch,
    error,
    alert,
    id,

    ,
    isUpdate,
    cartShippingInfo,
    orders,
    Navigate,
  ]);

  return (
    <>
      <MetaData
        title={"Admin Update Order"}
        content={"Admin Update Order"}
        keywords={"Admin Update Order"}
      />
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />

          <div id="ad-body" className="ad-body-full">
            <div className="ad-cont">
              <section className="ad-section">
                <div className="all-products-cont">
                  <div className="order-flex">
                    <div className="order-flex-left">
                      <div className="order-d-page">
                        <h1>Order's</h1>
                     
                      </div>
                      <UpdateOrderForm
                        orders={orders}
                        inputValue={inputValue}
                        inputChangeEventHandle={inputChangeEventHandle}
                        orderStatusSubmitHandle={orderStatusSubmitHandle}
                      />
                    </div>
                    <div className="order-flex-right">
                      <OrderAttribution />
                    </div>
                  </div>
                </div>
              </section>
              <section className="section-cont">
                <div id="prod-cont" className="cont-area-h"></div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
