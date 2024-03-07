import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplyCoupen from "./ApplyCoupen";
import Currency from "../../layout/currency/Currency";
import { useSelector, useDispatch } from "react-redux";
import { verifyMasterCoupon } from "../../../actions/MasterCouponAction";
import { v4 as uu } from "uuid";
export const ConfirmRight = ({ cartItem, shippingInfo }) => {
  // const [coupon, setCoupon] = useState("");
  const uuid = uu().slice(0, 12);

  const dispatch = useDispatch();
  const [discountedprice, setDiscountedprice] = useState("");
  const [isDiscount, setisDiscount] = useState(false);
  const [CouponinputValue, setCouponinputValue] = useState("");
  const [shoeMsg, setShoeMsg] = useState("");

  console.log(discountedprice);
  const {
    loading,
    coupon_data,
    error: couponError,
  } = useSelector((state) => state.mastercoupon);
  console.log(coupon_data);
  const ids = cartItem && cartItem.map((item) => item.productId);

  const Navigate = useNavigate();
  const subtotal = cartItem.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const totalQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0);

  const shippingChargs = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = shippingChargs + tax + subtotal;

  //-------------- remove coupon

  const removeCoupon = () => {
    setDiscountedprice(totalPrice);
    setCouponinputValue("");
    setisDiscount(false)
  };

  const inputData = () => {
    dispatch(
      verifyMasterCoupon(
        CouponinputValue ? CouponinputValue : {},
        ids ? ids : []
      )
    );
    setShoeMsg(false);
  };

  const proccessPayment = () => {
    const data = {
      subtotal,
      shippingChargs,
      tax,
      totalPrice: discountedprice
        ? Math.abs(discountedprice - totalPrice)
        : Math.abs(totalPrice),
      coupon: coupon_data && coupon_data.name,
      coupon_uuid: coupon_data && coupon_data.uuid,
      discountamount:
        coupon_data && coupon_data.type === "percentage"
          ? `${coupon_data.disscount}%`
          : null,
      discounttype: coupon_data && coupon_data.type,
      coupon_discount: discountedprice && discountedprice,
      uuid,
      totalQuantity,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    Navigate("/shipping/proccess/payment");
  };

  useEffect(() => {
    if (couponError) {
      setShoeMsg(couponError);
      
    }
    if (coupon_data) {
      setisDiscount(true)
      if (coupon_data.type === "percentage") {
        const data = (totalPrice * coupon_data.disscount) / 100;
        setDiscountedprice(data);
      } else if (coupon_data.type === "fix items") {
        const data = totalPrice - coupon_data.disscount;
        setDiscountedprice(data);
      } else {
        setDiscountedprice(totalPrice);
      }
    }
  }, [coupon_data, totalPrice, couponError]);

  return (
    <>
      <div className="conf-prod-det">
        <div>
          <ApplyCoupen
            inputData={inputData}
            setCouponinputValue={setCouponinputValue}
            CouponinputValue={CouponinputValue}
          />
          {isDiscount && !couponError ? (
            <p style={{ color: "green", fontWeight: 600 }}>
              {coupon_data && coupon_data.message}
            </p>
          ) : (
            <p style={{ color: "red", fontWeight: 600 }}>{shoeMsg}</p>
          )}
        </div>
        {cartItem &&
          cartItem.map((item, i) => (
            <div className="conf-prod-area" key={i}>
              <div className="conf-ing">
                <img
                  src={`http://localhost:8000/${item.image}`}
                  alt={item.name}
                />
              </div>
              <p>{item.name}</p>
              <span>
                <Currency price={item.quantity} /> X{" "}
                <Currency price={item.price} /> =
                <Currency price={item.price * item.quantity} />
              </span>
            </div>
          ))}
        <div className="order-summery-conf">
          <div className="order-summery-conf-area">
            <p>
              <span> Sub total:</span>
              <span>
                <Currency price={subtotal} />{" "}
              </span>
            </p>
            {coupon_data && coupon_data ? (
              <>
                <p>
                  <span>
                    coupon:
                    <span>{coupon_data && coupon_data.name}</span>
                  </span>

                  <span>
                    RS -
                    {discountedprice ? (
                      <Currency price={totalPrice - discountedprice} />
                    ) : null}
                    <span onClick={removeCoupon}>Remove</span>
                  </span>
                </p>
              </>
            ) : null}
            <p>
              <span>Shipping Charges:</span>
              <span>
                <Currency price={shippingChargs} />{" "}
              </span>
            </p>
            <p>
              <span>GST:</span>
              <span>
                <Currency price={tax} />
              </span>
            </p>

            <p>
              <span>
                <b>Total:</b>
              </span>
              <span>
                <Currency
                  price={!couponError ? Math.abs(discountedprice) : totalPrice}
                />
              </span>
            </p>
          </div>

          <Button onClick={proccessPayment}>Proccess to Payment</Button>
        </div>
      </div>
    </>
  );
};
