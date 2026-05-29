import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineGlobeAlt, HiOutlineInformationCircle } from "react-icons/hi";
import api from "../utils/api";
import Map from "../components/Map";

function AddFarm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [farmData, setFarmData] = useState({
    name: "",
    description: "",
    location: {
      address: "Plot No 100, Agriculture Zone",
      city: "",
      state: "",
      coordinates: {
        lat: "",
        lng: ""
      }
    },
    totalArea: "",
    soilType: "",
    imageFiles: []
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
      const formData = new FormData();
      formData.append("name", farmData.name);
      formData.append("description", farmData.description);
      formData.append("totalArea", farmData.totalArea);
      formData.append("soilType", farmData.soilType);
      formData.append("location", JSON.stringify(farmData.location));
      
      farmData.imageFiles.forEach(file => {
        formData.append("images", file);
      });

      // 1. Create Farm
      const farmRes = await api.post("/api/farms", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
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
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1a4d2e] outline-none transition-all font-medium"
                  value={farmData.location.city}
                  onChange={(e) => setFarmData({...farmData, location: {...farmData.location, city: e.target.value}})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">State</label>
                <input 
                  type="text" required placeholder="e.g. Maharashtra"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1a4d2e] outline-none transition-all font-medium"
                  value={farmData.location.state}
                  onChange={(e) => setFarmData({...farmData, location: {...farmData.location, state: e.target.value}})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">Latitude</label>
                <input 
                  type="number" step="any" required placeholder="e.g. 18.5204"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1a4d2e] outline-none transition-all font-medium"
                  value={farmData.location.coordinates.lat}
                  onChange={(e) => setFarmData({
                    ...farmData,
                    location: {
                      ...farmData.location,
                      coordinates: { ...farmData.location.coordinates, lat: parseFloat(e.target.value) || "" }
                    }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">Longitude</label>
                <input 
                  type="number" step="any" required placeholder="e.g. 73.8567"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1a4d2e] outline-none transition-all font-medium"
                  value={farmData.location.coordinates.lng}
                  onChange={(e) => setFarmData({
                    ...farmData,
                    location: {
                      ...farmData.location,
                      coordinates: { ...farmData.location.coordinates, lng: parseFloat(e.target.value) || "" }
                    }
                  })}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2 flex justify-between items-center">
                  <span>Pin Farm Location on Map</span>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">(Click map to auto-fill lat/lng)</span>
                </label>
                <div className="h-[300px] w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                  <Map 
                    isEditable={true}
                    onMapClick={(lat, lng) => {
                      setFarmData(prev => ({
                        ...prev,
                        location: {
                          ...prev.location,
                          coordinates: { lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) }
                        }
                      }));
                    }}
                    center={[20.5937, 78.9629]}
                    zoom={5}
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">Farm Images</label>
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl hover:border-[#1a4d2e] transition-all cursor-pointer relative">
                  <input 
                    type="file" multiple accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setFarmData({...farmData, imageFiles: Array.from(e.target.files)})}
                  />
                  <HiOutlinePlus className="text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 font-medium">
                    {farmData.imageFiles.length > 0 
                      ? `${farmData.imageFiles.length} files selected` 
                      : "Click to upload farm photos (Max 5)"}
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-2">JPG, PNG, WEBP up to 5MB</p>
                </div>
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
