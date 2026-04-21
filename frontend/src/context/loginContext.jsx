import { createContext , useEffect, useState  } from "react";
import axios from "axios";
import server from "../api";


export const LoginContext = createContext();

export const LoginProvider = ({children}) => {

    const [loginUser, setLoginUser] = useState(null);
    useEffect(()=>{
        const user = localStorage.getItem("user");
        if(user){
            setLoginUser(JSON.parse(user));
        }
    },[])
    const login = async (email , password)=>{
        try{
        const res = await axios.post(server + "/login",{
            email,
            password
        });
        setLoginUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
    }catch(e){
        return e.response.data;
    }
}
    const logout = ()=>{
          localStorage.removeItem("user");
         setLoginUser(null);
    }

    return<LoginContext.Provider value={{loginUser , login , logout}}>
        {children}
    </LoginContext.Provider>
}

