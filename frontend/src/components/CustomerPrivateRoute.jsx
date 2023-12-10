import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CustomerPrivateRoute = ({children}) => {
    const {token,user}=useSelector((store)=>{
        return {
            token:store.authReducer.token,
            user:store.authReducer.user
        }
    },shallowEqual)

    const navigate=useNavigate()

    useEffect(()=>{
        if(!token){
            navigate("/auth")
            return;
        }
    },[token])
  return (
    <div>
        {children}
    </div>
  )
}

export default CustomerPrivateRoute
