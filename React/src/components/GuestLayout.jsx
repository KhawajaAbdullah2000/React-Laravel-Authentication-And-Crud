/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";


export default function GuestLayout() {

    const {user,token}=useStateContext();
    if(token){
        //to uses page
        return <Navigate to="/users" />
    }

  return (
    <div>
    <Outlet/>

    </div>
  )
}
