import { api } from "../../api"
import { LOGIN_ERROR, LOGIN_REQ, LOGIN_SUCCESS } from "./actionType"

export const login=(loginData)=>async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQ})
        const req=await fetch(`${api}/user/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(loginData)
        })

        const data=await req.json()
        dispatch({type:LOGIN_SUCCESS,payload:data})
        return data;
    } catch (error) {
        console.log(error)
        dispatch({type:LOGIN_ERROR})
    }
}

export const signUp=(signupData)=>async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQ})
        const req=await fetch(`${api}/user/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(signupData)
        })

        const data=await req.json()
        dispatch({type:LOGIN_SUCCESS,payload:data})
        return data;
    } catch (error) {
        console.log(error)
        dispatch({type:LOGIN_ERROR})
    }
}

export const logout=(dispatch)=>{
    dispatch({type:"LOGOUT"})
}