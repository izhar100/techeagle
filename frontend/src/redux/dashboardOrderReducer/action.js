import { api } from "../../api"
import { GET_ALL_ORDER_ERR, GET_ALL_ORDER_REQ, GET_ALL_ORDER_SUCCESS, UPDATE_STATUS } from "./actionType"

export const getAllOrders=(token)=>async(dispatch)=>{
    try {
        dispatch({type:GET_ALL_ORDER_REQ})
        const res=await fetch(`${api}/order`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        const result=await res.json()
        dispatch({type:GET_ALL_ORDER_SUCCESS,payload:result})
        return result
    } catch (error) {
        console.log(error)
        dispatch({type:GET_ALL_ORDER_ERR})
    }
  }

export const updateOrderStatus=(data)=>async(dispatch)=>{
    const {token,orderId,status}=data;
    try {
        const res=await fetch(`${api}/order/update/${orderId}`,{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({status})
        })
        const result=await res.json()
       dispatch({type:UPDATE_STATUS,payload:{orderId,status}})
       return result;
    } catch (error) {
        console.log(error)
    }
}