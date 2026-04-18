import { NavLink } from "react-router-dom";
import { Home, IndianRupee, BarChart2, Clock, Settings, Bookmark, CheckCircle2, Crown, LogOut } from "lucide-react";

export default function Sidebar({ onLogout }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const menuItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Predict Price", path: "/predict", icon: IndianRupee },
    { name: "Analytics", path: "/analytics", icon: BarChart2 },
    { name: "History", path: "/history", icon: Clock },
    { name: "Saved Properties", path: "/saved", icon: Bookmark },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-darkBg border-r border-gray-800 flex flex-col justify-between h-full p-4">
      <div>
        <div className="flex items-center gap-2 px-2 py-4 mb-6">
          <div className="bg-primary p-2 rounded-lg text-white">
            <Home size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white leading-tight">HousePrice</h1>
            <p className="text-xs text-primary font-medium">AI Predictor</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-gray-400 hover:text-white hover:bg-cardBg"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        {/* PRO Banner */}
        <div className="bg-cardBg p-4 rounded-xl border border-gray-800">
          <span className="text-xs font-bold bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-md mb-2 inline-block">PRO</span>
          <h3 className="font-bold text-sm mb-2">Unlock Premium Features</h3>
          <ul className="text-xs text-gray-400 space-y-1 mb-3">
            <li className="flex items-center gap-1"><CheckCircle2 size={12} className="text-success"/> Advanced Analytics</li>
            <li className="flex items-center gap-1"><CheckCircle2 size={12} className="text-success"/> Export Reports</li>
          </ul>
          <button className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-medium py-2 rounded-lg transition-colors">
            Upgrade Now
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-3 bg-cardBg rounded-xl border border-gray-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <img 
              src={`https://ui-avatars.com/api/?name=${user.name || 'User'}&background=8b5cf6&color=fff`} 
              className="w-8 h-8 rounded-full shrink-0" 
              alt="User" 
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user.email || 'user@example.com'}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="text-gray-500 hover:text-red-500 p-2 transition-colors shrink-0"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
