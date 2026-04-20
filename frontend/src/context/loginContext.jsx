import { createContext , useState } from "react";
import axios from "axios";
import server from "../api";
export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const [loginUser, setLoginUser] = useState(null);
    const login = async (email , password)=>{
        try{
        const res = await axios.post(server + "/login",{
            email,
            password
        });
        setLoginUser(res.data);
        return res.data;
    }catch(e){
        return e.response.data;
    }
    }
    return<LoginContext.Provider value={{loginUser , login}}>
        {children}
    </LoginContext.Provider>
}

