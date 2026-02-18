import React, { useRef, useState } from 'react';
import { Award, CheckCircle, Download, RefreshCcw, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CertificateProps {
  userName: string;
  onRestart: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ userName, onRestart }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      setIsDownloading(true);
      
      // Capture at higher scale for crisp text
      // Added slightly more wait time or config if needed, but usually CSS fix is enough
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3, 
        backgroundColor: '#fffdf5',
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `L3SR-Certificate-${userName.replace(/\s+/g, '_')}.png`;
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
    <div className="w-full flex flex-col items-center gap-6 py-4 animate-[fadeIn_0.5s_ease-out]">
      
      {/* Container - Reduced width for a cleaner, less "over" look */}
      <div className="w-full max-w-3xl px-2">
        
        {/* Certificate Box - Standard Certificate Ratio */}
        <div 
          ref={certificateRef}
          className="relative w-full aspect-[1.414/1] bg-[#fffdf5] text-black shadow-2xl overflow-hidden flex flex-col select-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.03] z-0" 
                 style={{ backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
            </div>
            
            {/* Elegant Double Border - Kept tight to edge to maximize space */}
            <div className="absolute inset-2 border border-[#cfb53b]/30 pointer-events-none z-10"></div>
            <div className="absolute inset-3 border-2 border-[#cfb53b] pointer-events-none z-10"></div>

            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-[#cfb53b] z-20"></div>
            <div className="absolute top-3 right-3 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-[#cfb53b] z-20"></div>
            <div className="absolute bottom-3 left-3 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-[#cfb53b] z-20"></div>
            <div className="absolute bottom-3 right-3 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-[#cfb53b] z-20"></div>

            {/* Content Flex Container - Evenly distributed to prevent overlap/cutoff */}
            <div className="relative z-20 flex-1 flex flex-col items-center justify-between py-6 px-6 md:py-10 md:px-12 text-center">
                
                {/* Header */}
                <div className="flex flex-col items-center mt-1">
                    <div className="flex items-center gap-2 mb-1 opacity-80">
                         <div className="h-px w-6 md:w-10 bg-[#cfb53b]"></div>
                         <Award className="w-3 h-3 md:w-5 md:h-5 text-[#cfb53b]" />
                         <div className="h-px w-6 md:w-10 bg-[#cfb53b]"></div>
                    </div>
                    <h2 className="text-[6px] md:text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-gray-400">
                        Official Certification
                    </h2>
                    <h1 className="text-xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-0.5">
                        L3SR MASTERY
                    </h1>
                </div>

                {/* Name Section - The Hero */}
                <div className="flex-1 flex flex-col justify-center items-center w-full min-h-0">
                    <p className="text-[7px] md:text-xs text-gray-500 italic font-medium mb-1">
                        This certifies that
                    </p>
                    
                    {/* Increased padding and line-height to prevent clipping in html2canvas */}
                    <div className="relative px-4 md:px-8 border-b border-[#cfb53b]/30 pb-2 md:pb-4 mb-2 md:mb-3 w-full max-w-[90%] md:max-w-lg mx-auto">
                        <span className="text-xl md:text-5xl font-bold text-[#1a1a1a] block font-serif tracking-wide capitalize leading-relaxed py-2 break-words">
                           {userName}
                        </span>
                    </div>

                    <p className="text-[7px] md:text-xs text-gray-600 max-w-md leading-relaxed px-4">
                        Has successfully demonstrated professional discipline and execution of the <span className="font-bold text-[#cfb53b]">Last 3 Second Rejection</span> strategy protocol.
                    </p>
                </div>

                {/* Footer - Compact Layout */}
                <div className="w-full flex justify-between items-end mt-1 px-2">
                    
                    {/* Date */}
                    <div className="flex flex-col items-center w-20 md:w-32">
                        <div className="text-[7px] md:text-xs font-bold text-[#1a1a1a] border-b border-gray-300 pb-0.5 mb-0.5 font-mono w-full text-center">
                            {new Date().toLocaleDateString()}
                        </div>
                        <span className="text-[5px] md:text-[8px] uppercase tracking-widest text-gray-400 font-sans">Date Issued</span>
                    </div>

                    {/* Seal */}
                    <div className="relative -mb-1 md:-mb-2 z-30">
                         <div className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#cfb53b] to-[#b09620] flex items-center justify-center shadow-md border-2 border-white text-white">
                             <CheckCircle className="w-4 h-4 md:w-7 md:h-7" />
                         </div>
                    </div>

                    {/* Signature */}
                    <div className="flex flex-col items-center w-20 md:w-32">
                         <div className="text-xs md:text-2xl text-[#1a1a1a] font-signature transform -rotate-2 w-full text-center border-b border-gray-300 pb-0.5 mb-0.5 leading-none">
                            L3sr Master
                         </div>
                         <span className="text-[5px] md:text-[8px] uppercase tracking-widest text-gray-400 font-sans">Verified Signature</span>
                    </div>

                </div>

            </div>
        </div>
      </div>
      
      {/* Controls */}
       <div className="flex flex-row gap-3">
        <button 
          onClick={onRestart}
          className="px-5 py-2 rounded-full bg-[#1a1a1a] text-white text-xs md:text-sm font-medium hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <RefreshCcw size={14} /> <span className="hidden md:inline">Restart Course</span><span className="md:hidden">Restart</span>
        </button>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-5 py-2 rounded-full bg-[#cfb53b] text-white text-xs md:text-sm font-medium hover:bg-[#bba02a] transition-all flex items-center gap-2 shadow-lg shadow-[#cfb53b]/20 cursor-pointer"
        >
          {isDownloading ? <Loader2 className="animate-spin" size={14} /> : <Download size={14} />}
          {isDownloading ? 'Saving...' : 'Save'}
        </button>
      </div>

    </div>
  );
};

export default Certificate;