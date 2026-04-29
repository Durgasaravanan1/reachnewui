// MobileOverlay.jsx
import React, { createContext, useContext, useState } from 'react';

// ----------------------------- Mock UI Store (replace with your real store) -----------------------------
const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <UIContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </UIContext.Provider>
  );
};

const useUIStore = () => {
  const context = useContext(UIContext);
  if (!context) {
    // Fallback for when used outside provider – allows component to work standalone
    return { sidebarOpen: false, setSidebarOpen: () => {} };
  }
  return context;
};

// ----------------------------- Main MobileOverlay Component -----------------------------
export default function MobileOverlay() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  if (!sidebarOpen) return null;
  return (
    <div
      className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden"
      onClick={() => setSidebarOpen(false)}
      aria-hidden="true"
    />
  );
}