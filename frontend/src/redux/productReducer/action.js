import { api } from "../../api"
import { GET_PRODUCT_ERROR, GET_PRODUCT_REQ, GET_PRODUCT_SUCCESS } from "./actionType"

export const fetchProducts=async(dispatch)=>{
    dispatch({type:GET_PRODUCT_REQ})
   try {
    const res=await fetch(api+"/product")
    const data=await res.json()
    dispatch({type:GET_PRODUCT_SUCCESS,payload:data})
    console.log(data)
   } catch (error) {
    console.log(error)
    dispatch({type:GET_PRODUCT_ERROR})
   }
}