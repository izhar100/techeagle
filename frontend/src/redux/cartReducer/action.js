import { api } from "../../api"
import { ADD_TO_CART_ERROR, ADD_TO_CART_REQ, DEC_QUANTITY, GET_CART_ITEM_ERROR, GET_CART_ITEM_REQ, GET_CART_ITEM_SUCCESS, INC_QUANTITY, QUANTITY_ERR, QUANTITY_REQ } from "./actionType"

export const AddToCart=(data)=>async(dispatch)=>{
    try {
        const res=await fetch(`${api}/cart/add`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${data.token}`
            },
            body:JSON.stringify(data.item)
        })
        const result=await res.json()
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export const getCartItem=(token)=>async(dispatch)=>{
    try {
        const res=await fetch(`${api}/cart`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        const data=await res.json()
        console.log(data)
        dispatch({type:GET_CART_ITEM_SUCCESS,payload:data.items})
        
    } catch (error) {
        console.log(error)
        dispatch({type:ADD_TO_CART_ERROR})
    }
}

export const increaseQTY=(data)=>async(dispatch)=>{
    try {
       dispatch({type:QUANTITY_REQ}) 
       const res=await fetch(`${api}/cart/update`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${data.token}`
        },
        body:JSON.stringify(data.itemInfo)
       })
       const result=await res.json()
       dispatch({type:INC_QUANTITY,payload:data.itemInfo})
       return result;
    } catch (error) {
        console.log(error)
        dispatch({type:QUANTITY_ERR})
    }
}

export const descreaseQTY=(data)=>async(dispatch)=>{
    try {
       dispatch({type:QUANTITY_REQ}) 
       const res=await fetch(`${api}/cart/update`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${data.token}`
        },
        body:JSON.stringify(data.itemInfo)
       })
       const result=await res.json()
       dispatch({type:DEC_QUANTITY,payload:data.itemInfo})
       return result;
    } catch (error) {
        console.log(error)
        dispatch({type:QUANTITY_ERR})
    }
}