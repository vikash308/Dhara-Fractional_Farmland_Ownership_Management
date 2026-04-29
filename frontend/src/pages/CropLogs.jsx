import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineShieldCheck, HiOutlineBeaker, HiOutlineClipboardList } from "react-icons/hi";
import api, { getAssetUrl } from "../utils/api";

function CropLogs() {
  const { bookingId } = useParams();
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get(`/api/crop-logs/${bookingId}`);
        setLogs(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch crop logs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1a4d2e]">Crop Growth Timeline</h1>
          <p className="text-gray-500 mt-2">Real-time updates from your farmer.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-900"></div></div>
        ) : logs.length > 0 ? (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-12">
              {logs.map((log, index) => (
                <div key={log._id} className="relative pl-20 animate-in slide-in-from-left duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Timeline Dot */}
                  <div className="absolute left-[30px] top-0 w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow-sm z-10"></div>
                  
                  <div className="glass-card p-6 bg-white border-none shadow-md">
                    <div className="flex flex-col md:flex-row gap-6">
                      {log.image && (
                        <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden shrink-0">
                          <img src={getAssetUrl(log.image)} alt={log.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                          <span className="flex items-center gap-1"><HiOutlineCalendar /> {new Date(log.date).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><HiOutlineClock /> {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1a4d2e] mb-2">{log.title}</h3>
                        <p className="text-gray-600 mb-4">{log.description}</p>
                        
                        <div className="flex flex-wrap gap-3">
                          <span className="px-3 py-1 bg-green-50 text-[#1a4d2e] rounded-full text-xs font-bold border border-green-100 flex items-center gap-1">
                            <HiOutlineShieldCheck /> Stage: {log.growthStage}
                          </span>
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                            Health: {log.healthStatus}
                          </span>
                          {log.fertilizer && log.fertilizer !== "None" && (
                            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold border border-purple-100 flex items-center gap-1">
                              <HiOutlineBeaker /> {log.fertilizer}
                            </span>
                          )}
                          <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-xs font-bold border border-cyan-100 flex items-center gap-1">
                            💧 Water: {log.water}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineClipboardList className="text-4xl text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-400">No updates yet</h3>
            <p className="text-gray-500 mt-2">Your farmer will post updates once the crop is sown.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropLogs;
