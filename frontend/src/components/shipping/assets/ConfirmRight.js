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
  const [CouponinputValue, setCouponinputValue] = useState("");
  const [shoeMsg, setShoeMsg] = useState(false);
  console.log(cartItem);

  const {
    loading,
    coupon,
    error: couponError,
  } = useSelector((state) => state.mastercoupon);

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
    setDiscountedprice(null);
    setCouponinputValue("");
    setShoeMsg(true);
  };

  const inputData = () => {
    dispatch(verifyMasterCoupon(CouponinputValue, ids));
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
      coupon: coupon && coupon.name,
      coupon_uuid: coupon && coupon.uuid,
      discountamount:
        coupon && coupon.type === "percentage" ? `${coupon.disscount}%` : null,
      discounttype: coupon && coupon.type,
      coupon_discount: discountedprice && discountedprice,
      uuid,
      totalQuantity,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    Navigate("/shipping/proccess/payment");
  };

  useEffect(() => {
    if (coupon) {
      if (coupon.type === "percentage") {
        const data = (totalPrice * coupon.disscount) / 100;
        setDiscountedprice(data);
      } else if (coupon.type === "fix items") {
        const data = totalPrice - coupon.disscount;
        setDiscountedprice(data);
      } else {
        setDiscountedprice(totalPrice);
      }
    }
  }, [coupon, totalPrice]);

  return (
    <>
      <div className="conf-prod-det">
        <div>
          <ApplyCoupen
            inputData={inputData}
            setCouponinputValue={setCouponinputValue}
            CouponinputValue={CouponinputValue}
          />
          {!shoeMsg ? (
            coupon && coupon.message ? (
              <p style={{ color: "green", fontWeight: 600 }}>
                {coupon && coupon.message}
              </p>
            ) : (
              <p style={{ color: "red", fontWeight: 600 }}>{coupon}</p>
            )
          ) : null}
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
            {discountedprice ? (
              <>
                <p>
                  <span>
                    coupon:
                    <span>{discountedprice ? discountedprice : null}</span>
                  </span>

                  <span>
                    RS -
                    {discountedprice ? (
                      <Currency price={discountedprice} />
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
                  price={
                    discountedprice
                      ? Math.abs(discountedprice - totalPrice)
                      : totalPrice
                  }
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
