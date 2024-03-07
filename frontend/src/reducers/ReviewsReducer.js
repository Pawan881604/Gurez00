//------------review

import {
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  REVIEWS_CLEAR_ERROR,
} from "../constants/ReviewsConstant";

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loding: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loding: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        loding: false,
        success: null,
      };

    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productsReviewReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loding: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loding: false,
        review: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };
    case REVIEWS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// export const reviewsReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_REVIEW_REQUEST:
//       return {
//         ...state,
//         loding: true,
//       };
//     case DELETE_REVIEW_SUCCESS:
//       return {
//         loding: false,
//         isDeleted: action.payload,
//       };
//     case DELETE_PRODUCT_FAIL:
//       return {
//         ...state,
//         loding: false,
//         error: action.payload,
//       };

//     case DELETE_REVIEW_RESET:
//       return {
//         ...state,
//         loding: false,
//         isDeleted: null,
//       };

//     case ALL_PRODUCT_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };
