import React from 'react';
import { 
  Quote, Sparkles, Feather, Hash, 
  Scale, ShieldAlert, Shield, Users, Target, Moon, 
  BrainCircuit, MessageSquareX, Heart, BookOpen, AlertTriangle, 
  TrendingUp, TrendingDown, Ghost, Pickaxe, Anchor, LucideIcon, Send, MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- DATA STRUCTURE ---
interface QuoteItem {
  text: string;
  textUR: string;
  author: string;
  role: string;
  roleUR: string;
  icon: LucideIcon;
  category: 'RISK' | 'PSYCHOLOGY' | 'STRATEGY';
}

interface QuotesGalleryProps {
  lang?: 'en' | 'ur';
}

// --- CURATED WISDOM ---
const TRADING_WISDOM: QuoteItem[] = [
  {
    text: "It's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong.",
    textUR: "Ye ahem nahi ke aap sahi hain ya ghalat, ahem ye hai ke sahi hone par kitna kamaya aur ghalat hone par kitna khoya.",
    author: "George Soros",
    role: "The Man Who Broke the Bank of England",
    roleUR: "Bank of England ko tornay wala shakhs",
    icon: Scale,
    category: 'STRATEGY'
  },
  {
    text: "The elements of good trading are: (1) cutting losses, (2) cutting losses, and (3) cutting losses. If you can follow these three rules, you may have a chance.",
    textUR: "Achi trading ke usool hain: (1) nuqsan kato, (2) nuqsan kato, aur (3) nuqsan kato. Agar aap ye kar saken to chance hai.",
    author: "Ed Seykota",
    role: "Trend Following Legend",
    roleUR: "Trend Following ka Legend",
    icon: ShieldAlert,
    category: 'RISK'
  },
  {
    text: "Don't focus on making money; focus on protecting what you have.",
    textUR: "Paisa kamanay par focus na karen; jo pass hai usay bachanay par focus karen.",
    author: "Paul Tudor Jones",
    role: "Hedge Fund Titan",
    roleUR: "Hedge Fund Titan",
    icon: Shield,
    category: 'RISK'
  },
  {
    text: "Amateurs think about how much they can make. Professionals think about how much they can lose.",
    textUR: "Anaadi (Amateurs) sochte hain kitna kama lenge. Professionals sochte hain kitna nuqsan ho sakta hai.",
    author: "Jack Schwager",
    role: "Author of Market Wizards",
    roleUR: "Market Wizards ka Musannif",
    icon: Users,
    category: 'PSYCHOLOGY'
  },
  {
    text: "The goal of a successful trader is to make the best trades. Money is secondary.",
    textUR: "Kamyab trader ka maqsad behtareen trades lena hai. Paisa doosri cheez hai.",
    author: "Alexander Elder",
    role: "Trading Psychologist",
    roleUR: "Trading Psychologist",
    icon: Target,
    category: 'PSYCHOLOGY'
  },
  {
    text: "If you can't sleep at night, reduce your positions.",
    textUR: "Agar raat ko neend nahi aa rahi, to apni positions (trade size) kam kar den.",
    author: "Jesse Livermore",
    role: "The Boy Plunger",
    roleUR: "Legendary Trader",
    icon: Moon,
    category: 'RISK'
  },
  {
    text: "Markets can remain irrational longer than you can remain solvent.",
    textUR: "Market aapki bardasht aur paisay se zyada der tak pagal reh sakti hai.",
    author: "John Maynard Keynes",
    role: "Economist",
    roleUR: "Economist",
    icon: BrainCircuit,
    category: 'STRATEGY'
  },
  {
    text: "A loss is not a failure until you make an excuse.",
    textUR: "Nuqsan tab tak nakami nahi jab tak aap bahana na banayen.",
    author: "Michael Marcus",
    role: "Commodities Trader",
    roleUR: "Commodities Trader",
    icon: MessageSquareX,
    category: 'PSYCHOLOGY'
  },
  {
    text: "Confidence is not 'I will profit on this trade.' Confidence is 'I will be fine if I don't profit on this trade'.",
    textUR: "Confidence ye nahi ke 'mujhe profit hoga'. Confidence ye hai ke 'agar profit na bhi hua to main theek rahoonga'.",
    author: "Yvan Byeajee",
    role: "Trading Mindfulness Expert",
    roleUR: "Mindfulness Expert",
    icon: Heart,
    category: 'PSYCHOLOGY'
  },
  {
    text: "You have to learn how to lose; it is more important than learning how to win.",
    textUR: "Haarna seekhna paray ga; ye jeetna seekhne se zyada zaroori hai.",
    author: "Mark Weinstein",
    role: "Market Wizard",
    roleUR: "Market Wizard",
    icon: BookOpen,
    category: 'PSYCHOLOGY'
  },
  {
    text: "The four most dangerous words in investing are: 'this time it's different'.",
    textUR: "Investing mein 4 sab se khatarnak alfaz hain: 'Is baar mukhtalif hai' (This time it's different).",
    author: "Sir John Templeton",
    role: "Investing Pioneer",
    roleUR: "Investing Pioneer",
    icon: AlertTriangle,
    category: 'RISK'
  },
  {
    text: "There is no secret. I simply buy when the line goes up and sell when the line goes down.",
    textUR: "Koi raaz nahi hai. Jab line ooper jaye to khareedo, jab neechay jaye to becho.",
    author: "Trend Follower",
    role: "Universal Truth",
    roleUR: "Afaq-e-Sach",
    icon: TrendingUp,
    category: 'STRATEGY'
  },
  {
    text: "Losers average losers.",
    textUR: "Haarnay walay haarti hui trades mein aur paisa lagate hain (average karte hain).",
    author: "Paul Tudor Jones",
    role: "Wall Street Legend",
    roleUR: "Wall Street Legend",
    icon: TrendingDown,
    category: 'RISK'
  },
  {
    text: "Hope is a bogus emotion that only costs you money.",
    textUR: "Umeed (Hope) aik bekaar jazba hai jo sirf paisa zaya karwata hai.",
    author: "Jim Cramer",
    role: "Financial Analyst",
    roleUR: "Financial Analyst",
    icon: Ghost,
    category: 'PSYCHOLOGY'
  },
  {
    text: "Trading is the hardest way to make an easy living.",
    textUR: "Trading asaan rozi kamanay ka sab se mushkil tareeqa hai.",
    author: "Anonymous",
    role: "The Reality",
    roleUR: "Haqeeqat",
    icon: Pickaxe,
    category: 'STRATEGY'
  }
];

const QuotesGallery: React.FC<QuotesGalleryProps> = ({ lang = 'en' }) => {
  
  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  // Helper for category styles
  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'RISK': return 'text-red-400 border-red-500/20';
      case 'PSYCHOLOGY': return 'text-blue-400 border-blue-500/20';
      case 'STRATEGY': return 'text-trading-gold border-trading-gold/20';
      default: return 'text-gray-400 border-gray-700';
    }
  };

  const getCategoryBg = (cat: string) => {
    switch(cat) {
      case 'RISK': return 'bg-red-500/10 group-hover:bg-red-500/20';
      case 'PSYCHOLOGY': return 'bg-blue-500/10 group-hover:bg-blue-500/20';
      case 'STRATEGY': return 'bg-trading-gold/10 group-hover:bg-trading-gold/20';
      default: return 'bg-gray-800';
    }
  };

  return (
    <div className="w-full px-4 py-12 pb-24">
      
      <div className="text-center mb-16 space-y-4">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-trading-gold/10 border border-trading-gold/30 text-trading-gold text-xs font-bold uppercase tracking-[0.2em]"
         >
            <Feather size={14} /> {lang === 'en' ? 'Eternal Wisdom' : 'Hamesha Ki Danish'}
         </motion.div>
         <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
         >
            {lang === 'en' ? 'Legends of the ' : 'Market Ke '} <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-gold to-yellow-200">{lang === 'en' ? 'Market' : 'Legends'}</span>
         </motion.h1>
         <p className="text-gray-400 max-w-2xl mx-auto">
            {lang === 'en' 
              ? "The psychology of trading has not changed in 100 years. Learn from those who mastered the game before you."
              : "Trading ki nafsiat (psychology) 100 saalon mein nahi badli. Un se seekhein jinhon ne aap se pehle is khel par maharat hasil ki."}
         </p>
      </div>

      {/* --- HERO QUOTE (USER REQUESTED) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative w-full max-w-[95%] mx-auto mb-20 mt-10 group px-4 md:px-0"
      >
         <div className="absolute inset-0 bg-gradient-to-r from-trading-gold/20 via-yellow-900/10 to-transparent blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
         
         <div className="relative">
             {/* FLOATING ICON BADGE (Moved outside to prevent clipping) */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0b0d] p-3 rounded-full border border-trading-gold text-trading-gold shadow-[0_0_30px_rgba(207,181,59,0.3)] z-20">
                <Anchor size={24} fill="currentColor" className="opacity-100" />
             </div>

             {/* CARD CONTAINER */}
             <div className="relative bg-[#0d0e12] border border-trading-gold/30 rounded-3xl py-12 md:py-20 px-6 md:px-12 text-center overflow-hidden shadow-2xl">
                 {/* Decorative Quotes */}
                 <Quote className="absolute top-4 left-4 md:top-8 md:left-8 text-trading-gold/10 rotate-180 w-12 h-12 md:w-20 md:h-20" />
                 <Quote className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-trading-gold/10 w-12 h-12 md:w-20 md:h-20" />

                 <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white leading-tight md:leading-snug relative z-10 mx-auto max-w-4xl">
                   "{lang === 'en' ? "When you are in doubt," : "Jab aap shak mein hon,"} <span className="text-trading-gold border-b-2 border-trading-gold/50 pb-1 inline-block">{lang === 'en' ? "Protect your capital" : "Apna sarmaya bachayen"}</span>. {lang === 'en' ? "Opportunities are endless, but capital is not." : "Moqay la-mehdood hain, lekin paisa nahi."}"
                 </h2>
                 
                 <div className="mt-10 flex flex-col items-center gap-1 relative z-10">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-trading-gold to-transparent mb-4"></div>
                    <span className="text-sm md:text-base font-bold text-gray-300 uppercase tracking-widest">
                       {lang === 'en' ? "The Golden Rule of Survival" : "Bachne Ka Sunehri Usool"}
                    </span>
                 </div>
             </div>
         </div>
      </motion.div>

      {/* --- STRUCTURED GRID GALLERY --- */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
         {TRADING_WISDOM.map((quote, idx) => (
            <motion.div 
               key={idx} 
               variants={item}
               className={`h-full flex flex-col justify-between bg-trading-card border p-8 rounded-2xl hover:border-gray-600 transition-all duration-300 group relative overflow-hidden ${getCategoryColor(quote.category).split(' ')[1]}`}
            >
               {/* Background Icon Watermark */}
               <quote.icon 
                  className="absolute -bottom-4 -right-4 text-white opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-500" 
                  size={120} 
                  strokeWidth={1}
               />

               <div>
                   {/* Top Bar: Icon & Category */}
                   <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-xl transition-colors ${getCategoryBg(quote.category)} ${getCategoryColor(quote.category).split(' ')[0]}`}>
                          <quote.icon size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest border border-gray-800 px-2 py-1 rounded bg-black/20">
                          {quote.category}
                      </span>
                   </div>

                   {/* Quote Text */}
                   <p className="text-lg text-gray-200 font-serif leading-relaxed mb-8 relative z-10">
                      "{lang === 'en' ? quote.text : quote.textUR}"
                   </p>
               </div>

               {/* Footer: Author */}
               <div className="border-t border-gray-800/50 pt-4 relative z-10">
                  <div className="font-bold text-white text-sm uppercase tracking-wide flex items-center gap-2">
                     <div className="w-1 h-1 bg-trading-gold rounded-full"></div>
                     {quote.author}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 pl-3">
                     {lang === 'en' ? quote.role : quote.roleUR}
                  </div>
               </div>
            </motion.div>
         ))}

         {/* SUBMISSION CARD (NEW) */}
         <motion.div 
            variants={item}
            className="h-full flex flex-col justify-center items-center bg-gradient-to-br from-trading-card to-[#1a1a1a] border border-trading-gold/30 border-dashed p-8 rounded-2xl hover:bg-trading-gold/5 transition-all duration-300 text-center relative overflow-hidden group"
         >
             <div className="bg-trading-gold/10 p-4 rounded-full text-trading-gold mb-6 group-hover:scale-110 transition-transform">
                <Send size={32} />
             </div>
             
             <h3 className="text-xl font-bold text-white mb-2">{lang === 'en' ? 'Share Your Wisdom' : 'Apni Danish Share Karen'}</h3>
             <p className="text-gray-400 text-sm mb-6 max-w-xs">
                {lang === 'en' 
                  ? "Do you have a trading quote or insight that changed your career? Submit it to us."
                  : "Kya aap ke paas koi trading quote ya mashwara hai jisne aap ki career badal di? Hamein bhejen."}
             </p>

             <div className="flex gap-3">
                <a href="https://wa.me/447473938781" target="_blank" rel="noreferrer" className="bg-[#25D366] hover:bg-[#128C7E] text-black p-3 rounded-full transition-colors" title="Submit via WhatsApp">
                   <MessageCircle size={20} />
                </a>
                <a href="mailto:xtechnext.info@gmail.com" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors" title="Submit via Email">
                   <Send size={20} />
                </a>
             </div>
             <div className="text-[10px] text-gray-500 mt-4 uppercase tracking-wider">
                Reviewed by XTN Team
             </div>
         </motion.div>

      </motion.div>

    </div>
  );
};

export default QuotesGallery;