import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

const usageData = [
  { name: 'Jan', predictions: 120 },
  { name: 'Feb', predictions: 180 },
  { name: 'Mar', predictions: 250 },
  { name: 'Apr', predictions: 310 },
  { name: 'May', predictions: 430 },
  { name: 'Jun', predictions: 380 },
  { name: 'Jul', predictions: 520 },
];

const cityDistribution = [
  { name: 'Chennai', value: 35, color: '#6c5dd3' },
  { name: 'Bengaluru', value: 45, color: '#3f8cff' },
  { name: 'Hyderabad', value: 15, color: '#22b07d' },
  { name: 'Others', value: 5, color: '#ffb038' },
];

const accuracyMetrics = [
  { category: '0-50L', accuracy: 92 },
  { category: '50L-1Cr', accuracy: 88 },
  { category: '1Cr-2Cr', accuracy: 85 },
  { category: '2Cr+', accuracy: 81 },
];

export default function Analytics() {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">📈 Analytics Overview</h1>
        <p className="text-sm text-gray-400">Detailed insights into model performance and your usage statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-cardBg border border-gray-800 rounded-xl p-5 shadow-lg">
          <p className="text-gray-400 text-sm mb-2">Total Tokens Used</p>
          <h3 className="text-3xl font-bold text-white mb-2">14,289</h3>
          <p className="text-xs text-primary">+15% vs last month</p>
        </div>
        <div className="bg-cardBg border border-gray-800 rounded-xl p-5 shadow-lg">
          <p className="text-gray-400 text-sm mb-2">Average Confidence</p>
          <h3 className="text-3xl font-bold text-success mb-2">89.4%</h3>
          <p className="text-xs text-gray-500">Based on last 100 predictions</p>
        </div>
        <div className="bg-cardBg border border-gray-800 rounded-xl p-5 shadow-lg">
          <p className="text-gray-400 text-sm mb-2">API Latency</p>
          <h3 className="text-3xl font-bold text-white mb-2">124ms</h3>
          <p className="text-xs text-success">Optimal performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-cardBg border border-gray-800 rounded-xl p-5 shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Prediction Volume Over Time</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c5dd3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6c5dd3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2e3d" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{backgroundColor: '#1a1d27', borderColor: '#2a2e3d', borderRadius: '8px'}} 
                  itemStyle={{color: '#fff'}}
                />
                <Area type="monotone" dataKey="predictions" stroke="#6c5dd3" strokeWidth={3} fillOpacity={1} fill="url(#colorPredictions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-cardBg border border-gray-800 rounded-xl p-5 shadow-lg flex flex-col">
          <h2 className="text-lg font-semibold mb-6">Predictions by City</h2>
          <div className="flex-1 flex justify-center items-center h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={cityDistribution}
                   cx="50%"
                   cy="50%"
                   innerRadius={80}
                   outerRadius={120}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {cityDistribution.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <RechartsTooltip contentStyle={{backgroundColor: '#1a1d27', borderColor: '#2a2e3d', borderRadius: '8px'}} />
                 <Legend verticalAlign="bottom" height={36} iconType="circle" />
               </PieChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-cardBg border border-gray-800 rounded-xl p-5 shadow-lg mb-6">
        <h2 className="text-lg font-semibold mb-6">Model Accuracy by Price Range</h2>
        <div className="h-[250px] w-full">
           <ResponsiveContainer>
             <BarChart data={accuracyMetrics} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="#2a2e3d" horizontal={false} />
               <XAxis type="number" domain={[0, 100]} stroke="#6b7280" fontSize={12} hide />
               <YAxis dataKey="category" type="category" stroke="#fff" fontSize={13} axisLine={false} tickLine={false} />
               <RechartsTooltip 
                 cursor={{fill: '#2a2e3d', opacity: 0.4}}
                 contentStyle={{backgroundColor: '#1a1d27', borderColor: '#2a2e3d', borderRadius: '8px'}} 
               />
               <Bar dataKey="accuracy" fill="#22b07d" radius={[0, 4, 4, 0]} barSize={24} />
             </BarChart>
           </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
