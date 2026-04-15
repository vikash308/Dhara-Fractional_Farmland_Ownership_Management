import { NavLink } from "react-router";
import { useState } from "react";

function Login(){
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");

  const SubmitLogin  = (e)=>{
    e.preventDefault();
  }


  return<>
  <div className="flex justify-center rounded-lg mt-5 mb-5  ml-2 mr-2">

  <div className="bg-[url('\public\FarmerImg.jpg')] bg-cover h-110 w-100 rounded-lg">
      <div className="bg-black/85 w-full h-full flex flex-col items-center pt-10 rounded-lg">
        
  <h1 className="text-xl md:text-2xl text-white text-center mb-2" >Login</h1>
  <div className="w-full bg-white h-[0.1px] mb-5"></div>
  <form action="#" className="flex flex-col gap-5" onSubmit={(e)=>SubmitLogin(e)}>
    <input type="text" placeholder="Username" className="text-white border p-1 rounded-lg" onChange={(e)=>setUserName(e.target.value)}/>
    <input type="password" placeholder="Password" className="text-white border p-1 rounded-lg" onChange={(e)=>setPassword(e.target.value)}/>
    <input type="submit" placeholder="Password" className=" bg-green-900 text-white border p-1 rounded-lg text-center hover:bg-green-800" />
  </form>
  <h2 className="mt-5 text-white text-sm">Don't have account <NavLink to="/signup" className="text-blue-400 hover:underline">Signup</NavLink></h2>


      </div>
    </div>
    </div>


  
  </>
}

export default Login;