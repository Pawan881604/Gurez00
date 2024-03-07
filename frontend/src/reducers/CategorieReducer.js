import {
  ALL_CATEGORIE_ERRORS,
  ALL_CATEGORIE_FAIL,
  ALL_CATEGORIE_REQUEST,
  ALL_CATEGORIE_SUCCESS,
  GET_SINGLE_PRODUCT_CAT_FAIL,
  GET_SINGLE_PRODUCT_CAT_REQUEST,
  GET_SINGLE_PRODUCT_CAT_SUCCESS,
  NEW_CATEGORIE_FAIL,
  NEW_CATEGORIE_REQUEST,
  NEW_CATEGORIE_RESET,
  NEW_CATEGORIE_SUCCESS,
  SINGLE_SUB_CATEGORIE_FAIL,
  SINGLE_SUB_CATEGORIE_REQUEST,
  SINGLE_SUB_CATEGORIE_RESET,
  SINGLE_SUB_CATEGORIE_SUCCESS,
  STATUS_CATEGORIE_FAIL,
  STATUS_CATEGORIE_REQUEST,
  STATUS_CATEGORIE_RESET,
  STATUS_CATEGORIE_SUCCESS,
  STATUS_SUB_CATEGORIE_FAIL,
  STATUS_SUB_CATEGORIE_REQUEST,
  STATUS_SUB_CATEGORIE_RESET,
  STATUS_SUB_CATEGORIE_SUCCESS,
  UPDATE_PARENT_CATEGORIE_FAIL,
  UPDATE_PARENT_CATEGORIE_REQUEST,
  UPDATE_PARENT_CATEGORIE_RESET,
  UPDATE_PARENT_CATEGORIE_SUCCESS,
  UPDATE_SUB_CATEGORIE_FAIL,
  UPDATE_SUB_CATEGORIE_REQUEST,
  UPDATE_SUB_CATEGORIE_RESET,
  UPDATE_SUB_CATEGORIE_SUCCESS,
} from "../constants/CategoreConstants";

export const newCategoreReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_CATEGORIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CATEGORIE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case NEW_CATEGORIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_CATEGORIE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case ALL_CATEGORIE_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getAllCategoriesReducer = (
  state = { allcategroes: [] },
  action
) => {
  switch (action.type) {
    case ALL_CATEGORIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_CATEGORIE_SUCCESS:
      return {
        ...state,
        loading: false,
        allcategroes: action.payload,
      };
    case ALL_CATEGORIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ALL_CATEGORIE_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const StatusCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case STATUS_CATEGORIE_REQUEST:
    case STATUS_SUB_CATEGORIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STATUS_CATEGORIE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate: true,
      };
    case STATUS_SUB_CATEGORIE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate: true,
      };
    case STATUS_CATEGORIE_FAIL:
    case STATUS_SUB_CATEGORIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case STATUS_CATEGORIE_RESET:
    case STATUS_SUB_CATEGORIE_RESET:
      return {
        ...state,
        loading: false,
        isUpdate: null,
      };
    case ALL_CATEGORIE_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const singleCatReducer = (state = { parent: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT_CAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_PRODUCT_CAT_SUCCESS:
      return {
        ...state,
        loading: false,
        parent: action.payload,
      };
    case GET_SINGLE_PRODUCT_CAT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ALL_CATEGORIE_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const updateParentCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PARENT_CATEGORIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PARENT_CATEGORIE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate: true,
      };
    case UPDATE_PARENT_CATEGORIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PARENT_CATEGORIE_RESET:
      return {
        ...state,
        loading: false,
        isUpdate: null,
      };
    case ALL_CATEGORIE_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
//------------------- single sub category

export const SingleSubCategoryReducer = (state = {data:[] }, action) => {
  switch (action.type) {
    case SINGLE_SUB_CATEGORIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_SUB_CATEGORIE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case SINGLE_SUB_CATEGORIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SINGLE_SUB_CATEGORIE_RESET:
      return {
        ...state,
        loading: false,
        data: null,
      };
    case ALL_CATEGORIE_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

//-------------------update sub category------------

export const UpdateSubCategoryReducer = (state = { }, action) => {
  switch (action.type) {
    case UPDATE_SUB_CATEGORIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SUB_CATEGORIE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate:true
      };
    case UPDATE_SUB_CATEGORIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_SUB_CATEGORIE_RESET:
      return {
        ...state,
        loading: false,
        isUpdate: null,
      };
    case ALL_CATEGORIE_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};