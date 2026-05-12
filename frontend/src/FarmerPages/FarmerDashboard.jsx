import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { HiOutlinePlusCircle, HiOutlineUserGroup, HiOutlineGlobeAlt, HiOutlineClipboardList, HiOutlineCloudUpload } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import api, { getAssetUrl } from "../utils/api";
import AgreementPDF from "../components/AgreementPDF";
import { HiOutlineDownload } from "react-icons/hi";

function FarmerDashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [plots, setPlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, plotsRes] = await Promise.all([
          api.get("/api/bookings/farmer"),
          api.get("/api/plots/farmer")
        ]);
        setBookings(bookingsRes.data.data);
        setPlots(plotsRes.data.data);
      } catch (error) {
        toast.error("Failed to fetch dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const farmerStats = [
    { label: "Active Cultivations", value: bookings.filter(b => b.status === "active").length, icon: HiOutlineGlobeAlt, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Managed Area", value: `${plots.reduce((acc, p) => acc + (p.size || 0), 0)} Acres`, icon: HiOutlineGlobeAlt, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Bookings", value: bookings.filter(b => b.status === "pending").length, icon: HiOutlineClipboardList, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const handleAction = async (id, status) => {
    try {
      // In a real app, you'd have a specific endpoint for this
      const res = await api.patch(`/api/bookings/${id}`, { status });
      if (res.data.success) {
        toast.success(`Booking ${status} successfully`);
        setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1a4d2e]">Farmer Control Center</h1>
            <p className="text-gray-500 mt-1">Manage your lands and track investor activities.</p>
          </div>
          <NavLink to="/add-farm" className="btn-primary flex items-center gap-2">
            <HiOutlinePlusCircle className="text-xl" /> List New Farm
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {farmerStats.map((stat, i) => (
            <div key={i} className="glass-card p-8 bg-white border-none shadow-sm">
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="text-3xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex gap-4 border-b border-gray-200 mb-6">
              <button 
                onClick={() => setActiveTab("bookings")}
                className={`pb-4 text-sm font-bold transition-all px-2 ${activeTab === "bookings" ? "text-[#1a4d2e] border-b-2 border-[#1a4d2e]" : "text-gray-400 hover:text-gray-600"}`}
              >
                Incoming Bookings
              </button>
              <button 
                onClick={() => setActiveTab("active")}
                className={`pb-4 text-sm font-bold transition-all px-2 ${activeTab === "active" ? "text-[#1a4d2e] border-b-2 border-[#1a4d2e]" : "text-gray-400 hover:text-gray-600"}`}
              >
                Active Cultivations
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-900"></div></div>
            ) : activeTab === "bookings" ? (
              <div className="space-y-4">
                {bookings.filter(b => b.status === "pending").map((booking) => (
                  <div key={booking._id} className="glass-card p-6 bg-white border-none shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-gray-900">{booking.farmId?.name}</h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm font-bold text-[#1a4d2e]">Investor: {booking.userId?.name || "N/A"}</p>
                          <div className="flex gap-4 text-xs text-gray-500">
                            <span>📧 {booking.userId?.email}</span>
                            <span>📞 {booking.userId?.phone || "No Phone"}</span>
                            <span>📏 {booking.plotId?.size || booking.plotSize || "N/A"} Acre</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleAction(booking._id, "confirmed")}
                          className="px-4 py-2 bg-green-900 text-white rounded-lg text-sm font-bold hover:bg-green-800"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleAction(booking._id, "cancelled")}
                          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-200"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {bookings.filter(b => b.status === "pending").length === 0 && (
                  <div className="text-center py-10 text-gray-400 italic">No pending booking requests.</div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl mb-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl shrink-0 shadow-lg shadow-orange-600/20">
                    📸
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-bold text-orange-900">Daily Photo Challenge</h3>
                    <p className="text-sm text-orange-800">Your investors love seeing progress! Upload a quick photo of today's growth for your active plots.</p>
                  </div>
                </div>

                {bookings.filter(b => b.status === "active" || b.status === "confirmed").map((booking) => (
                  <div key={booking._id} className="glass-card p-6 bg-white border-none shadow-sm hover:shadow-md transition-all group">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-gray-100">
                          <img 
                            src={getAssetUrl(booking.selectedCrop?.image) || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                            alt={booking.landId?.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">{booking.farmId?.name}</h3>
                          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                            <span className="font-bold text-[#1a4d2e]">Investor: {booking.userId?.name}</span>
                            <span className="text-gray-500">📧 {booking.userId?.email}</span>
                            <span className="text-gray-500">📞 {booking.userId?.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-bold text-[#1a4d2e] bg-green-50 px-2 py-0.5 rounded uppercase tracking-tighter">
                              {booking.selectedCrop?.name || "No Crop Selected"}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">Updated: 2h ago</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full md:w-auto">
                        {(booking.status === "active" || booking.status === "confirmed") && (
                          <AgreementPDF booking={booking} user={booking.userId} />
                        )}
                        {booking.selectedCrop?.cropId ? (
                          <NavLink 
                            to={`/add-log/${booking._id}`} 
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#1a4d2e] text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all shadow-lg shadow-green-900/10"
                          >
                            <HiOutlineCloudUpload className="text-xl" /> Post Daily Photo
                          </NavLink>
                        ) : (
                          <button disabled className="flex-1 md:flex-none px-6 py-3 bg-gray-100 text-gray-400 rounded-xl font-bold text-sm cursor-not-allowed">
                            Awaiting Crop Selection
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {bookings.filter(b => b.status === "active" || b.status === "confirmed").length === 0 && (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium italic">No active cultivations to update.</p>
                  </div>
                )}
              </div>
            )}

          </div>

          <div className="space-y-6">
            <div className="glass-card p-6 bg-white border-none shadow-sm">
              <h2 className="text-lg font-bold text-[#1a4d2e] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <NavLink 
                  to="/manage-plots"
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 flex items-center gap-3"
                >
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><HiOutlineGlobeAlt /></div>
                  <span className="text-sm font-medium">Manage Plots</span>
                </NavLink>
                <button 
                  onClick={() => toast.success("Bio update form sent to your registered mobile number.")}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 flex items-center gap-3"
                >
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><HiOutlineClipboardList /></div>
                  <span className="text-sm font-medium">Update My Bio</span>
                </button>
                <button 
                  onClick={() => toast.info("Your profile is public. You have 4.8/5 rating from investors.")}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 flex items-center gap-3"
                >
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg"><HiOutlineGlobeAlt /></div>
                  <span className="text-sm font-medium">View Public Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
