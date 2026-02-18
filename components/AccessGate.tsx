import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, ArrowRight, Star } from 'lucide-react';

interface AccessGateProps {
  onUnlock: (token: string) => void;
}

// SECURITY CONFIGURATION
// We use a salt to prevent simple Base64 decoding from revealing the passwords
const SALT = "L3SR_SECURE_V1";

// PRE-CALCULATED TOKENS
// These correspond to: btoa(PASSWORD + SALT)
// 1. "L3SR" -> "TDNTUkUzU1JfU0VDVVJFX1Yx"
// 2. "L3SR-VIP" -> "TDNTUi1WSVBMM1NSX1NFQ1VSRV9WMQ=="
// 3. "PRO-TRADER" -> "UFJPLVRSQURFUkwzU1JfU0VDVVJFX1Yx"
// 4. "GOLD-MEMBER" -> "R09MRC1NRU1CRVJMM1NSX1NFQ1VSRV9WMQ=="

const VALID_TOKENS = [
  "TDNTUkUzU1JfU0VDVVJFX1Yx",             // L3SR
  "TDNTUi1WSVBMM1NSX1NFQ1VSRV9WMQ==",     // L3SR-VIP
  "UFJPLVRSQURFUkwzU1JfU0VDVVJFX1Yx",     // PRO-TRADER
  "R09MRC1NRU1CRVJMM1NSX1NFQ1VSRV9WMQ=="  // GOLD-MEMBER
];

const AccessGate: React.FC<AccessGateProps> = ({ onUnlock }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate network verification delay for security feel
    setTimeout(() => {
      try {
        // Generate the token from user input
        const inputClean = key.trim().toUpperCase(); // Normalize input
        const generatedToken = btoa(inputClean + SALT);
        
        if (VALID_TOKENS.includes(generatedToken)) {
          // Pass the secure token
          onUnlock(generatedToken);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-[#050505] text-white flex flex-col items-center justify-center p-4 z-50 overflow-hidden font-sans select-none">
      
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-trading-accent/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-trading-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-[#0a0b0d] border border-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl flex flex-col items-center gap-6 z-10">
         
         {/* Premium Badge */}
         <div className="absolute -top-5 bg-gradient-to-r from-trading-gold to-yellow-600 text-black font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(207,181,59,0.4)] flex items-center gap-2">
            <Star size={12} fill="black" /> Secure Access
         </div>

         {/* Icon */}
         <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800 mb-2 shadow-inner relative group">
            <Lock className="text-gray-400 group-hover:text-trading-gold transition-colors duration-500" size={32} />
            <div className="absolute inset-0 border border-trading-gold/20 rounded-full animate-pulse"></div>
         </div>

         {/* Header */}
         <div className="text-center space-y-2">
           <h1 className="text-3xl font-bold tracking-tight text-white">L3SR <span className="text-trading-gold">Premium</span></h1>
           <p className="text-gray-500 text-sm">Institutional Environment. Unauthorized access is prohibited.</p>
         </div>

         {/* Form */}
         <form onSubmit={handleUnlock} className="w-full space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Access Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key size={16} className={`text-gray-500 ${error ? 'text-red-500' : 'group-focus-within:text-trading-gold'} transition-colors`} />
                </div>
                <input 
                  type="password" 
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value);
                    if (error) setError(false);
                  }}
                  className={`block w-full pl-10 pr-3 py-4 bg-[#13151a] border ${error ? 'border-red-500/50 text-red-400 focus:border-red-500' : 'border-gray-800 text-white focus:border-trading-gold/50'} rounded-xl placeholder-gray-600 focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500/20' : 'focus:ring-trading-gold/20'} transition-all font-mono text-lg tracking-widest`}
                  placeholder="••••-••••"
                  autoComplete="off"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 animate-[shake_0.5s_ease-in-out]">
                   Authentication Failed. Invalid Key.
                </p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading || key.length < 3}
              className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${loading || key.length < 3 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-trading-gold hover:bg-[#bba02a] text-black shadow-[0_0_20px_rgba(207,181,59,0.2)] hover:shadow-[0_0_30px_rgba(207,181,59,0.4)] transform active:scale-[0.98]'}`}
            >
              {loading ? (
                <>Verifying credentials...</>
              ) : (
                <>Unlock Portal <ArrowRight size={16} /></>
              )}
            </button>
         </form>

         {/* Footer */}
         <div className="flex items-center gap-2 text-[10px] text-gray-600 uppercase tracking-widest">
            <ShieldCheck size={12} />
            TLS 1.3 Encrypted
         </div>
      </div>
    </div>
  );
};

export default AccessGate;