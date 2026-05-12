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
    { to: user ? "/dashboard" : "/", label: "Home" },
    { to: "/farms", label: "Marketplace" },
    { to: "/about", label: "About" }
  ];

  const farmerLinks = [
    { to: "/farmer", label: "Home" },
    { to: "/manage-plots", label: "Manage Plots" },
    { to: "/farms", label: "Preview Ads" },
    { to: "/about", label: "How it Works" }
  ];

  const links = user?.role === 'farmer' ? farmerLinks : userLinks;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1a4d2e] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">
              D
            </div>
            <h1 className="text-2xl font-bold text-[#1a4d2e]">Dhara</h1>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <NavLink 
                key={link.to}
                to={link.to} 
                className={({ isActive }) => `relative py-2 text-sm font-medium transition-colors hover:text-orange-500 ${isActive ? 'text-orange-600 font-bold' : 'text-gray-600'} after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-orange-500 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left`}
              >
                {link.label}
              </NavLink>
            ))}
            
            {user ? (
              <div className="relative ml-4">
                <button 
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2.5 p-1.5 pr-4 bg-white hover:bg-gray-50 rounded-full border border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  <div className="w-8 h-8 bg-[#1a4d2e] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.[0] || user.username?.[0] || "U"}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{user.name || user.username}</span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-1 border border-gray-100 animate-in slide-in-from-top-2 duration-200 origin-top-right">
                    <NavLink 
                      to={user.role === 'farmer' ? "/farmer" : "/dashboard"} 
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <HiOutlineUserCircle className="text-lg text-[#1a4d2e]" /> My Dashboard
                    </NavLink>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <HiOutlineLogout className="text-lg" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-4">
                <NavLink to="/login" className="text-sm font-medium text-gray-600 hover:text-[#1a4d2e] transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-[-2px] after:left-0 after:bg-[#1a4d2e] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Login</NavLink>
                <NavLink to="/signup" className="py-2 px-5 rounded-lg bg-[#1a4d2e] text-white hover:bg-orange-500 transition-colors font-medium">Join Now</NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-gray-600 hover:text-[#1a4d2e] transition-colors" onClick={() => setMenu(!menu)}>
            {menu ? <RxCross2 className="size-6" /> : <SlMenu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden bg-white ${menu ? 'max-h-96 border-t border-gray-100 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {user && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4 border border-gray-100">
              <div className="w-10 h-10 bg-[#1a4d2e] rounded-full flex items-center justify-center text-white font-bold">
                {user.name?.[0] || user.username?.[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name || user.username}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          )}
          {links.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              onClick={() => setMenu(false)} 
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500 hover:translate-x-2 rounded-xl transition-all"
            >
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <button onClick={handleLogout} className="w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 hover:translate-x-2 rounded-xl transition-all mt-2">Sign Out</button>
          ) : (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
              <NavLink to="/login" onClick={() => setMenu(false)} className="w-full text-center py-3 font-medium text-[#1a4d2e] bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">Login</NavLink>
              <NavLink to="/signup" onClick={() => setMenu(false)} className="w-full text-center py-3 font-medium text-white bg-[#1a4d2e] hover:bg-orange-500 rounded-xl transition-colors shadow-md">Create Account</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;