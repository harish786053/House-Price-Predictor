import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import PredictPrice from "./pages/PredictPrice";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import SavedProperties from "./pages/SavedProperties";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { DataProvider } from "./context/DataContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="h-screen w-full bg-darkBg flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <Router>
      <DataProvider>
        <div className="flex h-screen bg-darkBg text-white overflow-hidden">
          {isAuthenticated && <Sidebar onLogout={handleLogout} />}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route 
                path="/login" 
                element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/predict" 
                element={isAuthenticated ? <PredictPrice /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/analytics" 
                element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/history" 
                element={isAuthenticated ? <History /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/saved" 
                element={isAuthenticated ? <SavedProperties /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/settings" 
                element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} 
              />
            </Routes>
          </div>
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;
