/* eslint-disable no-unused-vars */

import { useRef,useState } from 'react';
import  {Link} from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../Context/ContextProvider';
export default function Signup() {

    const nameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmationRef=useRef();

    const {setUser,setToken}=useStateContext();
    const [errors,setErros]=useState(null);


    const onSubmit=(ev)=>{
        ev.preventDefault();
        const payload={
            name:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            password_confirmation:passwordConfirmationRef.current.value
        }

        axiosClient.post("/signup",payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)

        })
        .catch(err=>{

            const response=err.response;

            if(response && response.status==422){
                //validation error
             //console.log(response.data.errors);
             setErros(response.data.errors)
            }

        })


    }


  return (
    <div className="login-signup-form animated fadeInDown">


    <div className="form">
    <h1 className="title">Create Your Account</h1>

    <form onSubmit={onSubmit}>

    {errors &&
    <div className='alert'>
    {Object.keys(errors).map(key=>(
        <p key={key}>{errors[key][0] }</p>
    ))}

    </div>}

    <input ref={nameRef} type="text" placeholder="Full Name" />
    <input ref={emailRef} type="email" placeholder="Email" />
    <input ref={passwordRef} type="password" placeholder="Password" />
    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />

    <button className="btn btn-block">Login</button>

    <p className="message">
    Already registered? <Link to="/login">Signin</Link>
    </p>


    </form>


    </div>

    </div>

  )
}
