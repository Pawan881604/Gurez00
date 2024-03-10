import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  All_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  DELETE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  ORDER_SHIPPING_INFO_REQUEST,
  ORDER_SHIPPING_INFO_SUCCESS,
  ORDER_SHIPPING_INFO_FAIL,
  ORDER_DETAILS_INFO_REQUEST,
  ORDER_DETAILS_INFO_SUCCESS,
  ORDER_DETAILS_INFO_FAIL,
} from "../constants/OrderConstants";

export const newOrederReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case CREATE_ORDER_RESET:
      return {
        loading: false,
        order: null,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myOredersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { orders: {}, shiping_info: {}, order_details_info: {} }, // Initial state
  action // Action dispatched
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
    case ORDER_SHIPPING_INFO_REQUEST:
    case ORDER_DETAILS_INFO_REQUEST:
      // When a request is made, set loading to true
      return {
        ...state, // Preserve existing state
        loading: true,
      };

    case ORDER_SHIPPING_INFO_SUCCESS:
      // When shipping info request succeeds, update state with shipping info
      return {
        ...state,
        loading: false,
        shiping_info: action.payload, // Update shipping info
      };
    case ORDER_DETAILS_INFO_SUCCESS:
      // When order details info request succeeds, update state with order details info
      return {
        ...state,
        loading: false,
        order_details_info: action.payload, // Update order details info
      };

    case ORDER_DETAILS_SUCCESS:
      // When order details request succeeds, update state with orders
      return {
        ...state,
        loading: false,
        orders: action.payload.Order, // Update orders
        Total_orders: action.payload.Total_orders, // Update orders
        Total_revenue: action.payload.Total_revenue, // Update orders
      };

    case ORDER_DETAILS_FAIL:
    case ORDER_SHIPPING_INFO_FAIL:
    case ORDER_DETAILS_INFO_FAIL:
      // When request fails, update state with error
      return {
        ...state,
        loading: false,
        error: action.payload, // Store error in state
      };

    case CLEAR_ERRORS:
      // Clear any existing errors in the state
      return {
        ...state,
        error: null,
      };
    default:
      return state; // Return current state if action type is not handled
  }
};


//get all orders --Admin

export const AllOredersReducer = (state = { orders: [] }, action) => {

  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        loading: true,
      };
    case ALL_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case All_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const OredersReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        loading: false,
        isUpdate: action.payload,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isUpdate: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
