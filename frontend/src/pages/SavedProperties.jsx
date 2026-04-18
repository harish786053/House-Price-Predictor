import React from 'react';
import { useData } from '../context/DataContext';
import { Heart, MapPin, IndianRupee } from 'lucide-react';

export default function SavedProperties() {
  const { savedProperties, toggleSaveProperty } = useData();

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">🔖 Saved Properties</h1>
        <p className="text-sm text-gray-400">Your favorite predictions and monitored real estate.</p>
      </div>

      {savedProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-cardBg border border-gray-800 rounded-xl">
          <Heart size={48} className="text-gray-600 mb-4" />
          <p className="text-gray-400">No saved properties yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((prop) => (
            <div key={prop.id} className="bg-cardBg border border-gray-800 rounded-xl overflow-hidden shadow-lg group">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={prop.image} 
                  alt="Property" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => toggleSaveProperty(prop)}
                    className="p-2 bg-black/50 backdrop-blur-md rounded-full text-danger hover:bg-danger hover:text-white transition"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  <span className="text-xs font-semibold text-white tracking-wide uppercase">AI Estimate</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-success flex items-center mb-1">
                      <IndianRupee size={18} className="mr-0.5" /> {prop.price} <span className="text-sm text-gray-400 ml-1">Lakhs</span>
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-400 mb-4 gap-1">
                  <MapPin size={14} className="text-primary" /> 
                  {prop.loc} City Center
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-gray-800/50 pt-4">
                  <div className="flex flex-col items-center p-2 bg-gray-800/20 rounded-lg">
                    <span className="text-xs text-gray-500 mb-1">Area</span>
                    <span className="text-sm font-semibold text-white flex items-center gap-1">
                      {prop.area} sqft
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-800/20 rounded-lg">
                    <span className="text-xs text-gray-500 mb-1">Beds</span>
                    <span className="text-sm font-semibold text-white">{prop.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-800/20 rounded-lg">
                    <span className="text-xs text-gray-500 mb-1">Baths</span>
                    <span className="text-sm font-semibold text-white">{prop.bathrooms}</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-gray-800 hover:bg-primary text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                  View Full Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
