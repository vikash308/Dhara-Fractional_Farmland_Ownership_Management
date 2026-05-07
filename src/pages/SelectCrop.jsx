import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

function SelectCrop() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleSelect = async () => {
    if (!selectedCrop) return toast.warning("Please select a crop first");
    try {
      const res = await api.patch(`/api/bookings/${bookingId}`, {
        cropId: selectedCrop._id,
        cropName: selectedCrop.name
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1a4d2e]">What would you like to grow?</h1>
          <p className="text-gray-500 mt-2">Choose the best crop for the current season.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-900"></div></div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {crops.length > 0 ? crops.map((crop) => (
                <div 
                  key={crop._id}
                  onClick={() => setSelectedCrop(crop)}
                  className={`glass-card p-6 cursor-pointer border-2 transition-all ${selectedCrop?._id === crop._id ? 'border-orange-500 bg-orange-50' : 'border-transparent bg-white hover:border-green-200'}`}
                >
                  <div className="h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden">
                    <img src={crop.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt={crop.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a4d2e]">{crop.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{crop.season} Season • {crop.growthDuration} Days</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">{crop.category}</span>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-10 text-gray-500">No crops available for selection.</div>
              )}
            </div>

            <button 
              onClick={handleSelect}
              className="w-full btn-primary py-4 text-lg"
              disabled={!selectedCrop}
            >
              Confirm Selection
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SelectCrop;