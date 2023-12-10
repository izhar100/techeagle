import { GET_PRODUCT_ERROR, GET_PRODUCT_REQ, GET_PRODUCT_SUCCESS } from "./actionType"

const initState={
    loading:false,
    products:[],
    error:false
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case GET_PRODUCT_REQ:{
            return {
                ...state,loading:true
            }
        }
        case GET_PRODUCT_SUCCESS:{
            return {
                ...state,loading:false,products:payload
            }
        }
        case GET_PRODUCT_ERROR:{
            return {
                ...state,loading:false,product:[]
            }
        }
        default:{
            return state
        }
    }
}