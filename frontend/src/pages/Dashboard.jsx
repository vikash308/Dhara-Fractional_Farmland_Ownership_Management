import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { HiOutlineTrendingUp, HiOutlineDatabase, HiOutlineSun, HiOutlineLocationMarker, HiOutlineClipboardList } from "react-icons/hi";
import { toast } from "react-toastify";
import api from "../utils/api";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/api/bookings/my");
        setBookings(res.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const stats = [
    { label: "Total Assets", value: `$${bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0)}`, icon: HiOutlineDatabase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Plots", value: bookings.filter(b => b.status === 'active').length, icon: HiOutlineLocationMarker, color: "text-green-600", bg: "bg-green-50" },
    { label: "Proposals", value: bookings.filter(b => b.status === "pending").length, icon: HiOutlineClipboardList, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Live Growth", value: bookings.filter(b => b.selectedCrop?.status === "growing").length, icon: HiOutlineSun, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#1a4d2e] tracking-tight">
              Welcome, <span className="text-orange-600">{user?.name || user?.username || "Investor"}</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium tracking-wide italic">"The best investment on earth is earth."</p>
          </div>
          <NavLink to="/farms" className="btn-primary py-4 px-8 shadow-xl shadow-green-900/10">
            Expand Portfolio
          </NavLink>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-8 bg-white border-none shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-3xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-gray-900 leading-none">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Active Plots List */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-[#1a4d2e] flex items-center gap-3">
              <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
              Your Digital Lands
            </h2>
            
            {isLoading ? (
              <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1a4d2e]"></div></div>
            ) : bookings.length > 0 ? (
              <div className="grid gap-6">
                {bookings.map((booking, i) => (
                  <div key={i} className="glass-card p-8 bg-white border-none shadow-sm hover:shadow-md transition-all group">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex gap-6 items-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-[20px] overflow-hidden shadow-inner border border-gray-100 flex items-center justify-center text-3xl">
                          {booking.selectedCrop?.name ? "🌾" : "🚜"}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-black text-gray-900 text-xl">{booking.farmId?.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              booking.status === 'confirmed' || booking.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-[#1a4d2e]">
                            Plot: {booking.plotId?.plotNumber || "N/A"} • {booking.plotId?.size || "N/A"} Acre
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-auto">
                        {(booking.status === 'confirmed' || booking.status === 'active') && !booking.selectedCrop?.cropId ? (
                          <NavLink 
                            to={`/select-crop/${booking._id}`} 
                            className="block w-full text-center py-3 px-6 bg-orange-600 text-white rounded-xl font-black text-sm hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20"
                          >
                            Choose Crop
                          </NavLink>
                        ) : booking.selectedCrop?.cropId ? (
                          <div className="text-right">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-2">Growth Progress</p>
                            <div className="flex items-center gap-4">
                              <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#1a4d2e] rounded-full" style={{ width: '35%' }}></div>
                              </div>
                              <span className="font-black text-[#1a4d2e] text-sm">35%</span>
                            </div>
                            <NavLink to={`/crop-logs/${booking._id}`} className="mt-3 inline-block text-xs font-black text-orange-600 hover:underline">
                              Full Timeline →
                            </NavLink>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 italic">Waiting for verification...</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🌱</div>
                <h3 className="text-2xl font-black text-gray-300">Your portfolio is empty</h3>
                <p className="text-gray-400 mt-2 mb-8">Start your first digital cultivation today.</p>
                <NavLink to="/farms" className="btn-primary py-4 px-10 shadow-lg shadow-green-900/20">Find a Farm</NavLink>
              </div>
            )}
          </div>

          {/* Sidebar / Insights */}
          <div className="space-y-8">
            <div className="glass-card p-10 bg-[#1a4d2e] text-white border-none shadow-[0_30px_60px_-15px_rgba(26,77,46,0.3)] rounded-[40px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="font-black text-2xl mb-4 relative z-10">Market Pulse</h3>
              <p className="text-green-100/70 text-sm leading-relaxed mb-8 relative z-10">Organic Turmeric demand has surged by 18% in European markets. Consider planting next season.</p>
              <button className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-sm hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20 relative z-10">
                Full Report
              </button>
            </div>
            
            <div className="glass-card p-8 bg-white border-none shadow-sm rounded-[30px]">
              <h4 className="font-bold text-[#1a4d2e] mb-6">Agronomist Tips</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0 font-bold">1</div>
                  <p className="text-sm text-gray-600 leading-relaxed">Check soil moisture logs every 48 hours during sowing.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0 font-bold">2</div>
                  <p className="text-sm text-gray-600 leading-relaxed">Early morning updates provide the best image clarity for pests.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;