import { useState, useContext } from "react";
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { LoginContext } from "../context/loginContext";


function Login() {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const SubmitLogin = async (e) => {
    e.preventDefault();
    if(!email || !password){
      toast.error("All fields are mandatory");}
    else{
    try {
      await login(email, password);
      toast.success("Login successfully");
    } catch (e) {
      toast.error("Error occurred during login");
    }
    if(role === 'user') navigate("/");
    else navigate('/farmer');
  }
  }


  return <>
    <div className="flex justify-center rounded-lg mt-5 mb-5  ml-2 mr-2">

      <div className="bg-[url('\public\FarmerImg.jpg')] bg-cover h-110 w-100 rounded-lg">
        <div className="bg-black/85 w-full h-full flex flex-col items-center pt-10 rounded-lg">

          <h1 className="text-xl md:text-2xl text-white text-center mb-2" >Login</h1>
          <div className="w-full bg-white h-[0.1px] mb-5"></div>
          <form action="#" className="flex flex-col gap-5" onSubmit={SubmitLogin}>
            <input type="text" placeholder="Email" className="text-white border p-1 rounded-lg" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="text-white border p-1 rounded-lg" onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" className=" bg-green-900 text-white border p-1 rounded-lg text-center hover:bg-green-800" />
          </form>
          <h2 className="mt-5 text-white text-sm">Don't have account <NavLink to="/signup" className="text-blue-400 hover:underline">Signup</NavLink></h2>


        </div>
      </div>
    </div>



  </>
}

export default Login;