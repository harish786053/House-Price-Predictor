import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Clock, Download, Filter, Search } from 'lucide-react';

export default function History() {
  const { history } = useData();
  const navigate = useNavigate();

  const handleViewReport = (item) => {
    navigate('/analytics', { state: { historyItem: item } });
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">🕰️ Prediction History</h1>
          <p className="text-sm text-gray-400">Review your past price estimations and analysis.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="w-full bg-cardBg border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-primary outline-none"
            />
          </div>
          <button className="bg-cardBg border border-gray-800 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-cardBg border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Property Details</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Predicted Value</th>
                <th className="px-6 py-4 font-medium">Confidence</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {history.length > 0 ? (
                history.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-xl">
                          🏢
                        </div>
                        <div>
                          <p className="font-semibold text-white">{item.area} sq ft</p>
                          <p className="text-xs text-gray-500">{item.loc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white">{new Date(item.date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-success">₹ {item.price} L</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-success rounded-full w-[85%]"></div>
                        </div>
                        <span className="text-xs text-gray-400">85%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleViewReport(item)}
                        className="text-primary hover:text-white transition flex items-center gap-1 text-xs"
                      >
                        <Download size={14} /> Report
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <Clock size={32} className="mx-auto mb-3 opacity-50" />
                    <p>No prediction history found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
