import React from 'react';
import { ShieldAlert, Lock, ScrollText, Copyright, Scale, AlertTriangle, FileCheck, ArrowLeft, ShieldCheck, HelpCircle, MessageCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

type LegalPageType = 'DISCLAIMER' | 'PRIVACY' | 'TERMS' | 'IP';

interface LegalDocsProps {
  type: LegalPageType;
  onBack: () => void;
  lang?: 'en' | 'ur';
}

const LegalDocs: React.FC<LegalDocsProps> = ({ type, onBack, lang = 'en' }) => {

  const contentMap = {
    DISCLAIMER: {
      title: lang === 'en' ? "Risk Disclaimer" : "Risk Disclaimer",
      icon: ShieldAlert,
      content: (
        <div className="space-y-8">
          <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl flex items-start gap-4">
            <AlertTriangle className="text-red-500 shrink-0 mt-1" size={32} />
            <div>
              <h3 className="text-red-400 font-bold text-xl mb-2">{lang === 'en' ? 'High Risk Warning' : 'High Risk Ki Chetawani'}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {lang === 'en' 
                  ? "Trading financial markets (Forex, Crypto, Stocks, Binary Options) involves a significant level of risk and is not suitable for all investors. You could lose some or all of your initial investment. Do not trade with money you cannot afford to lose."
                  : "Financial markets (Forex, Crypto, Stocks, Binary Options) mein trade karna bohot risky hai aur sab ke liye munasib nahi hai. Ap apna sara paisa kho sakte hain. Wo paisa na lagayein jo ap khone ki istitaat nahi rakhte."}
              </p>
            </div>
          </div>

          <div className="space-y-6 text-gray-400">
            <section>
              <h4 className="text-white font-bold text-lg flex items-center gap-2 mb-2">
                <Scale size={20} className="text-trading-gold" />
                {lang === 'en' ? 'Educational Purpose Only' : 'Sirf Taleemi Maqsad Ke Liye'}
              </h4>
              <p className="leading-relaxed">
                {lang === 'en' 
                  ? "The content provided on L3SR Trading Masterclass (including the Strategy Guide, Simulator, and Accuracy Protocol) is strictly for educational and informational purposes only."
                  : "L3SR Trading Masterclass par diya gaya mawad (Strategy Guide, Simulator, aur Accuracy Protocol samait) sirf taleemi aur maloomati maqasid ke liye hai."}
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-trading-gold">
                <li>{lang === 'en' ? "We are not financial advisors." : "Hum financial advisors nahi hain."}</li>
                <li>{lang === 'en' ? "We do not provide financial advice, investment recommendations, or trading signals." : "Hum koi maliyati mashwara, investment ki sifarish, ya trading signals nahi dete."}</li>
                <li>{lang === 'en' ? "The 'L3SR' strategy is a theoretical concept for market analysis." : "'L3SR' strategy market analysis ke liye aik nazriyati concept hai."}</li>
                <li>{lang === 'en' ? "Any success in the simulator does not guarantee success in real-market conditions." : "Simulator mein kamyabi haqeeqi market mein kamyabi ki zamanat nahi hai."}</li>
              </ul>
            </section>

            <section>
              <h4 className="text-white font-bold text-lg mb-2">{lang === 'en' ? 'No Liability' : 'Koi Zimmedari Nahi'}</h4>
              <p className="leading-relaxed">
                {lang === 'en' 
                 ? "L3SR Premium and its creators accept no liability for any loss or damage, including without limitation to, any loss of profit, which may arise directly or indirectly from use of or reliance on such information. You are solely responsible for your own trading decisions."
                 : "L3SR Premium aur iske creators kisi bhi nuqsan ya damage ke zimmedar nahi hain, Bashamool munafay ka nuqsan, jo is maloomat par inhisaar karne se ho. Ap apne trading faislon ke khud zimmedar hain."}
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
                  {lang === 'en'
                    ? "We respect your privacy by design. Unlike other platforms, we do not store your trading journal data on our servers. Your data stays on your device."
                    : "Hum apki privacy ka khayal rakhte hain. Dusre platforms ke baraks, hum apka trading journal data apne servers par store nahi karte. Apka data apki device par rehta hai."}
                </p>
             </div>
          </div>

          <div className="space-y-6 text-gray-400">
            <section>
              <h4 className="text-white font-bold text-lg mb-2">{lang === 'en' ? '1. How We Store Data' : '1. Hum Data Kaise Store Karte Hain'}</h4>
              <p className="mb-2">
                {lang === 'en'
                 ? "This website uses Local Storage technology. This means your Trading Journal, settings, and Simulator scores are saved directly on your own device (browser)."
                 : "Ye website Local Storage technology use karti hai. Iska matlab hai apka Trading Journal, settings, aur Simulator scores seedha apki device (browser) par save hote hain."}
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
                {lang === 'en' 
                 ? "By accessing L3SR Trading Masterclass, you agree to be bound by these Terms and Conditions and our Disclaimer. If you do not agree, please discontinue use immediately."
                 : "L3SR Trading Masterclass use karke, ap in Terms and Conditions aur Disclaimer ke paband hain. Agar ap ittefaq nahi karte, to foran use karna chor dein."}
             </p>
           </section>

           <section>
            <h4 className="text-white font-bold text-lg mb-2">{lang === 'en' ? '1. User Responsibility' : '1. User Ki Zimmedari'}</h4>
            <p className="leading-relaxed text-sm">
              {lang === 'en'
               ? "You acknowledge that trading involves risk. You agree that L3SR is a tool for learning analysis, not a tool for guaranteed profit."
               : "Ap mante hain ke trading mein risk hai. Ap agree karte hain ke L3SR analysis seekhne ka tool hai, guaranteed munafay ka tool nahi."}
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
              {lang === 'en' ? 'All content hosted on this domain is the exclusive property of L3SR Premium.' : 'Is domain par موجود tamam mawad L3SR Premium ki malkiyat hai.'}
            </p>
            
            <section className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-white font-bold text-lg mb-2">Copyright Notice</h4>
              <p className="text-sm leading-relaxed">
                © {new Date().getFullYear()} L3SR Trading Masterclass. All rights reserved.
                <br/><br/>
                {lang === 'en' ? 'Unauthorized reproduction, redistribution, resale, or modification of this material is strictly prohibited.' : 'Is mawad ki ijazat ke baghair naqal, taqseem, farokht, ya tabdeeli sakhti se mana hai.'}
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
             {lang === 'en' ? 'Back to Dashboard' : 'Dashboard par wapis'}
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

          {/* HELP SECTION */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
             className="mt-8 flex flex-col items-center justify-center text-center gap-3"
          >
             <div className="text-sm font-bold text-gray-500 flex items-center gap-2">
                 <HelpCircle size={16} /> {lang === 'en' ? 'Have questions about these terms?' : 'Kya in terms ke baray mein sawal hain?'}
             </div>
             <div className="flex gap-4">
                 <a href="https://wa.me/447473938781" target="_blank" rel="noreferrer" className="text-xs text-[#25D366] hover:underline flex items-center gap-1">
                    <MessageCircle size={12} /> Contact on WhatsApp
                 </a>
                 <span className="text-gray-700">|</span>
                 <a href="mailto:xtechnext.info@gmail.com" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                    <Mail size={12} /> Email Support
                 </a>
             </div>
          </motion.div>

       </div>
    </div>
  );
};

export default LegalDocs;