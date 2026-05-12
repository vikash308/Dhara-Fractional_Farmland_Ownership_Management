import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import api from "../utils/api";
import { HiOutlineBadgeCheck, HiOutlineUserGroup, HiOutlineCalendar, HiOutlineGlobeAlt, HiOutlineArrowLeft, HiOutlinePhotograph } from "react-icons/hi";
import { RiDoubleQuotesL } from "react-icons/ri";

function FarmerProfile() {
  const { farmerId } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch by ID. Here we simulate or use a generic fetch.
    const fetchFarmer = async () => {
      try {
        // Mocking farmer details for now since we don't have a specific "get farmer" endpoint
        // but we can derive it from the farm or user data.
        const res = await api.get("/api/farms"); // Get all farms and find the one with this farmer
        const farms = res.data.data;
        const farmWithFarmer = farms.find(f => f.farmerId?._id === farmerId);
        
        if (farmWithFarmer) {
          setFarmer(farmWithFarmer.farmerId);
        } else {
          // Fallback if not found in first few farms
          setFarmer({
            name: "Farmer Partner",
            email: "farmer@dhara.com",
            phone: "+91 98765 43210",
            experience: "15+ Years",
            specialization: "Organic Grains & Pulses",
            bio: "I have been farming in the Narmada valley for three generations. My mission is to bring pure, chemical-free food to urban families while preserving the health of my soil.",
            impact: "Supports 4 local families",
            rating: "4.9/5"
          });
        }
      } catch (error) {
        console.error("Error fetching farmer:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFarmer();
  }, [farmerId]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Profile Section */}
      <section className="relative h-[400px] bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fee74a62')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12 relative z-10">
          <NavLink to="/dashboard" className="flex items-center gap-2 text-white/80 hover:text-white mb-8 w-fit transition-colors">
            <HiOutlineArrowLeft /> Back to Dashboard
          </NavLink>
          
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="w-40 h-40 rounded-[40px] bg-white p-2 shadow-2xl">
              <img 
                src={`https://i.pravatar.cc/150?u=${farmerId}`} 
                alt={farmer?.name} 
                className="w-full h-full object-cover rounded-[32px]" 
              />
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-4xl md:text-6xl font-black text-primary font-inter">{farmer?.name}</h1>
                <HiOutlineBadgeCheck className="text-3xl text-blue-500" />
              </div>
              <p className="text-xl text-secondary font-medium uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                Master Farmer • <span className="text-primary">{farmer?.experience || "12+ Years"} Exp.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12 -mt-8 relative z-20">
        {/* Bio & Philosophy */}
        <div className="lg:col-span-2 space-y-12">
          <div className="glass-card p-10 rounded-[48px]">
            <RiDoubleQuotesL className="text-6xl text-tertiary/20 mb-4" />
            <p className="text-2xl font-serif italic text-primary leading-relaxed mb-8">
              "{farmer?.bio || "Farming is not just about growing crops; it is about nurturing the earth so it can nurture us in return. Every seed I sow is a promise of health to your family."}"
            </p>
            <div className="h-px bg-gray-100 w-full mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Specialization</h4>
                <div className="flex flex-wrap gap-2">
                  {(farmer?.specialization?.split('&') || ["Organic Farming", "Crop Rotation"]).map((s, i) => (
                    <span key={i} className="px-4 py-2 bg-secondary/10 text-primary font-bold rounded-xl text-sm">{s.trim()}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Location Expertise</h4>
                <p className="font-bold text-primary flex items-center gap-2">
                  <HiOutlineGlobeAlt className="text-xl text-secondary" />
                  Western Ghats Region, Maharashtra
                </p>
              </div>
            </div>
          </div>

          {/* Farmer's Gallery */}
          <div>
            <h3 className="text-3xl font-black font-inter mb-8 flex items-center gap-3">
              <HiOutlinePhotograph className="text-tertiary" /> Life at the Farm
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img src="https://images.unsplash.com/photo-1595246140625-573b715d11dc" alt="Farm life" className="rounded-3xl h-48 w-full object-cover hover:scale-105 transition-transform duration-500" />
              <img src="https://images.unsplash.com/photo-1500382017468-9049fee74a62" alt="Farm life" className="rounded-3xl h-48 w-full object-cover hover:scale-105 transition-transform duration-500" />
              <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399" alt="Farm life" className="rounded-3xl h-48 w-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* Impact & Trust Card */}
        <div className="space-y-8">
          <div className="bg-primary text-white p-10 rounded-[48px] shadow-2xl shadow-primary/20">
            <h3 className="text-2xl font-bold mb-8">The Dhara Impact</h3>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shrink-0">🏠</div>
                <div>
                  <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Lives Impacted</p>
                  <p className="text-xl font-bold">{farmer?.impact || "Supports 4 local families"}</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shrink-0">🎓</div>
                <div>
                  <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Education Support</p>
                  <p className="text-xl font-bold">2 children in school</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shrink-0">🌱</div>
                <div>
                  <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Sustainability</p>
                  <p className="text-xl font-bold">100% Pesticide Free</p>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-center text-sm font-medium italic opacity-80">
                "Your investment directly contributes to the socio-economic development of this village."
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[40px]">
            <h4 className="font-bold text-lg mb-4">Farmer Trust Score</h4>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-black text-primary">{farmer?.rating || "4.9"}</div>
              <div className="flex text-yellow-500 text-xl">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
            </div>
            <p className="text-sm text-secondary font-medium">Verified for on-time harvests and quality produce by 48 investors.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfile;
