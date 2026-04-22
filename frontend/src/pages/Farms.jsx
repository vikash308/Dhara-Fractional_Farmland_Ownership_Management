import { useEffect, useState } from "react";
import FarmCard from "../components/FarmCard";
import api from "../utils/api";

function Farms() {
  const [farms, setFarms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await api.get("/api/farms");
        const farmsData = res.data.data || res.data;
        setFarms(Array.isArray(farmsData) ? farmsData : []);
      } catch (error) {
        console.error("Error fetching farms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFarms();
  }, []);

  const filteredFarms = farms.filter(farm => {
    const name = (farm.name || "").toLowerCase();
    const state = (farm.location?.state || "").toLowerCase();
    const district = (farm.location?.district || "").toLowerCase();
    
    return name.includes(searchTerm.toLowerCase()) || 
           state.includes(searchTerm.toLowerCase()) || 
           district.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <section className="bg-[#1a4d2e] py-16 px-6 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover Your Future Farm</h1>
        <p className="text-gray-300 max-w-2xl mx-auto font-light">
          Browse through our selection of premium farmlands.
        </p>
      </section>

      <div className="max-w-4xl mx-auto -mt-8 px-4">
        <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100">
          <svg className="w-6 h-6 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="search" 
            placeholder="Search by farm name, district or state..." 
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <section className="mt-16">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#1a4d2e] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <FarmCard FarmDetails={filteredFarms} />
        )}
      </section>
    </div>
  );
}

export default Farms;