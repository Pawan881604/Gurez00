import axios from "axios";
import {
  IMAGE_CLEAR,
  IMAGE_FAIL,
  IMAGE_ID_FAIL,
  IMAGE_ID_REQUEST,
  IMAGE_ID_SUCCESS,
  IMAGE_REQUEST,
  IMAGE_SUCCESS,
  SET_SELECTED_IMAGE,
  UPDATE_IMAGE_FAIL,
  UPDATE_IMAGE_REQUEST,
  UPDATE_IMAGE_SEO_FAIL,
  UPDATE_IMAGE_SEO_REQUEST,
  UPDATE_IMAGE_SEO_SUCCESS,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_TEXT_FAIL,
  UPDATE_TEXT_REQUEST,
  UPDATE_TEXT_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/imageGelleryCartConstants";

export const getAllImages =
  (currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: IMAGE_REQUEST });

      const { data } = await axios.get(
        `/api/v1/admin/images?page=${currentPage}`
      );
      dispatch({ type: IMAGE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: IMAGE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const uploadImage = (avatar, user) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });
    const formData = new FormData();

    formData.append("userid", user);
    
    for (let i = 0; i < avatar.length; i++) {
      formData.append("avatar", avatar[i].file);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `/api/v1/admin/images/upload`,
      formData,
      config
    );
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data.imagesGellery });
  } catch (err) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: err.response.data.message,
    });
  }
};

//------- update image seo

export const updateImageSeo = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_IMAGE_SEO_REQUEST });
    const formData = new FormData();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = 'dddd'
    // const { data } = await axios.post(
    //   `/api/v1/admin/images/update/${id}`,
    //   formData,
    //   config
    // );
    dispatch({ type: UPDATE_IMAGE_SEO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_IMAGE_SEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

//---------------------------update image text

export const updateImageText =
  (altText, title, caption, id) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TEXT_REQUEST });
      const formdata = new FormData();
      formdata.append("altText", altText);
      formdata.append("title", title);
      formdata.append("caption", caption);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/images/update/${id}`,
        formdata,
        config
      );
      dispatch({ type: UPDATE_TEXT_SUCCESS, payload: data.success });
    } catch (err) {
      dispatch({
        type: UPDATE_TEXT_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const imagePrimary = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_IMAGE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      //`/api/v1/admin/images/update/${id}`,

      config
    );
    dispatch({ type: UPDATE_IMAGE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: UPDATE_IMAGE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const setSelectedImage = (imageData) => ({
  type: SET_SELECTED_IMAGE,
  payload: imageData,
});

export const getImageId = (ids) => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_ID_REQUEST });
    if (ids.length > 0) {
      const { data } = await axios.post("/api/v1/admin/images/ids", { ids });
      dispatch({ type: IMAGE_ID_SUCCESS, payload: data.image });
    }
  } catch (err) {
    dispatch({ type: IMAGE_ID_FAIL });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: IMAGE_CLEAR });
};
