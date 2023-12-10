import { ADD_TO_CART_ERROR, ADD_TO_CART_REQ, ADD_TO_CART_SUCCESS, DEC_QUANTITY, DELETE_CART_ITEM, GET_CART_ITEM_SUCCESS, INC_QUANTITY, QUANTITY_REQ } from "./actionType"

const initState={
    loading:false,
    cart:[],
    error:false
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case ADD_TO_CART_REQ:{
            return {
                ...state,loading:true
            }
        }
        case ADD_TO_CART_SUCCESS:{
            return {
                ...state,loading:false,cart:[...cart,payload]
            }
        }
        case ADD_TO_CART_ERROR:{
            return {
                ...state,loading:false
            }
        }
        case GET_CART_ITEM_SUCCESS:{
            return {
                ...state,loadig:false,cart:payload
            }
        }
        case QUANTITY_REQ:{
            return {
                ...state,loading:true
            }
        }
        case INC_QUANTITY:{
            const cartItem=state.cart.map((item)=>{
                if(item.productId._id==payload.productId){
                    item.quantity=payload.quantity;
                }
                return item;
            })
            return {
                ...state,loading:false,cart:cartItem
            }
        }
        case DEC_QUANTITY:{
            const cartItem=state.cart.map((item)=>{
                if(item.productId._id==payload.productId){
                    item.quantity=payload.quantity;
                }
                return item;
            })
            return {
                ...state,loading:false,cart:cartItem
            }
        }
        case DELETE_CART_ITEM:{
            const cartItem=state.cart.filter((item)=>item._id!==payload)
            return {
                ...state,cart:cartItem
            }
        }
        default:{
            return state
        }
    }
}