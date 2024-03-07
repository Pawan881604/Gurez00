import { CREATE_CONTACT_FAILED, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, Clear_Error, GET_CONTACT_FAILED, GET_CONTACT_REQUEST, GET_CONTACT_SUCCESS } from "../constants/ContactConstant";
import axios from "axios";

export const CreateContactAction=(inputValue)=> async(dispatch)=>{ 
    try {
        dispatch({type:CREATE_CONTACT_REQUEST})
        const formData=new FormData();

        for(let key in inputValue){
            formData.append(key,inputValue[key])
        }

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const {data}=await axios.post("/api/v1/contact",formData,config);
        dispatch({type:CREATE_CONTACT_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:CREATE_CONTACT_FAILED,payload:error.response.data.message})
    }
}

//--------get contact details------------------

export const GetContactAction=()=> async(dispatch)=>{
    try {
        dispatch({type:GET_CONTACT_REQUEST});

        const {data}=await axios.get("/api/v1/get-contact")
        
        dispatch({type:GET_CONTACT_SUCCESS,payload:data.data})
    } catch (error) {
        dispatch({type:GET_CONTACT_FAILED,payload:error.response.data.message})
        
    }
}


export const ClearError=()=> (dispatch)=>{
    dispatch({type:Clear_Error})
}