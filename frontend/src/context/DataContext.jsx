import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const initialHistory = [
  { id: 1, area: "1500", loc: "Chennai", price: "75.42", time: "2 hours ago", date: new Date().toISOString() },
  { id: 2, area: "1200", loc: "Bengaluru", price: "62.10", time: "1 day ago", date: new Date(Date.now() - 86400000).toISOString() },
  { id: 3, area: "1800", loc: "Hyderabad", price: "91.30", time: "2 days ago", date: new Date(Date.now() - 172800000).toISOString() },
  { id: 4, area: "2200", loc: "Delhi", price: "145.00", time: "3 days ago", date: new Date(Date.now() - 259200000).toISOString() },
  { id: 5, area: "900", loc: "Kolkata", price: "45.20", time: "5 days ago", date: new Date(Date.now() - 432000000).toISOString() },
];

const initialSaved = [
  { id: 1, area: "2100", loc: "Pune", price: "110.5", bedrooms: 3, bathrooms: 2, image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80" },
  { id: 2, area: "950", loc: "Mumbai", price: "145.2", bedrooms: 2, bathrooms: 1, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" },
  { id: 3, area: "3200", loc: "Bengaluru", price: "210.0", bedrooms: 4, bathrooms: 3, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80" },
];

export function DataProvider({ children }) {
  const [history, setHistory] = useState(() => {
    const local = localStorage.getItem('houseAI_history');
    return local ? JSON.parse(local) : initialHistory;
  });

  const [savedProperties, setSavedProperties] = useState(() => {
    const local = localStorage.getItem('houseAI_saved');
    return local ? JSON.parse(local) : initialSaved;
  });

  useEffect(() => {
    localStorage.setItem('houseAI_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('houseAI_saved', JSON.stringify(savedProperties));
  }, [savedProperties]);

  const addHistoryEntry = (entry) => {
    setHistory((prev) => [{ ...entry, id: Date.now() }, ...prev]);
  };

  const toggleSaveProperty = (property) => {
    setSavedProperties((prev) => {
      const exists = prev.find(p => p.id === property.id);
      if (exists) {
        return prev.filter(p => p.id !== property.id);
      }
      return [{ ...property, id: property.id || Date.now() }, ...prev];
    });
  };

  const isSaved = (id) => savedProperties.some(p => p.id === id);

  return (
    <DataContext.Provider value={{ history, addHistoryEntry, savedProperties, toggleSaveProperty, isSaved }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
