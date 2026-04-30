


// // Topbar.jsx — search placed near notification (right side, before bell)
// import React, { useState } from "react";

// /* ── Font (scoped via class, not body) ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//     .topbar-root * {
//       font-family: 'Plus Jakarta Sans', sans-serif !important;
//       box-sizing: border-box;
//     }
//     .topbar-search-input::placeholder { color: #94A3B8; }
//     .topbar-search-input:focus {
//       border-color: #A5B4FC !important;
//       background: #fff !important;
//       outline: none;
//     }
//     .topbar-icon-btn:hover { background: #F1F5F9 !important; }
//     .topbar-user:hover { background: #F8FAFC !important; }
//   `}</style>
// );

// /* ══════════════════════════════════════
//    NOTIFICATION PANEL (unchanged)
// ══════════════════════════════════════ */
// const NOTIFICATIONS = [
//   { id:"1", type:"warning", title:"High bounce rate detected",       body:'"April Newsletter" has a 5.8% hard bounce rate, above your 5% threshold.', time:"2 hours ago", unread:true  },
//   { id:"2", type:"success", title:"April Newsletter sent successfully", body:"to 8,230 recipients.",                                                       time:"2 hours ago", unread:true  },
//   { id:"3", type:"success", title:"WhatsApp Flash Sale completed",    body:"68.3% read rate, 22.4% CTR.",                                                 time:"5 hours ago", unread:true  },
//   { id:"4", type:"info",    title:"Contact import completed",         body:'342 new contacts added to "Active Customers".',                               time:"1 day ago",   unread:false },
//   { id:"5", type:"info",    title:"Re-engagement Series scheduled",   body:"for May 1, 2026 at 9:00 AM IST.",                                            time:"1 day ago",   unread:false },
// ];

// function NotificationPanel({ open, onClose }) {
//   const [notifs, setNotifs] = useState(NOTIFICATIONS);
//   const unreadCount = notifs.filter(n => n.unread).length;
//   const markAll = () => setNotifs(p => p.map(n => ({ ...n, unread: false })));
//   const markOne = id => setNotifs(p => p.map(n => n.id === id ? { ...n, unread: false } : n));

//   const cfg = {
//     warning: { iconBg:"#FEF3C7", iconColor:"#D97706" },
//     success:  { iconBg:"#DCFCE7", iconColor:"#16A34A" },
//     info:     { iconBg:"#E0E7FF", iconColor:"#4F46E5" },
//   };

//   const TypeIcon = ({ type }) => {
//     const c = cfg[type].iconColor;
//     if (type === "warning") return (
//       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
//         <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinejoin="round"/>
//         <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
//         <circle cx="12" cy="17" r="1" fill={c} stroke="none"/>
//       </svg>
//     );
//     if (type === "success") return (
//       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
//         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     );
//     return (
//       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
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
//         background:"#fff",
//         borderLeft:"1px solid #E2E8F0",
//         boxShadow:"-8px 0 32px rgba(0,0,0,0.08)",
//         display:"flex", flexDirection:"column",
//         fontFamily:"'Plus Jakarta Sans',sans-serif",
//       }}>
//         <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #F1F5F9" }}>
//           <span style={{ fontSize:14, fontWeight:700, color:"#0F172A" }}>
//             Notifications
//             {unreadCount > 0 && (
//               <span style={{ marginLeft:8, background:"#4F46E5", color:"#fff", fontSize:10, fontWeight:700, borderRadius:999, padding:"2px 7px", display:"inline-block" }}>
//                 {unreadCount}
//               </span>
//             )}
//           </span>
//           <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//             {unreadCount > 0 && (
//               <button onClick={markAll} style={{ fontSize:11, fontWeight:600, color:"#4F46E5", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontFamily:"inherit" }}>
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5">
//                   <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 Mark all read
//               </button>
//             )}
//             <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", padding:4, borderRadius:6, display:"flex", alignItems:"center" }}>
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
//               </svg>
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
//               <div style={{ width:34, height:34, borderRadius:"50%", background:cfg[n.type].iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//                 <TypeIcon type={n.type}/>
//               </div>
//               <div style={{ flex:1, minWidth:0 }}>
//                 <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#1E293B", lineHeight:1.4, display:"flex", alignItems:"center", gap:6 }}>
//                   {n.title}
//                   {n.unread && <span style={{ width:6, height:6, borderRadius:"50%", background:"#4F46E5", flexShrink:0, display:"inline-block" }}/>}
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

// /* ══════════════════════════════════════
//    ICONS
// ══════════════════════════════════════ */
// const SearchIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <circle cx="11" cy="11" r="7" stroke="#60A5FA" strokeWidth="2.5"/>
//     <path d="M19.5 19.5l-4.2-4.2" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
//   </svg>
// );

// const BellIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
//       fill="#F59E0B" stroke="#D97706" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"
//     />
//     <path
//       d="M13.73 21a2 2 0 0 1-3.46 0"
//       stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none"
//     />
//     <ellipse cx="9.5" cy="10.5" rx="1.2" ry="2" fill="#FDE68A" opacity="0.7" transform="rotate(-15 9.5 10.5)"/>
//   </svg>
// );

// const HelpIcon = () => (
//   <span style={{
//     fontSize: 20,
//     fontWeight: 800,
//     color: "#EC4899",
//     lineHeight: "22px",
//     display: "block",
//     width: 22,
//     height: 22,
//     textAlign: "center",
//     userSelect: "none",
//   }}>?</span>
// );

// const Avatar = () => (
//   <div style={{
//     width: 36, height: 36, borderRadius: "50%",
//     background: "#7C3AED",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
//     letterSpacing: "0.03em",
//   }}>SA</div>
// );

// /* ══════════════════════════════════════
//    TOPBAR — search near notification (right side)
// ══════════════════════════════════════ */
// export default function Topbar({ title = "Dashboard", onMenuClick }) {
//   const [notifOpen, setNotifOpen] = useState(false);
//   const badgeCount = 3;

//   return (
//     <div className="topbar-root">
//       <FontStyle />

//       <header style={{
//         height: 64,
//         display: "flex",
//         alignItems: "center",
//         paddingLeft: 28,
//         paddingRight: 28,
//         borderBottom: "1px solid #E5E9EF",
//         background: "#ffffff",
//         width: "100%",
//         position: "relative",
//         zIndex: 10,
//       }}>
//         {/* Mobile menu button (optional) */}
//         {onMenuClick && (
//           <button
//             onClick={onMenuClick}
//             className="md:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100"
//             style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", marginRight: "12px" }}
//           >
//             <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         )}

//         {/* Page title (left side) */}
//         <div style={{
//           fontSize: 17,
//           fontWeight: 700,
//           color: "#0F172A",
//           letterSpacing: "-0.3px",
//           whiteSpace: "nowrap",
//           flexShrink: 0,
//         }}>
//           {title}
//         </div>

//         {/* Spacer pushes everything to the right */}
//         <div style={{ flex: 1 }} />

//         {/* Search bar – right side, before icons */}
//         <div style={{ marginRight: "16px" }}>
//           <div style={{ position: "relative", width: "260px" }}>
//             <span style={{
//               position: "absolute", left: 14, top: "50%",
//               transform: "translateY(-50%)",
//               display: "flex", alignItems: "center",
//               pointerEvents: "none",
//             }}>
//               <SearchIcon />
//             </span>
//             <input
//               type="text"
//               placeholder="Search campaigns, contacts..."
//               className="topbar-search-input"
//               style={{
//                 width: "100%",
//                 height: 40,
//                 borderRadius: 999,
//                 border: "1.5px solid #E2E8F0",
//                 background: "#F8FAFC",
//                 paddingLeft: 42,
//                 paddingRight: 18,
//                 fontSize: 13.5,
//                 color: "#334155",
//                 display: "block",
//                 transition: "border-color 0.15s, background 0.15s",
//               }}
//             />
//           </div>
//         </div>

//         {/* Right icons (bell, help, user) */}
//         <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
//           <button
//             className="topbar-icon-btn"
//             onClick={() => setNotifOpen(true)}
//             style={{
//               position: "relative",
//               background: "none", border: "none", cursor: "pointer",
//               padding: "7px 9px", borderRadius: 8,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               transition: "background 0.15s",
//             }}
//           >
//             <BellIcon />
//             <span style={{
//               position: "absolute", top: 4, right: 4,
//               minWidth: 18, height: 18,
//               borderRadius: 999,
//               background: "#EF4444",
//               color: "#fff",
//               fontSize: 10, fontWeight: 800,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               border: "2px solid #fff",
//               padding: "0 3px",
//               lineHeight: 1,
//             }}>
//               {badgeCount}
//             </span>
//           </button>

//           <button
//             className="topbar-icon-btn"
//             style={{
//               background: "none", border: "none", cursor: "pointer",
//               padding: "7px 9px", borderRadius: 8,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               transition: "background 0.15s",
//             }}
//           >
//             <HelpIcon />
//           </button>

//           <div
//             className="topbar-user"
//             style={{
//               display: "flex", alignItems: "center", gap: 10,
//               marginLeft: 8,
//               cursor: "pointer",
//               padding: "4px 10px 4px 4px",
//               borderRadius: 10,
//               transition: "background 0.15s",
//             }}
//           >
//             <Avatar />
//             <span style={{
//               fontSize: 14, fontWeight: 600, color: "#0F172A",
//               letterSpacing: "-0.1px", whiteSpace: "nowrap",
//             }}>
//               Subramanian
//             </span>
//           </div>
//         </div>
//       </header>

//       <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
//     </div>
//   );
// }


// // Topbar.jsx — responsive: hamburger only on mobile
// import React, { useState } from "react";

// /* ── Font (scoped) ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//     .topbar-root * {
//       font-family: 'Plus Jakarta Sans', sans-serif !important;
//       box-sizing: border-box;
//     }
//     .topbar-search-input::placeholder { color: #94A3B8; }
//     .topbar-search-input:focus {
//       border-color: #A5B4FC !important;
//       background: #fff !important;
//       outline: none;
//     }
//     .topbar-icon-btn:hover { background: #F1F5F9 !important; }
//     .topbar-user:hover { background: #F8FAFC !important; }
//   `}</style>
// );

// /* ══════════════════════════════════════
//    NOTIFICATION PANEL (unchanged)
// ══════════════════════════════════════ */
// const NOTIFICATIONS = [
//   { id:"1", type:"warning", title:"High bounce rate detected",       body:'"April Newsletter" has a 5.8% hard bounce rate, above your 5% threshold.', time:"2 hours ago", unread:true  },
//   { id:"2", type:"success", title:"April Newsletter sent successfully", body:"to 8,230 recipients.", time:"2 hours ago", unread:true  },
//   { id:"3", type:"success", title:"WhatsApp Flash Sale completed",    body:"68.3% read rate, 22.4% CTR.", time:"5 hours ago", unread:true  },
//   { id:"4", type:"info",    title:"Contact import completed",         body:'342 new contacts added to "Active Customers".', time:"1 day ago",   unread:false },
//   { id:"5", type:"info",    title:"Re-engagement Series scheduled",   body:"for May 1, 2026 at 9:00 AM IST.", time:"1 day ago",   unread:false },
// ];

// function NotificationPanel({ open, onClose }) {
//   const [notifs, setNotifs] = useState(NOTIFICATIONS);
//   const unreadCount = notifs.filter(n => n.unread).length;
//   const markAll = () => setNotifs(p => p.map(n => ({ ...n, unread: false })));
//   const markOne = id => setNotifs(p => p.map(n => n.id === id ? { ...n, unread: false } : n));

//   const cfg = {
//     warning: { iconBg:"#FEF3C7", iconColor:"#D97706" },
//     success:  { iconBg:"#DCFCE7", iconColor:"#16A34A" },
//     info:     { iconBg:"#E0E7FF", iconColor:"#4F46E5" },
//   };

//   const TypeIcon = ({ type }) => {
//     const c = cfg[type].iconColor;
//     if (type === "warning") return (
//       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
//         <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinejoin="round"/>
//         <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
//         <circle cx="12" cy="17" r="1" fill={c} stroke="none"/>
//       </svg>
//     );
//     if (type === "success") return (
//       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
//         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     );
//     return (
//       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
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
//         background:"#fff",
//         borderLeft:"1px solid #E2E8F0",
//         boxShadow:"-8px 0 32px rgba(0,0,0,0.08)",
//         display:"flex", flexDirection:"column",
//         fontFamily:"'Plus Jakarta Sans',sans-serif",
//       }}>
//         <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #F1F5F9" }}>
//           <span style={{ fontSize:14, fontWeight:700, color:"#0F172A" }}>
//             Notifications
//             {unreadCount > 0 && (
//               <span style={{ marginLeft:8, background:"#4F46E5", color:"#fff", fontSize:10, fontWeight:700, borderRadius:999, padding:"2px 7px", display:"inline-block" }}>
//                 {unreadCount}
//               </span>
//             )}
//           </span>
//           <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//             {unreadCount > 0 && (
//               <button onClick={markAll} style={{ fontSize:11, fontWeight:600, color:"#4F46E5", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontFamily:"inherit" }}>
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5">
//                   <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 Mark all read
//               </button>
//             )}
//             <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", padding:4, borderRadius:6, display:"flex", alignItems:"center" }}>
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
//               </svg>
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
//               <div style={{ width:34, height:34, borderRadius:"50%", background:cfg[n.type].iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//                 <TypeIcon type={n.type}/>
//               </div>
//               <div style={{ flex:1, minWidth:0 }}>
//                 <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#1E293B", lineHeight:1.4, display:"flex", alignItems:"center", gap:6 }}>
//                   {n.title}
//                   {n.unread && <span style={{ width:6, height:6, borderRadius:"50%", background:"#4F46E5", flexShrink:0, display:"inline-block" }}/>}
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

// /* ══════════════════════════════════════
//    ICONS
// ══════════════════════════════════════ */
// const SearchIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <circle cx="11" cy="11" r="7" stroke="#60A5FA" strokeWidth="2.5"/>
//     <path d="M19.5 19.5l-4.2-4.2" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
//   </svg>
// );

// const BellIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
//       fill="#F59E0B" stroke="#D97706" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"
//     />
//     <path
//       d="M13.73 21a2 2 0 0 1-3.46 0"
//       stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none"
//     />
//     <ellipse cx="9.5" cy="10.5" rx="1.2" ry="2" fill="#FDE68A" opacity="0.7" transform="rotate(-15 9.5 10.5)"/>
//   </svg>
// );

// const HelpIcon = () => (
//   <span style={{
//     fontSize: 20,
//     fontWeight: 800,
//     color: "#EC4899",
//     lineHeight: "22px",
//     display: "block",
//     width: 22,
//     height: 22,
//     textAlign: "center",
//     userSelect: "none",
//   }}>?</span>
// );

// const Avatar = () => (
//   <div style={{
//     width: 36, height: 36, borderRadius: "50%",
//     background: "#7C3AED",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
//     letterSpacing: "0.03em",
//   }}>SA</div>
// );

// /* ══════════════════════════════════════
//    TOPBAR — responsive hamburger (only on mobile)
// ══════════════════════════════════════ */
// export default function Topbar({ title = "Dashboard", onMenuClick, isMobile = false }) {
//   const [notifOpen, setNotifOpen] = useState(false);
//   const badgeCount = 3;

//   return (
//     <div className="topbar-root">
//       <FontStyle />

//       <header style={{
//         height: 64,
//         display: "flex",
//         alignItems: "center",
//         paddingLeft: 28,
//         paddingRight: 28,
//         borderBottom: "1px solid #E5E9EF",
//         background: "#ffffff",
//         width: "100%",
//         position: "relative",
//         zIndex: 10,
//       }}>
//         {/* Hamburger menu – only rendered on mobile */}
//         {isMobile && onMenuClick && (
//           <button
//             onClick={onMenuClick}
//             style={{
//               background: "none", border: "none", cursor: "pointer",
//               display: "flex", alignItems: "center",
//               marginRight: "12px",
//               padding: "6px",
//               borderRadius: "6px"
//             }}
//             className="hover:bg-slate-100"
//           >
//             <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         )}

//         {/* Page title */}
//         <div style={{
//           fontSize: 17,
//           fontWeight: 700,
//           color: "#0F172A",
//           letterSpacing: "-0.3px",
//           whiteSpace: "nowrap",
//           flexShrink: 0,
//         }}>
//           {title}
//         </div>

//         {/* Spacer */}
//         <div style={{ flex: 1 }} />

//         {/* Search bar – right side */}
//         <div style={{ marginRight: "16px" }}>
//           <div style={{ position: "relative", width: "260px" }}>
//             <span style={{
//               position: "absolute", left: 14, top: "50%",
//               transform: "translateY(-50%)",
//               display: "flex", alignItems: "center",
//               pointerEvents: "none",
//             }}>
//               <SearchIcon />
//             </span>
//             <input
//               type="text"
//               placeholder="Search campaigns, contacts..."
//               className="topbar-search-input"
//               style={{
//                 width: "100%",
//                 height: 40,
//                 borderRadius: 999,
//                 border: "1.5px solid #E2E8F0",
//                 background: "#F8FAFC",
//                 paddingLeft: 42,
//                 paddingRight: 18,
//                 fontSize: 13.5,
//                 color: "#334155",
//                 display: "block",
//                 transition: "border-color 0.15s, background 0.15s",
//               }}
//             />
//           </div>
//         </div>

//         {/* Right icons */}
//         <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
//           <button
//             className="topbar-icon-btn"
//             onClick={() => setNotifOpen(true)}
//             style={{
//               position: "relative",
//               background: "none", border: "none", cursor: "pointer",
//               padding: "7px 9px", borderRadius: 8,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               transition: "background 0.15s",
//             }}
//           >
//             <BellIcon />
//             <span style={{
//               position: "absolute", top: 4, right: 4,
//               minWidth: 18, height: 18,
//               borderRadius: 999,
//               background: "#EF4444",
//               color: "#fff",
//               fontSize: 10, fontWeight: 800,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               border: "2px solid #fff",
//               padding: "0 3px",
//               lineHeight: 1,
//             }}>
//               {badgeCount}
//             </span>
//           </button>

//           <button
//             className="topbar-icon-btn"
//             style={{
//               background: "none", border: "none", cursor: "pointer",
//               padding: "7px 9px", borderRadius: 8,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               transition: "background 0.15s",
//             }}
//           >
//             <HelpIcon />
//           </button>

//           <div
//             className="topbar-user"
//             style={{
//               display: "flex", alignItems: "center", gap: 10,
//               marginLeft: 8,
//               cursor: "pointer",
//               padding: "4px 10px 4px 4px",
//               borderRadius: 10,
//               transition: "background 0.15s",
//             }}
//           >
//             <Avatar />
//             <span style={{
//               fontSize: 14, fontWeight: 600, color: "#0F172A",
//               letterSpacing: "-0.1px", whiteSpace: "nowrap",
//             }}>
//               Subramanian
//             </span>
//           </div>
//         </div>
//       </header>

//       <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
//     </div>
//   );
// }


// Topbar.jsx — FINAL FIXED (title + always-visible search)

import React, { useState } from "react";

export default function Topbar({ title = "Dashboard", onMenuClick }) {
  const [count] = useState(3);

  return (
    <header className="h-16 flex items-center px-3 md:px-6 border-b border-slate-200 bg-white gap-3">

      {/* MOBILE HAMBURGER */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-md hover:bg-slate-100"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
        </svg>
      </button>

      {/* TITLE */}
      <h1 className="text-[16px] md:text-[18px] font-semibold text-slate-900 whitespace-nowrap">
        {title}
      </h1>

      {/* SEARCH (VISIBLE ALWAYS) */}
      <div className="flex-1 max-w-xs md:max-w-md relative ml-2 md:ml-6">
        <input
          placeholder="Search campaigns, contacts..."
          className="
            w-full h-9 rounded-md border border-slate-200 bg-slate-50
            pl-9 pr-3 text-sm placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white
          "
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
          🔍
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex items-center gap-2 md:gap-3">

        {/* BELL */}
        <button className="relative p-2 rounded-md hover:bg-slate-100">
          🔔
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center font-bold border-2 border-white">
            {count}
          </span>
        </button>

        {/* HELP */}
        <button className="p-2 rounded-md hover:bg-slate-100 text-pink-500 text-lg font-bold">
          ?
        </button>

        {/* USER */}
        <div className="flex items-center gap-2 px-1 md:px-2 py-1 rounded-md hover:bg-slate-100 cursor-pointer">
          <div className="h-8 w-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            SA
          </div>
          <span className="hidden sm:block text-sm font-semibold text-slate-800">
            Subramanian
          </span>
        </div>

      </div>
    </header>
  );
}