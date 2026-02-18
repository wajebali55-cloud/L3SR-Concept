import React from 'react';
import { Mail, MessageCircle, Globe, Cpu, GraduationCap, ArrowRight, Smartphone, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  return (
    <div className="w-full max-w-[95%] mx-auto px-4 py-12 pb-24">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-trading-gold/10 border border-trading-gold/30 text-trading-gold text-xs font-bold uppercase tracking-[0.2em]"
        >
           <MessageCircle size={14} /> Support & Inquiries
        </motion.div>
        <motion.h1 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-4xl md:text-6xl font-bold text-white tracking-tight"
        >
           Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-gold to-yellow-200">Touch</span>
        </motion.h1>
        <p className="text-gray-400 max-w-xl mx-auto">
           Whether you have questions about the L3SR strategy, need technical support, or want to contribute to our community.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        
        {/* WhatsApp Card */}
        <motion.a 
          href="https://wa.me/447473938781"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          className="bg-trading-card border border-gray-800 p-8 rounded-2xl flex flex-col items-center text-center group hover:border-[#25D366]/50 transition-all cursor-pointer relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-[#25D366]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle size={32} />
           </div>
           <h3 className="text-2xl font-bold text-white mb-2">WhatsApp Support</h3>
           <p className="text-gray-400 mb-6 text-sm">Instant chat support for quick queries and community joining.</p>
           <div className="text-[#25D366] font-mono font-bold text-lg flex items-center gap-2">
              <Smartphone size={18} /> +44 7473 938781
           </div>
           <div className="mt-6 px-6 py-2 rounded-full bg-[#25D366] text-black font-bold text-sm flex items-center gap-2 group-hover:bg-[#128C7E] transition-colors">
              Chat Now <ArrowRight size={16} />
           </div>
        </motion.a>

        {/* Email Card */}
        <motion.a 
          href="mailto:xtechnext.info@gmail.com"
          whileHover={{ y: -5 }}
          className="bg-trading-card border border-gray-800 p-8 rounded-2xl flex flex-col items-center text-center group hover:border-blue-500/50 transition-all cursor-pointer relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Mail size={32} />
           </div>
           <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
           <p className="text-gray-400 mb-6 text-sm">For detailed inquiries, partnership proposals, or account issues.</p>
           <div className="text-blue-400 font-mono font-bold text-lg flex items-center gap-2 break-all">
              <Send size={18} /> xtechnext.info@gmail.com
           </div>
           <div className="mt-6 px-6 py-2 rounded-full bg-blue-500 text-white font-bold text-sm flex items-center gap-2 group-hover:bg-blue-600 transition-colors">
              Send Email <ArrowRight size={16} />
           </div>
        </motion.a>

      </div>

      {/* Company Branding Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative bg-gradient-to-br from-[#0d0e12] to-black border border-gray-800 rounded-3xl p-8 md:p-12 overflow-hidden"
      >
         <div className="absolute top-0 right-0 p-12 bg-trading-gold/5 blur-3xl rounded-full pointer-events-none"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0">
               <div className="w-24 h-24 bg-black border-2 border-trading-gold/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(207,181,59,0.1)]">
                  <span className="text-3xl font-black text-white tracking-tighter">
                    X<span className="text-trading-gold">TN</span>
                  </span>
               </div>
            </div>
            
            <div className="text-center md:text-left">
               <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">
                  Developed & Powered By
               </div>
               <h2 className="text-3xl font-bold text-white mb-4">
                  xtechnext <span className="text-gray-600 font-normal text-xl">(XTN)</span>
               </h2>
               <p className="text-gray-400 leading-relaxed mb-6">
                  A premier Technology & Education company dedicated to building next-generation learning platforms. We bridge the gap between complex technical concepts and intuitive user experiences.
               </p>
               
               <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800 text-sm text-gray-300">
                     <Cpu size={16} className="text-trading-gold" />
                     <span>Tech Solutions</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800 text-sm text-gray-300">
                     <GraduationCap size={16} className="text-trading-gold" />
                     <span>Education Systems</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800 text-sm text-gray-300">
                     <Globe size={16} className="text-trading-gold" />
                     <span>Global Innovation</span>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>

    </div>
  );
};

export default ContactPage;