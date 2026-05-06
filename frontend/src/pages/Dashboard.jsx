import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { HiOutlineTrendingUp, HiOutlineDatabase, HiOutlineSun, HiOutlineLocationMarker, HiOutlineClipboardList, HiOutlineGlobeAlt } from "react-icons/hi";
import { toast } from "react-toastify";
import api from "../utils/api";
import { NavLink } from "react-router-dom";
import AgreementPDF from "../components/AgreementPDF";

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

  const totalAssets = bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);
  
  const stats = [
    { label: "Total Invested", value: `$${totalAssets}`, icon: HiOutlineDatabase, gradient: "from-primary to-primary-light" },
    { label: "Current Valuation", value: `$${Math.round(totalAssets * 1.15)}`, icon: HiOutlineTrendingUp, gradient: "from-secondary to-[#A4B8A1]" },
    { label: "Projected Returns", value: "12.4%", icon: HiOutlineSun, gradient: "from-tertiary to-[#E28A6D]" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 font-work text-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-inter tracking-tight">
              Welcome back, <span className="text-tertiary">{user?.name || user?.username || "Investor"}</span>
            </h1>
            <p className="text-secondary mt-2 text-lg font-medium tracking-wide">Here is your portfolio overview.</p>
          </div>
          <NavLink to="/farms" className="bg-primary hover:bg-primary-light text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all">
            Explore Marketplace
          </NavLink>
        </div>

        {/* Glassmorphic Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-8 rounded-[24px] relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500`}></div>
              <div className="flex justify-between items-start mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                <div className="p-3 bg-white/50 backdrop-blur-md rounded-xl text-primary shadow-sm">
                  <stat.icon className="text-xl" />
                </div>
              </div>
              <p className="text-4xl lg:text-5xl font-black font-inter text-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Portfolio Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black font-inter">My Farmlands</h2>
            <div className="flex-1 h-px bg-gray-200 ml-4"></div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div>
          ) : bookings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {bookings.map((booking, i) => (
                <div key={i} className="glass-card p-6 rounded-[24px] flex flex-col relative group hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                      {booking.selectedCrop?.name ? (
                        <div className="w-full h-full flex items-center justify-center text-3xl bg-secondary/20">🌾</div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl bg-gray-200">🚜</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-black text-xl font-inter line-clamp-1">{booking.farmId?.name || "Premium Plot"}</h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          booking.status === 'confirmed' || booking.status === 'active' ? 'bg-secondary/20 text-primary' : 'bg-tertiary/20 text-tertiary'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-secondary mt-1">
                        Plot: {booking.plotId?.plotNumber || "N/A"} • {booking.plotId?.size || "N/A"} Acre
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    {(booking.status === 'confirmed' || booking.status === 'active') && !booking.selectedCrop?.cropId ? (
                      <NavLink 
                        to={`/select-crop/${booking._id}`} 
                        className="block w-full text-center py-3 px-6 bg-tertiary text-white rounded-xl font-bold hover:bg-[#b8654a] transition-all"
                      >
                        Choose Crop
                      </NavLink>
                    ) : booking.selectedCrop?.cropId ? (
                      <div className="bg-background/50 rounded-xl p-4 border border-gray-100">
                        <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                          <span className="text-primary">Growth Progress</span>
                          <span className="text-secondary">
                            {(() => {
                                const start = new Date(booking.startDate).getTime();
                                const end = new Date(booking.endDate).getTime();
                                const now = new Date().getTime();
                                return Math.min(100, Math.max(0, Math.round(((now - start) / (end - start)) * 100))) + "%";
                            })()}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                          <div className="h-full bg-primary rounded-full" style={{ 
                            width: (() => {
                                const start = new Date(booking.startDate).getTime();
                                const end = new Date(booking.endDate).getTime();
                                const now = new Date().getTime();
                                return Math.min(100, Math.max(0, Math.round(((now - start) / (end - start)) * 100))) + "%";
                            })() 
                          }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <NavLink to={`/crop-logs/${booking._id}`} className="text-xs font-bold text-tertiary hover:underline">
                            View Timeline →
                          </NavLink>
                          <AgreementPDF booking={booking} user={user} />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-background/50 p-4 rounded-xl text-center border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium">Verification pending</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-card rounded-[32px]">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-sm">🌱</div>
              <h3 className="text-2xl font-black font-inter mb-2">No investments yet</h3>
              <p className="text-secondary mb-8">Start building your agricultural portfolio today.</p>
              <NavLink to="/farms" className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all inline-block">
                View Marketplace
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;