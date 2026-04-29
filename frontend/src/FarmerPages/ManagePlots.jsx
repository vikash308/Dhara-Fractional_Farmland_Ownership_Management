import { useEffect, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { HiOutlineLocationMarker, HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamationCircle, HiOutlineSearch } from "react-icons/hi";

function ManagePlots() {
  const [plots, setPlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      const res = await api.get("/api/plots/farmer");
      setPlots(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch plots");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/api/plots/status/${id}`, { status });
      toast.success(`Plot status updated to ${status}`);
      setPlots(plots.map(p => p._id === id ? { ...p, status } : p));
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const filteredPlots = plots.filter(plot => 
    plot.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plot.farmId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <HiOutlineCheckCircle className="text-green-500" />;
      case 'booked': return <HiOutlineClock className="text-blue-500" />;
      case 'maintenance': return <HiOutlineExclamationCircle className="text-orange-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#1a4d2e] tracking-tight">Manage Plots</h1>
            <p className="text-gray-500 mt-2 font-medium">Monitor and update the availability of your land units.</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input 
              type="text" 
              placeholder="Search plot or farm..."
              className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-[#1a4d2e] outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Summary Bar */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="px-6 py-3 bg-white rounded-2xl shadow-sm flex items-center gap-3 shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Available: {plots.filter(p => p.status === 'available').length}</span>
          </div>
          <div className="px-6 py-3 bg-white rounded-2xl shadow-sm flex items-center gap-3 shrink-0">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Booked: {plots.filter(p => p.status === 'booked').length}</span>
          </div>
          <div className="px-6 py-3 bg-white rounded-2xl shadow-sm flex items-center gap-3 shrink-0">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Maintenance: {plots.filter(p => p.status === 'maintenance').length}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#1a4d2e] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlots.map((plot) => (
              <div key={plot._id} className="glass-card bg-white border-none shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gray-50 text-2xl`}>
                        {getStatusIcon(plot.status)}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-gray-900 leading-none">{plot.plotNumber}</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{plot.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-[#1a4d2e]">${plot.pricePerSeason}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Per Season</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-600">
                      <HiOutlineLocationMarker className="text-orange-500" />
                      <span className="text-sm font-bold">{plot.farmId?.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <div className="w-5 h-5 bg-green-50 rounded flex items-center justify-center text-[10px] font-black text-[#1a4d2e]">A</div>
                      <span className="font-medium">{plot.size} Acres</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-50">
                    <button 
                      onClick={() => updateStatus(plot._id, 'available')}
                      className={`py-2 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${plot.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                    >
                      Available
                    </button>
                    <button 
                      onClick={() => updateStatus(plot._id, 'booked')}
                      className={`py-2 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${plot.status === 'booked' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                    >
                      Booked
                    </button>
                    <button 
                      onClick={() => updateStatus(plot._id, 'maintenance')}
                      className={`py-2 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${plot.status === 'maintenance' ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                    >
                      Maint.
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredPlots.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
            <p className="text-gray-400 text-xl font-bold italic">No plots found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagePlots;
