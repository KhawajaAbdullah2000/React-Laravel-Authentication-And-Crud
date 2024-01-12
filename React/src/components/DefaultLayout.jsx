/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const {user,token,setUser,setToken}=useStateContext();

    useEffect(()=>{
        axiosClient.get("/user")
        .then(({data})=>{
            setUser(data)
        })
    },[]);


    if(!token){
        // to users
        return <Navigate to="/login"/>
    }

    const logout=(ev)=>{
        ev.preventDefault()
        axiosClient.post('/logout')
        .then(()=>{
            setUser({});
            setToken(null)

        })
        .catch(err=>{
            console.log(err);
        })


    }

  return (
    <div id="defaultLayout">

    <aside>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/users">Users</Link>
    </aside>

    <div className="content">

    <header>

    <div>
    Header
    </div>

    <div>
    {user.name}
    <a href="#" onClick={logout} className="btn-logout">logout</a>
    </div>
    </header>


    <main>
    <Outlet/>

    </main>


    </div>


    </div>
  )
}
