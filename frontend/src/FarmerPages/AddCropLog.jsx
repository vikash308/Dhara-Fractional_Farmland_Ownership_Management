import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

function AddCropLog() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [logData, setLogData] = useState({
    title: `Daily Update - ${new Date().toLocaleDateString()}`,
    description: "",
    growthStage: "Vegetative",
    healthStatus: "Excellent",
    image: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logData.image && !logData.description) {
      toast.warning("Please provide at least a photo or a description");
      return;
    }
    setIsLoading(true);
    try {
      const res = await api.post("/api/crop-logs", { ...logData, bookingId });
      if (res.data.success) {
        toast.success("Daily photo posted! Your investor will see it on their timeline.");
        navigate("/farmer");
      }
    } catch (error) {
      toast.error("Failed to post update");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-10 bg-white border-none shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
              📸
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1a4d2e]">Photo of the Day</h1>
              <p className="text-sm text-gray-500">Share today's progress with your investor.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#1a4d2e] transition-colors group">
                <label className="block text-sm font-bold text-gray-700 mb-4">Upload Crop Photo</label>
                <div className="flex flex-col items-center justify-center py-4">
                  <input 
                    type="text" 
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e] outline-none shadow-sm"
                    placeholder="Paste image URL here (e.g. from gallery/camera)"
                    value={logData.image}
                    onChange={(e) => setLogData({...logData, image: e.target.value})}
                  />
                  <p className="mt-3 text-[10px] text-gray-400 uppercase font-bold tracking-widest">Supports JPG, PNG (Max 5MB)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">How is the crop looking today?</label>
                <textarea 
                  rows="3"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent outline-none transition-all bg-gray-50/50"
                  placeholder="Tell the investor about today's activities (watering, weeding, etc.)..."
                  value={logData.description}
                  onChange={(e) => setLogData({...logData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Growth Stage</label>
                  <select 
                    className="w-full bg-transparent font-bold text-[#1a4d2e] outline-none"
                    value={logData.growthStage}
                    onChange={(e) => setLogData({...logData, growthStage: e.target.value})}
                  >
                    <option>Sowing</option>
                    <option>Seedling</option>
                    <option>Vegetative</option>
                    <option>Flowering</option>
                    <option>Fruiting</option>
                    <option>Harvesting</option>
                  </select>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Crop Health</label>
                  <select 
                    className="w-full bg-transparent font-bold text-[#1a4d2e] outline-none"
                    value={logData.healthStatus}
                    onChange={(e) => setLogData({...logData, healthStatus: e.target.value})}
                  >
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Poor</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => navigate("/farmer")}
                className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className={`flex-[2] btn-primary py-4 text-lg shadow-xl shadow-green-900/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? "Posting Update..." : "Post Photo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default AddCropLog;
