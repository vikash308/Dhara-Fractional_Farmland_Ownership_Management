import { useState } from "react"; 
import { NavLink } from "react-router";
import { SlMenu } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";

  function Navbar(){
    const  [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const [menu , setMenu] = useState(false);

    function menuVisibility(){
      setMenu(!menu);
    }

    return<>
    <div className="flex justify-between h-14 items-center sticky top-0 bg-zinc-200 shadow-md">

      <div>
        <h1 className="text-2xl md:text-3xl text-green-900 font-bold ml-5 sm:ml-15 md:ml-20 lg:ml-30">Dhara</h1>
      </div>


     <div className={`gap-20 mr-15 hidden lg:flex`}>
    <NavLink to="/" className={({isActive})=>isActive ? "text-base text-green-700 hover:text-green-800 underline" : "text-black hover:text-green-800"}>Home</NavLink>
    <NavLink to="/about" className={({isActive})=>isActive ? "text-base text-green-700 hover:text-green-800 underline" : "text-black hover:text-green-800"}>About</NavLink>
    <NavLink to="/farms" className={({isActive})=>isActive ? "text-base text-green-700 hover:text-green-800 underline" : "text-black hover:text-green-800"}>Farms</NavLink>
    {isLoggedIn ?<NavLink to="/dashboard" className={({isActive})=>isActive ? "text-base text-green-700 hover:text-green-800" : "text-black hover:text-green-800"}>Dashboard</NavLink> : <button className="text-sm w-30 bg-green-700 py-2 text-white rounded-lg hover:bg-green-800"><NavLink to="/signup">Login/Signup</NavLink></button>}
      </div>
     
      <div className="p-10 lg:hidden transition-all duration-1000" onClick={()=>setMenu(!menu)}> {menu ? <RxCross2 className="size-5"/> : <SlMenu/>} </div>

      </div>
      
        <div className={`${menu ? "flex flex-col items-center mt-10 mb-5 gap-8 bg-zinc-200 transition-all duration-1000" : "hidden transition-all duration-1000"} sticky top-14`}>
    <NavLink to="/" className={({isActive})=>isActive ? "text-base text-green-700 hover:text-green-800 underline" : "text-black hover:text-green-800"}>Home</NavLink>
    <NavLink to="/about" className={({isActive})=>isActive ? "text-base text-green-700 hover:text-green-800 underline" : "text-black hover:text-green-800"}>About</NavLink>
    <NavLink to="/farms" className={({isActive})=>isActive ? "text-base text-green-700 hover:text-green-800 underline" : "text-black hover:text-green-800"}>Farms</NavLink>
    {isLoggedIn ?<NavLink to="/dashboard" className={({isActive})=>isActive ? "text-base text-green-700 hover:text-green-800" : "text-black hover:text-green-800"}>Dashboard</NavLink> : <NavLink to="/signup" className={({isActive})=>isActive ? "text-base text-green-700 hover:text-green-800" : "text-black hover:text-green-800"}>Login/Signup</NavLink>}
      </div>
     

    </>
  }

  export default Navbar;