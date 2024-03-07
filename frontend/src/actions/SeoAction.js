import axios from "axios";
import {
  CREATE_SEO_FAIL,
  CREATE_SEO_REQUEST,
  CREATE_SEO_SUCCESS,
  SEO_CLEAR_SEO,
  SEO_FAIL,
  SEO_REQUEST,
  SEO_SUCCESS,
} from "../constants/SeoConstants";

export const getAllSeo = () => async (dispatch) => {
  try {
    dispatch({ type: SEO_REQUEST });
    const { data } = await axios.get(`/api/v1/all-seo`);
    dispatch({ type: SEO_SUCCESS, payload: data.seo });
  } catch (error) {
    dispatch({ type: SEO_FAIL, payload: error.response.data.message });
  }
};

// export const createSeoAction =
//   (seotitle, keyword, metadec, metalink, type, postid) => async (dispatch) => {
//     try {
//       dispatch({ type: CREATE_SEO_REQUEST });

//       const formData = new FormData();
//       formData.append("seotitle", seotitle);
//       formData.append("keyword", keyword);
//       formData.append("metadec", metadec);
//       formData.append("metalink", metalink);
//       formData.append("type", type);
//       formData.append("postid", postid);

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const { data } = await axios.post(`/api/v1/create/seo`, formData, config);

//       dispatch({ type: CREATE_SEO_SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({ type: CREATE_SEO_FAIL, payload: error.response.data.message });
//     }
//   };


  export const seoClearError = () => async (dispatch) => {
    dispatch({ type: SEO_CLEAR_SEO });
  };
  