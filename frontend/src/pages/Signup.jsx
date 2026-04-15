import { useState } from "react";
import { NavLink } from "react-router";

function Signup() {
  const [role,setRole] = useState('');
  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const SubmitSignup = (e)=>{
    e.preventDefault();
  }

  return <>
    <div className="flex justify-center mt-5 mb-5 rounded-lg ml-2 mr-2">
      <div className="bg-[url('\public\FarmerImg.jpg')] bg-cover h-110 w-110 rounded-lg">
        <div className="bg-black/85 w-full h-full flex flex-col items-center pt-8 rounded-lg">

          <h1 className="text-xl md:text-2xl text-white text-center mb-2">Signup</h1>
          <div className="w-full bg-white h-[0.1px] mb-5"></div>

          <form action="#" className="flex flex-col gap-5">
            <span className="flex gap-2">
              <h3 className="text-white">Select the role : </h3>
              <input type="radio" id="user" name="group1" className="accent-blue-500" required onChange={()=>setRole('user')}/>
              <label for="user" className="text-white text-sm">User</label>
              <input type="radio" id="farmer" name="group1" className="accent-blue-500" required onChange={()=>setRole('farmer')}/>
              <label for="farmer" className="text-white text-sm">Farmer</label>
            </span>
            <input type="text" placeholder="Username" className="text-white border p-1 rounded-lg" onChange={(e)=>setUserName(e.target.value)}/>
            <input type="email" placeholder="Email" className="text-white border p-1 rounded-lg" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" className="text-white border p-1 rounded-lg" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" className="bg-green-900 text-white border p-1 rounded-lg " />
          </form>
          <h2 className="mt-5 text-white text-sm">Already have account <NavLink to="/login" className="text-blue-400 hover:underline">Login</NavLink></h2>

        </div>
      </div>
    </div>


  </>
}

export default Signup;