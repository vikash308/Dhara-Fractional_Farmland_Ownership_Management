import { NavLink } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineTrendingUp, HiOutlineGlobeAlt, HiOutlinePresentationChartBar, HiOutlineBadgeCheck } from "react-icons/hi";
import { BsPlayFill } from "react-icons/bs";

function Home() {
  const features = [
    {
      title: "Real-Time Growth",
      desc: "Track your crops' progress with daily HD photo updates and health reports.",
      icon: HiOutlineTrendingUp,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Verified Farmlands",
      desc: "Every plot on Dhara is legally verified and managed by certified professional farmers.",
      icon: HiOutlineShieldCheck,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Market Insights",
      desc: "Get deep insights into crop market trends to maximize your harvest value.",
      icon: HiOutlinePresentationChartBar,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 px-6">
        {/* Abstract Background Shapes */}
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-green-50 rounded-full blur-[120px] opacity-60 z-0 animate-pulse"></div>
        <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-orange-50 rounded-full blur-[100px] opacity-60 z-0"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 bg-green-50 text-[#1a4d2e] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border border-green-100 shadow-sm">
              <HiOutlineBadgeCheck className="text-lg" /> India's #1 Digital Farming Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#1a4d2e] leading-[1.1] mb-8">
              Grow Your Wealth <br />
              <span className="text-orange-500 italic font-light">From the Soil.</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Rent premium farmlands, choose your crops, and watch them grow through your screen. Authentic farming, delivered digitally.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <NavLink to="/signup" className="btn-primary py-4 px-10 text-lg shadow-2xl shadow-green-900/20 flex items-center justify-center gap-2 group">
                Start Farming Now <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </NavLink>
              <button 
                onClick={() => document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-4 py-4 px-8 bg-white text-gray-700 font-bold rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all"
              >
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-xl shadow-inner">
                  <BsPlayFill />
                </div>
                How it Works
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-100">
              <div>
                <p className="text-3xl font-black text-[#1a4d2e]">500+</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Acres Managed</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#1a4d2e]">12k+</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Happy Investors</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#1a4d2e]">98%</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Harvest Rate</p>
              </div>
            </div>
          </div>

          <div className="relative animate-in zoom-in duration-1000">
            {/* Hero Image Container */}
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(26,77,46,0.3)]">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Digital Farming" 
                className="w-full h-[600px] object-cover"
              />
            </div>
            {/* Floating UI Elements */}
            <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-[#1a4d2e]">
                  <HiOutlineGlobeAlt className="text-2xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Plot Health</p>
                  <p className="text-sm font-black text-gray-900">94.2% Optimal</p>
                </div>
              </div>
              <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#1a4d2e] w-[94%]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a4d2e] mb-6">Farming Simplified.</h2>
            <p className="text-gray-500 text-lg">We've removed the barriers of land ownership and agricultural labor, leaving only the joy of cultivation and growth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-green-100 group">
                <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:rotate-6 transition-transform`}>
                  <f.icon />
                </div>
                <h3 className="text-2xl font-bold text-[#1a4d2e] mb-4">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE PROCESS (STEP BY STEP) --- */}
      <section id="process-section" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#1a4d2e] rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center relative z-10">Your Journey at Dhara</h2>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl font-black mx-auto border border-white/20">1</div>
                <h4 className="text-2xl font-bold">Pick Your Plot</h4>
                <p className="text-green-100/70 font-light leading-relaxed">Browse verified farmlands and select a plot size that fits your budget.</p>
              </div>
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center text-4xl font-black mx-auto shadow-xl shadow-orange-900/40">2</div>
                <h4 className="text-2xl font-bold">Select Crop</h4>
                <p className="text-green-100/70 font-light leading-relaxed">Choose from seasonal crops. Our expert farmers will handle the sowing and care.</p>
              </div>
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl font-black mx-auto border border-white/20">3</div>
                <h4 className="text-2xl font-bold">Harvest Wealth</h4>
                <p className="text-green-100/70 font-light leading-relaxed">Track growth logs daily. At harvest, choose to get the produce or sell for profit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1a4d2e] mb-8 leading-tight">Hear it from our <br /> digital farmers</h2>
              <div className="relative p-10 bg-gray-50 rounded-[40px] border border-gray-100">
                <div className="text-6xl text-orange-200 absolute top-6 left-6 font-serif">"</div>
                <p className="text-xl text-gray-700 italic relative z-10 leading-relaxed">
                  Dhara has completely changed my perspective on investment. I'm not just seeing numbers on a screen; I'm seeing real plants grow, supporting a real family, and getting organic food in return.
                </p>
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
                  <div className="w-12 h-12 bg-[#1a4d2e] rounded-full"></div>
                  <div>
                    <p className="font-bold text-gray-900">Rahul Sharma</p>
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Tech Entrepreneur, Bangalore</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Farm" className="rounded-3xl h-64 w-full object-cover shadow-lg" />
              <img src="https://images.unsplash.com/photo-1592841608619-61849a21986d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Farm" className="rounded-3xl h-64 w-full object-cover shadow-lg mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 bg-green-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-[#1a4d2e] mb-10">Start Your Digital Farm Today.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink to="/signup" className="btn-primary py-5 px-16 text-xl shadow-2xl shadow-green-900/20">Join as Investor</NavLink>
            <NavLink to="/signup" className="bg-white text-[#1a4d2e] py-5 px-16 text-xl font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all shadow-xl shadow-gray-200/50">Join as Farmer</NavLink>
          </div>
          <p className="mt-8 text-gray-500 font-medium tracking-wide">No joining fee. Start with as little as 0.25 acres.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;