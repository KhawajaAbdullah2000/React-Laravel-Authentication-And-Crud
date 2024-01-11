/* eslint-disable no-unused-vars */
import axios from "axios"

const axiosClient=axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}/api`

});

//interceptor execute before the request is send or a response is received

axiosClient.interceptors.request.use((config)=>{
    const token=localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization=`Bearer ${token}`;
    return config;

})

axiosClient.interceptors.response.use((response)=>{
    //if promise resolved
    return response;

}, (error)=>{
    const {response}=error;
    if (response.status==401){
        //token expired or incorrect
        localStorage.removeItem('ACCESS_TOKEN');
    }

    throw error;

})

export default axiosClient;