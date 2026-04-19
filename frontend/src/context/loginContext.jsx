import { createContext , useState } from "react";
import axios from "axios";
import { loignUrl } from "../api";

export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const [loginUser, setLoginUser] = useState(null);
    const login = async (email , password)=>{
        try{
        const res = await axios.post(loignUrl,{
            email,
            password
        });
        console.log("res.data", res.data);
        setLoginUser(res.data);
    }catch(e){
        console.log("Error : " , e);
    }
    }
    return<LoginContext.Provider value={{loginUser , login}}>
        {children}
    </LoginContext.Provider>
}

