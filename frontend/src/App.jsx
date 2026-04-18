import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import PredictPrice from "./pages/PredictPrice";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import SavedProperties from "./pages/SavedProperties";
import Settings from "./pages/Settings";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <Router>
      <DataProvider>
        <div className="flex h-screen bg-darkBg text-white overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predict" element={<PredictPrice />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/history" element={<History />} />
              <Route path="/saved" element={<SavedProperties />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;
