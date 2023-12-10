import { GET_ALL_ORDER_ERR, GET_ALL_ORDER_REQ, GET_ALL_ORDER_SUCCESS, UPDATE_STATUS } from "./actionType"

const initState={
    loading:false,
    allOrders:[],
    error:false
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case GET_ALL_ORDER_REQ:{
            return {
                ...state,loading:false
            }
        }
        case GET_ALL_ORDER_SUCCESS:{
            return {
                ...state,allOrders:payload
            }
        }
        case GET_ALL_ORDER_ERR:{
            return {
                ...state,loading:false
            }
        }
        case UPDATE_STATUS:{
            const updatedData=state.allOrders.map((item)=>{
                if(item._id==payload.orderId){
                    item.status=payload.status;
                }
                return item;
            })
            return {
                ...state,allOrders:updatedData
            }
        }
        default:{
            return state
        }
    }
}