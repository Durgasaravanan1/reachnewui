


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Wallet,
//   CreditCard,
//   ArrowLeft,
//   CheckCircle,
//   AlertCircle,
//   Lock,
//   Smartphone,
//   Building,
//   Shield,
//   Send,
//   MessageSquare,
//   Users,
//   Zap,
//   Plus,
//   Minus,
//   Edit2,
//   Package,
//   Rocket,
//   TrendingUp,
//   Star,
//   DollarSign,
//   X,
//   Info,
// } from 'lucide-react';

// // Credit plans configuration (unchanged)
// const CREDIT_PLANS = [
//   {
//     id: 'basic',
//     name: 'Basic Pack',
//     price: 49,
//     messages: 10000,
//     perMessageRate: 0.0049,
//     minAdd: 1000,
//     icon: Package,
//     gradient: 'from-emerald-500 to-green-600',
//     popular: false,
//     badge: null,
//   },
//   {
//     id: 'pro',
//     name: 'Pro Pack',
//     price: 99,
//     messages: 50000,
//     perMessageRate: 0.00198,
//     minAdd: 5000,
//     icon: Rocket,
//     gradient: 'from-blue-500 to-indigo-600',
//     popular: true,
//     badge: 'Popular',
//   },
//   {
//     id: 'business',
//     name: 'Business Pack',
//     price: 199,
//     messages: 100000,
//     perMessageRate: 0.00199,
//     minAdd: 10000,
//     icon: TrendingUp,
//     gradient: 'from-purple-500 to-pink-600',
//     popular: false,
//     badge: 'Best Value',
//   },
// ];

// const WalletCheckout = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [selectedPlanData, setSelectedPlanData] = useState(null);
//   const [checkoutMode, setCheckoutMode] = useState('plan');
//   const [selectedCreditPlan, setSelectedCreditPlan] = useState(null);
//   const [creditExtraMessages, setCreditExtraMessages] = useState({});
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [formData, setFormData] = useState({
//     amount: '',
//     paymentMethod: 'card',
//     cardNumber: '',
//     cardName: '',
//     expiryDate: '',
//     cvv: '',
//     upiId: '',
//     accountNumber: '',
//     ifscCode: '',
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const initialQuantities = {};
//     CREDIT_PLANS.forEach(plan => {
//       initialQuantities[plan.id] = 0;
//     });
//     setCreditExtraMessages(initialQuantities);
//   }, []);

//   useEffect(() => {
//     const savedPlan = localStorage.getItem('selectedPlan');
//     const mode = localStorage.getItem('checkoutMode');
    
//     if (mode === 'credit_purchase') {
//       setCheckoutMode('credit');
//       localStorage.removeItem('checkoutMode');
//     } else if (savedPlan) {
//       const plan = JSON.parse(savedPlan);
//       setSelectedPlanData(plan);
//       setFormData(prev => ({ ...prev, amount: plan.amount.toString() }));
//       setCheckoutMode('plan');
//       localStorage.removeItem('selectedPlan');
//     }
//   }, []);

//   const calculateTotalForCreditPlan = (plan, additionalMessages) => {
//     const totalMessages = plan.messages + additionalMessages;
//     const additionalCost = additionalMessages * plan.perMessageRate;
//     const totalPrice = plan.price + additionalCost;
//     return { totalMessages, totalPrice, additionalCost, additionalMessages };
//   };

//   const handleAddMessages = (planId) => {
//     const plan = CREDIT_PLANS.find(p => p.id === planId);
//     setCreditExtraMessages(prev => ({
//       ...prev,
//       [planId]: prev[planId] + (plan?.minAdd || 1000)
//     }));
//     if (!selectedCreditPlan) {
//       setSelectedCreditPlan(planId);
//     }
//   };

//   const handleRemoveMessages = (planId) => {
//     setCreditExtraMessages(prev => ({
//       ...prev,
//       [planId]: Math.max(0, prev[planId] - (CREDIT_PLANS.find(p => p.id === planId)?.minAdd || 1000))
//     }));
//   };

//   const handleCustomQuantityChange = (planId, value) => {
//     const numValue = parseInt(value) || 0;
//     const plan = CREDIT_PLANS.find(p => p.id === planId);
//     const minAdd = plan?.minAdd || 1000;
//     const roundedValue = Math.round(numValue / minAdd) * minAdd;
//     setCreditExtraMessages(prev => ({
//       ...prev,
//       [planId]: Math.max(0, roundedValue)
//     }));
//   };

//   const handleSelectCreditPlan = (planId) => {
//     setSelectedCreditPlan(planId);
//     const plan = CREDIT_PLANS.find(p => p.id === planId);
//     const additionalMessages = creditExtraMessages[planId] || 0;
//     const { totalPrice } = calculateTotalForCreditPlan(plan, additionalMessages);
//     setFormData(prev => ({ ...prev, amount: totalPrice.toFixed(2) }));
//   };

//   const getSelectedCreditPlanDetails = () => {
//     if (!selectedCreditPlan) return null;
//     const plan = CREDIT_PLANS.find(p => p.id === selectedCreditPlan);
//     const additionalMessages = creditExtraMessages[selectedCreditPlan] || 0;
//     return calculateTotalForCreditPlan(plan, additionalMessages);
//   };

//   const selectedCreditDetails = getSelectedCreditPlanDetails();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: '' });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.amount || parseFloat(formData.amount) <= 0) {
//       newErrors.amount = 'Please select a plan';
//     }

//     if (formData.paymentMethod === 'card') {
//       if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
//         newErrors.cardNumber = 'Valid 16-digit card number required';
//       }
//       if (!formData.cardName) newErrors.cardName = 'Cardholder name required';
//       if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
//         newErrors.expiryDate = 'MM/YY format';
//       }
//       if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.cvv = 'Valid CVV required';
//     } else if (formData.paymentMethod === 'upi') {
//       if (!formData.upiId.match(/^[\w.-]+@[\w.-]+$/)) {
//         newErrors.upiId = 'Valid UPI ID required';
//       }
//     } else if (formData.paymentMethod === 'bank') {
//       if (!formData.accountNumber) newErrors.accountNumber = 'Account number required';
//       if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handlePayClick = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setShowConfirmModal(true);
//     }
//   };

//   const handleConfirmPayment = async () => {
//     setShowConfirmModal(false);
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       setPaymentSuccess(true);
//       setStep(3);
      
//       let transactionDetails = {};
//       let creditMessagesAdded = 0;
      
//       if (checkoutMode === 'credit' && selectedCreditPlan) {
//         const plan = CREDIT_PLANS.find(p => p.id === selectedCreditPlan);
//         const additionalMessages = creditExtraMessages[selectedCreditPlan] || 0;
//         const { totalMessages, totalPrice } = calculateTotalForCreditPlan(plan, additionalMessages);
//         creditMessagesAdded = totalMessages;
//         transactionDetails = {
//           amount: totalPrice,
//           plan: plan.name,
//           messages: totalMessages,
//           extraMessages: additionalMessages,
//           type: 'credit_purchase',
//         };
//       } else if (selectedPlanData) {
//         transactionDetails = {
//           amount: parseFloat(formData.amount),
//           plan: selectedPlanData.planName,
//           planType: selectedPlanData.planType,
//           type: 'plan_purchase',
//         };
//       }
      
//       const transaction = {
//         id: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
//         amount: transactionDetails.amount,
//         date: new Date().toISOString(),
//         method: formData.paymentMethod,
//         ...transactionDetails,
//         status: 'successful',
//       };
      
//       const transactions = JSON.parse(localStorage.getItem('wallet_transactions') || '[]');
//       transactions.push(transaction);
//       localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
      
//       const currentBalance = parseFloat(localStorage.getItem('wallet_balance') || '0');
//       let newBalance;
      
//       if (checkoutMode === 'credit' && creditMessagesAdded > 0) {
//         const currentCredits = parseFloat(localStorage.getItem('wallet_message_credits') || '0');
//         const newCredits = currentCredits + creditMessagesAdded;
//         localStorage.setItem('wallet_message_credits', newCredits.toString());
//         newBalance = currentBalance;
//       } else {
//         newBalance = currentBalance + transactionDetails.amount;
//         localStorage.setItem('wallet_balance', newBalance.toString());
//       }
      
//       window.dispatchEvent(new CustomEvent('walletUpdate', { 
//         detail: { 
//           balance: newBalance,
//           messageCredits: localStorage.getItem('wallet_message_credits') || '0'
//         } 
//       }));
//     }, 2000);
//   };

//   if (paymentSuccess && step === 3) {
//     const selectedDetails = checkoutMode === 'credit' && selectedCreditDetails;
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white rounded-xl border border-slate-200 shadow-lg p-8 text-center">
//           <div className="flex justify-center mb-4">
//             <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
//               <CheckCircle className="w-12 h-12 text-emerald-600" />
//             </div>
//           </div>
//           <h2 className="text-2xl font-bold text-slate-800 mb-2">Payment Successful!</h2>
//           {checkoutMode === 'credit' && selectedDetails ? (
//             <div className="mb-6">
//               <p className="text-slate-600">
//                 {selectedDetails.totalMessages.toLocaleString()} messages added to your account
//               </p>
//               <p className="text-sm text-slate-500 mt-1">
//                 ${parseFloat(formData.amount).toFixed(2)} paid successfully
//               </p>
//             </div>
//           ) : (
//             <p className="text-slate-600 mb-6">
//               ${parseFloat(formData.amount).toFixed(2)} has been added to your wallet
//             </p>
//           )}
//           <button
//             onClick={() => navigate('/')}
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
//         <div className="flex items-center justify-between mb-6">
//           <button
//             onClick={() => navigate(checkoutMode === 'credit' ? '/' : '/billing')}
//             className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span>Back</span>
//           </button>
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 flex items-center justify-center">
//               <Wallet className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-semibold text-slate-800">
//               {checkoutMode === 'credit' ? 'Get Credits' : 'Checkout'}
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl border border-slate-200">
//               <div className="p-5 border-b border-slate-100">
//                 <h2 className="text-lg font-semibold text-slate-800">
//                   {checkoutMode === 'credit' ? 'Select & Customize Your Pack' : 'Complete Payment'}
//                 </h2>
//                 <p className="text-sm text-slate-500">
//                   {checkoutMode === 'credit' ? 'Add extra messages as needed' : 'Secure payment gateway'}
//                 </p>
//               </div>

//               <form onSubmit={handlePayClick} className="p-5 space-y-5">
//                 {checkoutMode === 'credit' && (
//                   <div className="space-y-4">
//                     {CREDIT_PLANS.map((plan) => {
//                       const PlanIcon = plan.icon;
//                       const additionalMessages = creditExtraMessages[plan.id] || 0;
//                       const { totalMessages, totalPrice, additionalCost } = calculateTotalForCreditPlan(plan, additionalMessages);
//                       const isSelected = selectedCreditPlan === plan.id;
                      
//                       return (
//                         <div
//                           key={plan.id}
//                           className={`relative rounded-xl border-2 transition-all ${
//                             isSelected
//                               ? 'border-indigo-500 bg-indigo-50/30'
//                               : 'border-slate-200 hover:border-indigo-300'
//                           }`}
//                         >
//                           <div className="p-4 cursor-pointer" onClick={() => handleSelectCreditPlan(plan.id)}>
//                             <div className="flex items-start justify-between">
//                               <div className="flex items-start gap-3">
//                                 <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-sm`}>
//                                   <PlanIcon className="w-6 h-6 text-white" />
//                                 </div>
//                                 <div>
//                                   <div className="flex items-center gap-2">
//                                     <h3 className="font-semibold text-slate-800">{plan.name}</h3>
//                                     {plan.badge && (
//                                       <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full">
//                                         {plan.badge}
//                                       </span>
//                                     )}
//                                   </div>
//                                   <p className="text-sm text-slate-500 mt-1">
//                                     Base: {plan.messages.toLocaleString()} messages
//                                   </p>
//                                   <p className="text-xs text-slate-400">
//                                     ${plan.perMessageRate.toFixed(4)} per message
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="text-right">
//                                 <p className="text-2xl font-bold text-slate-800">${totalPrice.toFixed(2)}</p>
//                                 <p className="text-xs text-slate-500">{totalMessages.toLocaleString()} total msgs</p>
//                               </div>
//                             </div>

//                             {additionalMessages > 0 && (
//                               <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
//                                 <div className="flex justify-between text-sm">
//                                   <span className="text-slate-600">Base Package:</span>
//                                   <span className="font-medium">{plan.messages.toLocaleString()} messages</span>
//                                 </div>
//                                 <div className="flex justify-between text-sm mt-1">
//                                   <span className="text-slate-600">Extra Messages:</span>
//                                   <span className="font-medium text-emerald-600">+{additionalMessages.toLocaleString()} messages</span>
//                                 </div>
//                                 <div className="flex justify-between text-sm mt-1 pt-1 border-t border-emerald-200">
//                                   <span className="font-semibold">Total:</span>
//                                   <span className="font-bold">{totalMessages.toLocaleString()} messages</span>
//                                 </div>
//                                 <div className="flex justify-between text-xs mt-1">
//                                   <span className="text-slate-500">Extra cost:</span>
//                                   <span className="text-emerald-600">+${additionalCost.toFixed(2)}</span>
//                                 </div>
//                               </div>
//                             )}
//                           </div>

//                           <div className="px-4 pb-4 pt-2 border-t border-slate-100">
//                             <div className="flex items-center justify-between gap-3">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => handleRemoveMessages(plan.id)}
//                                   className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
//                                   disabled={additionalMessages === 0}
//                                 >
//                                   <Minus className="w-4 h-4 text-slate-600" />
//                                 </button>
//                                 <div className="relative">
//                                   <input
//                                     type="number"
//                                     value={additionalMessages}
//                                     onChange={(e) => handleCustomQuantityChange(plan.id, e.target.value)}
//                                     className="w-32 px-3 py-2 text-center border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                                     step={plan.minAdd}
//                                     min="0"
//                                   />
//                                   <Edit2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400" />
//                                 </div>
//                                 <button
//                                   type="button"
//                                   onClick={() => handleAddMessages(plan.id)}
//                                   className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 transition-colors"
//                                 >
//                                   <Plus className="w-4 h-4 text-emerald-600" />
//                                 </button>
//                               </div>
//                               <div className="text-sm text-slate-500">
//                                 +{plan.minAdd.toLocaleString()} msgs
//                               </div>
//                               {isSelected && (
//                                 <div className="ml-auto">
//                                   <CheckCircle className="w-5 h-5 text-emerald-500" />
//                                 </div>
//                               )}
//                             </div>
//                             <p className="text-xs text-slate-400 mt-2">
//                               Each click adds {plan.minAdd.toLocaleString()} messages (${(plan.minAdd * plan.perMessageRate).toFixed(2)})
//                             </p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}

//                 {checkoutMode === 'plan' && selectedPlanData && (
//                   <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="font-semibold text-slate-800">{selectedPlanData.planName}</h3>
//                         <p className="text-xs text-slate-500 mt-1">
//                           {selectedPlanData.planType} • {selectedPlanData.billingCycle}
//                         </p>
//                         {selectedPlanData.messages && (
//                           <p className="text-xs text-emerald-600 mt-1">{selectedPlanData.messages}</p>
//                         )}
//                       </div>
//                       <div className="text-right">
//                         <p className="text-2xl font-bold text-slate-800">${parseFloat(selectedPlanData.amount).toFixed(2)}</p>
//                         <p className="text-xs text-slate-400">Total amount</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
//                   <div className="grid grid-cols-3 gap-3 mb-4">
//                     {[
//                       { id: 'card', label: 'Credit Card', icon: CreditCard },
//                       { id: 'upi', label: 'UPI', icon: Smartphone },
//                       { id: 'bank', label: 'Bank Transfer', icon: Building },
//                     ].map((method) => (
//                       <button
//                         key={method.id}
//                         type="button"
//                         onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
//                         className={`flex items-center justify-center gap-2 p-3 border-2 rounded-lg transition-all ${
//                           formData.paymentMethod === method.id
//                             ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
//                             : 'border-slate-200 text-slate-600 hover:border-indigo-300'
//                         }`}
//                       >
//                         <method.icon className="w-4 h-4" />
//                         <span className="text-sm">{method.label}</span>
//                       </button>
//                     ))}
//                   </div>

//                   {formData.paymentMethod === 'card' && (
//                     <div className="space-y-3">
//                       <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500" />
//                       {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
//                       <input type="text" name="cardName" placeholder="Cardholder Name" value={formData.cardName} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm" />
//                       {errors.cardName && <p className="text-red-500 text-xs">{errors.cardName}</p>}
//                       <div className="grid grid-cols-2 gap-4">
//                         <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} className="px-4 py-2 border border-slate-200 rounded-lg text-sm" />
//                         <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} className="px-4 py-2 border border-slate-200 rounded-lg text-sm" />
//                       </div>
//                     </div>
//                   )}

//                   {formData.paymentMethod === 'upi' && (
//                     <input type="text" name="upiId" placeholder="UPI ID (e.g., name@okhdfcbank)" value={formData.upiId} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm" />
//                   )}

//                   {formData.paymentMethod === 'bank' && (
//                     <div className="space-y-3">
//                       <input type="text" name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm" />
//                       <input type="text" name="ifscCode" placeholder="IFSC Code" value={formData.ifscCode} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm" />
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading || !formData.amount}
//                   className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Processing...
//                     </div>
//                   ) : (
//                     `Pay $${parseFloat(formData.amount || 0).toFixed(2)}`
//                   )}
//                 </button>

//                 <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
//                   <Lock className="w-3 h-3" />
//                   <span>256-bit SSL encrypted payment</span>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-5">
//             <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-xl p-5 text-white">
//               <div className="flex justify-between items-center mb-3">
//                 <span className="text-sm opacity-90">Wallet Balance</span>
//                 <Wallet className="w-5 h-5 opacity-90" />
//               </div>
//               <div className="text-3xl font-bold">
//                 ${parseFloat(localStorage.getItem('wallet_balance') || '0').toFixed(2)}
//               </div>
//               {(checkoutMode === 'credit' || localStorage.getItem('wallet_message_credits')) && (
//                 <div className="mt-2 pt-2 border-t border-white/20">
//                   <div className="flex justify-between text-xs">
//                     <span className="opacity-80">Message Credits:</span>
//                     <span className="font-semibold">
//                       {parseInt(localStorage.getItem('wallet_message_credits') || '0').toLocaleString()} msgs
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="bg-white rounded-xl p-5 border border-slate-200">
//               <h3 className="font-semibold text-slate-800 mb-3">Order Summary</h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-slate-600">Amount</span>
//                   <span className="font-medium">${parseFloat(formData.amount || 0).toFixed(2)}</span>
//                 </div>
//                 {checkoutMode === 'credit' && selectedCreditDetails && (
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Total Messages</span>
//                     <span className="font-medium">{selectedCreditDetails.totalMessages.toLocaleString()}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between pt-2 border-t border-slate-200">
//                   <span className="font-semibold">Total</span>
//                   <span className="font-bold text-emerald-600">${parseFloat(formData.amount || 0).toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-5 border border-slate-200">
//               <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
//                 <Shield className="w-4 h-4 text-emerald-600" />
//                 Secure Payment
//               </h3>
//               <div className="space-y-2 text-xs text-slate-500">
//                 <p>✓ PCI DSS compliant</p>
//                 <p>✓ 256-bit encryption</p>
//                 <p>✓ Instant wallet top-up</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showConfirmModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
//                     <AlertCircle className="w-5 h-5 text-amber-600" />
//                   </div>
//                   <h3 className="text-lg font-bold text-slate-800">Confirm Payment</h3>
//                 </div>
//                 <button
//                   onClick={() => setShowConfirmModal(false)}
//                   className="p-1.5 rounded-lg hover:bg-slate-100 transition"
//                 >
//                   <X className="w-4 h-4 text-slate-500" />
//                 </button>
//               </div>

//               <div className="space-y-4 mb-6">
//                 <div className="bg-slate-50 rounded-lg p-4">
//                   <p className="text-sm text-slate-600 mb-3 flex items-center gap-2">
//                     <Info className="w-4 h-4 text-indigo-500" />
//                     Please review your payment details
//                   </p>
                  
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-slate-600">Payment Method:</span>
//                       <span className="font-medium text-slate-800 capitalize">{formData.paymentMethod}</span>
//                     </div>
                    
//                     {checkoutMode === 'credit' && selectedCreditDetails && (
//                       <>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-slate-600">Plan:</span>
//                           <span className="font-medium text-slate-800">
//                             {CREDIT_PLANS.find(p => p.id === selectedCreditPlan)?.name}
//                           </span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-slate-600">Total Messages:</span>
//                           <span className="font-medium text-slate-800">{selectedCreditDetails.totalMessages.toLocaleString()}</span>
//                         </div>
//                         {selectedCreditDetails.additionalMessages > 0 && (
//                           <div className="flex justify-between text-sm">
//                             <span className="text-slate-600">Extra Messages:</span>
//                             <span className="font-medium text-emerald-600">+{selectedCreditDetails.additionalMessages.toLocaleString()}</span>
//                           </div>
//                         )}
//                       </>
//                     )}

//                     {checkoutMode === 'plan' && selectedPlanData && (
//                       <>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-slate-600">Plan:</span>
//                           <span className="font-medium text-slate-800">{selectedPlanData.planName}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-slate-600">Billing:</span>
//                           <span className="font-medium text-slate-800">{selectedPlanData.billingCycle}</span>
//                         </div>
//                       </>
//                     )}

//                     <div className="flex justify-between pt-2 border-t border-slate-200">
//                       <span className="text-base font-semibold text-slate-800">Total Amount:</span>
//                       <span className="text-2xl font-bold text-emerald-600">
//                         ${parseFloat(formData.amount || 0).toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {formData.paymentMethod === 'card' && (
//                   <div className="text-xs text-slate-500 bg-indigo-50 p-3 rounded-lg">
//                     <p>💳 Card: **** **** **** {formData.cardNumber.slice(-4)}</p>
//                     <p>👤 {formData.cardName}</p>
//                   </div>
//                 )}
//                 {formData.paymentMethod === 'upi' && (
//                   <div className="text-xs text-slate-500 bg-indigo-50 p-3 rounded-lg">
//                     <p>📱 UPI ID: {formData.upiId}</p>
//                   </div>
//                 )}
//                 {formData.paymentMethod === 'bank' && (
//                   <div className="text-xs text-slate-500 bg-indigo-50 p-3 rounded-lg">
//                     <p>🏦 Account: ****{formData.accountNumber.slice(-4)}</p>
//                     <p>🏛️ IFSC: {formData.ifscCode}</p>
//                   </div>
//                 )}
//               </div>

//               <div className="mb-6 p-3 bg-amber-50 rounded-lg border border-amber-200">
//                 <p className="text-xs text-amber-800 flex items-start gap-2">
//                   <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
//                   <span>By confirming this payment, you agree to our terms of service. This transaction is final and non-refundable.</span>
//                 </p>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowConfirmModal(false)}
//                   className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirmPayment}
//                   className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm"
//                 >
//                   Confirm & Pay
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WalletCheckout;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  CreditCard,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Lock,
  Smartphone,
  Building,
  Shield,
  Send,
  MessageSquare,
  Users,
  Zap,
  Plus,
  Minus,
  Edit2,
  Package,
  Rocket,
  TrendingUp,
  Star,
  DollarSign,
  X,
  Info,
  Sparkles,
  Gift,
} from 'lucide-react';

// Credit plans configuration (unchanged)
const CREDIT_PLANS = [
  {
    id: 'basic',
    name: 'Basic Pack',
    price: 49,
    messages: 10000,
    perMessageRate: 0.0049,
    minAdd: 1000,
    icon: Package,
    gradient: 'from-emerald-500 to-green-600',
    popular: false,
    badge: null,
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    price: 99,
    messages: 50000,
    perMessageRate: 0.00198,
    minAdd: 5000,
    icon: Rocket,
    gradient: 'from-blue-500 to-indigo-600',
    popular: true,
    badge: 'Popular',
  },
  {
    id: 'business',
    name: 'Business Pack',
    price: 199,
    messages: 100000,
    perMessageRate: 0.00199,
    minAdd: 10000,
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-600',
    popular: false,
    badge: 'Best Value',
  },
];

// Simple confetti effect
function useConfetti(active) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId = null;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const particleCount = 180;
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 6 + 2,
        speedX: (Math.random() - 0.5) * 3,
        speedY: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 5,
      });
    }

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let p of particlesRef.current) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.spin;
        if (p.y > height + 50) {
          p.y = -50;
          p.x = Math.random() * width;
        }
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [active]);

  return canvasRef;
}

const WalletCheckout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState(null);
  const [checkoutMode, setCheckoutMode] = useState('plan');
  const [selectedCreditPlan, setSelectedCreditPlan] = useState(null);
  const [creditExtraMessages, setCreditExtraMessages] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    accountNumber: '',
    ifscCode: '',
  });
  const [errors, setErrors] = useState({});

  const isSuccess = paymentSuccess && step === 3;
  const confettiCanvasRef = useConfetti(isSuccess);

  useEffect(() => {
    const initialQuantities = {};
    CREDIT_PLANS.forEach(plan => {
      initialQuantities[plan.id] = 0;
    });
    setCreditExtraMessages(initialQuantities);
  }, []);

  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    const mode = localStorage.getItem('checkoutMode');
    
    if (mode === 'credit_purchase') {
      setCheckoutMode('credit');
      localStorage.removeItem('checkoutMode');
    } else if (savedPlan) {
      const plan = JSON.parse(savedPlan);
      setSelectedPlanData(plan);
      setFormData(prev => ({ ...prev, amount: plan.amount.toString() }));
      setCheckoutMode('plan');
      localStorage.removeItem('selectedPlan');
    }
  }, []);

  const calculateTotalForCreditPlan = (plan, additionalMessages) => {
    const totalMessages = plan.messages + additionalMessages;
    const additionalCost = additionalMessages * plan.perMessageRate;
    const totalPrice = plan.price + additionalCost;
    return { totalMessages, totalPrice, additionalCost, additionalMessages };
  };

  const handleAddMessages = (planId) => {
    const plan = CREDIT_PLANS.find(p => p.id === planId);
    setCreditExtraMessages(prev => ({
      ...prev,
      [planId]: prev[planId] + (plan?.minAdd || 1000)
    }));
    if (!selectedCreditPlan) {
      setSelectedCreditPlan(planId);
    }
  };

  const handleRemoveMessages = (planId) => {
    setCreditExtraMessages(prev => ({
      ...prev,
      [planId]: Math.max(0, prev[planId] - (CREDIT_PLANS.find(p => p.id === planId)?.minAdd || 1000))
    }));
  };

  const handleCustomQuantityChange = (planId, value) => {
    const numValue = parseInt(value) || 0;
    const plan = CREDIT_PLANS.find(p => p.id === planId);
    const minAdd = plan?.minAdd || 1000;
    const roundedValue = Math.round(numValue / minAdd) * minAdd;
    setCreditExtraMessages(prev => ({
      ...prev,
      [planId]: Math.max(0, roundedValue)
    }));
  };

  const handleSelectCreditPlan = (planId) => {
    setSelectedCreditPlan(planId);
    const plan = CREDIT_PLANS.find(p => p.id === planId);
    const additionalMessages = creditExtraMessages[planId] || 0;
    const { totalPrice } = calculateTotalForCreditPlan(plan, additionalMessages);
    setFormData(prev => ({ ...prev, amount: totalPrice.toFixed(2) }));
  };

  const getSelectedCreditPlanDetails = () => {
    if (!selectedCreditPlan) return null;
    const plan = CREDIT_PLANS.find(p => p.id === selectedCreditPlan);
    const additionalMessages = creditExtraMessages[selectedCreditPlan] || 0;
    return calculateTotalForCreditPlan(plan, additionalMessages);
  };

  const selectedCreditDetails = getSelectedCreditPlanDetails();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please select a plan';
    }

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.cardName) newErrors.cardName = 'Cardholder name required';
      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        newErrors.expiryDate = 'MM/YY format';
      }
      if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.cvv = 'Valid CVV required';
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.match(/^[\w.-]+@[\w.-]+$/)) {
        newErrors.upiId = 'Valid UPI ID required';
      }
    } else if (formData.paymentMethod === 'bank') {
      if (!formData.accountNumber) newErrors.accountNumber = 'Account number required';
      if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmPayment = async () => {
    setShowConfirmModal(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      setStep(3);
      
      let transactionDetails = {};
      let creditMessagesAdded = 0;
      
      if (checkoutMode === 'credit' && selectedCreditPlan) {
        const plan = CREDIT_PLANS.find(p => p.id === selectedCreditPlan);
        const additionalMessages = creditExtraMessages[selectedCreditPlan] || 0;
        const { totalMessages, totalPrice } = calculateTotalForCreditPlan(plan, additionalMessages);
        creditMessagesAdded = totalMessages;
        transactionDetails = {
          amount: totalPrice,
          plan: plan.name,
          messages: totalMessages,
          extraMessages: additionalMessages,
          type: 'credit_purchase',
        };
      } else if (selectedPlanData) {
        transactionDetails = {
          amount: parseFloat(formData.amount),
          plan: selectedPlanData.planName,
          planType: selectedPlanData.planType,
          type: 'plan_purchase',
        };
      }
      
      const transaction = {
        id: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: transactionDetails.amount,
        date: new Date().toISOString(),
        method: formData.paymentMethod,
        ...transactionDetails,
        status: 'successful',
      };
      
      const transactions = JSON.parse(localStorage.getItem('wallet_transactions') || '[]');
      transactions.push(transaction);
      localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
      
      const currentBalance = parseFloat(localStorage.getItem('wallet_balance') || '0');
      let newBalance;
      
      if (checkoutMode === 'credit' && creditMessagesAdded > 0) {
        const currentCredits = parseFloat(localStorage.getItem('wallet_message_credits') || '0');
        const newCredits = currentCredits + creditMessagesAdded;
        localStorage.setItem('wallet_message_credits', newCredits.toString());
        newBalance = currentBalance;
      } else {
        newBalance = currentBalance + transactionDetails.amount;
        localStorage.setItem('wallet_balance', newBalance.toString());
      }
      
      window.dispatchEvent(new CustomEvent('walletUpdate', { 
        detail: { 
          balance: newBalance,
          messageCredits: localStorage.getItem('wallet_message_credits') || '0'
        } 
      }));
    }, 2000);
  };

  // 🎉 Celebratory Success Screen
  if (paymentSuccess && step === 3) {
    const selectedDetails = checkoutMode === 'credit' && selectedCreditDetails;
    const successTitle = checkoutMode === 'credit' ? 'Messages Added Successfully!' : 'Wallet Top-up Complete!';
    const successMessage = checkoutMode === 'credit' && selectedDetails
      ? `${selectedDetails.totalMessages.toLocaleString()} messages have been added to your account.`
      : `$${parseFloat(formData.amount).toFixed(2)} has been added to your wallet.`;
    
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Confetti canvas */}
        <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-10" />
        
        {/* Floating decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
        </div>

        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center relative z-20 transform transition-all animate-fade-in-up">
          {/* Success icon with rings */}
          <div className="relative inline-flex justify-center mb-6">
            <div className="absolute inset-0 animate-ping-slow">
              <div className="w-24 h-24 rounded-full bg-emerald-200 opacity-30" />
            </div>
            <div className="absolute inset-0 animate-ping-slower">
              <div className="w-24 h-24 rounded-full bg-emerald-300 opacity-20" />
            </div>
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-indigo-500 rounded-full flex items-center justify-center relative z-10 shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Thank you title */}
          <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
            {successTitle}
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </h2>
          
          <p className="text-slate-600 mt-2">{successMessage}</p>
          
          {checkoutMode === 'credit' && selectedDetails && selectedDetails.additionalMessages > 0 && (
            <div className="mt-3 text-sm text-emerald-600 bg-emerald-50 rounded-lg p-2 inline-block mx-auto">
              +{selectedDetails.additionalMessages.toLocaleString()} extra messages!
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-3">✨ You're all set! ✨</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              Go to Dashboard
            </button>
          </div>
        </div>

        {/* Add custom keyframes animations */}
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
            100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          }
          @keyframes ping-slow {
            0% { transform: scale(0.8); opacity: 0.6; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          @keyframes ping-slower {
            0% { transform: scale(0.9); opacity: 0.4; }
            100% { transform: scale(1.8); opacity: 0; }
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-float {
            animation: float linear infinite;
          }
          .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .animate-ping-slower {
            animation: ping-slower 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  // Original checkout UI (unchanged except success screen replaced)
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(checkoutMode === 'credit' ? '/' : '/billing')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-800">
              {checkoutMode === 'credit' ? 'Get Credits' : 'Checkout'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-800">
                  {checkoutMode === 'credit' ? 'Select & Customize Your Pack' : 'Complete Payment'}
                </h2>
                <p className="text-sm text-slate-500">
                  {checkoutMode === 'credit' ? 'Add extra messages as needed' : 'Secure payment gateway'}
                </p>
              </div>

              <form onSubmit={handlePayClick} className="p-5 space-y-5">
                {checkoutMode === 'credit' && (
                  <div className="space-y-4">
                    {CREDIT_PLANS.map((plan) => {
                      const PlanIcon = plan.icon;
                      const additionalMessages = creditExtraMessages[plan.id] || 0;
                      const { totalMessages, totalPrice, additionalCost } = calculateTotalForCreditPlan(plan, additionalMessages);
                      const isSelected = selectedCreditPlan === plan.id;
                      
                      return (
                        <div
                          key={plan.id}
                          className={`relative rounded-xl border-2 transition-all ${
                            isSelected
                              ? 'border-indigo-500 bg-indigo-50/30'
                              : 'border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          <div className="p-4 cursor-pointer" onClick={() => handleSelectCreditPlan(plan.id)}>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-sm`}>
                                  <PlanIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-slate-800">{plan.name}</h3>
                                    {plan.badge && (
                                      <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full">
                                        {plan.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-slate-500 mt-1">
                                    Base: {plan.messages.toLocaleString()} messages
                                  </p>
                                  <p className="text-xs text-slate-400">
                                    ${plan.perMessageRate.toFixed(4)} per message
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-slate-800">${totalPrice.toFixed(2)}</p>
                                <p className="text-xs text-slate-500">{totalMessages.toLocaleString()} total msgs</p>
                              </div>
                            </div>

                            {additionalMessages > 0 && (
                              <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">Base Package:</span>
                                  <span className="font-medium">{plan.messages.toLocaleString()} messages</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                  <span className="text-slate-600">Extra Messages:</span>
                                  <span className="font-medium text-emerald-600">+{additionalMessages.toLocaleString()} messages</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1 pt-1 border-t border-emerald-200">
                                  <span className="font-semibold">Total:</span>
                                  <span className="font-bold">{totalMessages.toLocaleString()} messages</span>
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span className="text-slate-500">Extra cost:</span>
                                  <span className="text-emerald-600">+${additionalCost.toFixed(2)}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="px-4 pb-4 pt-2 border-t border-slate-100">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMessages(plan.id)}
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                                  disabled={additionalMessages === 0}
                                >
                                  <Minus className="w-4 h-4 text-slate-600" />
                                </button>
                                <div className="relative">
                                  <input
                                    type="number"
                                    value={additionalMessages}
                                    onChange={(e) => handleCustomQuantityChange(plan.id, e.target.value)}
                                    className="w-32 px-3 py-2 text-center border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    step={plan.minAdd}
                                    min="0"
                                  />
                                  <Edit2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400" />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAddMessages(plan.id)}
                                  className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 transition-colors"
                                >
                                  <Plus className="w-4 h-4 text-emerald-600" />
                                </button>
                              </div>
                              <div className="text-sm text-slate-500">
                                +{plan.minAdd.toLocaleString()} msgs
                              </div>
                              {isSelected && (
                                <div className="ml-auto">
                                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                              Each click adds {plan.minAdd.toLocaleString()} messages (${(plan.minAdd * plan.perMessageRate).toFixed(2)})
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {checkoutMode === 'plan' && selectedPlanData && (
                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-slate-800">{selectedPlanData.planName}</h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {selectedPlanData.planType} • {selectedPlanData.billingCycle}
                        </p>
                        {selectedPlanData.messages && (
                          <p className="text-xs text-emerald-600 mt-1">{selectedPlanData.messages}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-800">${parseFloat(selectedPlanData.amount).toFixed(2)}</p>
                        <p className="text-xs text-slate-400">Total amount</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { id: 'card', label: 'Credit Card', icon: CreditCard },
                      { id: 'upi', label: 'UPI', icon: Smartphone },
                      { id: 'bank', label: 'Bank Transfer', icon: Building },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={`flex items-center justify-center gap-2 p-3 border-2 rounded-lg transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                        }`}
                      >
                        <method.icon className="w-4 h-4" />
                        <span className="text-sm">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500" />
                      {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
                      <input type="text" name="cardName" placeholder="Cardholder Name" value={formData.cardName} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm" />
                      {errors.cardName && <p className="text-red-500 text-xs">{errors.cardName}</p>}
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} className="px-4 py-2 border border-slate-200 rounded-lg text-sm" />
                        <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} className="px-4 py-2 border border-slate-200 rounded-lg text-sm" />
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'upi' && (
                    <input type="text" name="upiId" placeholder="UPI ID (e.g., name@okhdfcbank)" value={formData.upiId} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm" />
                  )}

                  {formData.paymentMethod === 'bank' && (
                    <div className="space-y-3">
                      <input type="text" name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm" />
                      <input type="text" name="ifscCode" placeholder="IFSC Code" value={formData.ifscCode} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.amount}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Pay $${parseFloat(formData.amount || 0).toFixed(2)}`
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Lock className="w-3 h-3" />
                  <span>256-bit SSL encrypted payment</span>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-xl p-5 text-white">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm opacity-90">Wallet Balance</span>
                <Wallet className="w-5 h-5 opacity-90" />
              </div>
              <div className="text-3xl font-bold">
                ${parseFloat(localStorage.getItem('wallet_balance') || '0').toFixed(2)}
              </div>
              {(checkoutMode === 'credit' || localStorage.getItem('wallet_message_credits')) && (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <div className="flex justify-between text-xs">
                    <span className="opacity-80">Message Credits:</span>
                    <span className="font-semibold">
                      {parseInt(localStorage.getItem('wallet_message_credits') || '0').toLocaleString()} msgs
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount</span>
                  <span className="font-medium">${parseFloat(formData.amount || 0).toFixed(2)}</span>
                </div>
                {checkoutMode === 'credit' && selectedCreditDetails && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Messages</span>
                    <span className="font-medium">{selectedCreditDetails.totalMessages.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-emerald-600">${parseFloat(formData.amount || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                Secure Payment
              </h3>
              <div className="space-y-2 text-xs text-slate-500">
                <p>✓ PCI DSS compliant</p>
                <p>✓ 256-bit encryption</p>
                <p>✓ Instant wallet top-up</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Confirm Payment</h3>
                </div>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-500" />
                    Please review your payment details
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Payment Method:</span>
                      <span className="font-medium text-slate-800 capitalize">{formData.paymentMethod}</span>
                    </div>
                    
                    {checkoutMode === 'credit' && selectedCreditDetails && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Plan:</span>
                          <span className="font-medium text-slate-800">
                            {CREDIT_PLANS.find(p => p.id === selectedCreditPlan)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Total Messages:</span>
                          <span className="font-medium text-slate-800">{selectedCreditDetails.totalMessages.toLocaleString()}</span>
                        </div>
                        {selectedCreditDetails.additionalMessages > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Extra Messages:</span>
                            <span className="font-medium text-emerald-600">+{selectedCreditDetails.additionalMessages.toLocaleString()}</span>
                          </div>
                        )}
                      </>
                    )}

                    {checkoutMode === 'plan' && selectedPlanData && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Plan:</span>
                          <span className="font-medium text-slate-800">{selectedPlanData.planName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Billing:</span>
                          <span className="font-medium text-slate-800">{selectedPlanData.billingCycle}</span>
                        </div>
                      </>
                    )}

                    <div className="flex justify-between pt-2 border-t border-slate-200">
                      <span className="text-base font-semibold text-slate-800">Total Amount:</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        ${parseFloat(formData.amount || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="text-xs text-slate-500 bg-indigo-50 p-3 rounded-lg">
                    <p>💳 Card: **** **** **** {formData.cardNumber.slice(-4)}</p>
                    <p>👤 {formData.cardName}</p>
                  </div>
                )}
                {formData.paymentMethod === 'upi' && (
                  <div className="text-xs text-slate-500 bg-indigo-50 p-3 rounded-lg">
                    <p>📱 UPI ID: {formData.upiId}</p>
                  </div>
                )}
                {formData.paymentMethod === 'bank' && (
                  <div className="text-xs text-slate-500 bg-indigo-50 p-3 rounded-lg">
                    <p>🏦 Account: ****{formData.accountNumber.slice(-4)}</p>
                    <p>🏛️ IFSC: {formData.ifscCode}</p>
                  </div>
                )}
              </div>

              <div className="mb-6 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>By confirming this payment, you agree to our terms of service. This transaction is final and non-refundable.</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletCheckout;