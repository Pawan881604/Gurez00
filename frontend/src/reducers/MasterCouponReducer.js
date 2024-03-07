import {
  ALL_MASTER_COUPON_CLEAR,
  ALL_MASTER_COUPON_FAIL,
  ALL_MASTER_COUPON_REQUEST,
  ALL_MASTER_COUPON_SUCCESS,
  CREATE_MASTER_COUPON_FAIL,
  CREATE_MASTER_COUPON_REQUEST,
  CREATE_MASTER_COUPON_RESET,
  CREATE_MASTER_COUPON_SUCCESS,
  VERIFY_MASTER_COUPON_FAIL,
  VERIFY_MASTER_COUPON_REQUEST,
  VERIFY_MASTER_COUPON_RESET,
  VERIFY_MASTER_COUPON_SUCCESS,
} from "../constants/MasterCouponConstant";

export const massterCouponReducer = (state = { Coupons: [] }, action) => {
  switch (action.type) {
    case CREATE_MASTER_COUPON_REQUEST:
    case VERIFY_MASTER_COUPON_REQUEST:
    case ALL_MASTER_COUPON_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case CREATE_MASTER_COUPON_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };
    case ALL_MASTER_COUPON_SUCCESS:
      return {
        loading: false,
        coupon: action.payload,
      };
    case VERIFY_MASTER_COUPON_SUCCESS:
      return {
        loading: false,
        success: true,
        coupon: action.payload,
      };

    case CREATE_MASTER_COUPON_FAIL:
    case VERIFY_MASTER_COUPON_FAIL:
    case ALL_MASTER_COUPON_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ALL_MASTER_COUPON_CLEAR:
      return {
        ...state,
        error: null,
      };
    case CREATE_MASTER_COUPON_RESET:
      return {
        loading: false,
        product: action.payload,
        success: null,
      };

    case VERIFY_MASTER_COUPON_RESET:
      return {
        loading: false,
        product: action.payload,
        success: null,
      };

    default:
      return state;
  }
};
