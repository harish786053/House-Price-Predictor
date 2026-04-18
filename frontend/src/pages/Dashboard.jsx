import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { CloudLightning } from 'lucide-react';

const areaPriceData = [
  { area: 500, price: 25 },
  { area: 1000, price: 42 },
  { area: 1500, price: 65 },
  { area: 2000, price: 78 },
  { area: 2500, price: 95 },
  { area: 3000, price: 110 },
];

const featureImportanceData = [
  { name: 'Area (sq ft)', value: 45, color: '#6c5dd3' },
  { name: 'Location', value: 25, color: '#3f8cff' },
  { name: 'Bedrooms', value: 15, color: '#22b07d' },
  { name: 'Bathrooms', value: 8, color: '#ffb038' },
  { name: 'Other Factors', value: 7, color: '#ff754c' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ area: '', bedrooms: '3', bathrooms: '2', location: 'Chennai' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePredict = () => {
    navigate('/predict', { state: { formData } });
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">👋 Welcome back, Harish</h1>
          <p className="text-sm text-gray-400">Here's what's happening with your predictions today.</p>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Predictions" value="1,248" trend="+12.5%" trendUp />
        <StatCard title="Average Price" value="₹ 68.45 L" trend="+8.3%" trendUp />
        <StatCard title="Model Accuracy" value="87.6%" trend="+2.4%" trendUp />
        <StatCard title="Properties Analyzed" value="10,000+" subtitle="Across 12 cities" />
      </div>

      {/* Main Grid: Predict Form & Result & Price Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Predict Form (Navigates to actual page) */}
        <div className="bg-cardBg border border-gray-800 rounded-xl p-5">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">🏠 Predict House Price</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Area (in sq ft)" name="area" value={formData.area} onChange={handleChange} placeholder="1500" />
            <Input label="Bedrooms" type="select" name="bedrooms" value={formData.bedrooms} onChange={handleChange} options={["1", "2", "3", "4", "5", "6"]} />
            <Input label="Bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="2" />
            <Input label="Location" type="select" name="location" value={formData.location} onChange={handleChange} options={["Chennai", "Bengaluru", "Hyderabad"]} />
          </div>
          <button onClick={handlePredict} className="w-full mt-4 bg-gradient-to-r from-primary to-[#3f8cff] hover:opacity-90 transition text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2">
            <CloudLightning size={18} /> Predict Price
          </button>
        </div>

        {/* Prediction Result UI */}
        <div className="bg-cardBg border border-gray-800 rounded-xl p-5">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">🎯 Prediction Result</h2>
          <div className="bg-success/10 border border-success/30 rounded-xl p-6 text-center mb-4">
            <p className="text-sm text-success font-medium mb-1">Estimated Price</p>
            <h3 className="text-3xl font-bold text-success mb-2">₹ 75.42 Lakhs</h3>
            <p className="text-xs text-gray-400 mb-2">(₹ 75,42,000)</p>
            <span className="inline-block px-3 py-1 bg-success/20 text-success text-xs rounded-full">
              High Confidence Prediction
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between"><span>Algorithm Used</span><span className="text-white">Linear Regression</span></div>
            <div className="flex justify-between"><span>Model Accuracy</span><span className="text-white">87.6%</span></div>
          </div>
        </div>

        {/* Price Trend Chart */}
        <div className="bg-cardBg border border-gray-800 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">📈 Price Trend</h2>
          <div className="h-[200px] w-full">
            <ResponsiveContainer>
              <LineChart data={areaPriceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2e3d" />
                <XAxis dataKey="area" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <RechartsTooltip contentStyle={{backgroundColor: '#1a1d27', borderColor: '#2a2e3d'}} />
                <Line type="monotone" dataKey="price" stroke="#6c5dd3" strokeWidth={3} dot={{ fill: '#6c5dd3' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Grid: Feature Importance & Recent Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Feature Importance */}
        <div className="lg:col-span-2 bg-cardBg border border-gray-800 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">📊 Feature Importance</h2>
          <div className="space-y-4">
            {featureImportanceData.map((feature) => (
              <div key={feature.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{feature.name}</span>
                  <span className="font-medium">{feature.value}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${feature.value}%`, backgroundColor: feature.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Predictions */}
        <div className="bg-cardBg border border-gray-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">⏱️ Recent Predictions</h2>
            <button className="text-primary text-xs hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            <RecentItem area="1500" loc="Chennai" price="75.42" time="2 hours ago" />
            <RecentItem area="1200" loc="Bengaluru" price="62.10" time="1 day ago" />
            <RecentItem area="1800" loc="Hyderabad" price="91.30" time="2 days ago" />
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, subtitle }) {
  return (
    <div className="bg-cardBg border border-gray-800 p-5 rounded-xl">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h3 className="text-2xl font-bold mb-2">{value}</h3>
      {trend && (
        <p className={`text-xs ${trendUp ? 'text-success' : 'text-danger'}`}>
          {trend} <span className="text-gray-500">from last month</span>
        </p>
      )}
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
}

function Input({ label, type = "text", placeholder, options, value, onChange, name }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-400">{label}</label>
      {type === "select" ? (
        <select name={name} value={value} onChange={onChange} className="bg-[#0f111a] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none">
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input 
          type="text" 
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder} 
          className="bg-[#0f111a] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none placeholder-gray-600"
        />
      )}
    </div>
  );
}

function RecentItem({ area, loc, price, time }) {
  return (
    <div className="flex justify-between items-center p-3 hover:bg-gray-800/30 rounded-lg transition cursor-pointer border border-transparent hover:border-gray-800">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-xl">
          🏢
        </div>
        <div>
          <p className="text-sm font-medium">{area} sq ft • {loc}</p>
          <p className="text-xs text-success flex items-center gap-1">✓ Verified</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-success">₹ {price} L</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}
