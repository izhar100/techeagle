import { api } from "../../api"
import { DELETE_PRODUCT, GET_PRODUCT_ERROR, GET_PRODUCT_REQ, GET_PRODUCT_SUCCESS } from "./actionType"

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

export const deleteProduct=(data)=>async(dispatch)=>{
    console.log(data)
    try {
        const res=await fetch(`${api}/product/delete/${data.id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${data.token}`
            }
        })
        const result=await res.json()
        dispatch({type:DELETE_PRODUCT,payload:data.id})
        return result;
    } catch (error) {
        console.log(error)
    }
}