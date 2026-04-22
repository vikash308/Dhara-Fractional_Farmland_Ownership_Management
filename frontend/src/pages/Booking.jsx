import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineCheckCircle, HiOutlineInformationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import api from "../utils/api";

function Booking() {
  const { farmId } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState({ farm: null, plots: [] });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlot, setSelectedPlot] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/api/farms/details/${farmId}`);
        setData(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch farm details");
        navigate("/farms");
      } finally {
        setIsLoading(false);
      }
    };
    if (farmId) fetchDetails();
  }, [farmId]);

  const handleBooking = async () => {
    if (!selectedPlot) return toast.warning("Please select a plot");
    
    try {
      const res = await api.post("/api/bookings", {
        farmId,
        plotId: selectedPlot._id,
        totalPrice: selectedPlot.pricePerSeason,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 6))
      });

      if (res.data.success) {
        toast.success("Plot Booked Successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a4d2e]"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-[#1a4d2e] tracking-tight">Reserve Your Plot at {data.farm?.name}</h1>
          <p className="text-gray-500 mt-2">{data.farm?.location?.city}, {data.farm?.location?.state}</p>
        </div>
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-16">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all shadow-lg ${step >= s ? 'bg-[#1a4d2e] text-white scale-110 shadow-green-900/20' : 'bg-white text-gray-400 border border-gray-100'}`}>
                {s}
              </div>
              {s < 2 && <div className={`w-24 h-1 mx-2 rounded-full transition-colors ${step > s ? 'bg-[#1a4d2e]' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>

        <div className="glass-card bg-white p-10 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-none rounded-[40px]">
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#1a4d2e]">Choose Available Plot</h2>
                <p className="text-gray-500 mt-2">Select a subdivision within {data.farm?.name} to start your cultivation.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.plots.filter(p => p.status === 'available').map((plot) => (
                  <button
                    key={plot._id}
                    onClick={() => setSelectedPlot(plot)}
                    className={`p-8 rounded-[30px] border-2 transition-all text-left relative group ${selectedPlot?._id === plot._id ? 'border-[#1a4d2e] bg-green-50 shadow-xl shadow-green-900/10' : 'border-gray-50 bg-white hover:border-green-200'}`}
                  >
                    <span className="block text-xl font-black text-[#1a4d2e] mb-2">{plot.plotNumber}</span>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Size</p>
                        <p className="text-lg font-bold text-gray-700">{plot.size} Acre</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Seasonal Rent</p>
                        <p className="text-lg font-bold text-orange-600">${plot.pricePerSeason}</p>
                      </div>
                    </div>
                    {selectedPlot?._id === plot._id && <HiOutlineCheckCircle className="absolute top-4 right-4 text-2xl text-[#1a4d2e]" />}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => selectedPlot ? setStep(2) : toast.info("Please select a plot first")} 
                className="btn-primary w-full py-5 text-xl shadow-xl shadow-green-900/20"
              >
                Continue to Summary
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-in zoom-in duration-500">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#1a4d2e]">Booking Summary</h2>
                <p className="text-gray-500 mt-2">Confirm your selection and agreement.</p>
              </div>
              
              <div className="bg-gray-50 rounded-[30px] p-10 space-y-6">
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Farm Details</span>
                  <span className="text-[#1a4d2e] font-black">{data.farm?.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Selected Plot</span>
                  <span className="text-[#1a4d2e] font-black">{selectedPlot?.plotNumber} ({selectedPlot?.size} Acre)</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Lease Duration</span>
                  <span className="text-[#1a4d2e] font-black">1 Season (6 Months)</span>
                </div>
                <div className="flex justify-between pt-6">
                  <span className="text-gray-900 font-black text-xl">Total Payable</span>
                  <span className="text-orange-600 font-black text-2xl">${selectedPlot?.pricePerSeason}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-orange-50 rounded-2xl text-orange-900 text-sm">
                <HiOutlineInformationCircle className="text-3xl shrink-0" />
                <p className="font-medium leading-relaxed">By clicking confirm, you agree to the Digital Farming Lease Agreement and the Farmer Partnership Terms. Payment will be required after plot verification.</p>
              </div>

              <div className="flex gap-6">
                <button onClick={() => setStep(1)} className="flex-1 py-5 text-gray-500 font-bold hover:bg-gray-100 rounded-2xl transition-all">Back</button>
                <button onClick={handleBooking} className="flex-[2] btn-primary py-5 text-xl flex items-center justify-center gap-3 shadow-xl shadow-green-900/20">
                  <HiOutlineCheckCircle className="text-2xl" /> Confirm & Reserve
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;