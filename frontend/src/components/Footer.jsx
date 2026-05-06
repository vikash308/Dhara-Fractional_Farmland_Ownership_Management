import { NavLink } from "react-router-dom";
import { RxLinkedinLogo, RxTwitterLogo, RxInstagramLogo } from "react-icons/rx";
import { toast } from "react-toastify";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a4d2e] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <NavLink to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1a4d2e] font-bold text-xl">
                D
              </div>
              <h2 className="text-2xl font-bold">Dhara</h2>
            </NavLink>
            <p className="text-green-100 text-sm leading-relaxed mb-6">
              India's first fractional farmland ownership platform connecting urban investors with rural excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <RxTwitterLogo className="size-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <RxInstagramLogo className="size-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <RxLinkedinLogo className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-green-100">
              <li><NavLink to="/farms" className="hover:text-orange-400 transition-colors">Browse Farms</NavLink></li>
              <li><NavLink to="/pricing" className="hover:text-orange-400 transition-colors">Pricing</NavLink></li>
              <li><NavLink to="/about" className="hover:text-orange-400 transition-colors">About Us</NavLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-green-100">
              <li><NavLink to="/farmer-stories" className="hover:text-orange-400 transition-colors">Farmer Stories</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-orange-400 transition-colors">Help Center</NavLink></li>
              <li><NavLink to="/legal" className="hover:text-orange-400 transition-colors">Privacy Policy</NavLink></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Stay Connected</h4>
            <p className="text-sm text-green-100 mb-4">Get the latest farm updates and harvest reports delivered to your inbox.</p>
            <form 
              onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed! Welcome to the Dhara community."); }}
              className="space-y-2"
            >
              <input 
                type="email" 
                placeholder="Email address" 
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-white placeholder-green-200 transition-colors"
              />
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-200">
          <p>© {currentYear} Dhara Agriculture Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <NavLink to="/legal" className="hover:text-white transition-colors">Terms of Service</NavLink>
            <NavLink to="/legal" className="hover:text-white transition-colors">Cookie Policy</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;