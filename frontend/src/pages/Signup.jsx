import { useState, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlinePhone } from "react-icons/hi";
import { GoogleLogin } from '@react-oauth/google';

function Signup() {
  const navigate = useNavigate();
  const { signup, googleLogin } = useContext(AuthContext);

  const [role, setRole] = useState('');
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const SubmitSignup = async (e) => {
    e.preventDefault();
    if (!role || !username || !email || !phone || !password) {
      toast.error("All fields are mandatory");
      return;
    }

    setIsLoading(true);
    const res = await signup(username, email, password, phone, role);
    setIsLoading(false);

    if (res.success) {
      toast.success(res.message);
      if (role === 'user') navigate("/");
      else navigate('/farmer');
    } else {
      toast.error(res.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await googleLogin(credentialResponse.credential);
    if (res.success) {
      toast.success(res.message);
      if (res.user.role === 'user') navigate("/");
      else navigate('/farmer');
    } else {
      toast.error(res.message);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Login Failed");
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-card p-10 bg-white shadow-2xl">
        <div>
          <div className="mx-auto h-12 w-12 bg-[#1a4d2e] rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-4">
            D
          </div>
          <h2 className="text-center text-3xl font-extrabold text-[#1a4d2e]">
            Join Dhara
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start your digital farming journey today
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={SubmitSignup}>
          <div className="space-y-4">
            {/* Role Selection */}
            <div className="flex justify-center gap-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="role" 
                  className="w-4 h-4 text-[#1a4d2e] focus:ring-[#1a4d2e]" 
                  onChange={() => setRole('user')} 
                  required 
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#1a4d2e]">Investor</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="role" 
                  className="w-4 h-4 text-[#1a4d2e] focus:ring-[#1a4d2e]" 
                  onChange={() => setRole('farmer')} 
                  required 
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#1a4d2e]">Farmer</span>
              </label>
            </div>

            <div className="relative">
              <HiOutlineUser className="absolute left-3 top-3.5 text-gray-400 text-xl" />
              <input
                type="text"
                required
                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1a4d2e] focus:border-[#1a4d2e] sm:text-sm transition-all"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-3.5 text-gray-400 text-xl" />
              <input
                type="email"
                required
                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1a4d2e] focus:border-[#1a4d2e] sm:text-sm transition-all"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <HiOutlinePhone className="absolute left-3 top-3.5 text-gray-400 text-xl" />
              <input
                type="tel"
                required
                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1a4d2e] focus:border-[#1a4d2e] sm:text-sm transition-all"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-3.5 text-gray-400 text-xl" />
              <input
                type="password"
                required
                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1a4d2e] focus:border-[#1a4d2e] sm:text-sm transition-all"
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
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="outline"
              size="large"
              width="100%"
            />
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink to="/login" className="font-medium text-orange-600 hover:text-orange-500 underline transition-colors">
              Log in instead
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;