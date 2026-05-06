import { NavLink } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineTrendingUp, HiOutlineGlobeAlt, HiOutlinePresentationChartBar, HiOutlineBadgeCheck } from "react-icons/hi";
import { BsPlayFill } from "react-icons/bs";
import AnimatedSection from "../components/AnimatedSection";

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
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 px-6 bg-gray-50/50">
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-green-50 rounded-full blur-[120px] opacity-60 z-0"></div>
        <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-orange-50 rounded-full blur-[100px] opacity-60 z-0"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <AnimatedSection animation="left" duration={1200} className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white text-[#1a4d2e] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <HiOutlineBadgeCheck className="text-lg text-orange-500" /> India's #1 Digital Farming Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#1a4d2e] leading-[1.1] mb-8">
              Grow Your Wealth <br />
              <span className="text-orange-500 italic font-light relative inline-block">
                From the Soil.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-200/50 -z-10 rounded-full transform -skew-x-12"></span>
              </span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Rent premium farmlands, choose your crops, and watch them grow through your screen. Authentic farming, delivered digitally.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <NavLink to="/signup" className="bg-[#1a4d2e] hover:bg-[#2d5a3c] text-white font-bold py-4 px-10 text-lg rounded-xl shadow-xl flex items-center justify-center gap-2 group transition-all hover:-translate-y-1">
                Start Farming Now <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </NavLink>
              <button 
                onClick={() => document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-4 py-4 px-8 bg-white text-[#1a4d2e] font-bold rounded-xl hover:bg-gray-50 transition-all border border-gray-200 hover:shadow-lg"
              >
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                  <BsPlayFill />
                </div>
                How it Works
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200">
              <AnimatedSection animation="up" delay={200}>
                <p className="text-4xl font-extrabold text-[#1a4d2e]">500+</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Acres Managed</p>
              </AnimatedSection>
              <AnimatedSection animation="up" delay={300}>
                <p className="text-4xl font-extrabold text-[#1a4d2e]">12k+</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Happy Investors</p>
              </AnimatedSection>
              <AnimatedSection animation="up" delay={400}>
                <p className="text-4xl font-extrabold text-[#1a4d2e]">98%</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Harvest Rate</p>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Hero Image Container */}
            <div className="relative z-10 rounded-[48px] overflow-hidden shadow-2xl">
              <img 
                src="/hero-farm.png" 
                alt="Digital Farming" 
                className="w-full h-[600px] object-cover"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f5c9bbaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }}
              />
            </div>
            {/* Floating UI Elements */}
            <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl z-20 hidden md:block shadow-xl border border-gray-100">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-sm">
                  <HiOutlineGlobeAlt className="text-3xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Plot Health</p>
                  <p className="text-lg font-bold text-[#1a4d2e]">94.2% Optimal</p>
                </div>
              </div>
              <div className="w-40 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-[#1a4d2e] w-[94%] rounded-full relative">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection animation="up" className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#1a4d2e] mb-6">Farming Simplified.</h2>
            <p className="text-gray-500 text-xl">We've removed the barriers of land ownership and agricultural labor, leaving only the joy of cultivation and growth.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <AnimatedSection key={i} animation="up" delay={i * 200}>
                <div className="bg-white p-10 rounded-[32px] hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 border border-gray-100 group relative overflow-hidden h-full flex flex-col">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className={`w-20 h-20 ${f.color} rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:-translate-y-2 group-hover:shadow-lg transition-all duration-500`}>
                    <f.icon />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a4d2e] mb-4">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed flex-grow">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE PROCESS (STEP BY STEP) --- */}
      <section id="process-section" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="scale" duration={800}>
            <div className="bg-[#1a4d2e] rounded-[64px] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10"></div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-24 text-center relative z-10">Your Journey at Dhara</h2>

              <div className="grid md:grid-cols-3 gap-16 relative z-10">
                <AnimatedSection animation="right" delay={100} className="text-center space-y-6 relative group">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[32px] flex items-center justify-center text-5xl font-bold mx-auto border border-white/20 group-hover:scale-110 group-hover:bg-white group-hover:text-[#1a4d2e] transition-all duration-500 shadow-xl">1</div>
                  <h4 className="text-3xl font-bold">Pick Your Plot</h4>
                  <p className="text-green-50 leading-relaxed text-lg">Browse verified farmlands and select a plot size that fits your budget.</p>
                </AnimatedSection>
                <AnimatedSection animation="right" delay={300} className="text-center space-y-6 relative group">
                  <div className="hidden md:block absolute top-12 -left-8 w-16 h-0.5 bg-orange-500"></div>
                  <div className="w-24 h-24 bg-orange-500 rounded-[32px] flex items-center justify-center text-5xl font-bold mx-auto shadow-lg group-hover:scale-110 group-hover:bg-orange-400 transition-all duration-500">2</div>
                  <h4 className="text-3xl font-bold">Select Crop</h4>
                  <p className="text-green-50 leading-relaxed text-lg">Choose from seasonal crops. Our expert farmers will handle the sowing and care.</p>
                </AnimatedSection>
                <AnimatedSection animation="right" delay={500} className="text-center space-y-6 relative group">
                  <div className="hidden md:block absolute top-12 -left-8 w-16 h-0.5 bg-orange-500"></div>
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[32px] flex items-center justify-center text-5xl font-bold mx-auto border border-white/20 group-hover:scale-110 group-hover:bg-white group-hover:text-[#1a4d2e] transition-all duration-500 shadow-xl">3</div>
                  <h4 className="text-3xl font-bold">Harvest Wealth</h4>
                  <p className="text-green-50 leading-relaxed text-lg">Track growth logs daily. At harvest, choose to get the produce or sell for profit.</p>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-32 relative bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <AnimatedSection animation="left" className="lg:w-1/2">
              <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4 block inline-flex items-center gap-2">
                <span className="w-8 h-px bg-orange-600"></span> Testimonials
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-[#1a4d2e] mb-10 leading-[1.1]">Hear it from our <br /> digital farmers</h2>
              <div className="relative p-10 bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-500">
                <div className="text-8xl text-orange-100 absolute -top-4 left-6 font-serif leading-none">"</div>
                <p className="text-xl text-gray-700 italic relative z-10 leading-relaxed mt-4">
                  Dhara has completely changed my perspective on investment. I'm not just seeing numbers on a screen; I'm seeing real plants grow, supporting a real family, and getting organic food in return.
                </p>
                <div className="flex items-center gap-4 mt-10 pt-8 border-t border-gray-100">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="Rahul" className="w-14 h-14 rounded-full object-cover ring-4 ring-gray-50 hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-[#1a4d2e] text-lg">Rahul Sharma</p>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Tech Entrepreneur</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-6 relative">
              <img src="/review-farmer.png" alt="Farm" className="rounded-[32px] h-80 w-full object-cover shadow-xl" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }} />
              <img src="/review-crops.png" alt="Farm" className="rounded-[32px] h-80 w-full object-cover shadow-xl mt-12" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }} />
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 relative bg-white text-center">
        <AnimatedSection animation="scale" className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold text-[#1a4d2e] mb-12">Start Your Digital Farm Today.</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <NavLink to="/signup" className="bg-[#1a4d2e] hover:bg-[#2d5a3c] text-white py-5 px-16 text-xl font-bold rounded-2xl shadow-lg hover:-translate-y-1 transition-all">Join as Investor</NavLink>
            <NavLink to="/signup" className="bg-white text-[#1a4d2e] py-5 px-16 text-xl font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm hover:-translate-y-1 hover:shadow-md hover:shadow-gray-200">Join as Farmer</NavLink>
          </div>
          <p className="mt-10 text-gray-500 font-bold tracking-widest uppercase text-sm">No joining fee. Start with as little as 0.25 acres.</p>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default Home;