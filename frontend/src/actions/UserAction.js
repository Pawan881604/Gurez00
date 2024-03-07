import {
  LOGIN_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  SINGUP_SUCCESS,
  SINGUP_FAIL,
  SINGUP_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGIN_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_DETAILS_REQUEST,
  ALL_USER_DETAILS_SUCCESS,
  ALL_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  ALL_USER_FAIL,
  OTP_FAIL,
  OTP_SUCCESS,
  OTP_REQUEST,
  OTP_RESENDOTP_FAIL,
  OTP_RESENDOTP_REQUEST,
  OTP_RESENDOTP_SUCCESS,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../constants/UserConstants";

import axios from "axios";

export const Login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/auth/login`,
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const Singup = (email) => async (dispatch) => {
  try {
    dispatch({ type: SINGUP_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/auth/register`,
      { email },
      config
    );
    dispatch({ type: SINGUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SINGUP_FAIL, payload: error.response.data.message });
  }
};

export const Otp = (userDetails, otp) => async (dispatch) => {
  try {
    dispatch({ type: OTP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/auth/otp`,
      {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        otp,
      },
      config
    );
   
    dispatch({ type: OTP_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: OTP_FAIL, payload: error.response.data.message });
  }
};
//----- user forget password

export const userForgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/auth/password/forgot`,
      { email },
      config
    );

    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
////---------------------------------------------

export const resetPassword =
  (token, newPassword, confirmpassword) => async (dispatch) => {
   
    try {
    
      dispatch({ type: RESET_PASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/auth/password/reset/${token}`,
        { newPassword, confirmpassword },
        config
      );
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//------------------user login rensend Otp

export const reSendOtp = (id) => async (dispatch) => {
  try {
    dispatch({ type: OTP_RESENDOTP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/auth/resend-otp`,
      { id },
      config
    );
    
    dispatch({ type: OTP_RESENDOTP_SUCCESS, payload: data.message });
  } catch (err) {
    dispatch({
      type: OTP_RESENDOTP_FAIL,
      payload: err.response.data.message,
    });
  }
};

//LOAD user

export const LoadUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/v1/auth/profie`,
      { email, password },
      config
    );
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.User });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//LOAD Logout

export const LogoutUser = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/auth/logout`);
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

// updtae user profile

export const updateUserProfile = (name, email, avatar) => async (dispatch) => {
 
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatar);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/v1/auth/profile/update`,
      myForm,
      config
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//reset password

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/auth/password/update`,
      passwords,
      config
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//---------------admin get all users

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });

    const { data } = await axios.get("/api/v1/auth/admin/users");

    dispatch({
      type: ALL_USER_SUCCESS,
      payload: data.Users,
    });
  } catch (err) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: err.response.data.message,
    });
  }
};

//---------------admin get all details

export const getUsersDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/auth/admin/user/${id}`);

    dispatch({
      type: ALL_USER_DETAILS_SUCCESS,
      payload: data.User,
    });
  } catch (err) {
    dispatch({
      type: ALL_USER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

//------------------update user details
export const updateUserDetails = (id, detailsData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/auth/admin/user/${id}`,
      detailsData,
      config
    );
    dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//------------------delete users
export const deleteuser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/auth/admin/user/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//-- clear all errors

export const ClearError = () => async (dispatch) => {
  dispatch({ type: LOGIN_ERRORS });
};
