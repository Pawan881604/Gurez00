import axios from "axios";
import {
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  REVIEWS_CLEAR_ERROR,
} from "../constants/ReviewsConstant";

export const createReview =
  (rating, comment, productId) => async (dispatch) => {

    console.log(rating, comment, productId)
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });

      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);
      formData.append("productId", productId);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/v1/create/product-review",
        formData,
        config
      );

      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAllProductReview = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/review/product-review`);
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.productReview,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// export const deleteReviews = (reviewId, productId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_REVIEW_REQUEST });

//     const { data } = await axios.delete(
//       `/api/v1/review?id=${reviewId}&productId=${productId}`
//     );

//     dispatch({
//       type: DELETE_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

//---clear errors
export const reviewsClearError = () => async (dispatch) => {
  dispatch({ type: REVIEWS_CLEAR_ERROR });
};
