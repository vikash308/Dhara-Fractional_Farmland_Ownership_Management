import { useEffect, useState } from "react";
import FarmCard from "../components/FarmCard";
import api from "../utils/api";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineLocationMarker, HiOutlineCurrencyDollar } from "react-icons/hi";

function Farms() {
  const [farms, setFarms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [soilFilter, setSoilFilter] = useState("");
  const [maxInvestment, setMaxInvestment] = useState("");
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
    const city = (farm.location?.city || "").toLowerCase();
    const soil = (farm.soilType || "").toLowerCase();
    const startingPrice = farm.startingPrice || Infinity;
    
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || 
                          state.includes(searchTerm.toLowerCase()) || 
                          city.includes(searchTerm.toLowerCase());
                          
    const matchesRegion = regionFilter ? state === regionFilter.toLowerCase() : true;
    const matchesSoil = soilFilter ? soil === soilFilter.toLowerCase() : true;
    const matchesInvestment = maxInvestment ? startingPrice <= Number(maxInvestment) : true;
    
    return matchesSearch && matchesRegion && matchesSoil && matchesInvestment;
  });

  return (
    <div className="min-h-screen bg-background pb-24 font-work">
      {/* Featured Opportunity Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end px-6 md:px-12 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Premium Vineyard" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl text-white">
            <div className="flex gap-3 mb-4">
              <span className="bg-tertiary/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">Featured Opportunity</span>
              <span className="bg-secondary/80 text-primary-light text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">High Yield</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 font-inter leading-tight">Napa Valley Heritage Vineyards</h1>
            <p className="text-gray-200 text-lg md:text-xl font-light mb-8 max-w-xl">
              Invest in a producing, premium organic vineyard located in the heart of California's most prestigious wine region.
            </p>
            <button 
              onClick={() => document.getElementById("available-farms").scrollIntoView({ behavior: "smooth" })}
              className="bg-tertiary hover:bg-[#b8654a] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_8px_20px_rgba(209,122,93,0.3)]">
              View Details
            </button>
          </div>
          
          <div className="glass-dark p-6 rounded-2xl text-white min-w-[280px]">
            <div className="mb-4">
              <p className="text-gray-300 text-sm uppercase tracking-widest font-semibold mb-1">Target ROI</p>
              <p className="text-3xl font-black font-inter">12.5%</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm uppercase tracking-widest font-semibold mb-1">Min Investment</p>
              <p className="text-3xl font-black font-inter">$10,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto -mt-8 relative z-20 px-6">
        <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 flex items-center bg-background/50 px-4 py-3 rounded-xl w-full border border-gray-100">
            <HiOutlineSearch className="text-gray-400 text-xl" />
            <input 
              type="search" 
              placeholder="Search locations, crop types..." 
              className="w-full bg-transparent border-none outline-none text-primary ml-3 placeholder-gray-400 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <select 
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-xl hover:border-secondary transition-colors whitespace-nowrap text-primary font-medium outline-none cursor-pointer"
            >
              <option value="">All Regions</option>
              {[...new Set(farms.map(f => f.location?.state).filter(Boolean))].map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            
            <select 
              value={soilFilter}
              onChange={(e) => setSoilFilter(e.target.value)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-xl hover:border-secondary transition-colors whitespace-nowrap text-primary font-medium outline-none cursor-pointer"
            >
              <option value="">All Soil Types</option>
              {[...new Set(farms.map(f => f.soilType).filter(Boolean))].map(soil => (
                <option key={soil} value={soil}>{soil}</option>
              ))}
            </select>
            
            <select 
              value={maxInvestment}
              onChange={(e) => setMaxInvestment(e.target.value)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-xl hover:border-secondary transition-colors whitespace-nowrap text-primary font-medium outline-none cursor-pointer"
            >
              <option value="">Any Investment</option>
              <option value="5000">Under $5,000</option>
              <option value="10000">Under $10,000</option>
              <option value="20000">Under $20,000</option>
            </select>
            
            <button 
              onClick={() => {
                setSearchTerm("");
                setRegionFilter("");
                setSoilFilter("");
                setMaxInvestment("");
              }}
              className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-light transition-colors whitespace-nowrap"
            >
              <HiOutlineFilter className="text-lg" /> Reset
            </button>
          </div>
        </div>
      </div>

      <section id="available-farms" className="max-w-7xl mx-auto mt-16 px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-primary font-inter">Available Farmlands</h2>
            <p className="text-gray-500 mt-2 font-medium">Curated fractional ownership opportunities</p>
          </div>
          <div className="text-sm font-semibold text-gray-500 hidden md:block">
            Showing {filteredFarms.length} properties
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <FarmCard FarmDetails={filteredFarms} />
        )}
      </section>
    </div>
  );
}

export default Farms;