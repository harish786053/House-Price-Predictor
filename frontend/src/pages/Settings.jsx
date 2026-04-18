import React from 'react';
import { Moon, Bell, Shield, Key, User, Globe } from 'lucide-react';

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">⚙️ Settings</h1>
        <p className="text-sm text-gray-400">Manage your account preferences and app configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-cardBg border border-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-5 border-b border-gray-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="text-primary" size={20} /> Profile Settings
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={user.name || "Harish User"} 
                  className="bg-[#0f111a] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user.email || "user@example.com"} 
                  className="bg-[#0f111a] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none" 
                />
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-cardBg border border-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-5 border-b border-gray-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="text-success" size={20} /> Preferences
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <ToggleRow icon={Moon} title="Dark Mode" desc="Enable dark theme across the app" defaultChecked />
              <ToggleRow icon={Bell} title="Email Notifications" desc="Receive weekly report emails" defaultChecked={false} />
              <ToggleRow icon={Shield} title="Data Sharing" desc="Share anonymous usage data to improve models" defaultChecked />
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-cardBg border border-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-5 border-b border-gray-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Key className="text-warning" size={20} /> API Access
              </h2>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-400 mb-4">You can use your API key to access our ML models programmatically.</p>
              <div className="bg-[#0f111a] border border-gray-800 rounded-lg p-3 flex justify-between items-center mb-4">
                <code className="text-xs text-mono text-gray-400 select-all">hp_api_k83j9df...</code>
                <button className="text-primary hover:text-white text-xs font-medium transition">Copy</button>
              </div>
              <button className="w-full border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-sm font-medium py-2 rounded-lg transition-colors">
                Regenerate Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ icon: Icon, title, desc, defaultChecked }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-800/30 rounded-lg text-gray-400">
          <Icon size={18} />
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
    </div>
  );
}
