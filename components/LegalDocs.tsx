import React from 'react';
import { ShieldAlert, Lock, ScrollText, Copyright, Scale, AlertTriangle, FileCheck, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

type LegalPageType = 'DISCLAIMER' | 'PRIVACY' | 'TERMS' | 'IP';

interface LegalDocsProps {
  type: LegalPageType;
  onBack: () => void;
}

const LegalDocs: React.FC<LegalDocsProps> = ({ type, onBack }) => {

  const contentMap = {
    DISCLAIMER: {
      title: "Risk Disclaimer",
      icon: ShieldAlert,
      content: (
        <div className="space-y-8">
          <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl flex items-start gap-4">
            <AlertTriangle className="text-red-500 shrink-0 mt-1" size={32} />
            <div>
              <h3 className="text-red-400 font-bold text-xl mb-2">High Risk Warning</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Trading financial markets (Forex, Crypto, Stocks, Binary Options) involves a significant level of risk and is not suitable for all investors. You could lose some or all of your initial investment. Do not trade with money you cannot afford to lose.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-gray-400">
            <section>
              <h4 className="text-white font-bold text-lg flex items-center gap-2 mb-2">
                <Scale size={20} className="text-trading-gold" />
                Educational Purpose Only
              </h4>
              <p className="leading-relaxed">
                The content provided on <strong>L3SR Trading Masterclass</strong> (including the Strategy Guide, Simulator, and Accuracy Protocol) is strictly for <strong>educational and informational purposes only</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-trading-gold">
                <li>We are <strong>not</strong> financial advisors.</li>
                <li>We do <strong>not</strong> provide financial advice, investment recommendations, or trading signals.</li>
                <li>The "L3SR" strategy is a theoretical concept for market analysis.</li>
                <li>Any success in the simulator does <strong>not</strong> guarantee success in real-market conditions.</li>
              </ul>
            </section>

            <section>
              <h4 className="text-white font-bold text-lg mb-2">No Liability</h4>
              <p className="leading-relaxed">
                L3SR Premium and its creators accept no liability for any loss or damage, including without limitation to, any loss of profit, which may arise directly or indirectly from use of or reliance on such information. You are solely responsible for your own trading decisions.
              </p>
            </section>
          </div>
        </div>
      )
    },
    PRIVACY: {
      title: "Privacy Policy",
      icon: Lock,
      content: (
        <div className="space-y-8">
          <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-xl flex items-start gap-4">
             <ShieldCheck className="text-blue-400 shrink-0 mt-1" size={32} />
             <div>
                <h3 className="text-blue-400 font-bold text-xl mb-2">Data Privacy & Local Storage</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We respect your privacy by design. Unlike other platforms, <strong>we do not store your trading journal data on our servers.</strong> Your data stays on your device.
                </p>
             </div>
          </div>

          <div className="space-y-6 text-gray-400">
            <section>
              <h4 className="text-white font-bold text-lg mb-2">1. How We Store Data</h4>
              <p className="mb-2">
                This website uses <strong>Local Storage</strong> technology. This means your Trading Journal, settings, and Simulator scores are saved directly on your own device (browser).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm marker:text-trading-gold">
                <li>We have no access to your journal entries.</li>
                <li>If you clear your browser cache/cookies, your journal data may be deleted.</li>
                <li>We do not sell your data to third parties because we do not possess it.</li>
              </ul>
            </section>

            <section>
              <h4 className="text-white font-bold text-lg mb-2">2. Cookies</h4>
              <p>
                We use strictly essential cookies/local storage solely for website functionality (e.g., remembering your login session token or keeping you logged in). We do not use invasive third-party tracking pixels to follow you around the internet.
              </p>
            </section>

            <section>
              <h4 className="text-white font-bold text-lg mb-2">3. Third Party Links</h4>
              <p>
                If we link to external charting platforms (like TradingView) or brokers, please review their separate privacy policies. We are not responsible for their data practices.
              </p>
            </section>
          </div>
        </div>
      )
    },
    TERMS: {
      title: "Terms & Conditions",
      icon: ScrollText,
      content: (
        <div className="space-y-8 text-gray-400">
           <section className="bg-trading-card border border-gray-800 p-6 rounded-xl">
             <p className="text-white font-medium">
                By accessing L3SR Trading Masterclass, you agree to be bound by these Terms and Conditions and our Disclaimer. If you do not agree, please discontinue use immediately.
             </p>
           </section>

           <section>
            <h4 className="text-white font-bold text-lg mb-2">1. User Responsibility</h4>
            <p className="leading-relaxed text-sm">
              You acknowledge that trading involves risk. You agree that L3SR is a tool for learning analysis, not a tool for guaranteed profit. You agree not to hold the platform liable for any financial outcomes resulting from your interpretation of the material.
            </p>
          </section>

          <section>
            <h4 className="text-white font-bold text-lg mb-2">2. Prohibited Use</h4>
            <p className="leading-relaxed text-sm mb-2">
              You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm marker:text-red-500">
               <li>Reverse engineer the simulator logic or code.</li>
               <li>Share your access token or login credentials with unauthorized users.</li>
               <li>Use the platform for any illegal financial activities.</li>
               <li>Attempt to bypass the security access gate.</li>
            </ul>
          </section>

          <section>
             <h4 className="text-white font-bold text-lg mb-2">3. Amendments</h4>
             <p className="text-sm">
                We reserve the right to update these terms at any time. Continued use of the platform constitutes acceptance of the new terms.
             </p>
          </section>
        </div>
      )
    },
    IP: {
      title: "Copyright & IP",
      icon: Copyright,
      content: (
        <div className="space-y-8">
           <div className="flex items-center justify-center p-10 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800">
             <div className="text-center">
                <div className="w-20 h-20 bg-trading-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-trading-gold border border-trading-gold/30">
                   <Copyright size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Intellectual Property Rights</h3>
                <p className="text-gray-500">Ownership & Usage Rights</p>
             </div>
          </div>

          <div className="space-y-6 text-gray-400">
            <p>
              All content hosted on this domain is the exclusive property of L3SR Premium. This includes, but is not limited to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 "The 'L3SR' Strategy Methodology", 
                 "Simulator Scenarios & Logic", 
                 "Source Code & Visual Design", 
                 "Accuracy Guides & Educational Text"
               ].map((item, i) => (
                 <div key={i} className="bg-trading-card p-4 rounded-lg border border-gray-800 flex items-center gap-3">
                    <FileCheck size={18} className="text-trading-gold shrink-0" />
                    <span className="text-sm text-gray-300">{item}</span>
                 </div>
               ))}
            </div>

            <section className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-white font-bold text-lg mb-2">Copyright Notice</h4>
              <p className="text-sm leading-relaxed">
                © {new Date().getFullYear()} L3SR Trading Masterclass. All rights reserved.
                <br/><br/>
                Unauthorized reproduction, redistribution, resale, or modification of this material is strictly prohibited. Violators will be subject to account termination and potential legal action.
              </p>
            </section>
          </div>
        </div>
      )
    }
  };

  const currentData = contentMap[type];
  const Icon = currentData.icon;

  return (
    <div className="min-h-screen py-12 px-4">
       <div className="max-w-3xl mx-auto">
          
          {/* Back Button */}
          <motion.button 
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             onClick={onBack}
             className="flex items-center gap-2 text-gray-500 hover:text-trading-gold transition-colors mb-8 group"
          >
             <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
             Back to Dashboard
          </motion.button>

          {/* Page Header */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="text-center mb-12"
          >
             <div className="inline-flex items-center justify-center p-4 bg-trading-card rounded-full border border-gray-800 mb-6 shadow-2xl">
                <Icon size={32} className="text-white" />
             </div>
             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{currentData.title}</h1>
             <div className="w-24 h-1 bg-trading-gold mx-auto rounded-full"></div>
          </motion.div>

          {/* Content Container */}
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="bg-[#13151a] border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
             {/* Background Glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-trading-gold/50 to-transparent"></div>
             
             {currentData.content}

             {/* Footer Note */}
             <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                <p className="text-xs text-gray-600">
                   Last Updated: {new Date().toLocaleDateString()} &bull; L3SR Premium Suite
                </p>
             </div>
          </motion.div>

       </div>
    </div>
  );
};

export default LegalDocs;