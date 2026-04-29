// RequirePermission.jsx
import React from 'react';

// Mock permission hook – replace with your real implementation
const usePermission = (action) => {
  // For demo, grant all permissions. Change to false to test redirect.
  return true;
};

// Mock navigate (replace with useNavigate from react-router-dom)
const useMockNavigate = () => (path) => {
  console.log(`[Mock Router] Would navigate to: ${path}`);
};

// Mock Navigate component (replace with actual from react-router-dom)
const MockNavigate = ({ to, replace }) => {
  const navigate = useMockNavigate();
  navigate(to);
  return <div>Redirecting to {to}...</div>;
};

export default function RequirePermission({ action, children, redirect = '/' }) {
  const hasPermission = usePermission(action);

  if (!hasPermission) {
    // In a real React Router app, return <Navigate to={redirect} replace />
    return <MockNavigate to={redirect} replace />;
  }

  return <>{children}</>;
}