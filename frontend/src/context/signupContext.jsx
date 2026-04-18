import { createContext, useState } from "react";
import axios from 'axios';
import {signupUrl} from '../api';

export const SignupContext = createContext();

export const SignupProvider = ({children}) =>{
    const [user , setUser] = useState(null);
    const signup = async (username , role , email , password)=>{
        try{
        const res = await axios.post(signupUrl,{
            username,
            role,
            email,
            password
        });
        console.log("res.data", res.data);
        setUser(res.data);
    }catch(e){
        console.log("Error : " , e);
    }
    }
    return<SignupContext.Provider value={{ user, signup }}>
        {children}
    </SignupContext.Provider>
   
}