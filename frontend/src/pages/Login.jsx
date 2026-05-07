import { useState, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const SubmitLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are mandatory");
      return;
    }
    
    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      toast.success(res.message);
      if (res.user.role === 'user') navigate("/");
      else navigate('/farmer');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-card p-10 bg-white shadow-2xl">
        <div>
          <div className="mx-auto h-12 w-12 bg-[#1a4d2e] rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-4">
            D
          </div>
          <h2 className="text-center text-3xl font-extrabold text-[#1a4d2e]">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Log in to manage your digital farm
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={SubmitLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-3.5 text-gray-400 text-xl" />
              <input
                type="email"
                required
                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1a4d2e] focus:border-[#1a4d2e] focus:z-10 sm:text-sm transition-all"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-3.5 text-gray-400 text-xl" />
              <input
                type="password"
                required
                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1a4d2e] focus:border-[#1a4d2e] focus:z-10 sm:text-sm transition-all"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#1a4d2e] hover:bg-[#2d5a3c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a4d2e] transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <NavLink to="/signup" className="font-medium text-orange-600 hover:text-orange-500 underline transition-colors">
              Create one now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;