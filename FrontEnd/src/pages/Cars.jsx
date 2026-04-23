import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

function Cars() {
  const navigate = useNavigate();
  const { cars } = useContext(AppContext);
  const [hoveredId, setHoveredId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("default");

  // ......... Filter Query.............

  const filteredCars = (cars || []).filter((car) => {
    const query = activeSearch.toLowerCase();
    return (
      car.brand?.toLowerCase().includes(query) ||
      car.model?.toLowerCase().includes(query) ||
      car.category?.toLowerCase().includes(query)
    );
  });

    filteredCars.sort((a, b) => {
      if (priceFilter === "low-high") return (a.price ?? 0) - (b.price ?? 0);
      if (priceFilter === "high-low") return (b.price ?? 0) - (a.price ?? 0);

      const total = filteredCars.length
      
      return total;
    });

  

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-10 lg:px-20 py-12">
      {/* Header */}
      <div className="mb-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Available Cars
        </h1>
        <p className="text-gray-500 mt-1 text-sm text-center">
          Browse our selection of premium vehicles available for your next
          adventure.
        </p>

        {/* Search Bar */}
        <div className="flex items-center justify-between w-full max-w-lg px-4 py-2.5 border border-gray-300 shadow-md rounded-full mt-4 bg-white">
          {/* Left: icon + input */}
          <div className="flex items-center gap-2 flex-1">
            <img
              className="w-4 h-4 opacity-50 shrink-0"
              src={assets.search_icon}
              alt="search"
            />
            <input
              type="text"
              onChange={(e) =>{ setSearchQuery(e.target.value)
                if (e.target.value === "") setActiveSearch(""); 
              }} // ← just updates typed text
              onKeyDown={(e) => {
                if (e.key === "Enter") setActiveSearch(searchQuery); // ← triggers filter
              }}
              value={searchQuery}
              placeholder="Search by make, model or features"
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />

          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-300 mx-3 shrink-0" />

          {/* Right: filter dropdown */}
          <div className="relative shrink-0">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="appearance-none text-xs font-medium text-gray-600 bg-transparent outline-none cursor-pointer pr-4 hover:text-blue-600 transition-colors"
            >
              <option value="default">Sort by Price</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
            {/* Custom dropdown arrow */}
            <img
              className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"
              src={assets.filter_icon}
              alt="filter"
            />
          </div>
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCars.map((item, index) => (
          <div
            key={item._id || index}
            onClick={() => navigate(`/car-details/${item._id}`)}
            onMouseEnter={() => setHoveredId(item._id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-gray-100
              transition-all duration-300 ease-out
              hover:shadow-xl hover:-translate-y-2 hover:border-blue-100"
            style={{
              animation: `fadeSlideUp 0.4s ease both`,
              animationDelay: `${index * 60}ms`,
            }}
          >
            {/* Image container — fixed height */}
            <div className="relative w-full h-48 bg-blue-50 overflow-hidden">
              <img
                src={item.image}
                alt={item.brand}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Category badge */}
              {item.category && (
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  {item.category}
                </span>
              )}
            </div>

            {/* Card body */}
            <div className="p-4">
              <p className="text-gray-900 text-base font-semibold leading-tight truncate">
                {item.brand} {item.model}
              </p>
              <p className="text-gray-400 text-xs mt-1">{item.year ?? ""}</p>

              {/* Price / CTA row */}
              <div className="flex items-center justify-between mt-4">
                {item.price && (
                  <span className="text-blue-600 font-bold text-sm">
                    ${item.price.toLocaleString()}
                    <span className="text-gray-400 font-normal">/day</span>
                  </span>
                )}
                <span
                  className="ml-auto text-xs font-medium text-white bg-blue-500 
                    px-3 py-1.5 rounded-full
                    transition-all duration-200
                    group-hover:bg-blue-600 group-hover:px-4"
                >
                  View →
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* ..........if Nothing matches.......... */}
        {filteredCars.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No cars found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        )}
      </div>

      {/* CSS keyframe injected via style tag */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Cars;
