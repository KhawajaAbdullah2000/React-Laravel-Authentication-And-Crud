/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { useRef,useState } from 'react';
import axiosClient from "../axios-client";
import { useStateContext } from "../Context/ContextProvider";

export default function login() {

    const emailRef=useRef();
    const passwordRef=useRef();
    const {setUser,setToken}=useStateContext();
    const [errors,setErros]=useState(null);

    const onSubmit=(ev)=>{
        ev.preventDefault();
        const payload={
            email:emailRef.current.value,
            password:passwordRef.current.value,

        }
        setErros(null);
        axiosClient.post("/login",payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)

        })
        .catch(err=>{

            const response=err.response;

            if(response && response.status==422){
                if(response.data.errors){
                 setErros(response.data.errors)
                }else{
                    setErros({
                        email:[response.data.message]
                    })
                }

            }

        })



    }
  return (
    <div className="login-signup-form animated fadeInDown">


    <div className="form">
    <h1 className="title">Login into your Account</h1>


    <form onSubmit={onSubmit}>
    {errors &&
        <div className='alert'>
        {Object.keys(errors).map(key=>(
            <p key={key}>{errors[key][0] }</p>
        ))}

        </div>}
    <input ref={emailRef} type="email" placeholder="Email" />
    <input ref={passwordRef} type="password" placeholder="Password" />

    <button className="btn btn-block">Login</button>

    <p className="message">
    Not Registered? <Link to="/signup">Create an account</Link>
    </p>


    </form>


    </div>

    </div>
  )
}
