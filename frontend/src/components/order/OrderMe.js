import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getMyorders } from "../../actions/OrderAction";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import "./style.css";
import { OrderCard } from "./assets/OrderCard";
import MetaData from "../layout/metaData/MetaData";

export const OrderMe = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMyorders());
  }, [dispatch, error, alert]);

  

  return (
    <>
      <MetaData
        title={"My Orders"}
        keywords={"My Orders"}
        content={"My Orders"}
      />
      <section className="section-cont">
        <div id="prod-cont" className="cont-area-h">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="my-order-page">
                <div className="order-title">
                  <h1>Order</h1>
                  <p>{orders.length} Orders found</p>
                </div>
                <OrderCard orders={orders} />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};
