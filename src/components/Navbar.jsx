import { useState, useContext } from "react"; 
import { NavLink, useNavigate } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../context/AuthContext";
import { HiOutlineUserCircle, HiOutlineLogout } from "react-icons/hi";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  function handleLogout() {
    logout();
    navigate("/");
    setMenu(false);
    setProfileDropdown(false);
  }

  const userLinks = [
    { to: "/", label: "Home" },
    { to: "/farms", label: "Marketplace" },
    { to: "/about", label: "About" }
  ];

  const farmerLinks = [
    { to: "/farmer", label: "My Lands" },
    { to: "/farms", label: "Preview Ads" },
    { to: "/about", label: "How it Works" }
  ];

  const links = user?.role === 'farmer' ? farmerLinks : userLinks;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
 
 
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-linear-to-br from-[#1a4d2e] to-[#2d5a3c] rounded-xl flex items-center justify-center text-white font-bold text-2xl group-hover:rotate-6 transition-all shadow-lg shadow-green-900/20">
              D
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-[#1a4d2e] tracking-tight leading-none">Dhara</h1>
              <span className="text-[10px] text-orange-600 font-bold uppercase tracking-widest mt-1">Digital Soil</span>
            </div>
          </NavLink>


          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <NavLink 
                key={link.to}
                to={link.to} 
                className={({ isActive }) => `text-sm font-bold tracking-wide transition-all duration-300 hover:text-[#1a4d2e] relative py-2 ${isActive ? 'text-[#1a4d2e] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500 after:rounded-full' : 'text-gray-500'}`}
              >
                {link.label}
              </NavLink>
            ))}
            
            {user ? (
              <div className="relative ml-4">
                <button 
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-3 p-1.5 pr-4 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-100 transition-all"
                >
                  <div className="w-8 h-8 bg-[#1a4d2e] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.[0] || user.username?.[0] || "U"}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900 leading-none">{user.name || user.username}</p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-tighter mt-1">{user.role}</p>
                  </div>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 animate-in slide-in-from-top-2 duration-200">
                    <NavLink 
                      to={user.role === 'farmer' ? "/farmer" : "/dashboard"} 
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <HiOutlineUserCircle className="text-xl text-gray-400" /> My Dashboard
                    </NavLink>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <HiOutlineLogout className="text-xl" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <NavLink to="/login" className="text-sm font-bold text-gray-600 hover:text-[#1a4d2e] px-4">Login</NavLink>
                <NavLink to="/signup" className="btn-primary py-2.5 px-8 shadow-lg shadow-green-900/20 text-sm">Join Now</NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu*/}
          <button className="lg:hidden p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors" onClick={() => setMenu(!menu)}>
            {menu ? <RxCross2 className="size-6" /> : <SlMenu className="size-6" />}
          </button>
        </div>
      </div>


      <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${menu ? 'max-h-screen border-t border-gray-100 bg-white shadow-inner' : 'max-h-0'}`}>
        <div className="px-6 pt-4 pb-10 space-y-2">
          {user && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl mb-4">
              <div className="w-12 h-12 bg-[#1a4d2e] rounded-full flex items-center justify-center text-white text-lg font-bold">
                {user.name?.[0] || user.username?.[0]}
              </div>
              <div>
                <p className="font-bold text-gray-900">{user.name || user.username}</p>
                <p className="text-xs text-gray-500 uppercase">{user.role}</p>
              </div>
            </div>
          )}
          {links.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              onClick={() => setMenu(false)} 
              className="block px-4 py-4 text-base font-bold text-gray-700 hover:bg-gray-100 rounded-2xl transition-colors"
            >
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <button onClick={handleLogout} className="w-full text-left px-4 py-4 text-base font-bold text-red-600 hover:bg-red-50 rounded-2xl transition-colors">Sign Out</button>
          ) : (
            <div className="pt-4 flex flex-col gap-3">
              <NavLink to="/login" onClick={() => setMenu(false)} className="w-full text-center py-4 font-bold text-gray-600 border border-gray-100 rounded-2xl">Login</NavLink>
              <NavLink to="/signup" onClick={() => setMenu(false)} className="w-full text-center py-4 font-bold text-white bg-[#1a4d2e] rounded-2xl shadow-lg">Create Account</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;