import axios from "axios";
import {
  ALL_MASTER_COUPON_CLEAR,
  ALL_MASTER_COUPON_FAIL,
  ALL_MASTER_COUPON_REQUEST,
  ALL_MASTER_COUPON_SUCCESS,
  CREATE_MASTER_COUPON_FAIL,
  CREATE_MASTER_COUPON_REQUEST,
  CREATE_MASTER_COUPON_SUCCESS,
  VERIFY_MASTER_COUPON_FAIL,
  VERIFY_MASTER_COUPON_REQUEST,
  VERIFY_MASTER_COUPON_SUCCESS,
} from "../constants/MasterCouponConstant";

export const CreateMasterCoupon =
  (inputValue, uuid, catIds, prodIds) => async (dispatch) => {
    const {
      allowFreeShipping,
      camount,
      couponExpiryDate,
      description,
      dtype,
      emails,
      excludeCategories,
      excludeProducts,
      excludeSaleItems,
      individualUseOnly,
      limitUsageToXItems,
      minimumSpend,
      name,
      maximumSpend,
      usageLimitPerCoupon,
      usageLimitPerUser,
    } = inputValue;
    console.log(inputValue, uuid, catIds, prodIds);
    try {
      dispatch({ type: CREATE_MASTER_COUPON_REQUEST });

      const formData = new FormData();

      formData.append("allowFreeShipping", allowFreeShipping);
      formData.append("camount", camount);
      formData.append("couponExpiryDate", couponExpiryDate);
      formData.append("description", description);
      formData.append("dtype", dtype);
      formData.append("emails", emails);
      formData.append("excludeCategories", excludeCategories);
      formData.append("excludeProducts", excludeProducts);
      formData.append("excludeSaleItems", excludeSaleItems);
      formData.append("individualUseOnly", individualUseOnly);
      formData.append("limitUsageToXItems", limitUsageToXItems);
      formData.append("minimumSpend", minimumSpend);
      formData.append("productCategories", catIds);
      formData.append("products", prodIds);
      formData.append("usageLimitPerCoupon", usageLimitPerCoupon);
      formData.append("usageLimitPerUser", usageLimitPerUser);
      formData.append("maximumSpend", maximumSpend);
      formData.append("name", name);
      formData.append("uuid", uuid);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/create/master-coupon",
        formData,
        config
      );

      dispatch({ type: CREATE_MASTER_COUPON_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_MASTER_COUPON_FAIL,
        payload: error.response.data.message || "Some error occurred",
      });
    }
  };

export const verifyMasterCoupon = (coupon, ids) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_MASTER_COUPON_REQUEST });

    const formData = new FormData();

    formData.append("coupon", coupon);
    formData.append("ids", ids);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/all-verify-coupon",
      formData,
      config
    );

    dispatch({ type: VERIFY_MASTER_COUPON_SUCCESS, payload: data.coupon });
  } catch (error) {
    dispatch({
      type: VERIFY_MASTER_COUPON_FAIL,
      payload: error.response.data.message || "Some error occurred",
    });
  }
};

export const getAllCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_MASTER_COUPON_REQUEST });
    const { data } = await axios.get("/api/v1/all-master-coupon");

    dispatch({ type: ALL_MASTER_COUPON_SUCCESS, payload: data.allcoupon });
  } catch (error) {
    dispatch({
      type: ALL_MASTER_COUPON_FAIL,
      payload: error.response.data.message || "Some error occurred",
    });
  }
};

export const coupon_clear_error = () => async (dispatch) => {
  dispatch({ type: ALL_MASTER_COUPON_CLEAR });
};
