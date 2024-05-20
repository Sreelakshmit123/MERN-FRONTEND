import React,  { createContext, useEffect, useState }  from 'react'

export const tokenAuthenticationContext = createContext()

function TokenAuthen({children}) {
    const [isAuthorised,setIsAuthorised]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthorised(true)
            console.log("guard state after logedin:",isAuthorised);
        }else if(sessionStorage.getItem("adminToken")){
            setIsAuthorised(true)
        }else{
            setIsAuthorised(false)
        }
    },[isAuthorised])
  return (
    <>
        <tokenAuthenticationContext.Provider value={{isAuthorised,setIsAuthorised}}>
            {children}
        </tokenAuthenticationContext.Provider>
    </>
  )
}

export default TokenAuthen