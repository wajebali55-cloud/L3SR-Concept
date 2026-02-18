import React, { useState, useEffect } from 'react';
import { PageState } from './types';
import ConceptGuide from './components/ConceptGuide';
import ScenarioSimulator from './components/ScenarioSimulator';
import AccessGate from './components/AccessGate';
import L3SRTimer from './components/L3SRTimer';
import TradeJournal from './components/TradeJournal';
import PreFlightChecklist from './components/PreFlightChecklist';
import AccuracyGuide from './components/AccuracyGuide';
import LegalDocs from './components/LegalDocs';
import CookieConsent from './components/CookieConsent';
import RiskSplash from './components/RiskSplash'; // Import the new Splash Screen
import { BookOpen, Gamepad2, TrendingUp, Menu, X, Github, Crown, LogOut, Globe, AlertOctagon, Signal, BarChart2, Headphones, Eye, PlayCircle, Target, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [page, setPage] = useState<PageState>(PageState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isWidgetMode, setIsWidgetMode] = useState(false);
  
  // New State: Controls the initial Horror/Risk Splash Screen
  // We default to TRUE unless we find a session, then we might skip it (optional, but let's keep it for drama)
  const [showRiskSplash, setShowRiskSplash] = useState(true);

  // Security: Check for valid session token on load
  useEffect(() => {
    // 1. Check LocalStorage (Persistent)
    let token = localStorage.getItem('__l3sr_secure_session_v1');
    
    // 2. If not found, Check SessionStorage (Temporary per tab)
    if (!token) {
      token = sessionStorage.getItem('__l3sr_secure_session_v1');
    }
    
    // Validate the token format
    if (token && token.length > 5 && /^[0-9a-f]+$/i.test(token)) {
      setIsAuthenticated(true);
      // Optional: If they are already logged in, maybe skip the splash? 
      // For now, let's keep the splash because the user asked for it to be the "First screen"
      // But for better UX, if authenticated, we could set showRiskSplash(false).
      // Let's keep it true to satisfy "Open website -> Horror Screen".
    }
    setIsCheckingAuth(false);

    // Extra runtime protection
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Window Resize Listener for Widget Mode
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isSmallBox = w < 550 && h < 650;
      const isStrip = h < 500;

      if (isSmallBox || isStrip) {
        setIsWidgetMode(true);
      } else {
        setIsWidgetMode(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (token: string) => {
    // Check if user has consented to cookies/storage
    const hasConsent = localStorage.getItem('l3sr_cookie_consent') === 'true';

    if (hasConsent) {
      // If consented, save to LocalStorage (Persists across browser restarts)
      localStorage.setItem('__l3sr_secure_session_v1', token);
    } else {
      // If NOT consented, save to SessionStorage (Lost when tab/browser closes)
      sessionStorage.setItem('__l3sr_secure_session_v1', token);
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear from both locations to be safe
    localStorage.removeItem('__l3sr_secure_session_v1');
    sessionStorage.removeItem('__l3sr_secure_session_v1');
    setIsAuthenticated(false);
    setPage(PageState.HOME);
    setShowRiskSplash(true); // Reset splash on logout
  };

  // Called when user clicks "Accept All" on the banner
  const handleCookieAccept = () => {
    // If the user is currently logged in via SessionStorage, move it to LocalStorage for persistence
    const sessionToken = sessionStorage.getItem('__l3sr_secure_session_v1');
    if (sessionToken) {
      localStorage.setItem('__l3sr_secure_session_v1', sessionToken);
      // We keep it in session too just in case, or we can remove it. Keeping it is fine.
    }
  };

  const navigate = (p: PageState) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isCheckingAuth) return null;

  // --- VIEW LOGIC ---

  // 1. Show Risk Splash Screen First
  if (showRiskSplash) {
    return <RiskSplash onEnter={() => setShowRiskSplash(false)} />;
  }

  // 2. Then Show Access Gate (Login)
  if (!isAuthenticated) {
    return <AccessGate onUnlock={handleLogin} />;
  }

  // 3. Widget Mode Check
  if (isWidgetMode) {
    return <L3SRTimer mode="widget" onToggleMode={() => setIsWidgetMode(false)} />;
  }

  // 4. Main App Render
  // --- DUMMY DATA FOR WIDGETS ---
  const currentHour = new Date().getHours();
  const session = currentHour >= 8 && currentHour < 16 ? 'LONDON' : currentHour >= 13 && currentHour < 21 ? 'NEW YORK' : 'ASIAN';
  const volatility = session === 'ASIAN' ? 'LOW' : 'HIGH';

  // Animation Variants
  const pageVariants = {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } }
  };

  const navItemVariants = {
    hover: { scale: 1.05, color: '#ffffff' },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-trading-bg text-trading-text font-sans selection:bg-trading-gold selection:text-black flex flex-col select-none overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-trading-bg/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Area */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => navigate(PageState.HOME)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-trading-gold to-[#8a751f] rounded-lg flex items-center justify-center font-bold text-black shadow-lg shadow-trading-gold/20">
                <Crown size={20} />
              </div>
              <div className="flex flex-col leading-none">
                 <span className="font-bold text-lg tracking-tight text-white">L3SR <span className="text-trading-gold">PREMIUM</span></span>
                 <span className="text-[10px] text-gray-400 uppercase tracking-widest">Masterclass Suite</span>
              </div>
            </motion.div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { label: 'Dashboard', value: PageState.HOME, icon: null },
                { label: 'Strategy Guide', value: PageState.GUIDE, icon: null },
                { label: 'Accuracy Protocol', value: PageState.ACCURACY, icon: null },
                { label: 'Simulator', value: PageState.SIMULATOR, icon: null },
              ].map((item) => (
                <motion.button 
                  key={item.label}
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => navigate(item.value)}
                  className={`${page === item.value ? 'text-white font-semibold' : 'text-gray-400'} text-sm transition-colors relative`}
                >
                  {item.label}
                  {page === item.value && (
                    <motion.div 
                      layoutId="nav-underline" 
                      className="absolute -bottom-5 left-0 right-0 h-0.5 bg-trading-gold" 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}

              <motion.button 
                variants={navItemVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => navigate(PageState.JOURNAL)}
                className={`${page === PageState.JOURNAL ? 'text-trading-gold font-bold' : 'text-gray-400'} text-sm transition-colors flex items-center gap-2`}
              >
                <BarChart2 size={16} />
                Journal
              </motion.button>

              <div className="h-6 w-px bg-gray-800"></div>

              <motion.button 
                whileHover={{ scale: 1.05, color: '#f87171' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-2 text-xs uppercase tracking-wider font-bold"
              >
                <LogOut size={14} /> Exit
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-400 hover:text-white p-2">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-trading-card border-b border-gray-800 absolute w-full z-50 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button onClick={() => navigate(PageState.HOME)} className="block px-3 py-3 rounded-md text-base font-medium text-white w-full text-left border-b border-gray-800/50">Dashboard</button>
                <button onClick={() => navigate(PageState.GUIDE)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 w-full text-left border-b border-gray-800/50">Strategy Guide</button>
                <button onClick={() => navigate(PageState.ACCURACY)} className="block px-3 py-3 rounded-md text-base font-medium text-trading-gold w-full text-left border-b border-gray-800/50">Accuracy Protocol</button>
                <button onClick={() => navigate(PageState.SIMULATOR)} className="block px-3 py-3 rounded-md text-base font-medium text-white w-full text-left border-b border-gray-800/50">Simulator</button>
                <button onClick={() => navigate(PageState.JOURNAL)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 w-full text-left border-b border-gray-800/50">My Journal</button>
                <div className="py-2"></div>
                <button onClick={() => navigate(PageState.DISCLAIMER)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-400 w-full text-left">Disclaimer</button>
                <button onClick={() => navigate(PageState.PRIVACY)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-400 w-full text-left">Privacy Policy</button>
                <button onClick={() => navigate(PageState.TERMS)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-400 w-full text-left">Terms & Conditions</button>
                <button onClick={handleLogout} className="block px-3 py-3 rounded-md text-base font-medium text-red-400 w-full text-left flex items-center gap-2 mt-2"><LogOut size={16} /> Exit Session</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === PageState.HOME && (
            <motion.div 
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative"
            >
               {/* Premium Background Effects */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-trading-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* LEFT COLUMN: Welcome & Actions (7 Cols) */}
                  <div className="lg:col-span-7 space-y-8">
                     <div className="text-left">
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-trading-gold/10 border border-trading-gold/20 text-trading-gold text-xs font-bold uppercase tracking-widest mb-6"
                        >
                          <span className="w-2 h-2 rounded-full bg-trading-gold animate-pulse"></span>
                          Authorized Access
                        </motion.div>

                        <motion.h1 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4"
                        >
                          L3SR <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-gold to-yellow-200">Pro Systems</span>
                        </motion.h1>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="max-w-xl text-lg text-gray-400 leading-relaxed"
                        >
                          Eliminate broker lag with the Atomic Timer. Validate every trade using the pre-flight checklist below.
                        </motion.p>
                        
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(PageState.GUIDE)}
                            className="px-6 py-4 bg-trading-gold text-black font-bold rounded-xl hover:bg-[#bba02a] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(207,181,59,0.3)]"
                          >
                            <BookOpen size={20} />
                            Master The Strategy
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(PageState.SIMULATOR)}
                            className="px-6 py-4 bg-[#1a1a1a] text-white font-bold rounded-xl hover:bg-[#252525] border border-gray-800 transition-all flex items-center justify-center gap-2"
                          >
                            <Gamepad2 size={20} />
                            Practice Simulator
                          </motion.button>
                        </div>
                     </div>

                     {/* Quick Stats Widget */}
                     <div className="grid grid-cols-2 gap-4">
                        <motion.div whileHover={{ y: -5 }} className="bg-trading-card p-4 rounded-xl border border-gray-800 flex flex-col gap-2">
                           <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
                             <Globe size={14} /> Active Session
                           </div>
                           <div className="text-xl text-white font-bold">{session}</div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} className="bg-trading-card p-4 rounded-xl border border-gray-800 flex flex-col gap-2">
                           <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
                             <Signal size={14} /> Market Volatility
                           </div>
                           <div className={`text-xl font-bold ${volatility === 'HIGH' ? 'text-green-500' : 'text-orange-500'}`}>
                             {volatility}
                           </div>
                        </motion.div>
                     </div>
                     
                     {/* NEW: Pre-Flight Checklist Widget */}
                     <PreFlightChecklist />
                     
                  </div>

                  {/* RIGHT COLUMN: The Timer (5 Cols) */}
                  <div className="lg:col-span-5">
                     <div className="sticky top-24 space-y-6">
                       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                         <L3SRTimer onToggleMode={() => setIsWidgetMode(true)} />
                       </motion.div>
                       
                       {/* NEW: Updated How to Use Instructions */}
                       <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-trading-card p-5 rounded-xl border border-gray-800"
                       >
                          <h4 className="text-xs text-trading-gold font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                             <Headphones size={14} /> Timer Workflow (Why & How)
                          </h4>
                          
                          <div className="space-y-4">
                             <div className="flex items-start gap-3">
                                <div className="bg-gray-800 p-1.5 rounded text-trading-gold"><PlayCircle size={16} /></div>
                                <div>
                                   <strong className="text-white text-sm block">1. Start It Once</strong>
                                   <p className="text-xs text-gray-400">
                                      Click "Activate" when you sit down to trade. Let it run continuously. It syncs with the broker clock.
                                   </p>
                                </div>
                             </div>

                             <div className="flex items-start gap-3">
                                <div className="bg-gray-800 p-1.5 rounded text-blue-400"><Eye size={16} /></div>
                                <div>
                                   <strong className="text-white text-sm block">2. Eyes on the Candle</strong>
                                   <p className="text-xs text-gray-400">
                                      Don't watch the clock. Watch the price action. The audio tells you when to focus.
                                   </p>
                                </div>
                             </div>

                             <div className="flex items-start gap-3">
                                <div className="bg-gray-800 p-1.5 rounded text-green-400"><Signal size={16} /></div>
                                <div>
                                   <strong className="text-white text-sm block">3. The Sequence</strong>
                                   <ul className="text-xs text-gray-400 mt-1 space-y-1">
                                      <li><span className="text-white font-mono">:56s</span> - Beep! (Stop looking at charts, Focus on ONE candle)</li>
                                      <li><span className="text-white font-mono">:57-59s</span> - Did it jump? (Rejection check)</li>
                                      <li><span className="text-white font-mono">:00s</span> - Beep! (Execute Trade)</li>
                                   </ul>
                                </div>
                             </div>
                          </div>
                       </motion.div>

                     </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {page === PageState.GUIDE && (
            <motion.div 
              key="guide"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
               <ConceptGuide />
            </motion.div>
          )}

          {page === PageState.ACCURACY && (
            <motion.div 
              key="accuracy"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
               <AccuracyGuide />
            </motion.div>
          )}

          {page === PageState.SIMULATOR && (
            <motion.div 
              key="simulator"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center"
            >
              <ScenarioSimulator />
            </motion.div>
          )}

          {page === PageState.JOURNAL && (
            <motion.div 
              key="journal"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <TradeJournal />
            </motion.div>
          )}

          {/* LEGAL PAGES - Now Individual */}
          {page === PageState.DISCLAIMER && (
             <motion.div key="disclaimer" variants={pageVariants} initial="initial" animate="animate" exit="exit">
               <LegalDocs type="DISCLAIMER" onBack={() => navigate(PageState.HOME)} />
             </motion.div>
          )}
          {page === PageState.PRIVACY && (
             <motion.div key="privacy" variants={pageVariants} initial="initial" animate="animate" exit="exit">
               <LegalDocs type="PRIVACY" onBack={() => navigate(PageState.HOME)} />
             </motion.div>
          )}
          {page === PageState.TERMS && (
             <motion.div key="terms" variants={pageVariants} initial="initial" animate="animate" exit="exit">
               <LegalDocs type="TERMS" onBack={() => navigate(PageState.HOME)} />
             </motion.div>
          )}
          {page === PageState.IP && (
             <motion.div key="ip" variants={pageVariants} initial="initial" animate="animate" exit="exit">
               <LegalDocs type="IP" onBack={() => navigate(PageState.HOME)} />
             </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Cookie Consent Banner */}
      <CookieConsent 
         onReadPolicy={() => navigate(PageState.PRIVACY)} 
         onAccept={handleCookieAccept}
      />

      {/* Footer */}
      <footer className="bg-trading-card border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-bold flex items-center gap-2 justify-center md:justify-start">
               <Crown size={14} className="text-trading-gold" />
               L3SR PREMIUM
            </p>
            <p className="text-gray-500 text-xs mt-1">Authorized Personnel Only. Private Educational Suite.</p>
          </div>
          
          {/* New Legal Links - Linked to specific states */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
             <button onClick={() => navigate(PageState.DISCLAIMER)} className="text-gray-500 hover:text-white text-xs transition-colors flex items-center gap-1">
                <Scale size={12} /> Legal Disclaimer
             </button>
             <button onClick={() => navigate(PageState.PRIVACY)} className="text-gray-500 hover:text-white text-xs transition-colors">
                Privacy Policy
             </button>
             <button onClick={() => navigate(PageState.TERMS)} className="text-gray-500 hover:text-white text-xs transition-colors">
                Terms of Use
             </button>
             <button onClick={() => navigate(PageState.IP)} className="text-gray-500 hover:text-white text-xs transition-colors">
                IP Rights
             </button>
             <div className="h-4 w-px bg-gray-800 hidden md:block"></div>
             <span className="text-gray-600 text-xs">v3.0.0-PRO</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;