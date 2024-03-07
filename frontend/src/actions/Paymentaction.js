import axios from "axios";
import {
  CLEAR_ERRORS,
  PAYMENT_DATA_FAIL,
  PAYMENT_DATA_REQUEST,
  PAYMENT_DATA_SUCCESS,
  PAYMENT_INFO_FAIL,
  PAYMENT_INFO_REQUEST,
  PAYMENT_INFO_SUCCESS,
} from "../constants/PaymentConstants";

export const getCardPayments = (id, order, paymentUuid) => async (dispatch) => {
  try {
    const Order_info = JSON.stringify(order);
    const formData = new FormData();
    formData.append("Order_info", Order_info);
    formData.append("paymentUuid", paymentUuid);

    dispatch({ type: PAYMENT_DATA_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/paymentData/${id}`,
      formData,
      config
    );

    dispatch({ type: PAYMENT_DATA_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({ type: PAYMENT_DATA_FAIL, payload: err });
  }
};

export const get_payment_info = (id) => async (dispatch) => {
  try {
    console.log(id)
    dispatch({ type: PAYMENT_INFO_REQUEST });
    const { data } = await axios.get(`/api/v1/order/payment-info/${id}`);

    dispatch({ type: PAYMENT_INFO_SUCCESS, payload: data.payment_info });
  } catch (err) {
    dispatch({ type: PAYMENT_INFO_FAIL, payload: err });
  }
};

//---clear errors
export const ClearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
