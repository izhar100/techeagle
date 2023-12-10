import React, { useEffect, useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'

const Auth = () => {
    const [renderPage,setRenderPage]=useState('login')
    function handlePage(newPage){
        setRenderPage(newPage)
    }
  return (
    <div>
      {
        renderPage==="login"
        ?
        <Login handlePage={handlePage}/>
        :
        <Signup handlePage={handlePage}/>
      }
    </div>
  )
}

export default Auth
