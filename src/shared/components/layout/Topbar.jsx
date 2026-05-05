


// // Topbar.jsx
// import React, { useState } from "react";

// /* ── Font scoped only to topbar ── */
// const TopbarFont = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//     .tb-root * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
//     .tb-input { transition: border-color 0.15s, background 0.15s; }
//     .tb-input:focus { outline: none; border-color: #A5B4FC !important; background: #fff !important; }
//     .tb-input::placeholder { color: #94A3B8; }
//     .tb-icon-btn:hover { background: #F1F5F9 !important; }
//     .tb-user:hover { background: #F8FAFC !important; }
//   `}</style>
// );

// /* ── Notification Panel ── */
// const NOTIFICATIONS = [
//   { id:"1", type:"warning", title:"High bounce rate detected",        body:'"April Newsletter" has a 5.8% hard bounce rate, above your 5% threshold.', time:"2 hours ago", unread:true  },
//   { id:"2", type:"success", title:"April Newsletter sent successfully", body:"to 8,230 recipients.",                                                      time:"2 hours ago", unread:true  },
//   { id:"3", type:"success", title:"WhatsApp Flash Sale completed",     body:"68.3% read rate, 22.4% CTR.",                                                time:"5 hours ago", unread:true  },
//   { id:"4", type:"info",    title:"Contact import completed",          body:'342 new contacts added to "Active Customers".',                              time:"1 day ago",   unread:false },
//   { id:"5", type:"info",    title:"Re-engagement Series scheduled",    body:"for May 1, 2026 at 9:00 AM IST.",                                           time:"1 day ago",   unread:false },
// ];

// function NotifPanel({ open, onClose }) {
//   const [notifs, setNotifs] = useState(NOTIFICATIONS);
//   const unread = notifs.filter(n => n.unread).length;
//   const markAll = () => setNotifs(p => p.map(n => ({ ...n, unread: false })));
//   const markOne = id => setNotifs(p => p.map(n => n.id === id ? { ...n, unread: false } : n));

//   const CFG = {
//     warning: { iconBg:"#FEF3C7", c:"#D97706" },
//     success:  { iconBg:"#DCFCE7", c:"#16A34A" },
//     info:     { iconBg:"#E0E7FF", c:"#4F46E5" },
//   };

//   const Icon = ({ type }) => {
//     const c = CFG[type].c;
//     if (type === "warning") return (
//       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
//         <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinejoin="round"/>
//         <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
//         <circle cx="12" cy="17" r="1" fill={c} stroke="none"/>
//       </svg>
//     );
//     if (type === "success") return (
//       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
//         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     );
//     return (
//       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
//         <circle cx="12" cy="12" r="10"/>
//         <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round"/>
//         <circle cx="12" cy="8" r="1" fill={c} stroke="none"/>
//       </svg>
//     );
//   };

//   if (!open) return null;
//   return (
//     <>
//       <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:9998, background:"rgba(15,23,42,0.15)" }}/>
//       <aside style={{
//         position:"fixed", top:0, right:0, zIndex:9999,
//         height:"100vh", width:340,
//         background:"#fff", borderLeft:"1px solid #E2E8F0",
//         boxShadow:"-8px 0 32px rgba(0,0,0,0.08)",
//         display:"flex", flexDirection:"column",
//         fontFamily:"'Plus Jakarta Sans',sans-serif",
//       }}>
//         <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #F1F5F9" }}>
//           <span style={{ fontSize:14, fontWeight:700, color:"#0F172A" }}>
//             Notifications
//             {unread > 0 && (
//               <span style={{ marginLeft:8, background:"#4F46E5", color:"#fff", fontSize:10, fontWeight:700, borderRadius:999, padding:"2px 7px" }}>
//                 {unread}
//               </span>
//             )}
//           </span>
//           <div style={{ display:"flex", gap:8, alignItems:"center" }}>
//             {unread > 0 && (
//               <button onClick={markAll} style={{ fontSize:11, fontWeight:600, color:"#4F46E5", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
//                 Mark all read
//               </button>
//             )}
//             <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", padding:4, borderRadius:6, display:"flex" }}>
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/></svg>
//             </button>
//           </div>
//         </div>
//         <div style={{ flex:1, overflowY:"auto" }}>
//           {notifs.map(n => (
//             <div key={n.id} onClick={() => markOne(n.id)} style={{
//               display:"flex", gap:12, padding:"14px 20px",
//               borderBottom:"1px solid #F1F5F9",
//               background: n.unread ? "rgba(238,242,255,0.4)" : "#fff",
//               cursor:"pointer",
//             }}>
//               <div style={{ width:32, height:32, borderRadius:"50%", background:CFG[n.type].iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//                 <Icon type={n.type}/>
//               </div>
//               <div style={{ flex:1 }}>
//                 <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#1E293B", display:"flex", alignItems:"center", gap:6 }}>
//                   {n.title}
//                   {n.unread && <span style={{ width:6, height:6, borderRadius:"50%", background:"#4F46E5", display:"inline-block", flexShrink:0 }}/>}
//                 </p>
//                 <p style={{ margin:"3px 0 0", fontSize:12, color:"#64748B", lineHeight:1.5 }}>{n.body}</p>
//                 <p style={{ margin:"5px 0 0", fontSize:10.5, color:"#94A3B8" }}>{n.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </aside>
//     </>
//   );
// }

// /* ── Topbar Icons ── */
// const SearchIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <circle cx="11" cy="11" r="7" stroke="#60A5FA" strokeWidth="2.5"/>
//     <path d="M19.5 19.5l-4.2-4.2" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
//   </svg>
// );

// const BellIcon = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
//     <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
//     <ellipse cx="9.5" cy="10.5" rx="1.2" ry="2" fill="#FDE68A" opacity="0.7" transform="rotate(-15 9.5 10.5)"/>
//   </svg>
// );

// export default function Topbar({ title = "Dashboard", onMenuClick }) {
//   const [notifOpen, setNotifOpen] = useState(false);
//   const badgeCount = 3;

//   return (
//     <div className="tb-root">
//       <TopbarFont/>
//       <header style={{
//         height: 64, display:"flex", alignItems:"center",
//         padding:"0 24px", borderBottom:"1px solid #E5E9EF",
//         background:"#fff", width:"100%", flexShrink: 0,
//         fontFamily:"'Plus Jakarta Sans',sans-serif",
//       }}>

//         {/* Mobile hamburger */}
//         <button
//           onClick={onMenuClick}
//           className="tb-icon-btn"
//           style={{
//             display:"none", // shown via media query if needed
//             background:"none", border:"none", cursor:"pointer",
//             padding:"6px 8px", borderRadius:8, marginRight:8,
//             alignItems:"center", justifyContent:"center",
//           }}
//         >
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
//             <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
//           </svg>
//         </button>

//         {/* Title */}
//         <div style={{ fontSize:17, fontWeight:700, color:"#0F172A", letterSpacing:"-0.3px", whiteSpace:"nowrap", flexShrink:0 }}>
//           {title}
//         </div>

//         {/* Center search */}
//         <div style={{ flex:1, display:"flex", justifyContent:"center", padding:"0 32px" }}>
//           <div style={{ position:"relative", width:"100%", maxWidth:400 }}>
//             <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", display:"flex", alignItems:"center", pointerEvents:"none" }}>
//               <SearchIcon/>
//             </span>
//             <input
//               type="text"
//               placeholder="Search campaigns, contacts..."
//               className="tb-input"
//               style={{
//                 width:"100%", height:40, borderRadius:999,
//                 border:"1.5px solid #E2E8F0", background:"#F8FAFC",
//                 paddingLeft:42, paddingRight:18,
//                 fontSize:13.5, color:"#334155",
//                 fontFamily:"'Plus Jakarta Sans',sans-serif",
//                 display:"block",
//               }}
//             />
//           </div>
//         </div>

//         {/* Right icons */}
//         <div style={{ display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>

//           {/* Bell */}
//           <button
//             className="tb-icon-btn"
//             onClick={() => setNotifOpen(true)}
//             style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:"7px 9px", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
//           >
//             <BellIcon/>
//             <span style={{
//               position:"absolute", top:4, right:4,
//               minWidth:18, height:18, borderRadius:999,
//               background:"#EF4444", color:"#fff",
//               fontSize:10, fontWeight:800,
//               display:"flex", alignItems:"center", justifyContent:"center",
//               border:"2px solid #fff", padding:"0 3px", lineHeight:1,
//             }}>{badgeCount}</span>
//           </button>

//           {/* Help */}
//           <button
//             className="tb-icon-btn"
//             style={{ background:"none", border:"none", cursor:"pointer", padding:"7px 9px", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
//           >
//             <span style={{ fontSize:20, fontWeight:800, color:"#EC4899", lineHeight:"22px", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", userSelect:"none" }}>?</span>
//           </button>

//           {/* User */}
//           <div
//             className="tb-user"
//             style={{ display:"flex", alignItems:"center", gap:10, marginLeft:8, cursor:"pointer", padding:"4px 10px 4px 4px", borderRadius:10, transition:"background 0.15s" }}
//           >
//             <div style={{ width:36, height:36, borderRadius:"50%", background:"#7C3AED", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700, flexShrink:0 }}>
//               SA
//             </div>
//             <span style={{ fontSize:14, fontWeight:600, color:"#0F172A", whiteSpace:"nowrap" }}>
//               Subramanian
//             </span>
//           </div>
//         </div>
//       </header>

//       <NotifPanel open={notifOpen} onClose={() => setNotifOpen(false)}/>
//     </div>
//   );
// }

// Topbar.jsx — search + profile dropdown with working sign out
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ── Font scoped only to topbar ── */
const TopbarFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    .tb-root * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
    .tb-input { transition: border-color 0.15s, background 0.15s; }
    .tb-input:focus { outline: none; border-color: #A5B4FC !important; background: #fff !important; }
    .tb-input::placeholder { color: #94A3B8; }
    .tb-icon-btn:hover { background: #F1F5F9 !important; }
    .tb-user:hover { background: #F8FAFC !important; }
    @media (max-width: 767px) {
      .tb-mobile-menu { display: flex !important; }
      .tb-user-name { display: none; }
    }
    @media (min-width: 768px) {
      .tb-mobile-menu { display: none; }
      .tb-user-name { display: inline-block; }
    }
  `}</style>
);

/* ── Notification Panel (unchanged) ── */
const NOTIFICATIONS = [
  { id:"1", type:"warning", title:"High bounce rate detected",        body:'"April Newsletter" has a 5.8% hard bounce rate, above your 5% threshold.', time:"2 hours ago", unread:true  },
  { id:"2", type:"success", title:"April Newsletter sent successfully", body:"to 8,230 recipients.",                                                      time:"2 hours ago", unread:true  },
  { id:"3", type:"success", title:"WhatsApp Flash Sale completed",     body:"68.3% read rate, 22.4% CTR.",                                                time:"5 hours ago", unread:true  },
  { id:"4", type:"info",    title:"Contact import completed",          body:'342 new contacts added to "Active Customers".',                              time:"1 day ago",   unread:false },
  { id:"5", type:"info",    title:"Re-engagement Series scheduled",    body:"for May 1, 2026 at 9:00 AM IST.",                                           time:"1 day ago",   unread:false },
];

function NotifPanel({ open, onClose }) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unread = notifs.filter(n => n.unread).length;
  const markAll = () => setNotifs(p => p.map(n => ({ ...n, unread: false })));
  const markOne = id => setNotifs(p => p.map(n => n.id === id ? { ...n, unread: false } : n));

  const CFG = {
    warning: { iconBg:"#FEF3C7", c:"#D97706" },
    success:  { iconBg:"#DCFCE7", c:"#16A34A" },
    info:     { iconBg:"#E0E7FF", c:"#4F46E5" },
  };

  const Icon = ({ type }) => {
    const c = CFG[type].c;
    if (type === "warning") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinejoin="round"/>
        <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
        <circle cx="12" cy="17" r="1" fill={c} stroke="none"/>
      </svg>
    );
    if (type === "success") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round"/>
        <circle cx="12" cy="8" r="1" fill={c} stroke="none"/>
      </svg>
    );
  };

  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:9998, background:"rgba(15,23,42,0.15)" }}/>
      <aside style={{
        position:"fixed", top:0, right:0, zIndex:9999,
        height:"100vh", width:340,
        background:"#fff", borderLeft:"1px solid #E2E8F0",
        boxShadow:"-8px 0 32px rgba(0,0,0,0.08)",
        display:"flex", flexDirection:"column",
        fontFamily:"'Plus Jakarta Sans',sans-serif",
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #F1F5F9" }}>
          <span style={{ fontSize:14, fontWeight:700, color:"#0F172A" }}>
            Notifications
            {unread > 0 && (
              <span style={{ marginLeft:8, background:"#4F46E5", color:"#fff", fontSize:10, fontWeight:700, borderRadius:999, padding:"2px 7px" }}>
                {unread}
              </span>
            )}
          </span>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {unread > 0 && (
              <button onClick={markAll} style={{ fontSize:11, fontWeight:600, color:"#4F46E5", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Mark all read
              </button>
            )}
            <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", padding:4, borderRadius:6, display:"flex" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>
          {notifs.map(n => (
            <div key={n.id} onClick={() => markOne(n.id)} style={{
              display:"flex", gap:12, padding:"14px 20px",
              borderBottom:"1px solid #F1F5F9",
              background: n.unread ? "rgba(238,242,255,0.4)" : "#fff",
              cursor:"pointer",
            }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:CFG[n.type].iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon type={n.type}/>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#1E293B", display:"flex", alignItems:"center", gap:6 }}>
                  {n.title}
                  {n.unread && <span style={{ width:6, height:6, borderRadius:"50%", background:"#4F46E5", display:"inline-block", flexShrink:0 }}/>}
                </p>
                <p style={{ margin:"3px 0 0", fontSize:12, color:"#64748B", lineHeight:1.5 }}>{n.body}</p>
                <p style={{ margin:"5px 0 0", fontSize:10.5, color:"#94A3B8" }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

/* ── Topbar Icons ── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="#60A5FA" strokeWidth="2.5"/>
    <path d="M19.5 19.5l-4.2-4.2" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="9.5" cy="10.5" rx="1.2" ry="2" fill="#FDE68A" opacity="0.7" transform="rotate(-15 9.5 10.5)"/>
  </svg>
);

export default function Topbar({ title = "Dashboard", onMenuClick, onSearch }) {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const badgeCount = 3;

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    // Clear any auth tokens / user data
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    // You can also clear other app-specific keys if needed
    // Then redirect to login
    navigate("/login");
  };

  const handleProfileSettings = () => {
    navigate("/settings");
    setProfileOpen(false);
  };

  return (
    <div className="tb-root">
      <TopbarFont />
      <header style={{
        height: 64, display:"flex", alignItems:"center",
        padding:"0 24px", borderBottom:"1px solid #E5E9EF",
        background:"#fff", width:"100%", flexShrink: 0,
        fontFamily:"'Plus Jakarta Sans',sans-serif",
        gap: "12px",
      }}>
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="tb-icon-btn tb-mobile-menu"
          style={{
            background:"none", border:"none", cursor:"pointer",
            padding:"6px 8px", borderRadius:8,
            alignItems:"center", justifyContent:"center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title */}
        <div style={{ fontSize:17, fontWeight:700, color:"#0F172A", letterSpacing:"-0.3px", whiteSpace:"nowrap", flexShrink:0 }}>
          {title}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Search bar */}
        <div style={{ width: "260px", maxWidth: "100%", marginRight: "8px" }}>
          <div style={{ position:"relative", width:"100%" }}>
            <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", display:"flex", alignItems:"center", pointerEvents:"none" }}>
              <SearchIcon/>
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="tb-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width:"100%", height:40, borderRadius:999,
                border:"1.5px solid #E2E8F0", background:"#F8FAFC",
                paddingLeft:42, paddingRight:18,
                fontSize:13.5, color:"#334155",
                fontFamily:"'Plus Jakarta Sans',sans-serif",
                display:"block",
              }}
            />
          </div>
        </div>

        {/* Right icons */}
        <div style={{ display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>
          {/* Bell */}
          <button
            className="tb-icon-btn"
            onClick={() => setNotifOpen(true)}
            style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:"7px 9px", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
          >
            <BellIcon/>
            <span style={{
              position:"absolute", top:4, right:4,
              minWidth:18, height:18, borderRadius:999,
              background:"#EF4444", color:"#fff",
              fontSize:10, fontWeight:800,
              display:"flex", alignItems:"center", justifyContent:"center",
              border:"2px solid #fff", padding:"0 3px", lineHeight:1,
            }}>{badgeCount}</span>
          </button>

          {/* Help */}
          <button
            className="tb-icon-btn"
            style={{ background:"none", border:"none", cursor:"pointer", padding:"7px 9px", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
          >
            <span style={{ fontSize:20, fontWeight:800, color:"#EC4899", lineHeight:"22px", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", userSelect:"none" }}>?</span>
          </button>

          {/* User with dropdown */}
          <div
            ref={dropdownRef}
            className="tb-user"
            onClick={() => setProfileOpen(!profileOpen)}
            style={{ position:"relative", display:"flex", alignItems:"center", gap:10, marginLeft:8, cursor:"pointer", padding:"4px 10px 4px 4px", borderRadius:10, transition:"background 0.15s" }}
          >
            <div style={{ width:36, height:36, borderRadius:"50%", background:"#7C3AED", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700, flexShrink:0 }}>
              SA
            </div>
            <span className="tb-user-name" style={{ fontSize:14, fontWeight:600, color:"#0F172A", whiteSpace:"nowrap" }}>
              Subramanian
            </span>

            {/* Dropdown menu */}
            {profileOpen && (
              <div style={{
                position:"absolute", top: "calc(100% + 8px)", right: 0,
                width: 180, background:"#fff", borderRadius:12,
                boxShadow:"0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.02)",
                border:"1px solid #E2E8F0", zIndex: 100,
                overflow:"hidden",
              }}>
                <button
                  onClick={handleProfileSettings}
                  style={{
                    width:"100%", textAlign:"left", padding:"10px 16px",
                    fontSize:13, fontWeight:500, color:"#1E293B",
                    background:"none", border:"none", cursor:"pointer",
                    transition:"background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background="#F8FAFC"}
                  onMouseLeave={(e) => e.currentTarget.style.background="#fff"}
                >
                  ⚙️ Profile Settings
                </button>
                <button
                  onClick={handleSignOut}
                  style={{
                    width:"100%", textAlign:"left", padding:"10px 16px",
                    fontSize:13, fontWeight:500, color:"#EF4444",
                    background:"none", border:"none", cursor:"pointer",
                    borderTop:"1px solid #F1F5F9",
                    transition:"background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background="#FEF2F2"}
                  onMouseLeave={(e) => e.currentTarget.style.background="#fff"}
                >
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <NotifPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
}