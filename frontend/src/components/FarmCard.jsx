import { NavLink } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlineTrendingUp } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import { getAssetUrl } from "../utils/api";

function FarmCard({ FarmDetails, gridClass }) {
  if (!FarmDetails || FarmDetails.length === 0) {
    return (
      <div className="text-center py-20 glass-card rounded-2xl mx-auto max-w-2xl">
        <p className="text-gray-500 text-lg font-medium">No farms available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={gridClass || "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
      {FarmDetails.map((val, index) => {
        const name = val.name || "Unnamed Farm";
        const location = val.location ? `${val.location.city}, ${val.location.state}` : "Location TBD";
        const minInvestment = val.startingPrice ? `$${val.startingPrice}` : "N/A";
        const image = getAssetUrl(val.images?.[0]) || "https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
        const id = val._id;
        const funded = val.funded || 0; 
        const soilType = val.soilType || "Rich Soil";
        const totalPlots = val.totalPlots || 0;

        return (
          <div 
            key={id || index} 
            className="glass-card group overflow-hidden rounded-[24px] hover:shadow-[0_20px_40px_rgba(27,48,34,0.08)] transition-all duration-500 flex flex-col relative"
          >
            <div className="relative h-60 overflow-hidden shrink-0">
              <img 
                src={image} 
                alt={name}
                onError={(e) => { 
                  if (e.target.src !== "https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80") {
                    e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-primary font-bold text-xs uppercase tracking-wider shadow-sm z-20">
                {soilType}
              </div>
              <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-full text-white font-bold text-xs uppercase tracking-wider shadow-sm z-20 flex items-center gap-1">
                {totalPlots} Plots
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-secondary mb-3">
                <HiOutlineLocationMarker className="text-lg" />
                <span className="text-xs font-semibold uppercase tracking-widest">{location}</span>
              </div>
              
              <h3 className="text-2xl font-black text-primary font-inter mb-4 group-hover:text-tertiary transition-colors line-clamp-1">
                {name}
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Total Area</p>
                  <p className="font-bold text-primary">{val.totalArea || "200"} Acres</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Min. Invest</p>
                  <p className="font-bold text-primary">{minInvestment}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-auto mb-6">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-primary uppercase tracking-wider">Funded</span>
                  <span className="text-secondary">{funded}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: `${funded}%` }}></div>
                </div>
              </div>
              
              <NavLink 
                to={`/booking/${id}`} 
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-background border border-gray-200 text-primary font-bold rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all group/btn"
              >
                View Details <BsArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </NavLink>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FarmCard;