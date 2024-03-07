import { ADD_TO_WISHLIST, CREATE_WISHLIST_FAILED, CREATE_WISHLIST_REQUEST, CREATE_WISHLIST_SUCCESS, REMOVE_WISHLIST_ITEM, WISHLIST_CLEAR_ERROR } from "../constants/WishListConstants";
import axios from "axios";
export const wishListAction = (id,price) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      productId: data.Product._id,
      link: data.Product.slug,
      name: data.Product.product_name,
      price: price,
      path: data.Product.product_images[0].path,
      category:data.Product.product_category[0].slug,
    },
  });
  
  localStorage.setItem(
    "wishListItems",
    JSON.stringify(getState().wishList.wishL)
  );
};


export const removeWishItem = (id) => async (dispatch, getState) => {
  if (!Array.isArray(id)) {
    dispatch({
      type: REMOVE_WISHLIST_ITEM,
      payload: id,
    });
  
    localStorage.setItem("wishListItems", JSON.stringify(getState().wishList.wishL));
  } else {
    localStorage.removeItem("wishListItems");
  }
};


//-------CREATE WISHLIST

export const CreateBookmarkAction=(wishlist_product_id,wishlist_product_uuid)=> async(dispatch)=>{
  console.log(wishlist_product_id,wishlist_product_uuid)
  try {
      dispatch({type:CREATE_WISHLIST_REQUEST})
      const formData=new FormData();
  
      formData.append("wishlist_product_id",wishlist_product_id);
      formData.append("wishlist_product_uuid",wishlist_product_uuid);  
   

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const {data}=await axios.post("/api/v1/create-bookmark",formData,config)
      console.log(data,"wishlist action")
      dispatch({type:CREATE_WISHLIST_SUCCESS,payload:data})
  } catch (error) {
      dispatch({type:CREATE_WISHLIST_FAILED,payload:error.response.data.message})
  }
}

export const ClearError = () => async (dispatch) => {
  dispatch({ type: WISHLIST_CLEAR_ERROR });
};