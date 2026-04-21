import { createContext, useState } from "react";
import axios from 'axios';
import server from "../api";
export const SignupContext = createContext();

export const SignupProvider = ({children}) =>{
    const [user , setUser] = useState(null);
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
        return res.data;
    }catch(e){
        return e.response.data;
    }
    }
    return<SignupContext.Provider value={{ user,setUser, signup }}>
        {children}
    </SignupContext.Provider>
   
}