import React, { useEffect, useMemo, useState } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder, clearErrors } from "../../../../../actions/OrderAction";
import { UPDATE_ORDER_RESET } from "../../../../../constants/OrderConstants";
import { Button } from "@material-ui/core";
import TimeAndDate from "../../../../layout/time/TimeAndDate";
import { getProductDetails } from "../../../../../actions/ProductAction";
import Loader from "../../../../layout/loader/Loader";
import { useNavigate } from "react-router-dom";
import "./updateorder.css";
import { FaPencil } from "react-icons/fa6";
import OrderProductList from "./OrderProductList";
const UpdateOrderForm = ({ id, orders }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const { orders: ordersME } = useSelector((state) => state.myOrders);
  const { cartItem, shippingInfo: cartShippingInfo } = useSelector(
    (state) => state.cart
  );

  //   const { user } = useSelector((state) => state.user);
  //   const { loading, orders, error } = useSelector((state) => state.orderDetails);
  //   let { shippingInfo, paymentInfo, orderItem } = orders ? orders : {};

  const { loading, isUpdate, error } = useSelector(
    (state) => state.adminOrders
  );

  const [editToggle, setEditToggel] = useState(false);
  const statusArr = ["Proccessing", "Shipped", "Delivered", "Return", "Cancle"];
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

  const toggellHandel = (e) => {
    e.preventDefault();
    setEditToggel(!editToggle);
  };
  console.log(inputValue)
  useEffect(() => {
    setInputValue({
      name: orders && orders.shippingInfo && orders.shippingInfo.fullName,
      address: orders && orders.shippingInfo && orders.shippingInfo.address,
      city: orders && orders.shippingInfo && orders.shippingInfo.city,
      pinCode: orders && orders.shippingInfo && orders.shippingInfo.pinCode,
      state: orders && orders.shippingInfo && orders.shippingInfo.state,
      country: orders && orders.shippingInfo && orders.shippingInfo.country,
      email: orders && orders.shippingInfo && orders.shippingInfo.email,
      phoneNo: orders && orders.shippingInfo && orders.shippingInfo.phoneNo,
      status: orders && orders.order_info_status      ,
    });

    if (error) {
      alert.error(error);
      dispatch(clearErrors()); // Call clearErrors as a function
    }
    if (isUpdate) {
      alert.success("Update successfully");
      Navigate("/admin/orders");
      dispatch({
        type: UPDATE_ORDER_RESET,
      });
    }
  }, [alert, error, isUpdate, cartShippingInfo, orders, dispatch, Navigate]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="order-form-area" onSubmit={orderStatusSubmitHandle}>
            <h2 className="sm-font-size">Order #{orders && orders._id} details</h2>
            <p >Payment via Cash on delivery. Customer IP: 157.45.231.82</p>
            <div className="form-flex">
              <div className="form-text-area">
                <h3>General</h3>
                <div className="form-text-gen-info">
                  <p>Date created:</p>
                  <p>{<TimeAndDate time={orders && orders.order_info_created_date} />}</p>
                </div>

                <div className="form-text-gen-info-input">
                  <label htmlFor="status">Status:</label>
                  <select
                    id="status"
                    name="status"
                    value={inputValue.status}
                    onChange={inputChangeEventHandle}
                  >
                    <option value="">select status </option>
                    {statusArr.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>Customer: Profile → View other orders →</div>
              </div>
              <div className="form-input-area">
                <h4>shipping address</h4>
                <span className="edit-order-form">
                  <FaPencil onClick={toggellHandel} />
                </span>
                <div
                  className={
                    editToggle
                      ? "form-input-area-text form-hide"
                      : "form-input-area-text"
                  }
                >
                  <p>
                    <span>Name: </span>
                    {inputValue.name}
                  </p>
                  <p>
                    <span>Addreess: </span>
                    {inputValue.address}
                  </p>
                  <p>
                    <span>Pin Code: </span>
                    {inputValue.pinCode}
                  </p>
                  <p>
                    <span>State: </span>
                    {inputValue.state}
                  </p>
                  <p>
                    <span>Country: </span>
                    {inputValue.country}
                  </p>
                  <p>
                    <span>Phone no: </span>
                    {inputValue.phoneNo}
                  </p>
                  <p>
                    <span>Email: </span>
                    {inputValue.email}
                  </p>
                </div>
                <div
                  className={
                    !editToggle
                      ? "form-input-area-input form-hide"
                      : "form-input-area-input"
                  }
                >
                  <div className="input-field-area input-field-width-cont">
                    <label htmlFor="name">name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={inputValue.name}
                      onChange={inputChangeEventHandle}
                    />
                  </div>
                  <div className="input-field-area input-field-width-cont">
                    <label htmlFor="address">address</label>
                    <textarea
                      type="text"
                      name="address"
                      id="address"
                      value={inputValue.address}
                      onChange={inputChangeEventHandle}
                    ></textarea>
                  </div>
                  <div className="input-field-area input-field-width-cont">
                    <label htmlFor="city">city</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={inputValue.city}
                      onChange={inputChangeEventHandle}
                    />
                  </div>
                  <div className="input-field-area input-field-width-cont">
                    <label htmlFor="pinCode">pinCode</label>
                    <input
                      type="number"
                      name="pinCode"
                      id="pinCode"
                      value={inputValue.pinCode}
                      onChange={inputChangeEventHandle}
                    />
                  </div>
                  <div className="input-field-area input-field-width-cont">
                    <label htmlFor="state">state</label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={inputValue.state}
                      onChange={inputChangeEventHandle}
                    />
                  </div>
                  <div className="input-field-area input-field-width-cont">
                    <label htmlFor="country">country</label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={inputValue.country}
                      onChange={inputChangeEventHandle}
                    />
                  </div>
                  <div className="input-field-area input-field-width-cont">
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={inputValue.email}
                      onChange={inputChangeEventHandle}
                    />
                  </div>
                  <div className="input-field-area input-field-width-cont">
                    <label htmlFor="phoneNo">phoneNo</label>
                    <input
                      type="number"
                      name="phoneNo"
                      id="phoneNo"
                      value={inputValue.phoneNo}
                      onChange={inputChangeEventHandle}
                    />
                  </div>
                </div>
            
              </div>
            </div>

            <Button type="submit">Update</Button>
          </div>
          <OrderProductList orders={orders.orderItem} />
        </>
      )}
    </div>
  );
};

export default UpdateOrderForm;
