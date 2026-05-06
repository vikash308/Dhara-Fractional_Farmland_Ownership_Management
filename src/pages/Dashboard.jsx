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
    { label: "Total Investments", value: `$${bookings.reduce((acc, b) => acc + b.totalPrice, 0)}`, icon: HiOutlineDatabase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Plots", value: bookings.length, icon: HiOutlineLocationMarker, color: "text-green-600", bg: "bg-green-50" },
    { label: "Pending Requests", value: bookings.filter(b => b.status === "pending").length, icon: HiOutlineClipboardList, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Crops Growing", value: bookings.filter(b => b.selectedCrop?.status === "growing").length, icon: HiOutlineSun, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1a4d2e]">
              Hello, <span className="text-orange-600">{user ? (user.name || user.username) : "Investor"}</span>!
            </h1>
            <p className="text-gray-500 mt-1">Manage your digital farm portfolio and track growth.</p>
          </div>
          <NavLink to="/farms" className="btn-primary">
            Explore More Farms
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 bg-white border-none shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-[#1a4d2e]">Your Active Plots</h2>
            {isLoading ? (
              <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-900"></div></div>
            ) : bookings.length > 0 ? (
              bookings.map((booking, i) => (
                <div key={i} className="glass-card p-6 bg-white border-none shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{booking.landId?.name}</h3>
                      <p className="text-sm text-[#1a4d2e] font-medium">
                        {booking.selectedCrop?.name ? `Crop: ${booking.selectedCrop.name}` : "No crop selected"}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      booking.status === "active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  {booking.status === "confirmed" && !booking.selectedCrop?.cropId && (
                    <NavLink 
                      to={`/select-crop/${booking._id}`} 
                      className="mt-4 block w-full text-center py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors"
                    >
                      Choose Your Crop
                    </NavLink>
                  )}

                  {booking.selectedCrop?.status && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Growth Progress</span>
                        <span className="font-bold text-[#1a4d2e]">
                          {booking.selectedCrop.status === "harvested" ? "100%" : "35%"} {/* Dummy progress */}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1a4d2e] rounded-full transition-all duration-1000" style={{ width: booking.selectedCrop.status === "harvested" ? "100%" : "35%" }}></div>
                      </div>
                      <NavLink to={`/crop-logs/${booking._id}`} className="mt-4 inline-block text-sm font-bold text-orange-600 hover:underline">
                        View Detailed Logs →
                      </NavLink>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500">You haven't booked any farms yet.</p>
                <NavLink to="/farms" className="text-orange-600 font-bold hover:underline mt-2 inline-block">Start your journey →</NavLink>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="glass-card p-6 bg-[#1a4d2e] text-white border-none shadow-xl">
              <h3 className="font-bold text-lg mb-2">Investment Insights</h3>
              <p className="text-green-100 text-sm mb-6">Organic farming sector is expected to grow by 12% this quarter.</p>
              <button className="w-full py-3 bg-white text-[#1a4d2e] rounded-xl font-bold hover:bg-green-50">
                View Market Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;