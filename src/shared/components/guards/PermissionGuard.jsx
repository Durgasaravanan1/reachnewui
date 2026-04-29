// PermissionGuard.jsx
import React from 'react';

// Simple class name merger
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Mock permission hook – replace with your actual implementation
const usePermission = (action) => {
  // For demo purposes, always return true (allow all actions)
  // You can replace this with actual permission checking logic.
  // Example: return userPermissions.includes(action);
  return true;
};

export default function PermissionGuard({ action, children, mode = 'hide', fallback = null }) {
  const hasPermission = usePermission(action);

  if (mode === 'hide') {
    return hasPermission ? <>{children}</> : <>{fallback}</>;
  }

  // mode === 'disable': render with opacity + pointer-events-none + title
  return (
    <div
      className={cn(!hasPermission && 'opacity-40 pointer-events-none cursor-not-allowed')}
      title={!hasPermission ? 'Requires higher access level' : undefined}
      aria-disabled={!hasPermission}
    >
      {children}
    </div>
  );
}