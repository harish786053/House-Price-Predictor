import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudLightning, Info } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function PredictPrice() {
  const { addHistoryEntry } = useData();
  const location = useLocation();
  const [formData, setFormData] = useState({
    area: location.state?.formData?.area || '',
    bedrooms: location.state?.formData?.bedrooms || '3',
    bathrooms: location.state?.formData?.bathrooms || '2',
    age: '5',
    location: location.state?.formData?.location || 'Chennai'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Using mocked backend url. In production, use environment variables.
    const API_URL = 'http://localhost:5000/api/predict';

    try {
      // Trying to hit the backend
      const res = await axios.post(API_URL, formData);
      setResult(res.data);
      
      // Save to local history state
      addHistoryEntry({
        area: formData.area,
        loc: formData.location,
        price: (res.data.prediction / 100000).toFixed(2),
        date: new Date().toISOString(),
        time: "Just now"
      });
    } catch (err) {
      console.error(err);
      // Fallback if backend is down locally since user didn't have Node installed
      setTimeout(() => {
        const mockedPrice = 10000 + (Number(formData.area) * 4000);
        const mockedResult = {
          prediction: mockedPrice,
          formated_prediction: `${(mockedPrice / 100000).toFixed(2)} Lakhs`,
          note: "Network error. Showing fallback calculation."
        };
        setResult(mockedResult);
        
        // Save fallback to local history state
        addHistoryEntry({
          area: formData.area,
          loc: formData.location,
          price: (mockedPrice / 100000).toFixed(2),
          date: new Date().toISOString(),
          time: "Just now"
        });
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 h-full overflow-y-auto w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🔮 Predict Price</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-cardBg border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-6">Enter Property Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400">Area (in sq ft)</label>
                <input required type="number" name="area" value={formData.area} onChange={handleChange} className="bg-[#0f111a] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none" placeholder="1500" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400">Bedrooms</label>
                <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="bg-[#0f111a] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none">
                  {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400">Bathrooms</label>
                <select name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="bg-[#0f111a] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none">
                  {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400">Age of House (years)</label>
                <input required type="number" name="age" value={formData.age} onChange={handleChange} className="bg-[#0f111a] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none" placeholder="5" />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-xs text-gray-400">Location</label>
                <select name="location" value={formData.location} onChange={handleChange} className="bg-[#0f111a] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none">
                  <option value="Chennai">Chennai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-4 bg-primary hover:bg-primary/90 disabled:opacity-50 transition text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2">
              {loading ? "Analyzing..." : <><CloudLightning size={18} /> Predict Price</>}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="bg-cardBg border border-gray-800 rounded-xl p-6 flex flex-col justify-center items-center">
          {result ? (
            <div className="text-center w-full">
              <h2 className="text-lg font-semibold mb-4 text-left w-full">🎯 Result</h2>
              <div className="bg-success/10 border border-success/30 rounded-xl p-8 mb-6 animate-pulse">
                <p className="text-sm text-success font-medium mb-2">Estimated Price</p>
                <h3 className="text-4xl font-bold text-success mb-2">₹ {result.formated_prediction}</h3>
                {result.note && <p className="text-xs text-yellow-500 mt-2 flex items-center justify-center gap-1"><Info size={12}/> {result.note}</p>}
              </div>

              <div className="bg-[#0f111a] rounded-lg p-4 text-left">
                <p className="text-sm border-b border-gray-800 pb-2 mb-2 font-medium">Model Insights</p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between"><span>Base Calculation</span><span className="text-white">Linear Regression</span></div>
                  <div className="flex justify-between"><span>Area Factor</span><span className="text-white">High impact</span></div>
                  <div className="flex justify-between"><span>Model Accuracy</span><span className="text-white">~88%</span></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 flex flex-col items-center">
              <div className="w-16 h-16 bg-[#0f111a] rounded-full flex items-center justify-center mb-4">
                <CloudLightning size={24} className="text-primary"/>
              </div>
              <p>Fill in the property details and click Predict to see the AI estimation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
