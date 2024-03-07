import {
    CREATE_CONTACT_FAILED,
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_RESET,
    CREATE_CONTACT_SUCCESS,
    Clear_Error,
    GET_CONTACT_FAILED,
    GET_CONTACT_REQUEST,
    GET_CONTACT_SUCCESS,
  
  } from "../constants/ContactConstant";
  
  export const ContactReducer = (state = { data: [] }, action) => {
    switch (action.type) {
      case CREATE_CONTACT_REQUEST: case GET_CONTACT_REQUEST  :
        return {
          ...state,
          success: true,
        };
      case CREATE_CONTACT_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
        };
        case GET_CONTACT_SUCCESS :
          return{
            ...state,
            loading:false,
            data:action.payload
          }
      case CREATE_CONTACT_FAILED: case GET_CONTACT_FAILED : 
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CREATE_CONTACT_RESET:
        return {
          ...state,
          loading: false,
          success: null,
        };
      case Clear_Error:
        return {
          ...state,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  };