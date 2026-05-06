

// // import React, { useState, useEffect, useCallback, useRef } from 'react';

// // // ─── Block Definitions ────────────────────────────────────────────────────────
// // const EMAIL_BLOCK_TYPES = [
// //   { type: 'header',  icon: '𝐇', label: 'Heading',   defaultProps: { text: 'Your Heading Here', align: 'center', color: '#0f172a', fontSize: '22px' } },
// //   { type: 'text',    icon: '¶', label: 'Paragraph',  defaultProps: { text: 'Write your content here. Use merge tags like {{first_name}} to personalise.', align: 'left', color: '#334155', fontSize: '14px' } },
// //   { type: 'image',   icon: '⬜',label: 'Image',      defaultProps: { url: 'https://placehold.co/560x200/6366f1/ffffff?text=Your+Image', alt: 'Image' } },
// //   { type: 'button',  icon: '▶', label: 'Button',     defaultProps: { label: 'Click Here', url: '#', bgColor: '#4f46e5', textColor: '#ffffff' } },
// //   { type: 'columns', icon: '⊞', label: '2 Columns',  defaultProps: { left: 'Left column content here.', right: 'Right column content here.' } },
// //   { type: 'divider', icon: '—', label: 'Divider',    defaultProps: { color: '#e2e8f0' } },
// //   { type: 'footer',  icon: 'f', label: 'Footer',     defaultProps: { text: '© 2025 Company · Unsubscribe | Privacy Policy', color: '#94a3b8', fontSize: '12px' } },
// // ];

// // const WA_BLOCK_TYPES = [
// //   { type: 'wa_header', icon: '𝐇', label: 'Header', defaultProps: { text: 'Message Header' } },
// //   { type: 'wa_body',   icon: '¶', label: 'Body',   defaultProps: { text: 'Hi {{first_name}}, your message body goes here.\n\nYou can use *bold* formatting.' } },
// //   { type: 'wa_footer', icon: 'f', label: 'Footer', defaultProps: { text: 'Your company name' } },
// //   { type: 'wa_button', icon: '▶', label: 'Button', defaultProps: { label: 'Tap Here', url: '#' } },
// // ];

// // const MERGE_TAGS = [
// //   '{{first_name}}', '{{last_name}}', '{{company}}', '{{email}}',
// //   '{{phone}}', '{{order_id}}', '{{amount}}', '{{date}}',
// //   '{{invoice_id}}', '{{product_name}}', '{{unsubscribe_url}}',
// // ];

// // const CATEGORY_OPTIONS = ['Promotional', 'Transactional', 'Re-engagement', 'Onboarding', 'Announcement'];
// // const WA_STATUS_OPTIONS = [
// //   { value: null,       label: 'Not Submitted' },
// //   { value: 'pending',  label: 'Pending Review' },
// //   { value: 'approved', label: 'Approved' },
// //   { value: 'rejected', label: 'Rejected' },
// // ];

// // // ─── Confirm Dialog ───────────────────────────────────────────────────────────
// // const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
// //   if (!isOpen) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// //       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
// //         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
// //         <p className="text-sm text-slate-500 mb-6">{message}</p>
// //         <div className="flex gap-3">
// //           <button onClick={onClose}   className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
// //           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ─── Email Block Renderer ─────────────────────────────────────────────────────
// // const EmailBlockContent = ({ block }) => {
// //   const p = block.props;
// //   switch (block.type) {
// //     case 'header':
// //       return (
// //         <div style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, fontWeight: 'bold', padding: '8px 0', fontFamily: 'Arial, sans-serif', lineHeight: 1.3 }}>
// //           {p.text}
// //         </div>
// //       );
// //     case 'text':
// //       return (
// //         <p style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, lineHeight: 1.6, margin: '8px 0', fontFamily: 'Arial, sans-serif', whiteSpace: 'pre-line' }}>
// //           {p.text}
// //         </p>
// //       );
// //     case 'image':
// //       return (
// //         <div style={{ margin: '8px 0' }}>
// //           <img
// //             src={p.url}
// //             alt={p.alt}
// //             style={{ width: '100%', borderRadius: 6, display: 'block' }}
// //             onError={e => { e.target.src = 'https://placehold.co/560x200/e2e8f0/94a3b8?text=Image+Not+Found'; }}
// //           />
// //         </div>
// //       );
// //     case 'button':
// //       return (
// //         <div style={{ textAlign: 'center', margin: '14px 0' }}>
// //           <span style={{ display: 'inline-block', background: p.bgColor, color: p.textColor, padding: '11px 28px', borderRadius: 7, fontWeight: 'bold', fontSize: 14, fontFamily: 'Arial, sans-serif', cursor: 'default' }}>
// //             {p.label}
// //           </span>
// //         </div>
// //       );
// //     case 'columns':
// //       return (
// //         <div style={{ display: 'flex', gap: 12, margin: '8px 0' }}>
// //           <div style={{ flex: 1, padding: 12, background: '#f8fafc', borderRadius: 7, fontSize: 13, color: '#475569', fontFamily: 'Arial, sans-serif', lineHeight: 1.55, whiteSpace: 'pre-line', border: '1px solid #e2e8f0' }}>{p.left}</div>
// //           <div style={{ flex: 1, padding: 12, background: '#f8fafc', borderRadius: 7, fontSize: 13, color: '#475569', fontFamily: 'Arial, sans-serif', lineHeight: 1.55, whiteSpace: 'pre-line', border: '1px solid #e2e8f0' }}>{p.right}</div>
// //         </div>
// //       );
// //     case 'divider':
// //       return <hr style={{ border: 'none', borderTop: `1px solid ${p.color}`, margin: '14px 0' }} />;
// //     case 'footer':
// //       return (
// //         <div style={{ textAlign: 'center', color: p.color, fontSize: p.fontSize, padding: '10px 0', marginTop: 4, fontFamily: 'Arial, sans-serif', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
// //           {p.text}
// //         </div>
// //       );
// //     default:
// //       return <div className="text-xs text-slate-400 p-2">Unknown block type</div>;
// //   }
// // };

// // // ─── WhatsApp Block Renderer ──────────────────────────────────────────────────
// // const WABlockContent = ({ block }) => {
// //   const p = block.props;
// //   const formatBody = (text) =>
// //     text
// //       .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
// //       .replace(/_(.*?)_/g, '<em>$1</em>')
// //       .replace(/\n/g, '<br/>');

// //   switch (block.type) {
// //     case 'wa_header':
// //       return (
// //         <div style={{ padding: '12px 14px 8px', borderBottom: '1px solid #e5e5e5', fontWeight: 'bold', fontSize: 14, color: '#111', fontFamily: 'Arial, sans-serif' }}>
// //           {p.text}
// //         </div>
// //       );
// //     case 'wa_body':
// //       return (
// //         <div
// //           style={{ padding: '10px 14px', fontSize: 13, color: '#333', lineHeight: 1.6, fontFamily: 'Arial, sans-serif' }}
// //           dangerouslySetInnerHTML={{ __html: formatBody(p.text) }}
// //         />
// //       );
// //     case 'wa_footer':
// //       return (
// //         <div style={{ padding: '4px 14px 10px', fontSize: 11, color: '#888', fontFamily: 'Arial, sans-serif' }}>
// //           {p.text}
// //         </div>
// //       );
// //     case 'wa_button':
// //       return (
// //         <div style={{ borderTop: '1px solid #e5e5e5', padding: '10px 14px', textAlign: 'center', color: '#00a5f4', fontSize: 13, fontWeight: 600, fontFamily: 'Arial, sans-serif', cursor: 'default' }}>
// //           🔗 {p.label}
// //         </div>
// //       );
// //     default:
// //       return null;
// //   }
// // };

// // // ─── Block Wrapper (selection + controls) ─────────────────────────────────────
// // const BlockWrapper = ({ block, index, isSelected, isEmail, onSelect, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
// //   const Content = isEmail ? EmailBlockContent : WABlockContent;
// //   return (
// //     <div
// //       onClick={() => onSelect(index)}
// //       className={`relative group rounded-lg mb-2 border-2 transition-all cursor-pointer select-none ${
// //         isSelected
// //           ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/20'
// //           : 'border-transparent hover:border-indigo-200 hover:bg-indigo-50/10'
// //       }`}
// //     >
// //       <Content block={block} />

// //       {/* Hover controls */}
// //       <div className={`absolute top-1.5 right-1.5 flex items-center gap-1 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
// //         {!isFirst && (
// //           <button
// //             onClick={e => { e.stopPropagation(); onMoveUp(index); }}
// //             className="w-6 h-6 bg-white border border-slate-200 rounded-md text-[11px] hover:bg-slate-100 flex items-center justify-center shadow-sm text-slate-600 font-bold"
// //           >↑</button>
// //         )}
// //         {!isLast && (
// //           <button
// //             onClick={e => { e.stopPropagation(); onMoveDown(index); }}
// //             className="w-6 h-6 bg-white border border-slate-200 rounded-md text-[11px] hover:bg-slate-100 flex items-center justify-center shadow-sm text-slate-600 font-bold"
// //           >↓</button>
// //         )}
// //         <button
// //           onClick={e => { e.stopPropagation(); onDelete(index); }}
// //           className="w-6 h-6 bg-red-500 text-white rounded-md text-[11px] hover:bg-red-600 flex items-center justify-center shadow-sm font-bold"
// //         >×</button>
// //       </div>

// //       {/* Drag handle */}
// //       <div className={`absolute left-1 top-1/2 -translate-y-1/2 text-slate-300 text-xs select-none transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
// //         ⋮⋮
// //       </div>

// //       {/* Selected label */}
// //       {isSelected && (
// //         <div className="absolute top-1.5 left-6 text-[9px] font-bold text-indigo-400 uppercase tracking-wider">
// //           {block.type.replace('wa_', '')}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // ─── Email Canvas ─────────────────────────────────────────────────────────────
// // const EmailCanvas = ({ blocks, selectedBlock, onSelect, onDelete, onMoveUp, onMoveDown }) => (
// //   <div className="bg-white rounded-xl overflow-hidden shadow border border-slate-200" style={{ fontFamily: 'Arial, sans-serif' }}>
// //     <div className="bg-indigo-600 px-5 py-2.5 flex justify-between items-center">
// //       <span className="text-white text-xs font-medium">From: noreply@company.com</span>
// //       <span className="text-indigo-200 text-xs">To: {'{{email}}'}</span>
// //     </div>
// //     <div className="p-5">
// //       {blocks.length === 0 ? (
// //         <div className="text-center py-12 text-slate-400 text-sm">
// //           <div className="text-3xl mb-2">✉️</div>
// //           <p className="font-medium">Your email canvas is empty</p>
// //           <p className="text-xs mt-1">Add blocks from the left panel to start building</p>
// //         </div>
// //       ) : blocks.map((block, i) => (
// //         <BlockWrapper
// //           key={block.id}
// //           block={block}
// //           index={i}
// //           isSelected={selectedBlock === i}
// //           isEmail={true}
// //           onSelect={onSelect}
// //           onDelete={onDelete}
// //           onMoveUp={onMoveUp}
// //           onMoveDown={onMoveDown}
// //           isFirst={i === 0}
// //           isLast={i === blocks.length - 1}
// //         />
// //       ))}
// //     </div>
// //   </div>
// // );

// // // ─── WhatsApp Canvas ──────────────────────────────────────────────────────────
// // const WACanvas = ({ blocks, selectedBlock, onSelect, onDelete, onMoveUp, onMoveDown }) => (
// //   <div className="max-w-[360px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
// //     {/* Status bar mock */}
// //     <div className="bg-slate-800 px-4 py-1 flex justify-between items-center">
// //       <span className="text-white text-[10px] font-semibold">9:41</span>
// //       <div className="flex gap-1">
// //         <span className="text-white text-[10px]">●●●</span>
// //       </div>
// //     </div>

// //     {/* WA Header */}
// //     <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
// //       <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white font-bold text-sm shrink-0">A</div>
// //       <div>
// //         <div className="text-white text-sm font-semibold">Acme Inc.</div>
// //         <div className="text-green-300 text-[11px]">Business Account · Online</div>
// //       </div>
// //     </div>

// //     {/* Chat area */}
// //     <div className="bg-[#e5ddd5] p-3 min-h-[240px]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23b2bec3\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
// //       {blocks.length === 0 ? (
// //         <div className="text-center py-10 text-slate-500 text-sm">
// //           <div className="text-2xl mb-2">💬</div>
// //           <p className="text-xs">Add blocks to preview</p>
// //         </div>
// //       ) : (
// //         <div className="bg-white rounded-[0_12px_12px_12px] overflow-hidden shadow-md max-w-[260px]">
// //           {blocks.map((block, i) => (
// //             <BlockWrapper
// //               key={block.id}
// //               block={block}
// //               index={i}
// //               isSelected={selectedBlock === i}
// //               isEmail={false}
// //               onSelect={onSelect}
// //               onDelete={onDelete}
// //               onMoveUp={onMoveUp}
// //               onMoveDown={onMoveDown}
// //               isFirst={i === 0}
// //               isLast={i === blocks.length - 1}
// //             />
// //           ))}
// //         </div>
// //       )}
// //       <div className="text-right text-[10px] text-slate-500 mt-2">10:30 AM ✓✓</div>
// //     </div>

// //     {/* Input bar */}
// //     <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2">
// //       <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-slate-400">Message...</div>
// //       <div className="w-9 h-9 bg-[#25d366] rounded-full flex items-center justify-center text-white text-sm shrink-0">▶</div>
// //     </div>
// //   </div>
// // );

// // // ─── Preview Modal ────────────────────────────────────────────────────────────
// // const PreviewModal = ({ isOpen, onClose, isWA, blocks, name }) => {
// //   if (!isOpen) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
// //       <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl">
// //         <div className="flex justify-between items-center px-5 py-4 border-b border-slate-200 shrink-0">
// //           <div>
// //             <span className="font-semibold text-slate-800">Preview — </span>
// //             <span className="text-slate-500 text-sm">{name || 'Untitled Template'}</span>
// //           </div>
// //           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg text-xl leading-none transition-colors">×</button>
// //         </div>
// //         <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
// //           {isWA
// //             ? <WACanvas blocks={blocks} selectedBlock={null} onSelect={() => {}} onDelete={() => {}} onMoveUp={() => {}} onMoveDown={() => {}} />
// //             : <EmailCanvas blocks={blocks} selectedBlock={null} onSelect={() => {}} onDelete={() => {}} onMoveUp={() => {}} onMoveDown={() => {}} />
// //           }
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ─── Block Properties Panel ───────────────────────────────────────────────────
// // const BlockPropsPanel = ({ block, index, onUpdate }) => {
// //   if (!block) return (
// //     <div className="text-center py-6">
// //       <div className="text-2xl mb-2">🖱</div>
// //       <p className="text-xs text-slate-400 leading-relaxed">Click any block on the canvas to edit its properties here.</p>
// //     </div>
// //   );

// //   const Field = ({ label, field, type = 'text', rows, placeholder }) => (
// //     <div className="mb-3">
// //       <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</label>
// //       {rows
// //         ? (
// //           <textarea
// //             rows={rows}
// //             value={block.props[field] ?? ''}
// //             onChange={e => onUpdate(index, { [field]: e.target.value })}
// //             placeholder={placeholder}
// //             className="w-full border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-700 resize-none focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-colors font-mono"
// //           />
// //         )
// //         : type === 'color'
// //           ? (
// //             <div className="flex items-center gap-2">
// //               <input
// //                 type="color"
// //                 value={block.props[field] ?? '#000000'}
// //                 onChange={e => onUpdate(index, { [field]: e.target.value })}
// //                 className="w-9 h-8 border border-slate-200 rounded-lg cursor-pointer p-0.5"
// //               />
// //               <input
// //                 type="text"
// //                 value={block.props[field] ?? ''}
// //                 onChange={e => onUpdate(index, { [field]: e.target.value })}
// //                 className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 font-mono"
// //               />
// //             </div>
// //           )
// //           : (
// //             <input
// //               type={type}
// //               value={block.props[field] ?? ''}
// //               placeholder={placeholder}
// //               onChange={e => onUpdate(index, { [field]: e.target.value })}
// //               className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-colors"
// //             />
// //           )
// //       }
// //     </div>
// //   );

// //   const AlignField = () => (
// //     <div className="mb-3">
// //       <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alignment</label>
// //       <div className="flex gap-1">
// //         {['left', 'center', 'right'].map(a => (
// //           <button
// //             key={a}
// //             onClick={() => onUpdate(index, { align: a })}
// //             className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors font-medium ${
// //               block.props.align === a
// //                 ? 'bg-indigo-600 text-white border-indigo-600'
// //                 : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
// //             }`}
// //           >
// //             {a === 'left' ? '⬅' : a === 'center' ? '⬛' : '➡'}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );

// //   switch (block.type) {
// //     case 'header':
// //       return (
// //         <>
// //           <Field label="Heading Text" field="text" placeholder="Your heading here" />
// //           <AlignField />
// //           <Field label="Color" field="color" type="color" />
// //           <Field label="Font Size" field="fontSize" placeholder="22px" />
// //         </>
// //       );
// //     case 'text':
// //       return (
// //         <>
// //           <Field label="Paragraph Text" field="text" rows={5} placeholder="Enter paragraph text..." />
// //           <AlignField />
// //           <Field label="Color" field="color" type="color" />
// //           <Field label="Font Size" field="fontSize" placeholder="14px" />
// //         </>
// //       );
// //     case 'image':
// //       return (
// //         <>
// //           <Field label="Image URL" field="url" placeholder="https://..." />
// //           <Field label="Alt Text" field="alt" placeholder="Image description" />
// //           <p className="text-[10px] text-slate-400 mt-1">💡 Use placehold.co for placeholder images</p>
// //         </>
// //       );
// //     case 'button':
// //       return (
// //         <>
// //           <Field label="Button Label" field="label" placeholder="Click Here" />
// //           <Field label="Link URL" field="url" placeholder="https://..." />
// //           <Field label="Background Color" field="bgColor" type="color" />
// //           <Field label="Text Color" field="textColor" type="color" />
// //         </>
// //       );
// //     case 'columns':
// //       return (
// //         <>
// //           <Field label="Left Column" field="left" rows={4} placeholder="Left column content..." />
// //           <Field label="Right Column" field="right" rows={4} placeholder="Right column content..." />
// //         </>
// //       );
// //     case 'divider':
// //       return <Field label="Divider Color" field="color" type="color" />;
// //     case 'footer':
// //       return (
// //         <>
// //           <Field label="Footer Text" field="text" rows={3} placeholder="© 2025 Company · Unsubscribe" />
// //           <Field label="Color" field="color" type="color" />
// //           <Field label="Font Size" field="fontSize" placeholder="12px" />
// //         </>
// //       );
// //     case 'wa_header':
// //       return <Field label="Header Text" field="text" placeholder="Message header..." />;
// //     case 'wa_body':
// //       return (
// //         <>
// //           <Field label="Body Text" field="text" rows={8} placeholder="Hi {{first_name}}, ..." />
// //           <div className="bg-slate-50 rounded-lg p-2.5 mt-1">
// //             <p className="text-[10px] text-slate-500 font-semibold mb-1">WA Formatting</p>
// //             <p className="text-[10px] text-slate-400">*bold* → <strong>bold</strong></p>
// //             <p className="text-[10px] text-slate-400">_italic_ → <em>italic</em></p>
// //           </div>
// //         </>
// //       );
// //     case 'wa_footer':
// //       return <Field label="Footer Text" field="text" placeholder="Company · support@..." />;
// //     case 'wa_button':
// //       return (
// //         <>
// //           <Field label="Button Label" field="label" placeholder="Tap Here" />
// //           <Field label="Link URL" field="url" placeholder="https://..." />
// //         </>
// //       );
// //     default:
// //       return <p className="text-xs text-slate-400">No properties for this block.</p>;
// //   }
// // };

// // // ─── Main Editor ──────────────────────────────────────────────────────────────
// // export default function TemplateEditorPage({ templateId, templates, setTemplates, onBack }) {
// //   const existing = templateId ? templates.find(t => t.id === templateId) : null;
// //   const isWA     = existing?.channel === 'whatsapp';

// //   const [formName,     setFormName]     = useState(existing?.name     ?? '');
// //   const [formChannel,  setFormChannel]  = useState(existing?.channel  ?? 'email');
// //   const [formCat,      setFormCat]      = useState(existing?.category ?? 'Promotional');
// //   const [formWAStatus, setFormWAStatus] = useState(existing?.waStatus ?? null);
// //   const [blocks,       setBlocks]       = useState(() => JSON.parse(JSON.stringify(existing?.blocks ?? [])));
// //   const [selectedIdx,  setSelectedIdx]  = useState(null);
// //   const [viewMode,     setViewMode]     = useState('desktop');
// //   const [showPreview,  setShowPreview]  = useState(false);
// //   const [showDelBlock, setShowDelBlock] = useState(false);
// //   const [saving,       setSaving]       = useState(false);
// //   const [unsaved,      setUnsaved]      = useState(false);

// //   const isEditorWA = templateId ? isWA : formChannel === 'whatsapp';
// //   const blockTypes = isEditorWA ? WA_BLOCK_TYPES : EMAIL_BLOCK_TYPES;

// //   // Track unsaved changes
// //   useEffect(() => { setUnsaved(true); }, [blocks, formName, formCat, formWAStatus]);

// //   const addBlock = (bt) => {
// //     const newBlock = { id: Date.now(), type: bt.type, props: { ...bt.defaultProps } };
// //     setBlocks(prev => [...prev, newBlock]);
// //     setSelectedIdx(blocks.length);
// //   };

// //   const deleteBlock = useCallback((i) => {
// //     setBlocks(prev => prev.filter((_, idx) => idx !== i));
// //     setSelectedIdx(prev => {
// //       if (prev === i) return null;
// //       if (prev > i)  return prev - 1;
// //       return prev;
// //     });
// //     setShowDelBlock(false);
// //   }, []);

// //   const updateBlockProp = useCallback((i, newProps) => {
// //     setBlocks(prev => {
// //       const updated = [...prev];
// //       updated[i] = { ...updated[i], props: { ...updated[i].props, ...newProps } };
// //       return updated;
// //     });
// //   }, []);

// //   const moveBlock = (i, dir) => {
// //     const j = i + dir;
// //     if (j < 0 || j >= blocks.length) return;
// //     setBlocks(prev => {
// //       const arr = [...prev];
// //       [arr[i], arr[j]] = [arr[j], arr[i]];
// //       return arr;
// //     });
// //     setSelectedIdx(j);
// //   };

// //   const insertMergeTag = (tag) => {
// //     if (selectedIdx === null) { alert('Select a text block on the canvas first, then click a merge tag.'); return; }
// //     const b = blocks[selectedIdx];
// //     const textTypes = ['header', 'text', 'footer', 'wa_header', 'wa_body', 'wa_footer', 'columns'];
// //     if (!textTypes.includes(b.type)) { alert('Merge tags can only be added to text-based blocks.'); return; }
// //     const field = b.type === 'columns' ? 'left' : 'text';
// //     updateBlockProp(selectedIdx, { [field]: (b.props[field] || '') + tag });
// //   };

// //   const handleSave = async () => {
// //     if (!formName.trim()) { alert('Please enter a template name.'); return; }
// //     if (blocks.length === 0) { alert('Please add at least one block to the template.'); return; }
// //     setSaving(true);
// //     await new Promise(r => setTimeout(r, 700));
// //     setTemplates(prev => {
// //       if (templateId) {
// //         return prev.map(t =>
// //           t.id === templateId
// //             ? { ...t, name: formName, category: formCat, waStatus: formWAStatus, blocks: JSON.parse(JSON.stringify(blocks)) }
// //             : t
// //         );
// //       }
// //       return [...prev, {
// //         id: `tpl-${Date.now()}`,
// //         name: formName,
// //         channel: formChannel,
// //         category: formCat,
// //         usageCount: 0,
// //         waStatus: isEditorWA ? formWAStatus : null,
// //         blocks: JSON.parse(JSON.stringify(blocks)),
// //       }];
// //     });
// //     setSaving(false);
// //     setUnsaved(false);
// //     onBack(formName);
// //   };

// //   const handleBack = () => {
// //     if (unsaved && blocks.length > 0) {
// //       if (!window.confirm('You have unsaved changes. Are you sure you want to go back?')) return;
// //     }
// //     onBack();
// //   };

// //   const canvasMaxW = viewMode === 'mobile' ? 420 : 600;

// //   return (
// //     <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">

// //       {/* ── Top Toolbar ── */}
// //       <header className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 shrink-0 gap-3">
// //         <div className="flex items-center gap-3 min-w-0">
// //           <button
// //             onClick={handleBack}
// //             className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors shrink-0"
// //             title="Back to Library"
// //           >
// //             ← 
// //           </button>
// //           <div className="min-w-0">
// //             <div className="flex items-center gap-2">
// //               <h1 className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
// //                 {formName || 'Untitled Template'}
// //               </h1>
// //               {unsaved && <span className="text-[9px] font-bold text-amber-500 uppercase bg-amber-50 px-1.5 py-0.5 rounded-full shrink-0">Unsaved</span>}
// //             </div>
// //             <p className="text-[10px] text-slate-400">
// //               {isEditorWA ? '💬 WhatsApp' : '✉️ Email'} Template · {blocks.length} block{blocks.length !== 1 ? 's' : ''}
// //             </p>
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-2 shrink-0">
// //           {/* View toggle */}
// //           <div className="hidden sm:flex bg-slate-100 rounded-lg p-0.5">
// //             {['desktop', 'mobile'].map(m => (
// //               <button
// //                 key={m}
// //                 onClick={() => setViewMode(m)}
// //                 className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
// //                   viewMode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
// //                 }`}
// //               >
// //                 {m === 'desktop' ? '🖥' : '📱'}
// //               </button>
// //             ))}
// //           </div>

// //           <button
// //             onClick={() => setShowPreview(true)}
// //             className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
// //           >
// //             👁 Preview
// //           </button>

// //           <button
// //             onClick={handleBack}
// //             className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
// //           >
// //             Cancel
// //           </button>

// //           <button
// //             onClick={handleSave}
// //             disabled={saving}
// //             className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition-colors shadow-sm"
// //           >
// //             {saving && (
// //               <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //             )}
// //             💾 Save
// //           </button>
// //         </div>
// //       </header>

// //       {/* ── Main Three-Column Layout ── */}
// //       <div className="flex flex-1 overflow-hidden">

// //         {/* ── Left: Block Palette ── */}
// //         <aside className="w-44 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden">
// //           <div className="p-3 flex-1 overflow-y-auto">
// //             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Blocks</p>
// //             <div className="flex flex-col gap-1 mb-5">
// //               {blockTypes.map(bt => (
// //                 <button
// //                   key={bt.type}
// //                   onClick={() => addBlock(bt)}
// //                   className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50/60 transition-all text-left group"
// //                 >
// //                   <span className="text-sm font-bold text-indigo-300 w-4 text-center group-hover:text-indigo-500 transition-colors">{bt.icon}</span>
// //                   {bt.label}
// //                 </button>
// //               ))}
// //             </div>

// //             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Merge Tags</p>
// //             <div className="flex flex-col gap-1">
// //               {MERGE_TAGS.map(tag => (
// //                 <button
// //                   key={tag}
// //                   onClick={() => insertMergeTag(tag)}
// //                   className="px-2 py-1.5 border border-slate-200 rounded-md text-[10px] font-mono text-cyan-700 bg-white hover:border-indigo-300 hover:bg-indigo-50/60 text-left transition-all truncate"
// //                   title={`Insert ${tag}`}
// //                 >
// //                   {tag}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         </aside>

// //         {/* ── Centre: Canvas ── */}
// //         <main className="flex-1 bg-slate-100 overflow-y-auto p-6 flex flex-col items-center">
// //           <div style={{ width: '100%', maxWidth: canvasMaxW }} className="transition-all duration-300">
// //             {isEditorWA
// //               ? <WACanvas    blocks={blocks} selectedBlock={selectedIdx} onSelect={setSelectedIdx} onDelete={deleteBlock} onMoveUp={i => moveBlock(i, -1)} onMoveDown={i => moveBlock(i, 1)} />
// //               : <EmailCanvas blocks={blocks} selectedBlock={selectedIdx} onSelect={setSelectedIdx} onDelete={deleteBlock} onMoveUp={i => moveBlock(i, -1)} onMoveDown={i => moveBlock(i, 1)} />
// //             }
// //           </div>

// //           {/* Add block hint */}
// //           {blocks.length > 0 && (
// //             <p className="text-[11px] text-slate-400 mt-4 text-center">
// //               Click a block to select → Edit properties in the right panel
// //             </p>
// //           )}
// //         </main>

// //         {/* ── Right: Properties ── */}
// //         <aside className="w-60 bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-hidden">
// //           <div className="p-4 flex-1 overflow-y-auto">

// //             {/* Template Settings */}
// //             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Template Settings</p>

// //             <div className="mb-3">
// //               <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Template Name *</label>
// //               <input
// //                 value={formName}
// //                 onChange={e => setFormName(e.target.value)}
// //                 placeholder="e.g. Order Confirmation"
// //                 className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-colors"
// //               />
// //             </div>

// //             {/* Channel — only for new templates */}
// //             {!templateId && (
// //               <div className="mb-3">
// //                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Channel</label>
// //                 <div className="flex gap-2">
// //                   {['email', 'whatsapp'].map(ch => (
// //                     <button
// //                       key={ch}
// //                       onClick={() => { setFormChannel(ch); setBlocks([]); setSelectedIdx(null); }}
// //                       className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
// //                         formChannel === ch
// //                           ? ch === 'whatsapp' ? 'bg-green-600 text-white border-green-600' : 'bg-indigo-600 text-white border-indigo-600'
// //                           : 'border-slate-200 text-slate-500 hover:border-slate-300'
// //                       }`}
// //                     >
// //                       {ch === 'email' ? '✉️ Email' : '💬 WA'}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             <div className="mb-3">
// //               <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</label>
// //               <select
// //                 value={formCat}
// //                 onChange={e => setFormCat(e.target.value)}
// //                 className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 transition-colors"
// //               >
// //                 {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
// //               </select>
// //             </div>

// //             {/* WA Status (only for WA templates) */}
// //             {isEditorWA && (
// //               <div className="mb-4">
// //                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Meta WA Status</label>
// //                 <select
// //                   value={formWAStatus ?? ''}
// //                   onChange={e => setFormWAStatus(e.target.value || null)}
// //                   className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 transition-colors"
// //                 >
// //                   {WA_STATUS_OPTIONS.map(o => (
// //                     <option key={o.value ?? 'null'} value={o.value ?? ''}>{o.label}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             )}

// //             {/* Block count badge */}
// //             <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg mb-4 border border-slate-100">
// //               <span className="text-[11px] text-slate-500 font-medium">Total Blocks</span>
// //               <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">{blocks.length}</span>
// //             </div>

// //             <div className="border-t border-slate-100 my-3" />

// //             {/* Block Properties */}
// //             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Block Properties</p>
// //             <BlockPropsPanel
// //               block={selectedIdx !== null ? blocks[selectedIdx] : null}
// //               index={selectedIdx}
// //               onUpdate={updateBlockProp}
// //             />

// //             {selectedIdx !== null && (
// //               <button
// //                 onClick={() => setShowDelBlock(true)}
// //                 className="mt-3 w-full py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors border border-red-100"
// //               >
// //                 🗑 Delete Block
// //               </button>
// //             )}
// //           </div>
// //         </aside>
// //       </div>

// //       {/* ── Modals ── */}
// //       <PreviewModal
// //         isOpen={showPreview}
// //         onClose={() => setShowPreview(false)}
// //         isWA={isEditorWA}
// //         blocks={blocks}
// //         name={formName}
// //       />

// //       <ConfirmDialog
// //         isOpen={showDelBlock}
// //         onClose={() => setShowDelBlock(false)}
// //         onConfirm={() => { deleteBlock(selectedIdx); setShowDelBlock(false); }}
// //         title="Delete Block"
// //         message="Remove this block from the template? This cannot be undone."
// //       />
// //     </div>
// //   );
// // }




// // TemplateLibraryPage.jsx
// import React, { useState, useEffect } from 'react';
// import TemplateEditorPage from './TemplateEditorPage';

// // Initial sample templates
// const initialTemplates = [
//   {
//     id: 'tpl-1',
//     name: 'April Newsletter',
//     channel: 'email',
//     category: 'Promotional',
//     usageCount: 12,
//     blocks: [
//       { id: 101, type: 'header', props: { text: 'April Newsletter', align: 'center', color: '#0f172a', fontSize: '22px' } },
//       { id: 102, type: 'text', props: { text: 'Check out our latest offers!', align: 'left', color: '#334155', fontSize: '14px' } },
//     ],
//   },
//   {
//     id: 'tpl-2',
//     name: 'WhatsApp Flash Sale',
//     channel: 'whatsapp',
//     category: 'Promotional',
//     usageCount: 8,
//     waStatus: 'approved',
//     blocks: [
//       { id: 201, type: 'wa_header', props: { text: '⚡ FLASH SALE ⚡' } },
//       { id: 202, type: 'wa_body', props: { text: '50% off everything! Use code FLASH50' } },
//     ],
//   },
// ];

// export default function TemplateLibraryPage() {
//   const [templates, setTemplates] = useState(() => {
//     const saved = localStorage.getItem('templates');
//     return saved ? JSON.parse(saved) : initialTemplates;
//   });
//   const [showEditor, setShowEditor] = useState(false);
//   const [editingTemplateId, setEditingTemplateId] = useState(null);

//   // Persist to localStorage whenever templates change
//   useEffect(() => {
//     localStorage.setItem('templates', JSON.stringify(templates));
//   }, [templates]);

//   const handleCreateNew = () => {
//     setEditingTemplateId(null);
//     setShowEditor(true);
//   };

//   const handleEdit = (template) => {
//     setEditingTemplateId(template.id);
//     setShowEditor(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Delete this template permanently?')) {
//       setTemplates(prev => prev.filter(t => t.id !== id));
//     }
//   };

//   const handleDuplicate = (template) => {
//     const newTemplate = {
//       ...template,
//       id: `tpl-${Date.now()}`,
//       name: `${template.name} (Copy)`,
//       usageCount: 0,
//     };
//     setTemplates(prev => [...prev, newTemplate]);
//   };

//   if (showEditor) {
//     return (
//       <TemplateEditorPage
//         key={editingTemplateId || 'new'} // forces remount when switching templates
//         templateId={editingTemplateId}
//         templates={templates}
//         setTemplates={setTemplates}
//         onBack={() => setShowEditor(false)}
//       />
//     );
//   }

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Template Library</h1>
//           <p className="text-sm text-slate-600">Manage email and WhatsApp message templates</p>
//         </div>
//         <button
//           onClick={handleCreateNew}
//           className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 flex items-center gap-2"
//         >
//           + New Template
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {templates.map(template => (
//           <div key={template.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
//             <div className="flex justify-between items-start mb-3">
//               <div>
//                 <h3 className="font-semibold text-slate-900">{template.name}</h3>
//                 <p className="text-xs text-slate-500 mt-0.5">
//                   {template.channel === 'email' ? '✉️ Email' : '💬 WhatsApp'} · {template.category}
//                 </p>
//               </div>
//               <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
//                 template.channel === 'email' ? 'bg-indigo-50 text-indigo-700' : 'bg-green-50 text-green-700'
//               }`}>
//                 {template.channel}
//               </span>
//             </div>
//             <div className="text-xs text-slate-400 mb-4">
//               Used {template.usageCount} times · {template.blocks?.length || 0} blocks
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleEdit(template)}
//                 className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDuplicate(template)}
//                 className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200"
//               >
//                 Duplicate
//               </button>
//               <button
//                 onClick={() => handleDelete(template.id)}
//                 className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//         {templates.length === 0 && (
//           <div className="col-span-full text-center py-12 text-slate-400">
//             <p>No templates yet. Click "New Template" to get started.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// // TemplateEditorPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';

// // ─── Block Definitions (same as before) ────────────────────────────────────────
// const EMAIL_BLOCK_TYPES = [
//   { type: 'header',  icon: '𝐇', label: 'Heading',   defaultProps: { text: 'Your Heading Here', align: 'center', color: '#0f172a', fontSize: '22px' } },
//   { type: 'text',    icon: '¶', label: 'Paragraph',  defaultProps: { text: 'Write your content here. Use merge tags like {{first_name}} to personalise.', align: 'left', color: '#334155', fontSize: '14px' } },
//   { type: 'image',   icon: '⬜',label: 'Image',      defaultProps: { url: 'https://placehold.co/560x200/6366f1/ffffff?text=Your+Image', alt: 'Image' } },
//   { type: 'button',  icon: '▶', label: 'Button',     defaultProps: { label: 'Click Here', url: '#', bgColor: '#4f46e5', textColor: '#ffffff' } },
//   { type: 'columns', icon: '⊞', label: '2 Columns',  defaultProps: { left: 'Left column content here.', right: 'Right column content here.' } },
//   { type: 'divider', icon: '—', label: 'Divider',    defaultProps: { color: '#e2e8f0' } },
//   { type: 'footer',  icon: 'f', label: 'Footer',     defaultProps: { text: '© 2025 Company · Unsubscribe | Privacy Policy', color: '#94a3b8', fontSize: '12px' } },
// ];

// const WA_BLOCK_TYPES = [
//   { type: 'wa_header', icon: '𝐇', label: 'Header', defaultProps: { text: 'Message Header' } },
//   { type: 'wa_body',   icon: '¶', label: 'Body',   defaultProps: { text: 'Hi {{first_name}}, your message body goes here.\n\nYou can use *bold* formatting.' } },
//   { type: 'wa_footer', icon: 'f', label: 'Footer', defaultProps: { text: 'Your company name' } },
//   { type: 'wa_button', icon: '▶', label: 'Button', defaultProps: { label: 'Tap Here', url: '#' } },
// ];

// const MERGE_TAGS = [
//   '{{first_name}}', '{{last_name}}', '{{company}}', '{{email}}',
//   '{{phone}}', '{{order_id}}', '{{amount}}', '{{date}}',
//   '{{invoice_id}}', '{{product_name}}', '{{unsubscribe_url}}',
// ];

// const CATEGORY_OPTIONS = ['Promotional', 'Transactional', 'Re-engagement', 'Onboarding', 'Announcement'];
// const WA_STATUS_OPTIONS = [
//   { value: null,       label: 'Not Submitted' },
//   { value: 'pending',  label: 'Pending Review' },
//   { value: 'approved', label: 'Approved' },
//   { value: 'rejected', label: 'Rejected' },
// ];

// // ─── Confirm Dialog ───────────────────────────────────────────────────────────
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

// // ─── Email Block Renderer (unchanged) ─────────────────────────────────────────
// const EmailBlockContent = ({ block }) => {
//   const p = block.props;
//   switch (block.type) {
//     case 'header':
//       return (
//         <div style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, fontWeight: 'bold', padding: '8px 0', fontFamily: 'Arial, sans-serif', lineHeight: 1.3 }}>
//           {p.text}
//         </div>
//       );
//     case 'text':
//       return (
//         <p style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, lineHeight: 1.6, margin: '8px 0', fontFamily: 'Arial, sans-serif', whiteSpace: 'pre-line' }}>
//           {p.text}
//         </p>
//       );
//     case 'image':
//       return (
//         <div style={{ margin: '8px 0' }}>
//           <img
//             src={p.url}
//             alt={p.alt}
//             style={{ width: '100%', borderRadius: 6, display: 'block' }}
//             onError={e => { e.target.src = 'https://placehold.co/560x200/e2e8f0/94a3b8?text=Image+Not+Found'; }}
//           />
//         </div>
//       );
//     case 'button':
//       return (
//         <div style={{ textAlign: 'center', margin: '14px 0' }}>
//           <span style={{ display: 'inline-block', background: p.bgColor, color: p.textColor, padding: '11px 28px', borderRadius: 7, fontWeight: 'bold', fontSize: 14, fontFamily: 'Arial, sans-serif', cursor: 'default' }}>
//             {p.label}
//           </span>
//         </div>
//       );
//     case 'columns':
//       return (
//         <div style={{ display: 'flex', gap: 12, margin: '8px 0' }}>
//           <div style={{ flex: 1, padding: 12, background: '#f8fafc', borderRadius: 7, fontSize: 13, color: '#475569', fontFamily: 'Arial, sans-serif', lineHeight: 1.55, whiteSpace: 'pre-line', border: '1px solid #e2e8f0' }}>{p.left}</div>
//           <div style={{ flex: 1, padding: 12, background: '#f8fafc', borderRadius: 7, fontSize: 13, color: '#475569', fontFamily: 'Arial, sans-serif', lineHeight: 1.55, whiteSpace: 'pre-line', border: '1px solid #e2e8f0' }}>{p.right}</div>
//         </div>
//       );
//     case 'divider':
//       return <hr style={{ border: 'none', borderTop: `1px solid ${p.color}`, margin: '14px 0' }} />;
//     case 'footer':
//       return (
//         <div style={{ textAlign: 'center', color: p.color, fontSize: p.fontSize, padding: '10px 0', marginTop: 4, fontFamily: 'Arial, sans-serif', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
//           {p.text}
//         </div>
//       );
//     default:
//       return <div className="text-xs text-slate-400 p-2">Unknown block type</div>;
//   }
// };

// // ─── WhatsApp Block Renderer (unchanged) ──────────────────────────────────────
// const WABlockContent = ({ block }) => {
//   const p = block.props;
//   const formatBody = (text) =>
//     text
//       .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
//       .replace(/_(.*?)_/g, '<em>$1</em>')
//       .replace(/\n/g, '<br/>');

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
//           style={{ padding: '10px 14px', fontSize: 13, color: '#333', lineHeight: 1.6, fontFamily: 'Arial, sans-serif' }}
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
//         <div style={{ borderTop: '1px solid #e5e5e5', padding: '10px 14px', textAlign: 'center', color: '#00a5f4', fontSize: 13, fontWeight: 600, fontFamily: 'Arial, sans-serif', cursor: 'default' }}>
//           🔗 {p.label}
//         </div>
//       );
//     default:
//       return null;
//   }
// };

// // ─── Block Wrapper (selection + controls) ─────────────────────────────────────
// const BlockWrapper = ({ block, index, isSelected, isEmail, onSelect, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
//   const Content = isEmail ? EmailBlockContent : WABlockContent;
//   return (
//     <div
//       onClick={() => onSelect(index)}
//       className={`relative group rounded-lg mb-2 border-2 transition-all cursor-pointer select-none ${
//         isSelected
//           ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/20'
//           : 'border-transparent hover:border-indigo-200 hover:bg-indigo-50/10'
//       }`}
//     >
//       <Content block={block} />

//       <div className={`absolute top-1.5 right-1.5 flex items-center gap-1 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
//         {!isFirst && (
//           <button
//             onClick={e => { e.stopPropagation(); onMoveUp(index); }}
//             className="w-6 h-6 bg-white border border-slate-200 rounded-md text-[11px] hover:bg-slate-100 flex items-center justify-center shadow-sm text-slate-600 font-bold"
//           >↑</button>
//         )}
//         {!isLast && (
//           <button
//             onClick={e => { e.stopPropagation(); onMoveDown(index); }}
//             className="w-6 h-6 bg-white border border-slate-200 rounded-md text-[11px] hover:bg-slate-100 flex items-center justify-center shadow-sm text-slate-600 font-bold"
//           >↓</button>
//         )}
//         <button
//           onClick={e => { e.stopPropagation(); onDelete(index); }}
//           className="w-6 h-6 bg-red-500 text-white rounded-md text-[11px] hover:bg-red-600 flex items-center justify-center shadow-sm font-bold"
//         >×</button>
//       </div>

//       <div className={`absolute left-1 top-1/2 -translate-y-1/2 text-slate-300 text-xs select-none transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
//         ⋮⋮
//       </div>

//       {isSelected && (
//         <div className="absolute top-1.5 left-6 text-[9px] font-bold text-indigo-400 uppercase tracking-wider">
//           {block.type.replace('wa_', '')}
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Email Canvas ─────────────────────────────────────────────────────────────
// const EmailCanvas = ({ blocks, selectedBlock, onSelect, onDelete, onMoveUp, onMoveDown }) => (
//   <div className="bg-white rounded-xl overflow-hidden shadow border border-slate-200" style={{ fontFamily: 'Arial, sans-serif' }}>
//     <div className="bg-indigo-600 px-5 py-2.5 flex justify-between items-center">
//       <span className="text-white text-xs font-medium">From: noreply@company.com</span>
//       <span className="text-indigo-200 text-xs">To: {'{{email}}'}</span>
//     </div>
//     <div className="p-5">
//       {blocks.length === 0 ? (
//         <div className="text-center py-12 text-slate-400 text-sm">
//           <div className="text-3xl mb-2">✉️</div>
//           <p className="font-medium">Your email canvas is empty</p>
//           <p className="text-xs mt-1">Add blocks from the left panel to start building</p>
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

// // ─── WhatsApp Canvas ──────────────────────────────────────────────────────────
// const WACanvas = ({ blocks, selectedBlock, onSelect, onDelete, onMoveUp, onMoveDown }) => (
//   <div className="max-w-[360px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
//     <div className="bg-slate-800 px-4 py-1 flex justify-between items-center">
//       <span className="text-white text-[10px] font-semibold">9:41</span>
//       <div className="flex gap-1">
//         <span className="text-white text-[10px]">●●●</span>
//       </div>
//     </div>
//     <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
//       <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white font-bold text-sm shrink-0">A</div>
//       <div>
//         <div className="text-white text-sm font-semibold">Acme Inc.</div>
//         <div className="text-green-300 text-[11px]">Business Account · Online</div>
//       </div>
//     </div>
//     <div className="bg-[#e5ddd5] p-3 min-h-[240px]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23b2bec3\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
//       {blocks.length === 0 ? (
//         <div className="text-center py-10 text-slate-500 text-sm">
//           <div className="text-2xl mb-2">💬</div>
//           <p className="text-xs">Add blocks to preview</p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-[0_12px_12px_12px] overflow-hidden shadow-md max-w-[260px]">
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
//       <div className="text-right text-[10px] text-slate-500 mt-2">10:30 AM ✓✓</div>
//     </div>
//     <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2">
//       <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-slate-400">Message...</div>
//       <div className="w-9 h-9 bg-[#25d366] rounded-full flex items-center justify-center text-white text-sm shrink-0">▶</div>
//     </div>
//   </div>
// );

// // ─── Preview Modal ────────────────────────────────────────────────────────────
// const PreviewModal = ({ isOpen, onClose, isWA, blocks, name }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
//       <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl">
//         <div className="flex justify-between items-center px-5 py-4 border-b border-slate-200 shrink-0">
//           <div>
//             <span className="font-semibold text-slate-800">Preview — </span>
//             <span className="text-slate-500 text-sm">{name || 'Untitled Template'}</span>
//           </div>
//           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg text-xl leading-none transition-colors">×</button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
//           {isWA
//             ? <WACanvas blocks={blocks} selectedBlock={null} onSelect={() => {}} onDelete={() => {}} onMoveUp={() => {}} onMoveDown={() => {}} />
//             : <EmailCanvas blocks={blocks} selectedBlock={null} onSelect={() => {}} onDelete={() => {}} onMoveUp={() => {}} onMoveDown={() => {}} />
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Block Properties Panel (unchanged) ───────────────────────────────────────
// const BlockPropsPanel = ({ block, index, onUpdate }) => {
//   if (!block) return (
//     <div className="text-center py-6">
//       <div className="text-2xl mb-2">🖱</div>
//       <p className="text-xs text-slate-400 leading-relaxed">Click any block on the canvas to edit its properties here.</p>
//     </div>
//   );

//   const Field = ({ label, field, type = 'text', rows, placeholder }) => (
//     <div className="mb-3">
//       <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</label>
//       {rows
//         ? (
//           <textarea
//             rows={rows}
//             value={block.props[field] ?? ''}
//             onChange={e => onUpdate(index, { [field]: e.target.value })}
//             placeholder={placeholder}
//             className="w-full border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-700 resize-none focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-colors font-mono"
//           />
//         )
//         : type === 'color'
//           ? (
//             <div className="flex items-center gap-2">
//               <input
//                 type="color"
//                 value={block.props[field] ?? '#000000'}
//                 onChange={e => onUpdate(index, { [field]: e.target.value })}
//                 className="w-9 h-8 border border-slate-200 rounded-lg cursor-pointer p-0.5"
//               />
//               <input
//                 type="text"
//                 value={block.props[field] ?? ''}
//                 onChange={e => onUpdate(index, { [field]: e.target.value })}
//                 className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 font-mono"
//               />
//             </div>
//           )
//           : (
//             <input
//               type={type}
//               value={block.props[field] ?? ''}
//               placeholder={placeholder}
//               onChange={e => onUpdate(index, { [field]: e.target.value })}
//               className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-colors"
//             />
//           )
//       }
//     </div>
//   );

//   const AlignField = () => (
//     <div className="mb-3">
//       <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alignment</label>
//       <div className="flex gap-1">
//         {['left', 'center', 'right'].map(a => (
//           <button
//             key={a}
//             onClick={() => onUpdate(index, { align: a })}
//             className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors font-medium ${
//               block.props.align === a
//                 ? 'bg-indigo-600 text-white border-indigo-600'
//                 : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
//             }`}
//           >
//             {a === 'left' ? '⬅' : a === 'center' ? '⬛' : '➡'}
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   switch (block.type) {
//     case 'header':
//       return (
//         <>
//           <Field label="Heading Text" field="text" placeholder="Your heading here" />
//           <AlignField />
//           <Field label="Color" field="color" type="color" />
//           <Field label="Font Size" field="fontSize" placeholder="22px" />
//         </>
//       );
//     case 'text':
//       return (
//         <>
//           <Field label="Paragraph Text" field="text" rows={5} placeholder="Enter paragraph text..." />
//           <AlignField />
//           <Field label="Color" field="color" type="color" />
//           <Field label="Font Size" field="fontSize" placeholder="14px" />
//         </>
//       );
//     case 'image':
//       return (
//         <>
//           <Field label="Image URL" field="url" placeholder="https://..." />
//           <Field label="Alt Text" field="alt" placeholder="Image description" />
//           <p className="text-[10px] text-slate-400 mt-1">💡 Use placehold.co for placeholder images</p>
//         </>
//       );
//     case 'button':
//       return (
//         <>
//           <Field label="Button Label" field="label" placeholder="Click Here" />
//           <Field label="Link URL" field="url" placeholder="https://..." />
//           <Field label="Background Color" field="bgColor" type="color" />
//           <Field label="Text Color" field="textColor" type="color" />
//         </>
//       );
//     case 'columns':
//       return (
//         <>
//           <Field label="Left Column" field="left" rows={4} placeholder="Left column content..." />
//           <Field label="Right Column" field="right" rows={4} placeholder="Right column content..." />
//         </>
//       );
//     case 'divider':
//       return <Field label="Divider Color" field="color" type="color" />;
//     case 'footer':
//       return (
//         <>
//           <Field label="Footer Text" field="text" rows={3} placeholder="© 2025 Company · Unsubscribe" />
//           <Field label="Color" field="color" type="color" />
//           <Field label="Font Size" field="fontSize" placeholder="12px" />
//         </>
//       );
//     case 'wa_header':
//       return <Field label="Header Text" field="text" placeholder="Message header..." />;
//     case 'wa_body':
//       return (
//         <>
//           <Field label="Body Text" field="text" rows={8} placeholder="Hi {{first_name}}, ..." />
//           <div className="bg-slate-50 rounded-lg p-2.5 mt-1">
//             <p className="text-[10px] text-slate-500 font-semibold mb-1">WA Formatting</p>
//             <p className="text-[10px] text-slate-400">*bold* → <strong>bold</strong></p>
//             <p className="text-[10px] text-slate-400">_italic_ → <em>italic</em></p>
//           </div>
//         </>
//       );
//     case 'wa_footer':
//       return <Field label="Footer Text" field="text" placeholder="Company · support@..." />;
//     case 'wa_button':
//       return (
//         <>
//           <Field label="Button Label" field="label" placeholder="Tap Here" />
//           <Field link="Link URL" field="url" placeholder="https://..." />
//         </>
//       );
//     default:
//       return <p className="text-xs text-slate-400">No properties for this block.</p>;
//   }
// };

// // ─── Main Editor Component (with localStorage persistence) ────────────────────
// const STORAGE_KEY = 'templates';

// export default function TemplateEditorPage({ templateId, onBack }) {
//   // Load templates from localStorage directly
//   const [templates, setTemplates] = useState(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     return saved ? JSON.parse(saved) : [];
//   });

//   const existing = templateId ? templates.find(t => t.id === templateId) : null;
//   const isWA = existing?.channel === 'whatsapp';

//   const [formName, setFormName] = useState(existing?.name ?? '');
//   const [formChannel, setFormChannel] = useState(existing?.channel ?? 'email');
//   const [formCat, setFormCat] = useState(existing?.category ?? 'Promotional');
//   const [formWAStatus, setFormWAStatus] = useState(existing?.waStatus ?? null);
//   const [blocks, setBlocks] = useState(() => JSON.parse(JSON.stringify(existing?.blocks ?? [])));
//   const [selectedIdx, setSelectedIdx] = useState(null);
//   const [viewMode, setViewMode] = useState('desktop');
//   const [showPreview, setShowPreview] = useState(false);
//   const [showDelBlock, setShowDelBlock] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [unsaved, setUnsaved] = useState(false);

//   const isEditorWA = templateId ? isWA : formChannel === 'whatsapp';
//   const blockTypes = isEditorWA ? WA_BLOCK_TYPES : EMAIL_BLOCK_TYPES;

//   const isInitialMount = useRef(true);

//   // Track unsaved changes (skip initial mount)
//   useEffect(() => {
//     if (isInitialMount.current) {
//       isInitialMount.current = false;
//       return;
//     }
//     setUnsaved(true);
//   }, [blocks, formName, formCat, formWAStatus]);

//   const addBlock = (bt) => {
//     const newBlock = { id: Date.now(), type: bt.type, props: { ...bt.defaultProps } };
//     setBlocks(prev => [...prev, newBlock]);
//     setSelectedIdx(blocks.length);
//   };

//   const deleteBlock = useCallback((i) => {
//     setBlocks(prev => prev.filter((_, idx) => idx !== i));
//     setSelectedIdx(prev => {
//       if (prev === i) return null;
//       if (prev > i) return prev - 1;
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
//     if (selectedIdx === null) {
//       alert('Select a text block on the canvas first, then click a merge tag.');
//       return;
//     }
//     const b = blocks[selectedIdx];
//     const textTypes = ['header', 'text', 'footer', 'wa_header', 'wa_body', 'wa_footer', 'columns'];
//     if (!textTypes.includes(b.type)) {
//       alert('Merge tags can only be added to text-based blocks.');
//       return;
//     }
//     const field = b.type === 'columns' ? 'left' : 'text';
//     updateBlockProp(selectedIdx, { [field]: (b.props[field] || '') + tag });
//   };

//   // Save directly to localStorage and exit
//   const handleSave = async () => {
//     if (!formName.trim()) {
//       alert('Please enter a template name.');
//       return;
//     }
//     if (blocks.length === 0) {
//       alert('Please add at least one block to the template.');
//       return;
//     }
//     setSaving(true);
//     setUnsaved(false);

//     const savedBlocks = JSON.parse(JSON.stringify(blocks));

//     await new Promise(resolve => setTimeout(resolve, 200)); // simulate async

//     let newTemplates;
//     if (templateId) {
//       // Update existing
//       newTemplates = templates.map(t =>
//         t.id === templateId
//           ? {
//               ...t,
//               name: formName,
//               category: formCat,
//               waStatus: formWAStatus,
//               blocks: savedBlocks,
//             }
//           : t
//       );
//     } else {
//       // Create new
//       const newTemplate = {
//         id: `tpl-${Date.now()}`,
//         name: formName,
//         channel: formChannel,
//         category: formCat,
//         usageCount: 0,
//         waStatus: isEditorWA ? formWAStatus : null,
//         blocks: savedBlocks,
//       };
//       newTemplates = [...templates, newTemplate];
//     }

//     setTemplates(newTemplates);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(newTemplates));

//     setSaving(false);
//     onBack(formName);
//   };

//   const handleBack = () => {
//     if (unsaved && blocks.length > 0) {
//       if (!window.confirm('You have unsaved changes. Are you sure you want to go back?')) return;
//     }
//     onBack();
//   };

//   const canvasMaxW = viewMode === 'mobile' ? 420 : 600;

//   return (
//     <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
//       {/* Top Toolbar */}
//       <header className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 shrink-0 gap-3">
//         <div className="flex items-center gap-3 min-w-0">
//           <button
//             onClick={handleBack}
//             className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors shrink-0"
//             title="Back to Library"
//           >
//             ←
//           </button>
//           <div className="min-w-0">
//             <div className="flex items-center gap-2">
//               <h1 className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
//                 {formName || 'Untitled Template'}
//               </h1>
//               {unsaved && <span className="text-[9px] font-bold text-amber-500 uppercase bg-amber-50 px-1.5 py-0.5 rounded-full shrink-0">Unsaved</span>}
//             </div>
//             <p className="text-[10px] text-slate-400">
//               {isEditorWA ? '💬 WhatsApp' : '✉️ Email'} Template · {blocks.length} block{blocks.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-2 shrink-0">
//           <div className="hidden sm:flex bg-slate-100 rounded-lg p-0.5">
//             <button
//               onClick={() => setViewMode('desktop')}
//               className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
//                 viewMode === 'desktop' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
//               }`}
//             >
//               🖥 Desktop
//             </button>
//             <button
//               onClick={() => setViewMode('mobile')}
//               className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
//                 viewMode === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
//               }`}
//             >
//               📱 Mobile
//             </button>
//           </div>

//           <button
//             onClick={() => setShowPreview(true)}
//             className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
//           >
//             👁 Preview
//           </button>

//           <button
//             onClick={handleBack}
//             className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition-colors shadow-sm"
//           >
//             {saving && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
//             💾 Save
//           </button>
//         </div>
//       </header>

//       {/* Main Three-Column Layout */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Left: Block Palette */}
//         <aside className="w-44 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden">
//           <div className="p-3 flex-1 overflow-y-auto">
//             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Blocks</p>
//             <div className="flex flex-col gap-1 mb-5">
//               {blockTypes.map(bt => (
//                 <button
//                   key={bt.type}
//                   onClick={() => addBlock(bt)}
//                   className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50/60 transition-all text-left group"
//                 >
//                   <span className="text-sm font-bold text-indigo-300 w-4 text-center group-hover:text-indigo-500 transition-colors">{bt.icon}</span>
//                   {bt.label}
//                 </button>
//               ))}
//             </div>
//             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Merge Tags</p>
//             <div className="flex flex-col gap-1">
//               {MERGE_TAGS.map(tag => (
//                 <button
//                   key={tag}
//                   onClick={() => insertMergeTag(tag)}
//                   className="px-2 py-1.5 border border-slate-200 rounded-md text-[10px] font-mono text-cyan-700 bg-white hover:border-indigo-300 hover:bg-indigo-50/60 text-left transition-all truncate"
//                   title={`Insert ${tag}`}
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* Centre: Canvas */}
//         <main className="flex-1 bg-slate-100 overflow-y-auto p-6 flex flex-col items-center">
//           <div style={{ width: '100%', maxWidth: canvasMaxW }} className="transition-all duration-300">
//             {isEditorWA
//               ? <WACanvas blocks={blocks} selectedBlock={selectedIdx} onSelect={setSelectedIdx} onDelete={deleteBlock} onMoveUp={i => moveBlock(i, -1)} onMoveDown={i => moveBlock(i, 1)} />
//               : <EmailCanvas blocks={blocks} selectedBlock={selectedIdx} onSelect={setSelectedIdx} onDelete={deleteBlock} onMoveUp={i => moveBlock(i, -1)} onMoveDown={i => moveBlock(i, 1)} />
//             }
//           </div>
//           {blocks.length > 0 && (
//             <p className="text-[11px] text-slate-400 mt-4 text-center">
//               Click a block to select → Edit properties in the right panel
//             </p>
//           )}
//         </main>

//         {/* Right: Properties */}
//         <aside className="w-60 bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-hidden">
//           <div className="p-4 flex-1 overflow-y-auto">
//             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Template Settings</p>

//             <div className="mb-3">
//               <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Template Name *</label>
//               <input
//                 value={formName}
//                 onChange={e => setFormName(e.target.value)}
//                 placeholder="e.g. Order Confirmation"
//                 className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-colors"
//               />
//             </div>

//             {!templateId && (
//               <div className="mb-3">
//                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Channel</label>
//                 <div className="flex gap-2">
//                   {['email', 'whatsapp'].map(ch => (
//                     <button
//                       key={ch}
//                       onClick={() => { setFormChannel(ch); setBlocks([]); setSelectedIdx(null); }}
//                       className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
//                         formChannel === ch
//                           ? ch === 'whatsapp' ? 'bg-green-600 text-white border-green-600' : 'bg-indigo-600 text-white border-indigo-600'
//                           : 'border-slate-200 text-slate-500 hover:border-slate-300'
//                       }`}
//                     >
//                       {ch === 'email' ? '✉️ Email' : '💬 WA'}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="mb-3">
//               <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</label>
//               <select
//                 value={formCat}
//                 onChange={e => setFormCat(e.target.value)}
//                 className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 transition-colors"
//               >
//                 {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
//               </select>
//             </div>

//             {isEditorWA && (
//               <div className="mb-4">
//                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Meta WA Status</label>
//                 <select
//                   value={formWAStatus ?? ''}
//                   onChange={e => setFormWAStatus(e.target.value || null)}
//                   className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 transition-colors"
//                 >
//                   {WA_STATUS_OPTIONS.map(o => (
//                     <option key={o.value ?? 'null'} value={o.value ?? ''}>{o.label}</option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg mb-4 border border-slate-100">
//               <span className="text-[11px] text-slate-500 font-medium">Total Blocks</span>
//               <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">{blocks.length}</span>
//             </div>

//             <div className="border-t border-slate-100 my-3" />

//             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Block Properties</p>
//             <BlockPropsPanel
//               block={selectedIdx !== null ? blocks[selectedIdx] : null}
//               index={selectedIdx}
//               onUpdate={updateBlockProp}
//             />

//             {selectedIdx !== null && (
//               <button
//                 onClick={() => setShowDelBlock(true)}
//                 className="mt-3 w-full py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors border border-red-100"
//               >
//                 🗑 Delete Block
//               </button>
//             )}
//           </div>
//         </aside>
//       </div>

//       {/* Modals */}
//       <PreviewModal
//         isOpen={showPreview}
//         onClose={() => setShowPreview(false)}
//         isWA={isEditorWA}
//         blocks={blocks}
//         name={formName}
//       />
//       <ConfirmDialog
//         isOpen={showDelBlock}
//         onClose={() => setShowDelBlock(false)}
//         onConfirm={() => { deleteBlock(selectedIdx); setShowDelBlock(false); }}
//         title="Delete Block"
//         message="Remove this block from the template? This cannot be undone."
//       />
//     </div>
//   );
// }




// TemplateEditorPage.jsx – Fully Fixed
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

// ─── Email Block Renderer (unchanged) ─────────────────────────────────────────
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

// ─── WhatsApp Block Renderer (unchanged) ──────────────────────────────────────
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

      <div className={`absolute left-1 top-1/2 -translate-y-1/2 text-slate-300 text-xs select-none transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        ⋮⋮
      </div>

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
    <div className="bg-slate-800 px-4 py-1 flex justify-between items-center">
      <span className="text-white text-[10px] font-semibold">9:41</span>
      <div className="flex gap-1">
        <span className="text-white text-[10px]">●●●</span>
      </div>
    </div>
    <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white font-bold text-sm shrink-0">A</div>
      <div>
        <div className="text-white text-sm font-semibold">Acme Inc.</div>
        <div className="text-green-300 text-[11px]">Business Account · Online</div>
      </div>
    </div>
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

// ─── Block Properties Panel (fixed wa_button) ─────────────────────────────────
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

// ─── Main Editor Component (with proper unsaved detection) ────────────────────
const STORAGE_KEY = 'templates';

export default function TemplateEditorPage({ templateId, onBack }) {
  // Load templates from localStorage
  const [templates, setTemplates] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const existing = templateId ? templates.find(t => t.id === templateId) : null;
  const isWA = existing?.channel === 'whatsapp';

  // State for the current form
  const [formName, setFormName] = useState(existing?.name ?? '');
  const [formChannel, setFormChannel] = useState(existing?.channel ?? 'email');
  const [formCat, setFormCat] = useState(existing?.category ?? 'Promotional');
  const [formWAStatus, setFormWAStatus] = useState(existing?.waStatus ?? null);
  const [blocks, setBlocks] = useState(() => JSON.parse(JSON.stringify(existing?.blocks ?? [])));
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [showPreview, setShowPreview] = useState(false);
  const [showDelBlock, setShowDelBlock] = useState(false);
  const [saving, setSaving] = useState(false);
  const [unsaved, setUnsaved] = useState(false);

  const isEditorWA = templateId ? isWA : formChannel === 'whatsapp';
  const blockTypes = isEditorWA ? WA_BLOCK_TYPES : EMAIL_BLOCK_TYPES;

  // ✅ Capture initial snapshot for dirty check
  const initialSnapshot = useRef({
    name: existing?.name ?? '',
    category: existing?.category ?? 'Promotional',
    waStatus: existing?.waStatus ?? null,
    blocks: JSON.parse(JSON.stringify(existing?.blocks ?? [])),
  });

  // ✅ Check unsaved by comparing current with snapshot
  const checkUnsaved = useCallback(() => {
    const nameChanged = formName !== initialSnapshot.current.name;
    const catChanged = formCat !== initialSnapshot.current.category;
    const statusChanged = formWAStatus !== initialSnapshot.current.waStatus;
    const blocksChanged = JSON.stringify(blocks) !== JSON.stringify(initialSnapshot.current.blocks);
    return nameChanged || catChanged || statusChanged || blocksChanged;
  }, [formName, formCat, formWAStatus, blocks]);

  // ✅ Update unsaved flag whenever relevant state changes
  useEffect(() => {
    setUnsaved(checkUnsaved());
  }, [checkUnsaved]);

  const addBlock = (bt) => {
    const newBlock = { id: Date.now(), type: bt.type, props: { ...bt.defaultProps } };
    setBlocks(prev => [...prev, newBlock]);
    setSelectedIdx(blocks.length);
  };

  const deleteBlock = useCallback((i) => {
    setBlocks(prev => prev.filter((_, idx) => idx !== i));
    setSelectedIdx(prev => {
      if (prev === i) return null;
      if (prev > i) return prev - 1;
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
    if (selectedIdx === null) {
      alert('Select a text block on the canvas first, then click a merge tag.');
      return;
    }
    const b = blocks[selectedIdx];
    const textTypes = ['header', 'text', 'footer', 'wa_header', 'wa_body', 'wa_footer', 'columns'];
    if (!textTypes.includes(b.type)) {
      alert('Merge tags can only be added to text-based blocks.');
      return;
    }
    const field = b.type === 'columns' ? 'left' : 'text';
    updateBlockProp(selectedIdx, { [field]: (b.props[field] || '') + tag });
  };

  // ✅ Save – update snapshot after successful save
  const handleSave = async () => {
    if (!formName.trim()) {
      alert('Please enter a template name.');
      return;
    }
    if (blocks.length === 0) {
      alert('Please add at least one block to the template.');
      return;
    }
    setSaving(true);

    const savedBlocks = JSON.parse(JSON.stringify(blocks));
    await new Promise(resolve => setTimeout(resolve, 200));

    let newTemplates;
    if (templateId) {
      newTemplates = templates.map(t =>
        t.id === templateId
          ? {
              ...t,
              name: formName,
              category: formCat,
              waStatus: formWAStatus,
              blocks: savedBlocks,
            }
          : t
      );
    } else {
      const newTemplate = {
        id: `tpl-${Date.now()}`,
        name: formName,
        channel: formChannel,
        category: formCat,
        usageCount: 0,
        waStatus: isEditorWA ? formWAStatus : null,
        blocks: savedBlocks,
      };
      newTemplates = [...templates, newTemplate];
    }

    setTemplates(newTemplates);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTemplates));

    // ✅ Update snapshot to current values
    initialSnapshot.current = {
      name: formName,
      category: formCat,
      waStatus: formWAStatus,
      blocks: savedBlocks,
    };
    setUnsaved(false);
    setSaving(false);
    onBack(formName);
  };

  const handleBack = () => {
    if (unsaved) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to go back?')) return;
    }
    onBack();
  };

  const canvasMaxW = viewMode === 'mobile' ? 420 : 600;

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* Top Toolbar */}
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
          {/* ✅ View toggle – clearly indicates selection */}
          <div className="hidden sm:flex bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                viewMode === 'desktop'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              🖥 Desktop
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                viewMode === 'mobile'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              📱 Mobile
            </button>
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
            {saving && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            💾 Save
          </button>
        </div>
      </header>

      {/* Main Three-Column Layout (unchanged) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Block Palette */}
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

        {/* Centre: Canvas */}
        <main className="flex-1 bg-slate-100 overflow-y-auto p-6 flex flex-col items-center">
          <div style={{ width: '100%', maxWidth: canvasMaxW }} className="transition-all duration-300">
            {isEditorWA
              ? <WACanvas blocks={blocks} selectedBlock={selectedIdx} onSelect={setSelectedIdx} onDelete={deleteBlock} onMoveUp={i => moveBlock(i, -1)} onMoveDown={i => moveBlock(i, 1)} />
              : <EmailCanvas blocks={blocks} selectedBlock={selectedIdx} onSelect={setSelectedIdx} onDelete={deleteBlock} onMoveUp={i => moveBlock(i, -1)} onMoveDown={i => moveBlock(i, 1)} />
            }
          </div>
          {blocks.length > 0 && (
            <p className="text-[11px] text-slate-400 mt-4 text-center">
              Click a block to select → Edit properties in the right panel
            </p>
          )}
        </main>

        {/* Right: Properties */}
        <aside className="w-60 bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 flex-1 overflow-y-auto">
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

            <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg mb-4 border border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">Total Blocks</span>
              <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">{blocks.length}</span>
            </div>

            <div className="border-t border-slate-100 my-3" />

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

      {/* Modals */}
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