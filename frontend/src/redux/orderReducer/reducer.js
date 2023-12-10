import { ORDER_ERR, ORDER_REQ, ORDER_SUCCESS } from "./actionType"

const initState={
    loading:false,
    orderItems:[],
    error:false,
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case ORDER_REQ:{
            return {
                ...state,loading:true,
            }
        }
        case ORDER_SUCCESS:{
            return {
                ...state,loading:false,
            }
        }
        case ORDER_ERR:{
            return {
                ...state,loading:false
            }
        }
        default:{
            return state
        }
    }
}