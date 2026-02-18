import React, { useState, useEffect } from 'react';
import { PageState } from './types';
import ConceptGuide from './components/ConceptGuide';
import ScenarioSimulator from './components/ScenarioSimulator';
import AccessGate from './components/AccessGate';
import L3SRTimer from './components/L3SRTimer';
import TradeJournal from './components/TradeJournal';
import PreFlightChecklist from './components/PreFlightChecklist';
import { BookOpen, Gamepad2, TrendingUp, Menu, X, Github, Crown, LogOut, Globe, AlertOctagon, Signal, BarChart2, Headphones, Eye, PlayCircle } from 'lucide-react';

const App: React.FC = () => {
  const [page, setPage] = useState<PageState>(PageState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isWidgetMode, setIsWidgetMode] = useState(false);

  // Security: Check for valid session token
  useEffect(() => {
    // We use a more obscure key name for security
    const token = localStorage.getItem('__l3sr_secure_session_v1');
    
    // Validate the token format
    if (token && token.length > 5 && /^[0-9a-f]+$/i.test(token)) {
      setIsAuthenticated(true);
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
  // If the window is small (e.g., resized pop-out), we switch to widget mode
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500 && window.innerHeight < 650) {
        setIsWidgetMode(true);
      } else {
        setIsWidgetMode(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on init

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('__l3sr_secure_session_v1', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('__l3sr_secure_session_v1');
    setIsAuthenticated(false);
    setPage(PageState.HOME);
  };

  const navigate = (p: PageState) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  if (isCheckingAuth) return null;

  if (!isAuthenticated) {
    return <AccessGate onUnlock={handleLogin} />;
  }

  // --- WIDGET MODE RENDER ---
  if (isWidgetMode) {
    return <L3SRTimer mode="widget" />;
  }

  // --- DUMMY DATA FOR WIDGETS ---
  const currentHour = new Date().getHours();
  const session = currentHour >= 8 && currentHour < 16 ? 'LONDON' : currentHour >= 13 && currentHour < 21 ? 'NEW YORK' : 'ASIAN';
  const volatility = session === 'ASIAN' ? 'LOW' : 'HIGH';

  return (
    <div className="min-h-screen bg-trading-bg text-trading-text font-sans selection:bg-trading-gold selection:text-black flex flex-col select-none">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-trading-bg/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Area */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(PageState.HOME)}>
              <div className="w-10 h-10 bg-gradient-to-br from-trading-gold to-[#8a751f] rounded-lg flex items-center justify-center font-bold text-black shadow-lg shadow-trading-gold/20">
                <Crown size={20} />
              </div>
              <div className="flex flex-col leading-none">
                 <span className="font-bold text-lg tracking-tight text-white">L3SR <span className="text-trading-gold">PREMIUM</span></span>
                 <span className="text-[10px] text-gray-400 uppercase tracking-widest">Masterclass Suite</span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => navigate(PageState.HOME)}
                className={`${page === PageState.HOME ? 'text-white' : 'text-gray-400 hover:text-white'} text-sm font-medium transition-colors`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate(PageState.GUIDE)}
                className={`${page === PageState.GUIDE ? 'text-white' : 'text-gray-400 hover:text-white'} text-sm font-medium transition-colors`}
              >
                Strategy Guide
              </button>
              <button 
                onClick={() => navigate(PageState.SIMULATOR)}
                className={`${page === PageState.SIMULATOR ? 'text-white' : 'text-gray-400 hover:text-white'} text-sm font-medium transition-colors`}
              >
                Simulator
              </button>
              <button 
                onClick={() => navigate(PageState.JOURNAL)}
                className={`${page === PageState.JOURNAL ? 'text-trading-gold' : 'text-gray-400 hover:text-trading-gold'} text-sm font-medium transition-colors flex items-center gap-2`}
              >
                <BarChart2 size={16} />
                Journal
              </button>

              <div className="h-6 w-px bg-gray-800"></div>

              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-2 text-xs uppercase tracking-wider font-bold"
              >
                <LogOut size={14} /> Exit
              </button>
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
        {mobileMenuOpen && (
          <div className="md:hidden bg-trading-card border-b border-gray-800 absolute w-full z-50">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => navigate(PageState.HOME)} className="block px-3 py-3 rounded-md text-base font-medium text-white w-full text-left border-b border-gray-800/50">Dashboard</button>
              <button onClick={() => navigate(PageState.GUIDE)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 w-full text-left border-b border-gray-800/50">Strategy Guide</button>
              <button onClick={() => navigate(PageState.SIMULATOR)} className="block px-3 py-3 rounded-md text-base font-medium text-white w-full text-left border-b border-gray-800/50">Simulator</button>
              <button onClick={() => navigate(PageState.JOURNAL)} className="block px-3 py-3 rounded-md text-base font-medium text-trading-gold w-full text-left border-b border-gray-800/50">My Journal</button>
              <button onClick={handleLogout} className="block px-3 py-3 rounded-md text-base font-medium text-red-400 w-full text-left flex items-center gap-2"><LogOut size={16} /> Exit Session</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {page === PageState.HOME && (
          <div className="relative">
             {/* Premium Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-trading-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT COLUMN: Welcome & Actions (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                   <div className="text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-trading-gold/10 border border-trading-gold/20 text-trading-gold text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-trading-gold animate-pulse"></span>
                        Authorized Access
                      </div>

                      <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                        L3SR <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-gold to-yellow-200">Pro Systems</span>
                      </h1>
                      <p className="max-w-xl text-lg text-gray-400 leading-relaxed">
                        Eliminate broker lag with the Atomic Timer. Validate every trade using the pre-flight checklist below.
                      </p>
                      
                      <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => navigate(PageState.JOURNAL)}
                          className="px-6 py-4 bg-trading-gold text-black font-bold rounded-xl hover:bg-[#bba02a] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(207,181,59,0.3)]"
                        >
                          <BarChart2 size={20} />
                          Open Trade Journal
                        </button>
                        <button 
                          onClick={() => navigate(PageState.SIMULATOR)}
                          className="px-6 py-4 bg-[#1a1a1a] text-white font-bold rounded-xl hover:bg-[#252525] border border-gray-800 transition-all flex items-center justify-center gap-2"
                        >
                          <Gamepad2 size={20} />
                          Practice Simulator
                        </button>
                      </div>
                   </div>

                   {/* Quick Stats Widget */}
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-trading-card p-4 rounded-xl border border-gray-800 flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
                           <Globe size={14} /> Active Session
                         </div>
                         <div className="text-xl text-white font-bold">{session}</div>
                      </div>
                      <div className="bg-trading-card p-4 rounded-xl border border-gray-800 flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
                           <Signal size={14} /> Market Volatility
                         </div>
                         <div className={`text-xl font-bold ${volatility === 'HIGH' ? 'text-green-500' : 'text-orange-500'}`}>
                           {volatility}
                         </div>
                      </div>
                   </div>
                   
                   {/* NEW: Pre-Flight Checklist Widget */}
                   <PreFlightChecklist />
                   
                </div>

                {/* RIGHT COLUMN: The Timer (5 Cols) */}
                <div className="lg:col-span-5">
                   <div className="sticky top-24 space-y-6">
                     <L3SRTimer />
                     
                     {/* Removed Strategy Tip Card as requested */}

                     {/* NEW: Updated How to Use Instructions */}
                     <div className="bg-trading-card p-5 rounded-xl border border-gray-800">
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
                     </div>

                   </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {page === PageState.GUIDE && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <ConceptGuide />
          </div>
        )}

        {page === PageState.SIMULATOR && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
            <ScenarioSimulator />
          </div>
        )}

        {page === PageState.JOURNAL && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TradeJournal />
          </div>
        )}
      </main>

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
          <div className="flex items-center gap-4">
             <span className="text-gray-600 text-xs">v3.0.0-PRO</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;