import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api, { getAssetUrl } from "../utils/api";
import { HiOutlineArrowLeft, HiOutlineCheckCircle } from "react-icons/hi";

function SelectCrop() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await api.get("/api/crops");
        setCrops(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch crops");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const categories = [...new Set(crops.map(c => c.category))];

  const filteredCrops = crops.filter(c => c.category === selectedCategory);

  const handleSelect = async () => {
    if (!selectedCrop) return toast.warning("Please select a crop first");
    try {
      const res = await api.patch(`/api/bookings/${bookingId}`, {
        selectedCrop: {
          cropId: selectedCrop._id,
          name: selectedCrop.name,
          status: "planned"
        }
      });
      if (res.data.success) {
        toast.success("Crop selected! Our farmer will begin sowing soon.");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to select crop");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#1a4d2e] tracking-tight">Select Your Crop</h1>
          <p className="text-gray-500 mt-2">Personalize your plot with premium organic selections.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-900"></div></div>
        ) : !selectedCategory ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="glass-card bg-white p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all group border-none"
              >
                <div className="w-16 h-16 bg-green-100 text-[#1a4d2e] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-[#1a4d2e] group-hover:text-white transition-colors">
                  {cat === "Grains" ? "🌾" : cat === "Vegetables" ? "🥦" : cat === "Fruits" ? "🍎" : "🌱"}
                </div>
                <h2 className="text-2xl font-bold text-[#1a4d2e] mb-2">{cat}</h2>
                <p className="text-gray-500 text-sm">Explore seasonal {cat.toLowerCase()} varieties for your plot.</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <button 
              onClick={() => { setSelectedCategory(null); setSelectedCrop(null); }}
              className="flex items-center gap-2 text-[#1a4d2e] font-bold mb-8 hover:underline"
            >
              <HiOutlineArrowLeft /> Back to Categories
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredCrops.map((crop) => (
                <div 
                  key={crop._id}
                  onClick={() => setSelectedCrop(crop)}
                  className={`glass-card p-6 cursor-pointer border-2 transition-all relative ${selectedCrop?._id === crop._id ? 'border-orange-500 bg-orange-50 shadow-xl' : 'border-transparent bg-white hover:border-green-200'}`}
                >
                  {selectedCrop?._id === crop._id && (
                    <div className="absolute -top-3 -right-3 bg-orange-500 text-white p-2 rounded-full shadow-lg z-10">
                      <HiOutlineCheckCircle className="text-xl" />
                    </div>
                  )}
                  <div className="h-44 bg-gray-100 rounded-2xl mb-4 overflow-hidden shadow-inner">
                    <img src={getAssetUrl(crop.image) || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt={crop.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a4d2e]">{crop.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{crop.season} Season • {crop.growthDuration} Days</p>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{crop.description}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="flex-1 py-4 bg-white text-gray-500 font-bold rounded-2xl border border-gray-100"
              >
                Change Category
              </button>
              <button 
                onClick={handleSelect}
                className="flex-[2] btn-primary py-4 text-lg shadow-xl shadow-green-900/20"
                disabled={!selectedCrop}
              >
                Confirm Growing {selectedCrop?.name}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SelectCrop;
