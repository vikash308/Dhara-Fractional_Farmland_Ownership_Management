import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineCheckCircle, HiOutlineInformationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import api from "../utils/api";

function Booking() {
  const { farmId } = useParams();
  const navigate = useNavigate();
  
  const [land, setLand] = useState(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    plotSize: 0.5,
    duration: "1 Season"
  });

  useEffect(() => {
    const fetchLand = async () => {
      try {
        const res = await api.get(`/api/lands/${farmId}`);
        setLand(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch land details");
        navigate("/farms");
      } finally {
        setIsLoading(false);
      }
    };
    if (farmId) fetchLand();
  }, [farmId]);

  const handleBooking = async () => {
    try {
      const res = await api.post("/api/bookings", {
        landId: farmId,
        plotSize: bookingData.plotSize,
        totalPrice: bookingData.plotSize * 500, // Dummy calculation
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)) // 6 months later
      });

      if (res.data.success) {
        toast.success("Booking Request Sent Successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-900"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-900">Book your plot at {land?.name}</h1>
        </div>
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s ? 'bg-[#1a4d2e] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {s}
              </div>
              {s < 2 && <div className={`w-20 h-1 transition-colors ${step > s ? 'bg-[#1a4d2e]' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>

        <div className="glass-card bg-white p-8 md:p-12 shadow-2xl border-none">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#1a4d2e]">Select Your Plot Size</h2>
                <p className="text-gray-500 mt-2">Choose how much land you want to manage at {land?.name}.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[0.25, 0.5, 1.0].map((size) => (
                  <button
                    key={size}
                    onClick={() => setBookingData({ ...bookingData, plotSize: size })}
                    className={`p-6 rounded-2xl border-2 transition-all text-center ${bookingData.plotSize === size ? 'border-[#1a4d2e] bg-green-50 text-[#1a4d2e]' : 'border-gray-100 hover:border-green-200'}`}
                  >
                    <span className="block text-lg font-bold">{size} Acre</span>
                    <span className="text-xs text-gray-500">Starting from ${size * 500}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="btn-primary w-full py-4 text-lg">Next Step</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in zoom-in duration-500">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#1a4d2e]">Booking Summary</h2>
                <p className="text-gray-500 mt-2">Review your selection before confirmation.</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-gray-600 font-medium">Farm Name</span>
                  <span className="text-[#1a4d2e] font-bold">{land?.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-gray-600 font-medium">Selected Plot</span>
                  <span className="text-[#1a4d2e] font-bold">{bookingData.plotSize} Acre</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-gray-600 font-medium">Duration</span>
                  <span className="text-[#1a4d2e] font-bold">{bookingData.duration}</span>
                </div>
                <div className="flex justify-between pt-4 text-xl">
                  <span className="text-gray-900 font-bold">Total Estimated Cost</span>
                  <span className="text-orange-600 font-bold">${bookingData.plotSize * 500}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl text-orange-800 text-sm">
                <HiOutlineInformationCircle className="text-2xl shrink-0" />
                <p>By confirming, you agree to the land lease agreement and standard farming terms.</p>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="btn-primary bg-gray-200 text-gray-700 hover:bg-gray-300 w-1/3">Back</button>
                <button onClick={handleBooking} className="btn-primary flex-1 py-4 text-lg flex items-center justify-center gap-2">
                  <HiOutlineCheckCircle className="text-xl" /> Confirm Booking
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