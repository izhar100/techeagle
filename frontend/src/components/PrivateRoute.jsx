import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {token,user}=useSelector((store)=>{
        return {
            token:store.authReducer.token,
            user:store.authReducer.user
        }
    },shallowEqual)

    const navigate=useNavigate()

    useEffect(()=>{
        if(!user || user?.userType!=="manager"){
            navigate("/auth")
            return;
        }
    },[user])
  return (
    <div>
        {children}
    </div>
  )
}

export default PrivateRoute
