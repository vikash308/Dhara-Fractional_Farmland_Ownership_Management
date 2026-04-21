import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import server from "../api";
export const SignupContext = createContext();

export const SignupProvider = ({children}) =>{
    const [user , setUser] = useState(null);
    useEffect(()=>{
        const signupUser = localStorage.getItem("signupUser");
        if(signupUser){
            setUser(JSON.parse(signupUser));
        }
    },[])
    const signup = async (name , email ,password, phone, role)=>{
        try{
        const res = await axios.post(server + "/signup",{
            name,
            email,
            password,
            phone,
            role
        });
        setUser(res.data);
        localStorage.setItem("signupUser", JSON.stringify(res.data));
        return res.data;
    }catch(e){
        return e.response.data;
    }
    }
    const Slogout = ()=>{
          localStorage.removeItem("signupUser");
         setUser(null);
    }
    return<SignupContext.Provider value={{ user,setUser, signup , Slogout }}>
        {children}
    </SignupContext.Provider>
   
}