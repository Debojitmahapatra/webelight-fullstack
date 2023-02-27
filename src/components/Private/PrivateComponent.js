import React,{useEffect} from 'react'
import {Navigate,Outlet,useNavigate} from 'react-router-dom'

function PrivateComponent() {
  let nav = useNavigate()
  function logOutUser() {
    localStorage.clear()
    alert("session expired please log in again")
    nav('/login')
  }
  
    useEffect(() => {
      getproducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  
    const getproducts = async () => {
      let result = await fetch("http://localhost:5000/product",{
  
      headers:{
        authorization: `${JSON.parse(localStorage.getItem('token'))}`
      }
  
    })
      result = await result.json();
   if(result.message==="invalid token"){
        logOutUser()
      }
     
    };
    const auth=localStorage.getItem('data')
  return auth? <Outlet/> : <Navigate to='/signup'/>
}

export default PrivateComponent
