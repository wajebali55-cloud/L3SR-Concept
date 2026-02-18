import React, { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentProps {
  onReadPolicy: () => void;
  onAccept: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onReadPolicy, onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('l3sr_cookie_consent');
    if (!consent) {
      // Delay showing it slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('l3sr_cookie_consent', 'true');
    onAccept(); // Notify App to upgrade session to persistent
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('l3sr_cookie_consent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 flex justify-center pointer-events-none"
        >
          <div className="bg-[#13151a]/95 backdrop-blur-md border border-gray-800 shadow-2xl rounded-2xl p-6 max-w-4xl w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pointer-events-auto relative overflow-hidden">
            
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-trading-gold/50 to-transparent"></div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-trading-gold/10 p-2 rounded-lg text-trading-gold">
                   <Cookie size={20} />
                </div>
                <h3 className="text-white font-bold text-lg">We value your privacy</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                We use cookies and local storage to enhance your experience, save your simulator progress, and maintain your trading journal. We do not track your personal data across other websites.
              </p>
              <button 
                onClick={onReadPolicy}
                className="mt-2 text-xs text-trading-gold hover:text-white underline underline-offset-4 flex items-center gap-1 transition-colors"
              >
                Read our Cookie Policy <ChevronRight size={10} />
              </button>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={handleDecline}
                className="px-5 py-3 rounded-xl border border-gray-700 text-gray-400 font-bold text-sm hover:bg-gray-800 hover:text-white transition-all flex-1 md:flex-none whitespace-nowrap"
              >
                Decline
              </button>
              <button 
                onClick={handleAccept}
                className="px-6 py-3 rounded-xl bg-trading-gold text-black font-bold text-sm hover:bg-[#bba02a] shadow-lg shadow-trading-gold/10 transition-all flex items-center justify-center gap-2 flex-1 md:flex-none whitespace-nowrap"
              >
                <ShieldCheck size={16} /> Accept All
              </button>
            </div>

            {/* Close X (Optional, treats as decline or just close) */}
            <button 
               onClick={handleDecline}
               className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
            >
               <X size={16} />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;