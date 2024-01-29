/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useStateContext } from "../Context/ContextProvider"
import axiosClient from "../axios-client";

export default function DashBoard() {
    const {user}=useStateContext();
    const [users,setUsers]=useState([]);


    const fetchUsers=()=>{
        axiosClient.get(`/get_users/{user.id}`).then((res)=>{
           setUsers(res.data.users)
        })
        .catch((err)=>{
            console.log(err.message)
        })

    }

    useEffect(()=>{
        fetchUsers()
    },[])


  return (
    <div style={{flex:1}}>

    <h1 style={{textAlign:'center',fontSize:'3rem'}}>Dashboard</h1>

    <div>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            </tr>
          </thead>
          <tbody>
          {users.length ==0 ? (
            <tr>
                <td colSpan="3">Loading...</td>
            </tr>
        ) : users && users.length > 0 ? (
            users.map(item => (
                <tr key={item.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.id}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.email}</td>
                </tr>
            ))
        ) : null}


          </tbody>
        </table>
      </div>






    </div>
  )
}
