import React, { useRef, useState } from 'react';
import { Award, CheckCircle, Download, RefreshCcw, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CertificateProps {
  onRestart: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ onRestart }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      setIsDownloading(true);
      
      // We capture the element. The scale option increases resolution.
      // windowWidth helps ensure we capture desktop-like layout even on mobile if needed,
      // but since we want WYSIWYG, we rely on the responsive design looking good.
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3, // High resolution for print quality
        backgroundColor: '#fffdf5', // Match the paper color
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `L3SR-Certificate-${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to generate certificate", err);
      alert("Could not generate image. Please try taking a screenshot.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4 md:py-8 animate-[fadeIn_0.5s_ease-out]">
      
      {/* Container - Controls the max size of the certificate on screen */}
      <div className="w-full max-w-5xl px-4">
        
        {/* Certificate Element - Maintains A4 Landscape Aspect Ratio (approx 1.414) */}
        {/* We use flex layout inside to distribute content evenly regardless of size */}
        <div 
          ref={certificateRef}
          className="relative w-full aspect-[1.414/1] bg-[#fffdf5] text-black shadow-2xl overflow-hidden flex flex-col select-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
                 style={{ backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>
            
            {/* Minimal Gold Frame */}
            <div className="absolute inset-3 md:inset-6 border border-[#cfb53b] z-10 pointer-events-none opacity-60"></div>
            <div className="absolute inset-4 md:inset-8 border-[2px] border-[#cfb53b] z-10 pointer-events-none"></div>

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-16 md:h-16 border-t-[4px] border-l-[4px] border-[#cfb53b] z-20"></div>
            <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-16 md:h-16 border-t-[4px] border-r-[4px] border-[#cfb53b] z-20"></div>
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-8 h-8 md:w-16 md:h-16 border-b-[4px] border-l-[4px] border-[#cfb53b] z-20"></div>
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-8 h-8 md:w-16 md:h-16 border-b-[4px] border-r-[4px] border-[#cfb53b] z-20"></div>

            {/* Main Content Area */}
            <div className="relative z-20 flex-1 flex flex-col items-center justify-between py-8 px-6 md:py-16 md:px-16 text-center">
                
                {/* Header Section */}
                <div className="flex flex-col items-center gap-1 md:gap-4 mt-2 md:mt-4">
                    <div className="flex items-center gap-4 text-[#cfb53b]">
                         <div className="h-px w-8 md:w-24 bg-[#cfb53b]"></div>
                         <Award className="w-6 h-6 md:w-10 md:h-10 text-[#cfb53b]" />
                         <div className="h-px w-8 md:w-24 bg-[#cfb53b]"></div>
                    </div>
                    <h2 className="text-[10px] md:text-sm font-sans font-bold tracking-[0.3em] uppercase text-gray-500 mt-2 md:mt-4">
                        Certificate of Achievement
                    </h2>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] tracking-tight leading-none mt-1">
                        Trading Mastery
                    </h1>
                </div>

                {/* Body Text */}
                <div className="max-w-4xl w-full flex flex-col items-center gap-3 md:gap-6">
                    <p className="text-xs sm:text-sm md:text-xl text-gray-600 italic font-medium px-4">
                        This document certifies that the holder has successfully demonstrated high proficiency in
                    </p>
                    
                    <div className="w-full py-2 md:py-4 border-b border-gray-200/60 max-w-2xl">
                        <span className="text-xl sm:text-3xl md:text-5xl font-bold text-[#cfb53b] block drop-shadow-sm tracking-wide">
                            L3SR Strategy
                        </span>
                        <span className="text-[8px] md:text-xs font-sans text-gray-400 uppercase tracking-[0.2em] mt-1 md:mt-2 block">
                            Last 3 Second Rejection Concept
                        </span>
                    </div>

                    <p className="text-[10px] sm:text-xs md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto px-4">
                        By exhibiting strict discipline in market trend analysis, support & resistance validation, and precise execution of the 1-minute rejection rule under simulated market conditions.
                    </p>
                </div>

                {/* Footer Section */}
                <div className="w-full flex justify-between items-end mt-4 md:mt-0 px-2 md:px-8 pb-2 md:pb-4">
                    
                    {/* Date Block */}
                    <div className="flex flex-col items-center w-1/3">
                        <div className="text-xs sm:text-base md:text-xl font-bold text-[#1a1a1a] border-b border-gray-300 pb-1 mb-1 font-mono w-full text-center">
                            {new Date().toLocaleDateString()}
                        </div>
                        <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-400 font-sans">
                            Date Issued
                        </div>
                    </div>

                    {/* Center Seal */}
                    <div className="w-1/3 flex justify-center -mb-2 md:-mb-6">
                        <div className="relative">
                           <div className="w-16 h-16 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-[#cfb53b] to-[#b09620] flex items-center justify-center shadow-lg border-4 border-white">
                               <CheckCircle className="text-white w-8 h-8 md:w-14 md:h-14" strokeWidth={1.5} />
                           </div>
                           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[6px] md:text-[10px] font-sans font-bold py-1 px-2 md:px-4 rounded shadow uppercase tracking-wider whitespace-nowrap">
                              Verified
                           </div>
                        </div>
                    </div>

                    {/* Signature Block */}
                    <div className="flex flex-col items-center w-1/3">
                         <div 
                           className="text-xl sm:text-3xl md:text-6xl text-[#1a1a1a] pb-1 mb-1 transform -rotate-3 leading-none" 
                           style={{ fontFamily: "'Great Vibes', cursive" }}
                         >
                            L3sr Master
                         </div>
                         <div className="h-px w-full bg-gray-300 mb-1"></div>
                         <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-400 font-sans">
                            Instructor Signature
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <button 
          onClick={onRestart}
          className="px-8 py-3 rounded-full bg-[#1a1a1a] text-white font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <RefreshCcw size={18} />
          <span className="tracking-wide">Restart Course</span>
        </button>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-8 py-3 rounded-full bg-[#cfb53b] text-white font-medium hover:bg-[#bba02a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#cfb53b]/30"
        >
          {isDownloading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
          <span className="tracking-wide">{isDownloading ? 'Saving...' : 'Save Certificate'}</span>
        </button>
      </div>

      <p className="text-gray-500 text-[10px] md:text-xs max-w-md text-center opacity-60">
        This certificate acknowledges the completion of the L3SR educational simulation. It does not represent a certified financial qualification.
      </p>

    </div>
  );
};

export default Certificate;