import { NavLink } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";

function FarmCard({ FarmDetails }) {
  if (!FarmDetails || FarmDetails.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No farms available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-12">
      {FarmDetails.map((val, index) => {
        const name = val.name || "Unnamed Farm";
        const location = val.location ? `${val.location.district}, ${val.location.state}` : "Location TBD";
        const price = val.price || "TBD";
        const image = val.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
        const id = val._id;

        return (
          <div 
            key={id || index} 
            className="glass-card group overflow-hidden hover:shadow-2xl transition-all duration-500 border-none bg-white"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[#1a4d2e] font-bold shadow-sm">
                ${price}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <HiOutlineLocationMarker className="text-lg" />
                <span className="text-xs font-medium uppercase tracking-wider">{location}</span>
              </div>
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-4 group-hover:text-orange-600 transition-colors">
                {name}
              </h3>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Area: {val.totalArea || "N/A"} Acres
                </span>
                <NavLink 
                  to={`/booking/${id}`} 
                  className="flex items-center gap-2 text-[#1a4d2e] font-bold hover:gap-3 transition-all"
                >
                  Book Now <BsArrowRight />
                </NavLink>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FarmCard;