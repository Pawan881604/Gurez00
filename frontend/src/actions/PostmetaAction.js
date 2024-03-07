import axios from "axios";
import {
    ALL_POST_META_FAIL,
    ALL_POST_META_REQUEST,
    ALL_POST_META_SUCCESS,
  } from "../constants/PostMetaConstant";

export const getProductPostMeta = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_POST_META_REQUEST });
  
      const { data } = await axios.get(`/api/v1/post-meta/single-product-value/${id}`);
    
      dispatch({ type: ALL_POST_META_SUCCESS, payload: data.postMetaValue });
    } catch (err) {
      dispatch({ type: ALL_POST_META_FAIL, payload: err });
    }
  };