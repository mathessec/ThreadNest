// hooks its the function help to perform the certain function
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout(){
    let navigate=useNavigate()
    return()=>{
        sessionStorage.clear()
        toast.success("Logout Successfull")
        navigate('/login')
    }
}

export default useLogout