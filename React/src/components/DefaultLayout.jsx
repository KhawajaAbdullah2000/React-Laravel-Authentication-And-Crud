/* eslint-disable no-unused-vars */
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";

export default function DefaultLayout() {

    const {user,token}=useStateContext();
    if(!token){
        // to users
        return <Navigate to="/login"/>
    }

    const logout=(ev)=>{
        ev.preventDefault()

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
