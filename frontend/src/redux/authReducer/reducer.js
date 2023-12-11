import Cookies from "js-cookie"
import { LOGIN_ERROR, LOGIN_REQ, LOGIN_SUCCESS } from "./actionType"

const initState={
    loading:false,
    user:JSON.parse(localStorage.getItem("user"))||{},
    token:Cookies.get("token")||""
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case LOGIN_REQ:{
            return {
                ...state,loading:true
            }
        }
        case LOGIN_SUCCESS:{
            localStorage.setItem("user",JSON.stringify(payload))
            localStorage.setItem("token",payload.token)
            Cookies.set("token",payload.token,{expires:10})
            return {
                ...state,loading:false,user:payload,token:payload.token
            }
        }
        case LOGIN_ERROR:{
            return {
                ...state,loading:false
            }
        }
        case "LOGOUT":{
            localStorage.setItem("user","")
            localStorage.setItem("token",JSON.stringify({}))
            Cookies.set("token","")
            return {
                ...state,token:"",user:{}
            }
        }
        default:{
            return {
                ...state
            }
        }
    }
}