/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";

const StateContext=createContext({
    user:null,
    token:null,
    setToken:()=>{},
    setUser:()=>{}


});

export const ContextProvider=({children})=>{

    const [user,setUser]=useState({});
    const [token,_setToken]=useState(localStorage.getItem('ACCESS_TOKEN'))

    const setToken=(token)=>{
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');

        }
    }

    return (
       <StateContext.Provider value={{user,token,setUser,setToken}}>
       {children}

       </StateContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext=()=>useContext(StateContext);



