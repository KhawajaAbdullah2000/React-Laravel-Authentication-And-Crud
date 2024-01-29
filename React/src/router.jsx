/* eslint-disable no-unused-vars */
import {Navigate, createBrowserRouter} from 'react-router-dom'
import Login from './views/login';
import Signup from './views/Signup';
import Users from './views/Users';
import NotFound from './views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import DashBoard from './views/DashBoard';

const router=createBrowserRouter([

    {
       path:'/',
       //gor signed in users
       element:<DefaultLayout/>,
       children:[

        {
           path:"/",
           element:<Navigate to="/dashboard"/>

        },

        {
            path:"/dashboard",
            element:<DashBoard/>
        },


        {
            path:"/users",
            element:<Users/>
        }



       ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path:"/",
                element:<Navigate to="/login"/>

         },

            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/signup",
                element:<Signup/>
            }


        ]
    },


    {
        path:"*",
        element:<NotFound/>
    }



])

export default router;


