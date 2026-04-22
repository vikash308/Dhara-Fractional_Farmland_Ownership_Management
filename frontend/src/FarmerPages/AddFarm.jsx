import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineGlobeAlt, HiOutlineInformationCircle } from "react-icons/hi";
import api from "../utils/api";

function AddFarm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [farmData, setFarmData] = useState({
    name: "",
    description: "",
    location: {
      address: "",
      city: "",
      state: ""
    },
    totalArea: "",
    soilType: "",
    images: [""]
  });

  const [plots, setPlots] = useState([
    { plotNumber: "Plot-1", size: "", pricePerSeason: "" }
  ]);

  const handleAddPlot = () => {
    setPlots([...plots, { plotNumber: `Plot-${plots.length + 1}`, size: "", pricePerSeason: "" }]);
  };

  const handleRemovePlot = (index) => {
    setPlots(plots.filter((_, i) => i !== index));
  };

  const handlePlotChange = (index, field, value) => {
    const newPlots = [...plots];
    newPlots[index][field] = value;
    setPlots(newPlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 1. Create Farm
      const farmRes = await api.post("/api/farms", farmData);
      const farmId = farmRes.data.data._id;

      // 2. Create Plots
      const plotPromises = plots.map(plot => 
        api.post("/api/plots", { ...plot, farmId })
      );
      await Promise.all(plotPromises);

      toast.success("Farm and Plots listed successfully!");
      navigate("/farmer");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to list farm");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="glass-card p-10 bg-white border-none shadow-xl rounded-[40px]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-green-100 text-[#1a4d2e] rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                <HiOutlineGlobeAlt />
              </div>
              <div>
                <h1 className="text-3xl font-black text-[#1a4d2e] tracking-tight">List Your Farm</h1>
                <p className="text-gray-500">Provide details about your estate to attract investors.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">Farm Name</label>
                <input 
                  type="text" required placeholder="e.g. Green Valley Estate"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1a4d2e] outline-none transition-all"
                  value={farmData.name}
                  onChange={(e) => setFarmData({...farmData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">Total Area (Acres)</label>
                <input 
                  type="number" required placeholder="e.g. 50"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1a4d2e] outline-none transition-all"
                  value={farmData.totalArea}
                  onChange={(e) => setFarmData({...farmData, totalArea: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">Description</label>
                <textarea 
                  rows="3" required placeholder="Tell investors about your farm's unique features..."
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1a4d2e] outline-none transition-all"
                  value={farmData.description}
                  onChange={(e) => setFarmData({...farmData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">City</label>
                <input 
                  type="text" required placeholder="e.g. Pune"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1a4d2e] outline-none transition-all"
                  value={farmData.location.city}
                  onChange={(e) => setFarmData({...farmData, location: {...farmData.location, city: e.target.value}})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">State</label>
                <input 
                  type="text" required placeholder="e.g. Maharashtra"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1a4d2e] outline-none transition-all"
                  value={farmData.location.state}
                  onChange={(e) => setFarmData({...farmData, location: {...farmData.location, state: e.target.value}})}
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-10 bg-white border-none shadow-xl rounded-[40px]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-[#1a4d2e] tracking-tight">Create Plots</h2>
              <button 
                type="button" onClick={handleAddPlot}
                className="flex items-center gap-2 px-6 py-3 bg-[#1a4d2e] text-white rounded-xl font-bold text-sm shadow-lg shadow-green-900/20 hover:scale-105 transition-transform"
              >
                <HiOutlinePlus /> Add More
              </button>
            </div>

            <div className="space-y-4">
              {plots.map((plot, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-3xl items-end border border-transparent hover:border-green-100 transition-colors">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Plot ID</label>
                    <input 
                      type="text" value={plot.plotNumber} disabled
                      className="w-full p-3 bg-white border-none rounded-xl font-bold text-[#1a4d2e] opacity-70"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Size (Acre)</label>
                    <input 
                      type="number" required step="0.1" placeholder="0.5"
                      className="w-full p-3 bg-white border-none rounded-xl focus:ring-2 focus:ring-[#1a4d2e] outline-none font-bold"
                      value={plot.size}
                      onChange={(e) => handlePlotChange(index, "size", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Rent/Season</label>
                    <input 
                      type="number" required placeholder="1200"
                      className="w-full p-3 bg-white border-none rounded-xl focus:ring-2 focus:ring-[#1a4d2e] outline-none font-bold"
                      value={plot.pricePerSeason}
                      onChange={(e) => handlePlotChange(index, "pricePerSeason", e.target.value)}
                    />
                  </div>
                  {plots.length > 1 && (
                    <button 
                      type="button" onClick={() => handleRemovePlot(index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors flex justify-center"
                    >
                      <HiOutlineTrash className="text-xl" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            <button 
              type="button" onClick={() => navigate("/farmer")}
              className="flex-1 py-5 bg-white text-gray-500 font-bold rounded-[30px] border border-gray-100 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" disabled={isLoading}
              className={`flex-[2] btn-primary py-5 text-xl shadow-2xl shadow-green-900/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Listing Everything..." : "Launch Farm Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFarm;
