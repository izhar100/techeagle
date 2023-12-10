import { api } from "../../api"
import { ORDER_REQ } from "./actionType"
export const placeOrder=(data)=>async(dispatch)=>{
    try {
        dispatch({type:ORDER_REQ})
        const res=await fetch(`${api}/order/place`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${data.token}`
            },
            body:JSON.stringify(data.orderData)
        })
        const result=await res.json()
        return result;
    } catch (error) {
        console.log(error)
    }
}