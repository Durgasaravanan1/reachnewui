


// // TemplateEditorPage.jsx – Visual block editor (no raw HTML editing)
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//   DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
// } from '@dnd-kit/core';
// import {
//   arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// // ── Shared UI Components ─────────────────────────────────────────────────
// const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
//         <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
//         <p className="text-sm text-slate-600 mb-6">{message}</p>
//         <div className="flex gap-3">
//           <button onClick={onClose} className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">Cancel</button>
//           <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PreviewModal = ({ isOpen, onClose, htmlContent }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl">
//         <div className="flex justify-between items-center p-4 border-b border-slate-200">
//           <h3 className="text-lg font-bold text-slate-800">Template Preview</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
//           <iframe srcDoc={htmlContent} title="Preview" className="w-full h-full min-h-[500px] border-0 rounded-lg" />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Mock API (same) ──
// const MOCK_TEMPLATES = {
//   '1': { id: '1', templateName: 'Product Update', channel: 'email', category: 'Announcement', blocks: [] },
//   '2': { id: '2', templateName: 'Monthly Newsletter', channel: 'email', category: 'Promotional', blocks: [] },
//   '3': { id: '3', templateName: 'Onboarding Welcome', channel: 'email', category: 'Onboarding', blocks: [] },
// };

// const useTemplateDetail = (id) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setLoading] = useState(true);
//   useEffect(() => {
//     if (!id) { setLoading(false); return; }
//     const timer = setTimeout(() => { setData(MOCK_TEMPLATES[id] || null); setLoading(false); }, 300);
//     return () => clearTimeout(timer);
//   }, [id]);
//   return { data, isLoading };
// };

// const saveTemplate = (id, data) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (id && MOCK_TEMPLATES[id]) MOCK_TEMPLATES[id] = { ...MOCK_TEMPLATES[id], ...data };
//       else console.log('Saved (mock):', data);
//       resolve(true);
//     }, 800);
//   });
// };

// // ── Block Types with default visual props ──
// const BLOCK_TYPES = [
//   { label: 'Header', icon: '⬆️', defaultProps: { text: 'Your Header', tag: 'h1', align: 'center', color: '#1e293b', fontSize: '24px' } },
//   { label: 'Text Block', icon: '📝', defaultProps: { text: 'Lorem ipsum dolor sit amet.', align: 'left', color: '#334155', fontSize: '14px' } },
//   { label: 'Image', icon: '🖼️', defaultProps: { url: 'https://placehold.co/600x200', alt: 'Placeholder' } },
//   { label: 'Button', icon: '⚪', defaultProps: { label: 'Click me', url: '#', bgColor: '#6366f1', textColor: '#ffffff' } },
//   { label: 'Divider', icon: '➖', defaultProps: { color: '#e2e8f0', thickness: '1px' } },
//   { label: 'Two Columns', icon: '🔲', defaultProps: { left: 'Left column content', right: 'Right column content' } },
//   { label: 'Footer', icon: '🟡', defaultProps: { text: 'Footer text', color: '#94a3b8', fontSize: '12px' } },
// ];

// const MERGE_TAGS = ['{{first_name}}', '{{company}}', '{{email}}', '{{unsubscribe_url}}'];
// const CATEGORY_OPTIONS = ['Announcement', 'Promotional', 'Transactional', 'Re-engagement', 'Onboarding'];

// // ── Block Renderer (visual, no raw HTML) ──
// const BlockRenderer = ({ block, isSelected, onClick, onDelete, onChangeProps }) => {
//   const renderContent = () => {
//     switch (block.type) {
//       case 'Header':
//         const HeaderTag = block.props.tag || 'h1';
//         return <HeaderTag style={{ textAlign: block.props.align, color: block.props.color, fontSize: block.props.fontSize, margin: 0 }}>{block.props.text}</HeaderTag>;
//       case 'Text Block':
//         return <p style={{ textAlign: block.props.align, color: block.props.color, fontSize: block.props.fontSize, margin: 0 }}>{block.props.text}</p>;
//       case 'Image':
//         return <img src={block.props.url} alt={block.props.alt} style={{ width: '100%', borderRadius: '8px' }} />;
//       case 'Button':
//         return <a href={block.props.url} style={{ display: 'inline-block', backgroundColor: block.props.bgColor, color: block.props.textColor, padding: '8px 16px', borderRadius: '8px', textDecoration: 'none' }}>{block.props.label}</a>;
//       case 'Divider':
//         return <hr style={{ borderColor: block.props.color, borderWidth: block.props.thickness, margin: '16px 0' }} />;
//       case 'Two Columns':
//         return <div style={{ display: 'flex', gap: '16px' }}><div style={{ flex: 1 }}>{block.props.left}</div><div style={{ flex: 1 }}>{block.props.right}</div></div>;
//       case 'Footer':
//         return <footer style={{ textAlign: 'center', color: block.props.color, fontSize: block.props.fontSize }}>{block.props.text}</footer>;
//       default:
//         return <div>Unknown block</div>;
//     }
//   };

//   return (
//     <div
//       onClick={onClick}
//       className={`relative group border-2 rounded-lg p-3 mb-3 cursor-pointer transition-all ${
//         isSelected ? 'border-indigo-500 bg-indigo-50/20' : 'border-slate-200 hover:border-indigo-300 bg-white'
//       }`}
//     >
//       <div className="text-sm">{renderContent()}</div>
//       <button
//         onClick={(e) => { e.stopPropagation(); onDelete(); }}
//         className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1 text-xs transition"
//       >
//         🗑️
//       </button>
//       <div className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 opacity-0 group-hover:opacity-100 cursor-grab">
//         ⋮⋮
//       </div>
//     </div>
//   );
// };

// // Sortable wrapper
// const SortableBlock = ({ block, index, isSelected, onSelect, onDelete, onChangeProps }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });
//   const style = { transform: CSS.Transform.toString(transform), transition };
//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <BlockRenderer block={block} isSelected={isSelected} onClick={onSelect} onDelete={onDelete} onChangeProps={onChangeProps} />
//     </div>
//   );
// };

// // ── Main Editor ──
// export default function TemplateEditorPage() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEdit = !!id;
//   const { data: existing, isLoading } = useTemplateDetail(id);

//   const [formData, setFormData] = useState({ name: '', category: 'Announcement' });
//   const [blocks, setBlocks] = useState([]);
//   const [selectedBlockIndex, setSelectedBlockIndex] = useState(null);
//   const [viewMode, setViewMode] = useState('desktop');
//   const [saving, setSaving] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   useEffect(() => {
//     if (existing) {
//       setFormData({ name: existing.templateName || '', category: existing.category || 'Announcement' });
//       setBlocks(existing.blocks || []);
//     }
//   }, [existing]);

//   const addBlock = (typeTemplate) => {
//     const newBlock = {
//       id: Date.now(),
//       type: typeTemplate.label,
//       props: { ...typeTemplate.defaultProps },
//     };
//     setBlocks([...blocks, newBlock]);
//     setSelectedBlockIndex(blocks.length);
//   };

//   const updateBlockProps = (index, newProps) => {
//     const updated = [...blocks];
//     updated[index].props = { ...updated[index].props, ...newProps };
//     setBlocks(updated);
//   };

//   const deleteBlock = (index) => {
//     const updated = blocks.filter((_, i) => i !== index);
//     setBlocks(updated);
//     if (selectedBlockIndex === index) setSelectedBlockIndex(null);
//     else if (selectedBlockIndex > index) setSelectedBlockIndex(selectedBlockIndex - 1);
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       const oldIndex = blocks.findIndex(b => b.id === active.id);
//       const newIndex = blocks.findIndex(b => b.id === over.id);
//       setBlocks(arrayMove(blocks, oldIndex, newIndex));
//       if (selectedBlockIndex === oldIndex) setSelectedBlockIndex(newIndex);
//       else if (selectedBlockIndex === newIndex) setSelectedBlockIndex(oldIndex);
//     }
//   };

//   const insertMergeTag = (tag) => {
//     if (selectedBlockIndex !== null) {
//       const block = blocks[selectedBlockIndex];
//       if (block.type === 'Text Block' || block.type === 'Header' || block.type === 'Footer') {
//         updateBlockProps(selectedBlockIndex, { text: block.props.text + ' ' + tag });
//       } else {
//         alert('Merge tags can only be inserted into text blocks, headers, or footers.');
//       }
//     } else {
//       alert('Select a text block, header, or footer first.');
//     }
//   };

//   const handleSave = async () => {
//     if (!formData.name.trim()) {
//       alert('Template name is required');
//       return;
//     }
//     setSaving(true);
//     await saveTemplate(id, {
//       templateName: formData.name,
//       category: formData.category,
//       blocks: blocks,
//     });
//     setSaving(false);
//     navigate('/templates');
//   };

//   const buildPreviewHtml = () => {
//     const blocksHtml = blocks.map(block => {
//       switch (block.type) {
//         case 'Header':
//           return `<${block.props.tag || 'h1'} style="text-align:${block.props.align};color:${block.props.color};font-size:${block.props.fontSize}">${block.props.text}</${block.props.tag || 'h1'}>`;
//         case 'Text Block':
//           return `<p style="text-align:${block.props.align};color:${block.props.color};font-size:${block.props.fontSize}">${block.props.text}</p>`;
//         case 'Image':
//           return `<img src="${block.props.url}" alt="${block.props.alt}" style="width:100%;border-radius:8px">`;
//         case 'Button':
//           return `<a href="${block.props.url}" style="display:inline-block;background:${block.props.bgColor};color:${block.props.textColor};padding:8px 16px;border-radius:8px;text-decoration:none">${block.props.label}</a>`;
//         case 'Divider':
//           return `<hr style="border-color:${block.props.color};border-width:${block.props.thickness};margin:16px 0">`;
//         case 'Two Columns':
//           return `<div style="display:flex;gap:16px"><div style="flex:1">${block.props.left}</div><div style="flex:1">${block.props.right}</div></div>`;
//         case 'Footer':
//           return `<footer style="text-align:center;color:${block.props.color};font-size:${block.props.fontSize}">${block.props.text}</footer>`;
//         default:
//           return '';
//       }
//     }).join('\n');
//     return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:Arial,sans-serif;margin:0;padding:20px;background:#f1f5f9}.container{max-width:600px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;padding:20px}</style></head><body><div class="container">${blocksHtml}</div></body></html>`;
//   };

//   const canvasMaxW = viewMode === 'mobile' ? 380 : 560;

//   if (isEdit && isLoading) {
//     return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-3 border-slate-200 border-t-indigo-600 rounded-full animate-spin" /></div>;
//   }

//   const selectedBlock = selectedBlockIndex !== null ? blocks[selectedBlockIndex] : null;

//   return (
//     <div className="h-[calc(100vh-56px)] flex flex-col bg-slate-50">
//       {/* Toolbar */}
//       <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-white shrink-0">
//         <div>
//           <h1 className="text-xl font-extrabold text-slate-900">{isEdit ? (existing?.templateName || 'Template Editor') + ' Template' : 'New Template'}</h1>
//           <p className="text-xs text-slate-400">{isEdit ? `${existing?.channel === 'email' ? 'Email' : 'WhatsApp'} Template · Last edited 2 days ago` : 'New template'}</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="flex bg-slate-100 rounded-lg p-0.5">
//             {['Desktop', 'Mobile'].map((m) => (
//               <button key={m} onClick={() => setViewMode(m.toLowerCase())} className={`px-3 py-1.5 text-xs font-semibold rounded-md ${viewMode === m.toLowerCase() ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
//                 {m}
//               </button>
//             ))}
//           </div>
//           <button onClick={() => setShowPreview(true)} className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50">👁 Preview</button>
//           <button onClick={() => navigate('/templates')} className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50">Cancel</button>
//           <button onClick={handleSave} disabled={saving} className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-70">
//             {saving && <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />} 💾 Save
//           </button>
//         </div>
//       </div>

//       {/* Main area */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Left Palette */}
//         <aside className="w-48 border-r border-slate-200 bg-white p-3 overflow-y-auto shrink-0">
//           <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Content Blocks</p>
//           <div className="flex flex-col gap-1.5">
//             {BLOCK_TYPES.map((b) => (
//               <button key={b.label} onClick={() => addBlock(b)} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white hover:border-indigo-300 transition-all">
//                 <span className="text-sm">{b.icon}</span> {b.label}
//               </button>
//             ))}
//           </div>
//           <p className="text-[10px] font-bold text-slate-400 uppercase mt-4 mb-2">Merge Tags</p>
//           <div className="flex flex-col gap-1">
//             {MERGE_TAGS.map((tag) => (
//               <button key={tag} onClick={() => insertMergeTag(tag)} className="px-2.5 py-1.5 border border-slate-200 rounded-md text-[11px] font-mono text-cyan-700 bg-white hover:border-indigo-300 text-left">
//                 {tag}
//               </button>
//             ))}
//           </div>
//         </aside>

//         {/* Canvas */}
//         <main className="flex-1 bg-indigo-50 flex justify-start items-start p-6 overflow-y-auto">
//           <div className="w-full flex flex-col items-center gap-2" style={{ maxWidth: canvasMaxW + 48 }}>
//             <div className="text-slate-400 text-lg">▲</div>
//             <div className="bg-white rounded-xl shadow-sm p-4 w-full" style={{ maxWidth: canvasMaxW }}>
//               {blocks.length === 0 ? (
//                 <div className="text-center py-8 text-slate-400 text-sm">Click a block from the left to add content</div>
//               ) : (
//                 <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//                   <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
//                     {blocks.map((block, idx) => (
//                       <SortableBlock
//                         key={block.id}
//                         block={block}
//                         index={idx}
//                         isSelected={selectedBlockIndex === idx}
//                         onSelect={() => setSelectedBlockIndex(idx)}
//                         onDelete={() => deleteBlock(idx)}
//                       />
//                     ))}
//                   </SortableContext>
//                 </DndContext>
//               )}
//             </div>
//             <div className="text-slate-400 text-lg">▼</div>
//           </div>
//         </main>

//         {/* Right Properties Panel */}
//         <aside className="w-56 border-l border-slate-200 bg-white p-4 overflow-y-auto shrink-0">
//           <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">Template Settings</p>
//           <div className="flex flex-col gap-3">
//             <div>
//               <label className="text-sm font-semibold text-slate-700">Template Name</label>
//               <input value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Product Update" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm" />
//             </div>
//             <div>
//               <label className="text-sm font-semibold text-slate-700">Category</label>
//               <select value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm">
//                 {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
//               </select>
//             </div>
//           </div>
//           <hr className="my-4 border-slate-100" />
//           <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Block Properties</p>
//           {selectedBlock ? (
//             <div className="space-y-3">
//               {selectedBlock.type === 'Header' && (
//                 <>
//                   <div><label className="text-xs font-semibold">Text</label><input type="text" value={selectedBlock.props.text} onChange={e => updateBlockProps(selectedBlockIndex, { text: e.target.value })} className="w-full border rounded px-2 py-1 text-sm" /></div>
//                   <div><label className="text-xs font-semibold">Align</label><select value={selectedBlock.props.align} onChange={e => updateBlockProps(selectedBlockIndex, { align: e.target.value })} className="w-full border rounded px-2 py-1 text-sm"><option>left</option><option>center</option><option>right</option></select></div>
//                   <div><label className="text-xs font-semibold">Color</label><input type="color" value={selectedBlock.props.color} onChange={e => updateBlockProps(selectedBlockIndex, { color: e.target.value })} className="w-full h-8" /></div>
//                   <div><label className="text-xs font-semibold">Font Size</label><input type="text" value={selectedBlock.props.fontSize} onChange={e => updateBlockProps(selectedBlockIndex, { fontSize: e.target.value })} className="w-full border rounded px-2 py-1 text-sm" /></div>
//                 </>
//               )}
//               {selectedBlock.type === 'Text Block' && (
//                 <>
//                   <div><label className="text-xs font-semibold">Text</label><textarea rows={3} value={selectedBlock.props.text} onChange={e => updateBlockProps(selectedBlockIndex, { text: e.target.value })} className="w-full border rounded px-2 py-1 text-sm" /></div>
//                   <div><label className="text-xs font-semibold">Align</label><select value={selectedBlock.props.align} onChange={e => updateBlockProps(selectedBlockIndex, { align: e.target.value })} className="w-full border rounded px-2 py-1 text-sm"><option>left</option><option>center</option><option>right</option></select></div>
//                   <div><label className="text-xs font-semibold">Color</label><input type="color" value={selectedBlock.props.color} onChange={e => updateBlockProps(selectedBlockIndex, { color: e.target.value })} className="w-full h-8" /></div>
//                 </>
//               )}
//               {selectedBlock.type === 'Button' && (
//                 <>
//                   <div><label className="text-xs font-semibold">Label</label><input value={selectedBlock.props.label} onChange={e => updateBlockProps(selectedBlockIndex, { label: e.target.value })} className="w-full border rounded px-2 py-1 text-sm" /></div>
//                   <div><label className="text-xs font-semibold">URL</label><input value={selectedBlock.props.url} onChange={e => updateBlockProps(selectedBlockIndex, { url: e.target.value })} className="w-full border rounded px-2 py-1 text-sm" /></div>
//                   <div><label className="text-xs font-semibold">BG Color</label><input type="color" value={selectedBlock.props.bgColor} onChange={e => updateBlockProps(selectedBlockIndex, { bgColor: e.target.value })} className="w-full h-8" /></div>
//                 </>
//               )}
//               {selectedBlock.type === 'Image' && (
//                 <>
//                   <div><label className="text-xs font-semibold">Image URL</label><input value={selectedBlock.props.url} onChange={e => updateBlockProps(selectedBlockIndex, { url: e.target.value })} className="w-full border rounded px-2 py-1 text-sm" /></div>
//                   <div><label className="text-xs font-semibold">Alt text</label><input value={selectedBlock.props.alt} onChange={e => updateBlockProps(selectedBlockIndex, { alt: e.target.value })} className="w-full border rounded px-2 py-1 text-sm" /></div>
//                 </>
//               )}
//               <button onClick={() => setShowDeleteConfirm(true)} className="mt-2 w-full px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100">Delete Block</button>
//             </div>
//           ) : (
//             <p className="text-xs text-slate-400">Select a block to edit its properties.</p>
//           )}
//         </aside>
//       </div>

//       <ConfirmDialog isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} onConfirm={() => deleteBlock(selectedBlockIndex)} title="Delete Block" message="Are you sure?" />
//       <PreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} htmlContent={buildPreviewHtml()} />
//     </div>
//   );
// }


// // TemplateEditorPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';

// // ─── Block Definitions ────────────────────────────────────────────────────────
// const EMAIL_BLOCK_TYPES = [
//   { type: 'header',  icon: 'H',  label: 'Heading',    defaultProps: { text: 'Your Heading Here', align: 'center', color: '#1e293b', fontSize: '22px' } },
//   { type: 'text',    icon: '¶',  label: 'Paragraph',  defaultProps: { text: 'Write your content here. Use merge tags like {{first_name}} to personalise.', align: 'left', color: '#475569', fontSize: '14px' } },
//   { type: 'image',   icon: '⬜', label: 'Image',      defaultProps: { url: 'https://placehold.co/560x200/6366f1/ffffff?text=Your+Image', alt: 'Image' } },
//   { type: 'button',  icon: '▶',  label: 'Button',     defaultProps: { label: 'Click Here', url: '#', bgColor: '#4F46E5', textColor: '#ffffff' } },
//   { type: 'columns', icon: '⊞', label: '2 Columns',  defaultProps: { left: 'Left column content.', right: 'Right column content.' } },
//   { type: 'divider', icon: '—',  label: 'Divider',    defaultProps: { color: '#e2e8f0' } },
//   { type: 'footer',  icon: 'f',  label: 'Footer',     defaultProps: { text: '© 2025 Company · Unsubscribe | Privacy', color: '#94a3b8', fontSize: '12px' } },
// ];

// const WA_BLOCK_TYPES = [
//   { type: 'wa_header', icon: 'H',  label: 'Header',  defaultProps: { text: 'Message Header' } },
//   { type: 'wa_body',   icon: '¶',  label: 'Body',    defaultProps: { text: 'Hi {{first_name}}, your message body goes here.\n\nYou can use *bold* formatting.' } },
//   { type: 'wa_footer', icon: 'f',  label: 'Footer',  defaultProps: { text: 'Your company name' } },
//   { type: 'wa_button', icon: '▶',  label: 'Button',  defaultProps: { label: 'Tap Here', url: '#' } },
// ];

// const MERGE_TAGS = ['{{first_name}}', '{{company}}', '{{email}}', '{{order_id}}', '{{amount}}', '{{date}}', '{{unsubscribe_url}}'];
// const CATEGORY_OPTIONS = ['Promotional', 'Transactional', 'Re-engagement', 'Onboarding', 'Announcement'];

// // ─── Shared UI ────────────────────────────────────────────────────────────────
// const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
//       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
//         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
//         <p className="text-sm text-slate-500 mb-6">{message}</p>
//         <div className="flex gap-3">
//           <button onClick={onClose}   className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
//           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Email Block Renderer ─────────────────────────────────────────────────────
// const EmailBlockContent = ({ block }) => {
//   const p = block.props;
//   switch (block.type) {
//     case 'header':
//       return (
//         <div style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, fontWeight: 'bold', padding: '8px 0', fontFamily: 'Arial, sans-serif' }}>
//           {p.text}
//         </div>
//       );
//     case 'text':
//       return (
//         <p style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, lineHeight: 1.6, margin: '8px 0', fontFamily: 'Arial, sans-serif' }}>
//           {p.text}
//         </p>
//       );
//     case 'image':
//       return <img src={p.url} alt={p.alt} style={{ width: '100%', borderRadius: 6, display: 'block', margin: '8px 0' }} />;
//     case 'button':
//       return (
//         <div style={{ textAlign: 'center', margin: '12px 0' }}>
//           <a href={p.url} style={{ display: 'inline-block', background: p.bgColor, color: p.textColor, padding: '10px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 'bold', fontSize: 14, fontFamily: 'Arial, sans-serif' }}>
//             {p.label}
//           </a>
//         </div>
//       );
//     case 'columns':
//       return (
//         <div style={{ display: 'flex', gap: 12, margin: '8px 0' }}>
//           <div style={{ flex: 1, padding: 10, background: '#f8fafc', borderRadius: 6, fontSize: 13, color: '#475569', fontFamily: 'Arial, sans-serif' }}>{p.left}</div>
//           <div style={{ flex: 1, padding: 10, background: '#f8fafc', borderRadius: 6, fontSize: 13, color: '#475569', fontFamily: 'Arial, sans-serif' }}>{p.right}</div>
//         </div>
//       );
//     case 'divider':
//       return <hr style={{ border: 'none', borderTop: `1px solid ${p.color}`, margin: '12px 0' }} />;
//     case 'footer':
//       return (
//         <div style={{ textAlign: 'center', color: p.color, fontSize: p.fontSize, padding: '8px 0', marginTop: 4, fontFamily: 'Arial, sans-serif' }}>
//           {p.text}
//         </div>
//       );
//     default:
//       return <div className="text-xs text-slate-400">Unknown block</div>;
//   }
// };

// // ─── WhatsApp Block Renderer ──────────────────────────────────────────────────
// const WABlockContent = ({ block }) => {
//   const p = block.props;
//   const formatBody = (text) =>
//     text.replace(/\*(.*?)\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

//   switch (block.type) {
//     case 'wa_header':
//       return (
//         <div style={{ padding: '12px 14px 8px', borderBottom: '1px solid #e5e5e5', fontWeight: 'bold', fontSize: 14, color: '#111', fontFamily: 'Arial, sans-serif' }}>
//           {p.text}
//         </div>
//       );
//     case 'wa_body':
//       return (
//         <div
//           style={{ padding: '10px 14px', fontSize: 13, color: '#333', lineHeight: 1.55, fontFamily: 'Arial, sans-serif' }}
//           dangerouslySetInnerHTML={{ __html: formatBody(p.text) }}
//         />
//       );
//     case 'wa_footer':
//       return (
//         <div style={{ padding: '4px 14px 10px', fontSize: 11, color: '#888', fontFamily: 'Arial, sans-serif' }}>
//           {p.text}
//         </div>
//       );
//     case 'wa_button':
//       return (
//         <div style={{ borderTop: '1px solid #e5e5e5', padding: '10px 14px', textAlign: 'center', color: '#00a5f4', fontSize: 13, fontWeight: 500, fontFamily: 'Arial, sans-serif' }}>
//           {p.label}
//         </div>
//       );
//     default:
//       return null;
//   }
// };

// // ─── Draggable Block Wrapper ──────────────────────────────────────────────────
// const BlockWrapper = ({ block, index, isSelected, isEmail, onSelect, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
//   const Content = isEmail ? EmailBlockContent : WABlockContent;
//   return (
//     <div
//       onClick={() => onSelect(index)}
//       className={`relative group rounded-lg mb-2 border-2 transition-all cursor-pointer ${
//         isSelected
//           ? 'border-indigo-500 bg-indigo-50/30'
//           : 'border-transparent hover:border-indigo-200'
//       }`}
//     >
//       <Content block={block} />

//       {/* Hover controls */}
//       <div className="absolute top-1.5 right-1.5 hidden group-hover:flex items-center gap-1">
//         {!isFirst && (
//           <button onClick={e => { e.stopPropagation(); onMoveUp(index); }} className="w-5 h-5 bg-white border border-slate-200 rounded text-[10px] hover:bg-slate-100 flex items-center justify-center shadow-sm">↑</button>
//         )}
//         {!isLast && (
//           <button onClick={e => { e.stopPropagation(); onMoveDown(index); }} className="w-5 h-5 bg-white border border-slate-200 rounded text-[10px] hover:bg-slate-100 flex items-center justify-center shadow-sm">↓</button>
//         )}
//         <button onClick={e => { e.stopPropagation(); onDelete(index); }} className="w-5 h-5 bg-red-500 text-white rounded text-[10px] hover:bg-red-600 flex items-center justify-center shadow-sm">×</button>
//       </div>

//       {/* Drag handle */}
//       <div className="absolute left-1.5 top-1/2 -translate-y-1/2 hidden group-hover:flex text-slate-300 text-xs select-none">⋮⋮</div>
//     </div>
//   );
// };

// // ─── Email Preview Canvas ─────────────────────────────────────────────────────
// const EmailCanvas = ({ blocks, selectedBlock, onSelect, onDelete, onMoveUp, onMoveDown }) => (
//   <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200" style={{ fontFamily: 'Arial, sans-serif' }}>
//     {/* Fake email header */}
//     <div className="bg-indigo-600 px-5 py-2.5 flex justify-between items-center">
//       <span className="text-white text-xs">From: noreply@company.com</span>
//       <span className="text-indigo-200 text-xs">To: {'{{email}}'}</span>
//     </div>
//     <div className="p-5">
//       {blocks.length === 0 ? (
//         <div className="text-center py-10 text-slate-400 text-sm">
//           Click a block from the left panel to start building
//         </div>
//       ) : blocks.map((block, i) => (
//         <BlockWrapper
//           key={block.id}
//           block={block}
//           index={i}
//           isSelected={selectedBlock === i}
//           isEmail={true}
//           onSelect={onSelect}
//           onDelete={onDelete}
//           onMoveUp={onMoveUp}
//           onMoveDown={onMoveDown}
//           isFirst={i === 0}
//           isLast={i === blocks.length - 1}
//         />
//       ))}
//     </div>
//   </div>
// );

// // ─── WhatsApp Preview Canvas ──────────────────────────────────────────────────
// const WACanvas = ({ blocks, selectedBlock, onSelect, onDelete, onMoveUp, onMoveDown }) => (
//   <div className="max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-200">
//     {/* WA Header bar */}
//     <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
//       <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white font-bold text-sm">A</div>
//       <div>
//         <div className="text-white text-sm font-semibold">Acme Inc</div>
//         <div className="text-green-300 text-[11px]">Business Account</div>
//       </div>
//     </div>

//     {/* Chat area */}
//     <div className="bg-[#e5ddd5] p-3 min-h-[200px]">
//       {blocks.length === 0 ? (
//         <div className="text-center py-8 text-slate-500 text-sm">Add blocks to preview</div>
//       ) : (
//         <div className="bg-white rounded-[0_10px_10px_10px] overflow-hidden shadow">
//           {blocks.map((block, i) => (
//             <BlockWrapper
//               key={block.id}
//               block={block}
//               index={i}
//               isSelected={selectedBlock === i}
//               isEmail={false}
//               onSelect={onSelect}
//               onDelete={onDelete}
//               onMoveUp={onMoveUp}
//               onMoveDown={onMoveDown}
//               isFirst={i === 0}
//               isLast={i === blocks.length - 1}
//             />
//           ))}
//         </div>
//       )}
//       <div className="text-right text-[10px] text-slate-500 mt-1">10:30 AM ✓✓</div>
//     </div>

//     {/* WA input bar */}
//     <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2">
//       <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-slate-400">Message...</div>
//       <div className="w-9 h-9 bg-[#25d366] rounded-full flex items-center justify-center text-white text-sm">▶</div>
//     </div>
//   </div>
// );

// // ─── Preview Modal ────────────────────────────────────────────────────────────
// const PreviewModal = ({ isOpen, onClose, isWA, blocks }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//       <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
//         <div className="flex justify-between items-center px-5 py-4 border-b border-slate-200">
//           <span className="font-semibold text-slate-800">Template Preview</span>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">×</button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
//           {isWA
//             ? <WACanvas    blocks={blocks} selectedBlock={null} onSelect={() => {}} onDelete={() => {}} onMoveUp={() => {}} onMoveDown={() => {}} />
//             : <EmailCanvas blocks={blocks} selectedBlock={null} onSelect={() => {}} onDelete={() => {}} onMoveUp={() => {}} onMoveDown={() => {}} />
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Block Properties Panel ───────────────────────────────────────────────────
// const BlockPropsPanel = ({ block, index, onUpdate }) => {
//   if (!block) return (
//     <p className="text-xs text-slate-400">Click a block on the canvas to edit its properties.</p>
//   );

//   const Input  = ({ label, field, type = 'text', rows }) => (
//     <div className="mb-3">
//       <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
//       {rows
//         ? <textarea rows={rows} value={block.props[field] ?? ''} onChange={e => onUpdate(index, { [field]: e.target.value })} className="w-full border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-700 resize-none focus:outline-none focus:border-indigo-400" />
//         : type === 'color'
//           ? <input type="color" value={block.props[field] ?? '#000000'} onChange={e => onUpdate(index, { [field]: e.target.value })} className="w-full h-8 border border-slate-200 rounded-lg cursor-pointer" />
//           : <input type={type} value={block.props[field] ?? ''} onChange={e => onUpdate(index, { [field]: e.target.value })} className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400" />
//       }
//     </div>
//   );

//   const AlignSelect = () => (
//     <div className="mb-3">
//       <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Align</label>
//       <select value={block.props.align} onChange={e => onUpdate(index, { align: e.target.value })} className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400">
//         {['left', 'center', 'right'].map(a => <option key={a}>{a}</option>)}
//       </select>
//     </div>
//   );

//   switch (block.type) {
//     case 'header':
//       return <><Input label="Text" field="text" /><AlignSelect /><Input label="Color" field="color" type="color" /><Input label="Font Size" field="fontSize" /></>;
//     case 'text':
//       return <><Input label="Text" field="text" rows={4} /><AlignSelect /><Input label="Color" field="color" type="color" /></>;
//     case 'image':
//       return <><Input label="Image URL" field="url" /><Input label="Alt Text" field="alt" /></>;
//     case 'button':
//       return <><Input label="Label" field="label" /><Input label="URL" field="url" /><Input label="BG Color" field="bgColor" type="color" /><Input label="Text Color" field="textColor" type="color" /></>;
//     case 'columns':
//       return <><Input label="Left Column" field="left" rows={3} /><Input label="Right Column" field="right" rows={3} /></>;
//     case 'divider':
//       return <Input label="Color" field="color" type="color" />;
//     case 'footer':
//       return <><Input label="Text" field="text" rows={2} /><Input label="Color" field="color" type="color" /><Input label="Font Size" field="fontSize" /></>;
//     case 'wa_header':
//       return <Input label="Header Text" field="text" />;
//     case 'wa_body':
//       return (
//         <>
//           <Input label="Body Text" field="text" rows={6} />
//           <p className="text-[10px] text-slate-400 -mt-2 mb-2">Use *bold* for WhatsApp formatting</p>
//         </>
//       );
//     case 'wa_footer':
//       return <Input label="Footer Text" field="text" />;
//     case 'wa_button':
//       return <><Input label="Button Label" field="label" /><Input label="URL" field="url" /></>;
//     default:
//       return <p className="text-xs text-slate-400">No properties for this block.</p>;
//   }
// };

// // ─── Main Editor Page ─────────────────────────────────────────────────────────
// export default function TemplateEditorPage({ templateId, templates, setTemplates, onBack }) {
//   const existing  = templateId ? templates.find(t => t.id === templateId) : null;
//   const isWA      = existing?.channel === 'whatsapp';

//   const [formName,     setFormName]     = useState(existing?.name     ?? '');
//   const [formCat,      setFormCat]      = useState(existing?.category ?? 'Promotional');
//   const [blocks,       setBlocks]       = useState(() => JSON.parse(JSON.stringify(existing?.blocks ?? [])));
//   const [selectedIdx,  setSelectedIdx]  = useState(null);
//   const [viewMode,     setViewMode]     = useState('desktop');
//   const [showPreview,  setShowPreview]  = useState(false);
//   const [showDelBlock, setShowDelBlock] = useState(false);
//   const [saving,       setSaving]       = useState(false);

//   const blockTypes = isWA ? WA_BLOCK_TYPES : EMAIL_BLOCK_TYPES;

//   const addBlock = (bt) => {
//     const newBlock = { id: Date.now(), type: bt.type, props: { ...bt.defaultProps } };
//     setBlocks(prev => [...prev, newBlock]);
//     setSelectedIdx(blocks.length);
//   };

//   const deleteBlock = useCallback((i) => {
//     setBlocks(prev => prev.filter((_, idx) => idx !== i));
//     setSelectedIdx(prev => {
//       if (prev === i) return null;
//       if (prev > i)  return prev - 1;
//       return prev;
//     });
//     setShowDelBlock(false);
//   }, []);

//   const updateBlockProp = useCallback((i, newProps) => {
//     setBlocks(prev => {
//       const updated = [...prev];
//       updated[i] = { ...updated[i], props: { ...updated[i].props, ...newProps } };
//       return updated;
//     });
//   }, []);

//   const moveBlock = (i, dir) => {
//     const j = i + dir;
//     if (j < 0 || j >= blocks.length) return;
//     setBlocks(prev => {
//       const arr = [...prev];
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//       return arr;
//     });
//     setSelectedIdx(j);
//   };

//   const insertMergeTag = (tag) => {
//     if (selectedIdx === null) { alert('Select a text block first.'); return; }
//     const b = blocks[selectedIdx];
//     const textTypes = ['header', 'text', 'footer', 'wa_header', 'wa_body', 'wa_footer'];
//     if (!textTypes.includes(b.type)) { alert('Merge tags can only be inserted into text blocks.'); return; }
//     updateBlockProp(selectedIdx, { text: (b.props.text || '') + ' ' + tag });
//   };

//   const handleSave = async () => {
//     if (!formName.trim()) { alert('Template name is required.'); return; }
//     setSaving(true);
//     await new Promise(r => setTimeout(r, 600));
//     setTemplates(prev => {
//       if (templateId) {
//         return prev.map(t => t.id === templateId ? { ...t, name: formName, category: formCat, blocks: JSON.parse(JSON.stringify(blocks)) } : t);
//       }
//       return [...prev, {
//         id: Date.now().toString(), name: formName, channel: 'email',
//         category: formCat, usageCount: 0, waStatus: null,
//         blocks: JSON.parse(JSON.stringify(blocks)),
//       }];
//     });
//     setSaving(false);
//     onBack();
//   };

//   const canvasW = viewMode === 'mobile' ? 380 : 560;

//   return (
//     <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
//       {/* ── Toolbar ── */}
//       <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200 shrink-0 gap-4">
//         <div className="min-w-0">
//           <h1 className="text-base font-semibold text-slate-900 truncate">
//             {templateId ? (existing?.name || 'Editor') : 'New Template'}
//           </h1>
//           <p className="text-[11px] text-slate-400">
//             {isWA ? 'WhatsApp' : 'Email'} Template
//             {templateId && ' · Last edited 2 days ago'}
//           </p>
//         </div>

//         <div className="flex items-center gap-2 shrink-0">
//           {/* View mode toggle */}
//           <div className="flex bg-slate-100 rounded-lg p-0.5">
//             {['desktop', 'mobile'].map(m => (
//               <button
//                 key={m}
//                 onClick={() => setViewMode(m)}
//                 className={`px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all capitalize ${
//                   viewMode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
//                 }`}
//               >
//                 {m}
//               </button>
//             ))}
//           </div>
//           <button onClick={() => setShowPreview(true)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 text-xs font-semibold hover:bg-slate-50">
//             👁 Preview
//           </button>
//           <button onClick={onBack} className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 text-xs font-semibold hover:bg-slate-50">
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition-colors"
//           >
//             {saving && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
//             💾 Save
//           </button>
//         </div>
//       </header>

//       {/* ── Main ── */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* ── Left: Palette ── */}
//         <aside className="w-44 bg-white border-r border-slate-200 flex flex-col shrink-0">
//           <div className="p-3 flex-1 overflow-y-auto">
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Content Blocks</p>
//             <div className="flex flex-col gap-1.5 mb-5">
//               {blockTypes.map(bt => (
//                 <button
//                   key={bt.type}
//                   onClick={() => addBlock(bt)}
//                   className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50/50 transition-all text-left"
//                 >
//                   <span className="text-sm font-bold text-indigo-400 w-4 text-center">{bt.icon}</span>
//                   {bt.label}
//                 </button>
//               ))}
//             </div>

//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Merge Tags</p>
//             <div className="flex flex-col gap-1">
//               {MERGE_TAGS.map(tag => (
//                 <button
//                   key={tag}
//                   onClick={() => insertMergeTag(tag)}
//                   className="px-2.5 py-1.5 border border-slate-200 rounded-md text-[10px] font-mono text-cyan-700 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 text-left transition-all"
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* ── Centre: Canvas ── */}
//         <main className="flex-1 bg-indigo-50/60 overflow-y-auto p-6 flex flex-col items-center">
//           <div style={{ width: '100%', maxWidth: canvasW }} className="transition-all duration-200">
//             {isWA
//               ? <WACanvas    blocks={blocks} selectedBlock={selectedIdx} onSelect={setSelectedIdx} onDelete={deleteBlock} onMoveUp={i => moveBlock(i, -1)} onMoveDown={i => moveBlock(i, 1)} />
//               : <EmailCanvas blocks={blocks} selectedBlock={selectedIdx} onSelect={setSelectedIdx} onDelete={deleteBlock} onMoveUp={i => moveBlock(i, -1)} onMoveDown={i => moveBlock(i, 1)} />
//             }
//           </div>
//         </main>

//         {/* ── Right: Properties ── */}
//         <aside className="w-56 bg-white border-l border-slate-200 flex flex-col shrink-0">
//           <div className="p-4 flex-1 overflow-y-auto">
//             {/* Template settings */}
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Template Settings</p>
//             <div className="mb-3">
//               <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Name</label>
//               <input
//                 value={formName}
//                 onChange={e => setFormName(e.target.value)}
//                 placeholder="e.g. Product Update"
//                 className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Category</label>
//               <select
//                 value={formCat}
//                 onChange={e => setFormCat(e.target.value)}
//                 className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400"
//               >
//                 {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
//               </select>
//             </div>

//             <div className="border-t border-slate-100 my-3" />

//             {/* Block properties */}
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Block Properties</p>
//             <BlockPropsPanel
//               block={selectedIdx !== null ? blocks[selectedIdx] : null}
//               index={selectedIdx}
//               onUpdate={updateBlockProp}
//             />

//             {/* Delete block button */}
//             {selectedIdx !== null && (
//               <button
//                 onClick={() => setShowDelBlock(true)}
//                 className="mt-3 w-full py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors"
//               >
//                 Delete Block
//               </button>
//             )}
//           </div>
//         </aside>
//       </div>

//       {/* Modals */}
//       <PreviewModal
//         isOpen={showPreview}
//         onClose={() => setShowPreview(false)}
//         isWA={isWA}
//         blocks={blocks}
//       />
//       <ConfirmDialog
//         isOpen={showDelBlock}
//         onClose={() => setShowDelBlock(false)}
//         onConfirm={() => { deleteBlock(selectedIdx); setShowDelBlock(false); }}
//         title="Delete Block"
//         message="Are you sure you want to remove this block?"
//       />
//     </div>
//   );
// }




// TemplateEditorPage.jsx
// Props:
//   templateId  — string (edit existing) | null (new template)
//   templates   — array
//   setTemplates — setter
//   onBack(savedName?) — called after save or cancel

import React, { useState, useEffect, useCallback, useRef } from 'react';

// ─── Block Definitions ────────────────────────────────────────────────────────
const EMAIL_BLOCK_TYPES = [
  { type: 'header',  icon: '𝐇', label: 'Heading',   defaultProps: { text: 'Your Heading Here', align: 'center', color: '#0f172a', fontSize: '22px' } },
  { type: 'text',    icon: '¶', label: 'Paragraph',  defaultProps: { text: 'Write your content here. Use merge tags like {{first_name}} to personalise.', align: 'left', color: '#334155', fontSize: '14px' } },
  { type: 'image',   icon: '⬜',label: 'Image',      defaultProps: { url: 'https://placehold.co/560x200/6366f1/ffffff?text=Your+Image', alt: 'Image' } },
  { type: 'button',  icon: '▶', label: 'Button',     defaultProps: { label: 'Click Here', url: '#', bgColor: '#4f46e5', textColor: '#ffffff' } },
  { type: 'columns', icon: '⊞', label: '2 Columns',  defaultProps: { left: 'Left column content here.', right: 'Right column content here.' } },
  { type: 'divider', icon: '—', label: 'Divider',    defaultProps: { color: '#e2e8f0' } },
  { type: 'footer',  icon: 'f', label: 'Footer',     defaultProps: { text: '© 2025 Company · Unsubscribe | Privacy Policy', color: '#94a3b8', fontSize: '12px' } },
];

const WA_BLOCK_TYPES = [
  { type: 'wa_header', icon: '𝐇', label: 'Header', defaultProps: { text: 'Message Header' } },
  { type: 'wa_body',   icon: '¶', label: 'Body',   defaultProps: { text: 'Hi {{first_name}}, your message body goes here.\n\nYou can use *bold* formatting.' } },
  { type: 'wa_footer', icon: 'f', label: 'Footer', defaultProps: { text: 'Your company name' } },
  { type: 'wa_button', icon: '▶', label: 'Button', defaultProps: { label: 'Tap Here', url: '#' } },
];

const MERGE_TAGS = [
  '{{first_name}}', '{{last_name}}', '{{company}}', '{{email}}',
  '{{phone}}', '{{order_id}}', '{{amount}}', '{{date}}',
  '{{invoice_id}}', '{{product_name}}', '{{unsubscribe_url}}',
];

const CATEGORY_OPTIONS = ['Promotional', 'Transactional', 'Re-engagement', 'Onboarding', 'Announcement'];
const WA_STATUS_OPTIONS = [
  { value: null,       label: 'Not Submitted' },
  { value: 'pending',  label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose}   className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
};

// ─── Email Block Renderer ─────────────────────────────────────────────────────
const EmailBlockContent = ({ block }) => {
  const p = block.props;
  switch (block.type) {
    case 'header':
      return (
        <div style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, fontWeight: 'bold', padding: '8px 0', fontFamily: 'Arial, sans-serif', lineHeight: 1.3 }}>
          {p.text}
        </div>
      );
    case 'text':
      return (
        <p style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, lineHeight: 1.6, margin: '8px 0', fontFamily: 'Arial, sans-serif', whiteSpace: 'pre-line' }}>
          {p.text}
        </p>
      );
    case 'image':
      return (
        <div style={{ margin: '8px 0' }}>
          <img
            src={p.url}
            alt={p.alt}
            style={{ width: '100%', borderRadius: 6, display: 'block' }}
            onError={e => { e.target.src = 'https://placehold.co/560x200/e2e8f0/94a3b8?text=Image+Not+Found'; }}
          />
        </div>
      );
    case 'button':
      return (
        <div style={{ textAlign: 'center', margin: '14px 0' }}>
          <span style={{ display: 'inline-block', background: p.bgColor, color: p.textColor, padding: '11px 28px', borderRadius: 7, fontWeight: 'bold', fontSize: 14, fontFamily: 'Arial, sans-serif', cursor: 'default' }}>
            {p.label}
          </span>
        </div>
      );
    case 'columns':
      return (
        <div style={{ display: 'flex', gap: 12, margin: '8px 0' }}>
          <div style={{ flex: 1, padding: 12, background: '#f8fafc', borderRadius: 7, fontSize: 13, color: '#475569', fontFamily: 'Arial, sans-serif', lineHeight: 1.55, whiteSpace: 'pre-line', border: '1px solid #e2e8f0' }}>{p.left}</div>
          <div style={{ flex: 1, padding: 12, background: '#f8fafc', borderRadius: 7, fontSize: 13, color: '#475569', fontFamily: 'Arial, sans-serif', lineHeight: 1.55, whiteSpace: 'pre-line', border: '1px solid #e2e8f0' }}>{p.right}</div>
        </div>
      );
    case 'divider':
      return <hr style={{ border: 'none', borderTop: `1px solid ${p.color}`, margin: '14px 0' }} />;
    case 'footer':
      return (
        <div style={{ textAlign: 'center', color: p.color, fontSize: p.fontSize, padding: '10px 0', marginTop: 4, fontFamily: 'Arial, sans-serif', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
          {p.text}
        </div>
      );
    default:
      return <div className="text-xs text-slate-400 p-2">Unknown block type</div>;
  }
};

// ─── WhatsApp Block Renderer ──────────────────────────────────────────────────
const WABlockContent = ({ block }) => {
  const p = block.props;
  const formatBody = (text) =>
    text
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');

  switch (block.type) {
    case 'wa_header':
      return (
        <div style={{ padding: '12px 14px 8px', borderBottom: '1px solid #e5e5e5', fontWeight: 'bold', fontSize: 14, color: '#111', fontFamily: 'Arial, sans-serif' }}>
          {p.text}
        </div>
      );
    case 'wa_body':
      return (
        <div
          style={{ padding: '10px 14px', fontSize: 13, color: '#333', lineHeight: 1.6, fontFamily: 'Arial, sans-serif' }}
          dangerouslySetInnerHTML={{ __html: formatBody(p.text) }}
        />
      );
    case 'wa_footer':
      return (
        <div style={{ padding: '4px 14px 10px', fontSize: 11, color: '#888', fontFamily: 'Arial, sans-serif' }}>
          {p.text}
        </div>
      );
    case 'wa_button':
      return (
        <div style={{ borderTop: '1px solid #e5e5e5', padding: '10px 14px', textAlign: 'center', color: '#00a5f4', fontSize: 13, fontWeight: 600, fontFamily: 'Arial, sans-serif', cursor: 'default' }}>
          🔗 {p.label}
        </div>
      );
    default:
      return null;
  }
};

// ─── Block Wrapper (selection + controls) ─────────────────────────────────────
const BlockWrapper = ({ block, index, isSelected, isEmail, onSelect, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const Content = isEmail ? EmailBlockContent : WABlockContent;
  return (
    <div
      onClick={() => onSelect(index)}
      className={`relative group rounded-lg mb-2 border-2 transition-all cursor-pointer select-none ${
        isSelected
          ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/20'
          : 'border-transparent hover:border-indigo-200 hover:bg-indigo-50/10'
      }`}
    >
      <Content block={block} />

      {/* Hover controls */}
      <div className={`absolute top-1.5 right-1.5 flex items-center gap-1 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        {!isFirst && (
          <button
            onClick={e => { e.stopPropagation(); onMoveUp(index); }}
            className="w-6 h-6 bg-white border border-slate-200 rounded-md text-[11px] hover:bg-slate-100 flex items-center justify-center shadow-sm text-slate-600 font-bold"
          >↑</button>
        )}
        {!isLast && (
          <button
            onClick={e => { e.stopPropagation(); onMoveDown(index); }}
            className="w-6 h-6 bg-white border border-slate-200 rounded-md text-[11px] hover:bg-slate-100 flex items-center justify-center shadow-sm text-slate-600 font-bold"
          >↓</button>
        )}
        <button
          onClick={e => { e.stopPropagation(); onDelete(index); }}
          className="w-6 h-6 bg-red-500 text-white rounded-md text-[11px] hover:bg-red-600 flex items-center justify-center shadow-sm font-bold"
        >×</button>
      </div>

      {/* Drag handle */}
      <div className={`absolute left-1 top-1/2 -translate-y-1/2 text-slate-300 text-xs select-none transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        ⋮⋮
      </div>

      {/* Selected label */}
      {isSelected && (
        <div className="absolute top-1.5 left-6 text-[9px] font-bold text-indigo-400 uppercase tracking-wider">
          {block.type.replace('wa_', '')}
        </div>
      )}
    </div>
  );
};

// ─── Email Canvas ─────────────────────────────────────────────────────────────
const EmailCanvas = ({ blocks, selectedBlock, onSelect, onDelete, onMoveUp, onMoveDown }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow border border-slate-200" style={{ fontFamily: 'Arial, sans-serif' }}>
    <div className="bg-indigo-600 px-5 py-2.5 flex justify-between items-center">
      <span className="text-white text-xs font-medium">From: noreply@company.com</span>
      <span className="text-indigo-200 text-xs">To: {'{{email}}'}</span>
    </div>
    <div className="p-5">
      {blocks.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          <div className="text-3xl mb-2">✉️</div>
          <p className="font-medium">Your email canvas is empty</p>
          <p className="text-xs mt-1">Add blocks from the left panel to start building</p>
        </div>
      ) : blocks.map((block, i) => (
        <BlockWrapper
          key={block.id}
          block={block}
          index={i}
          isSelected={selectedBlock === i}
          isEmail={true}
          onSelect={onSelect}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          isFirst={i === 0}
          isLast={i === blocks.length - 1}
        />
      ))}
    </div>
  </div>
);

// ─── WhatsApp Canvas ──────────────────────────────────────────────────────────
const WACanvas = ({ blocks, selectedBlock, onSelect, onDelete, onMoveUp, onMoveDown }) => (
  <div className="max-w-[360px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
    {/* Status bar mock */}
    <div className="bg-slate-800 px-4 py-1 flex justify-between items-center">
      <span className="text-white text-[10px] font-semibold">9:41</span>
      <div className="flex gap-1">
        <span className="text-white text-[10px]">●●●</span>
      </div>
    </div>

    {/* WA Header */}
    <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white font-bold text-sm shrink-0">A</div>
      <div>
        <div className="text-white text-sm font-semibold">Acme Inc.</div>
        <div className="text-green-300 text-[11px]">Business Account · Online</div>
      </div>
    </div>

    {/* Chat area */}
    <div className="bg-[#e5ddd5] p-3 min-h-[240px]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23b2bec3\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
      {blocks.length === 0 ? (
        <div className="text-center py-10 text-slate-500 text-sm">
          <div className="text-2xl mb-2">💬</div>
          <p className="text-xs">Add blocks to preview</p>
        </div>
      ) : (
        <div className="bg-white rounded-[0_12px_12px_12px] overflow-hidden shadow-md max-w-[260px]">
          {blocks.map((block, i) => (
            <BlockWrapper
              key={block.id}
              block={block}
              index={i}
              isSelected={selectedBlock === i}
              isEmail={false}
              onSelect={onSelect}
              onDelete={onDelete}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              isFirst={i === 0}
              isLast={i === blocks.length - 1}
            />
          ))}
        </div>
      )}
      <div className="text-right text-[10px] text-slate-500 mt-2">10:30 AM ✓✓</div>
    </div>

    {/* Input bar */}
    <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2">
      <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-slate-400">Message...</div>
      <div className="w-9 h-9 bg-[#25d366] rounded-full flex items-center justify-center text-white text-sm shrink-0">▶</div>
    </div>
  </div>
);

// ─── Preview Modal ────────────────────────────────────────────────────────────
const PreviewModal = ({ isOpen, onClose, isWA, blocks, name }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-200 shrink-0">
          <div>
            <span className="font-semibold text-slate-800">Preview — </span>
            <span className="text-slate-500 text-sm">{name || 'Untitled Template'}</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg text-xl leading-none transition-colors">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {isWA
            ? <WACanvas blocks={blocks} selectedBlock={null} onSelect={() => {}} onDelete={() => {}} onMoveUp={() => {}} onMoveDown={() => {}} />
            : <EmailCanvas blocks={blocks} selectedBlock={null} onSelect={() => {}} onDelete={() => {}} onMoveUp={() => {}} onMoveDown={() => {}} />
          }
        </div>
      </div>
    </div>
  );
};

// ─── Block Properties Panel ───────────────────────────────────────────────────
const BlockPropsPanel = ({ block, index, onUpdate }) => {
  if (!block) return (
    <div className="text-center py-6">
      <div className="text-2xl mb-2">🖱</div>
      <p className="text-xs text-slate-400 leading-relaxed">Click any block on the canvas to edit its properties here.</p>
    </div>
  );

  const Field = ({ label, field, type = 'text', rows, placeholder }) => (
    <div className="mb-3">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</label>
      {rows
        ? (
          <textarea
            rows={rows}
            value={block.props[field] ?? ''}
            onChange={e => onUpdate(index, { [field]: e.target.value })}
            placeholder={placeholder}
            className="w-full border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-700 resize-none focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-colors font-mono"
          />
        )
        : type === 'color'
          ? (
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={block.props[field] ?? '#000000'}
                onChange={e => onUpdate(index, { [field]: e.target.value })}
                className="w-9 h-8 border border-slate-200 rounded-lg cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={block.props[field] ?? ''}
                onChange={e => onUpdate(index, { [field]: e.target.value })}
                className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 font-mono"
              />
            </div>
          )
          : (
            <input
              type={type}
              value={block.props[field] ?? ''}
              placeholder={placeholder}
              onChange={e => onUpdate(index, { [field]: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-colors"
            />
          )
      }
    </div>
  );

  const AlignField = () => (
    <div className="mb-3">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alignment</label>
      <div className="flex gap-1">
        {['left', 'center', 'right'].map(a => (
          <button
            key={a}
            onClick={() => onUpdate(index, { align: a })}
            className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors font-medium ${
              block.props.align === a
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
            }`}
          >
            {a === 'left' ? '⬅' : a === 'center' ? '⬛' : '➡'}
          </button>
        ))}
      </div>
    </div>
  );

  switch (block.type) {
    case 'header':
      return (
        <>
          <Field label="Heading Text" field="text" placeholder="Your heading here" />
          <AlignField />
          <Field label="Color" field="color" type="color" />
          <Field label="Font Size" field="fontSize" placeholder="22px" />
        </>
      );
    case 'text':
      return (
        <>
          <Field label="Paragraph Text" field="text" rows={5} placeholder="Enter paragraph text..." />
          <AlignField />
          <Field label="Color" field="color" type="color" />
          <Field label="Font Size" field="fontSize" placeholder="14px" />
        </>
      );
    case 'image':
      return (
        <>
          <Field label="Image URL" field="url" placeholder="https://..." />
          <Field label="Alt Text" field="alt" placeholder="Image description" />
          <p className="text-[10px] text-slate-400 mt-1">💡 Use placehold.co for placeholder images</p>
        </>
      );
    case 'button':
      return (
        <>
          <Field label="Button Label" field="label" placeholder="Click Here" />
          <Field label="Link URL" field="url" placeholder="https://..." />
          <Field label="Background Color" field="bgColor" type="color" />
          <Field label="Text Color" field="textColor" type="color" />
        </>
      );
    case 'columns':
      return (
        <>
          <Field label="Left Column" field="left" rows={4} placeholder="Left column content..." />
          <Field label="Right Column" field="right" rows={4} placeholder="Right column content..." />
        </>
      );
    case 'divider':
      return <Field label="Divider Color" field="color" type="color" />;
    case 'footer':
      return (
        <>
          <Field label="Footer Text" field="text" rows={3} placeholder="© 2025 Company · Unsubscribe" />
          <Field label="Color" field="color" type="color" />
          <Field label="Font Size" field="fontSize" placeholder="12px" />
        </>
      );
    case 'wa_header':
      return <Field label="Header Text" field="text" placeholder="Message header..." />;
    case 'wa_body':
      return (
        <>
          <Field label="Body Text" field="text" rows={8} placeholder="Hi {{first_name}}, ..." />
          <div className="bg-slate-50 rounded-lg p-2.5 mt-1">
            <p className="text-[10px] text-slate-500 font-semibold mb-1">WA Formatting</p>
            <p className="text-[10px] text-slate-400">*bold* → <strong>bold</strong></p>
            <p className="text-[10px] text-slate-400">_italic_ → <em>italic</em></p>
          </div>
        </>
      );
    case 'wa_footer':
      return <Field label="Footer Text" field="text" placeholder="Company · support@..." />;
    case 'wa_button':
      return (
        <>
          <Field label="Button Label" field="label" placeholder="Tap Here" />
          <Field label="Link URL" field="url" placeholder="https://..." />
        </>
      );
    default:
      return <p className="text-xs text-slate-400">No properties for this block.</p>;
  }
};

// ─── Main Editor ──────────────────────────────────────────────────────────────
export default function TemplateEditorPage({ templateId, templates, setTemplates, onBack }) {
  const existing = templateId ? templates.find(t => t.id === templateId) : null;
  const isWA     = existing?.channel === 'whatsapp';

  const [formName,     setFormName]     = useState(existing?.name     ?? '');
  const [formChannel,  setFormChannel]  = useState(existing?.channel  ?? 'email');
  const [formCat,      setFormCat]      = useState(existing?.category ?? 'Promotional');
  const [formWAStatus, setFormWAStatus] = useState(existing?.waStatus ?? null);
  const [blocks,       setBlocks]       = useState(() => JSON.parse(JSON.stringify(existing?.blocks ?? [])));
  const [selectedIdx,  setSelectedIdx]  = useState(null);
  const [viewMode,     setViewMode]     = useState('desktop');
  const [showPreview,  setShowPreview]  = useState(false);
  const [showDelBlock, setShowDelBlock] = useState(false);
  const [saving,       setSaving]       = useState(false);
  const [unsaved,      setUnsaved]      = useState(false);

  const isEditorWA = templateId ? isWA : formChannel === 'whatsapp';
  const blockTypes = isEditorWA ? WA_BLOCK_TYPES : EMAIL_BLOCK_TYPES;

  // Track unsaved changes
  useEffect(() => { setUnsaved(true); }, [blocks, formName, formCat, formWAStatus]);

  const addBlock = (bt) => {
    const newBlock = { id: Date.now(), type: bt.type, props: { ...bt.defaultProps } };
    setBlocks(prev => [...prev, newBlock]);
    setSelectedIdx(blocks.length);
  };

  const deleteBlock = useCallback((i) => {
    setBlocks(prev => prev.filter((_, idx) => idx !== i));
    setSelectedIdx(prev => {
      if (prev === i) return null;
      if (prev > i)  return prev - 1;
      return prev;
    });
    setShowDelBlock(false);
  }, []);

  const updateBlockProp = useCallback((i, newProps) => {
    setBlocks(prev => {
      const updated = [...prev];
      updated[i] = { ...updated[i], props: { ...updated[i].props, ...newProps } };
      return updated;
    });
  }, []);

  const moveBlock = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    setBlocks(prev => {
      const arr = [...prev];
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return arr;
    });
    setSelectedIdx(j);
  };

  const insertMergeTag = (tag) => {
    if (selectedIdx === null) { alert('Select a text block on the canvas first, then click a merge tag.'); return; }
    const b = blocks[selectedIdx];
    const textTypes = ['header', 'text', 'footer', 'wa_header', 'wa_body', 'wa_footer', 'columns'];
    if (!textTypes.includes(b.type)) { alert('Merge tags can only be added to text-based blocks.'); return; }
    const field = b.type === 'columns' ? 'left' : 'text';
    updateBlockProp(selectedIdx, { [field]: (b.props[field] || '') + tag });
  };

  const handleSave = async () => {
    if (!formName.trim()) { alert('Please enter a template name.'); return; }
    if (blocks.length === 0) { alert('Please add at least one block to the template.'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setTemplates(prev => {
      if (templateId) {
        return prev.map(t =>
          t.id === templateId
            ? { ...t, name: formName, category: formCat, waStatus: formWAStatus, blocks: JSON.parse(JSON.stringify(blocks)) }
            : t
        );
      }
      return [...prev, {
        id: `tpl-${Date.now()}`,
        name: formName,
        channel: formChannel,
        category: formCat,
        usageCount: 0,
        waStatus: isEditorWA ? formWAStatus : null,
        blocks: JSON.parse(JSON.stringify(blocks)),
      }];
    });
    setSaving(false);
    setUnsaved(false);
    onBack(formName);
  };

  const handleBack = () => {
    if (unsaved && blocks.length > 0) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to go back?')) return;
    }
    onBack();
  };

  const canvasMaxW = viewMode === 'mobile' ? 420 : 600;

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">

      {/* ── Top Toolbar ── */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 shrink-0 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleBack}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors shrink-0"
            title="Back to Library"
          >
            ← 
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
                {formName || 'Untitled Template'}
              </h1>
              {unsaved && <span className="text-[9px] font-bold text-amber-500 uppercase bg-amber-50 px-1.5 py-0.5 rounded-full shrink-0">Unsaved</span>}
            </div>
            <p className="text-[10px] text-slate-400">
              {isEditorWA ? '💬 WhatsApp' : '✉️ Email'} Template · {blocks.length} block{blocks.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* View toggle */}
          <div className="hidden sm:flex bg-slate-100 rounded-lg p-0.5">
            {['desktop', 'mobile'].map(m => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                  viewMode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {m === 'desktop' ? '🖥' : '📱'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowPreview(true)}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            👁 Preview
          </button>

          <button
            onClick={handleBack}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition-colors shadow-sm"
          >
            {saving && (
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            💾 Save
          </button>
        </div>
      </header>

      {/* ── Main Three-Column Layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Block Palette ── */}
        <aside className="w-44 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden">
          <div className="p-3 flex-1 overflow-y-auto">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Blocks</p>
            <div className="flex flex-col gap-1 mb-5">
              {blockTypes.map(bt => (
                <button
                  key={bt.type}
                  onClick={() => addBlock(bt)}
                  className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50/60 transition-all text-left group"
                >
                  <span className="text-sm font-bold text-indigo-300 w-4 text-center group-hover:text-indigo-500 transition-colors">{bt.icon}</span>
                  {bt.label}
                </button>
              ))}
            </div>

            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Merge Tags</p>
            <div className="flex flex-col gap-1">
              {MERGE_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => insertMergeTag(tag)}
                  className="px-2 py-1.5 border border-slate-200 rounded-md text-[10px] font-mono text-cyan-700 bg-white hover:border-indigo-300 hover:bg-indigo-50/60 text-left transition-all truncate"
                  title={`Insert ${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Centre: Canvas ── */}
        <main className="flex-1 bg-slate-100 overflow-y-auto p-6 flex flex-col items-center">
          <div style={{ width: '100%', maxWidth: canvasMaxW }} className="transition-all duration-300">
            {isEditorWA
              ? <WACanvas    blocks={blocks} selectedBlock={selectedIdx} onSelect={setSelectedIdx} onDelete={deleteBlock} onMoveUp={i => moveBlock(i, -1)} onMoveDown={i => moveBlock(i, 1)} />
              : <EmailCanvas blocks={blocks} selectedBlock={selectedIdx} onSelect={setSelectedIdx} onDelete={deleteBlock} onMoveUp={i => moveBlock(i, -1)} onMoveDown={i => moveBlock(i, 1)} />
            }
          </div>

          {/* Add block hint */}
          {blocks.length > 0 && (
            <p className="text-[11px] text-slate-400 mt-4 text-center">
              Click a block to select → Edit properties in the right panel
            </p>
          )}
        </main>

        {/* ── Right: Properties ── */}
        <aside className="w-60 bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 flex-1 overflow-y-auto">

            {/* Template Settings */}
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Template Settings</p>

            <div className="mb-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Template Name *</label>
              <input
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="e.g. Order Confirmation"
                className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-colors"
              />
            </div>

            {/* Channel — only for new templates */}
            {!templateId && (
              <div className="mb-3">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Channel</label>
                <div className="flex gap-2">
                  {['email', 'whatsapp'].map(ch => (
                    <button
                      key={ch}
                      onClick={() => { setFormChannel(ch); setBlocks([]); setSelectedIdx(null); }}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        formChannel === ch
                          ? ch === 'whatsapp' ? 'bg-green-600 text-white border-green-600' : 'bg-indigo-600 text-white border-indigo-600'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {ch === 'email' ? '✉️ Email' : '💬 WA'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</label>
              <select
                value={formCat}
                onChange={e => setFormCat(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 transition-colors"
              >
                {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* WA Status (only for WA templates) */}
            {isEditorWA && (
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Meta WA Status</label>
                <select
                  value={formWAStatus ?? ''}
                  onChange={e => setFormWAStatus(e.target.value || null)}
                  className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 transition-colors"
                >
                  {WA_STATUS_OPTIONS.map(o => (
                    <option key={o.value ?? 'null'} value={o.value ?? ''}>{o.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Block count badge */}
            <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg mb-4 border border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">Total Blocks</span>
              <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">{blocks.length}</span>
            </div>

            <div className="border-t border-slate-100 my-3" />

            {/* Block Properties */}
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Block Properties</p>
            <BlockPropsPanel
              block={selectedIdx !== null ? blocks[selectedIdx] : null}
              index={selectedIdx}
              onUpdate={updateBlockProp}
            />

            {selectedIdx !== null && (
              <button
                onClick={() => setShowDelBlock(true)}
                className="mt-3 w-full py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors border border-red-100"
              >
                🗑 Delete Block
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* ── Modals ── */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        isWA={isEditorWA}
        blocks={blocks}
        name={formName}
      />

      <ConfirmDialog
        isOpen={showDelBlock}
        onClose={() => setShowDelBlock(false)}
        onConfirm={() => { deleteBlock(selectedIdx); setShowDelBlock(false); }}
        title="Delete Block"
        message="Remove this block from the template? This cannot be undone."
      />
    </div>
  );
}
