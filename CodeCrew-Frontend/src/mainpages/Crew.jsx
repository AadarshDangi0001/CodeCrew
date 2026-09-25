import React from "react";

const Crew = () => {
  // Replace this with the actual Google Form link when ready
  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSdjqzXKgh75QQ9RVezJCO7GVFNkrVp3EaKLetkF2prUOgiVFw/viewform?usp=publish-editor"; 

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 bg-transparent relative overflow-hidden">
      
      {/* Decorative background glow specific to this card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-4xl bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 md:p-14 text-center transform transition-all duration-500 hover:border-white/20">
        
        {/* Glow effect on hover over the card */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        <div className="flex flex-col items-center gap-6 relative z-20">
          
          {/* Badge */}
          <div className="inline-block px-5 py-2 rounded-full border border-blue-4000/30 bg-blue-5000/10 text-blue-400 text-xl font-bold tracking-[0.5em] uppercase mb-2 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            Next Event
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 tracking-tight drop-shadow-2xl mb-4">
            Code Convergence
          </h1>
          
          <p className="text-zinc-400 text-base md:text-xl max-w-2xl leading-relaxed mb-10">
            Get ready to innovate, collaborate, and build the future. Our upcoming flagship event is just around the corner. Gather your crew!
          </p>

          {/* Details Grid (Date & Venue) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 group hover:border-blue-500/40 hover:bg-blue-900/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl mb-1 group-hover:scale-110 transition-transform">
                📅
              </div>
              <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest">Date</h3>
              <p className="text-white text-xl md:text-2xl font-bold font-mono group-hover:text-blue-400 transition-colors drop-shadow-lg">13/10/2026</p>
            </div>
            
            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 group hover:border-purple-500/40 hover:bg-purple-900/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl mb-1 group-hover:scale-110 transition-transform">
                📍
              </div>
              <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest">Venue</h3>
              <p className="text-white text-xl md:text-2xl font-bold font-mono group-hover:text-purple-400 transition-colors drop-shadow-lg"> PBR(Paradise Binge Rooftop) ,4th Floor, Rooftop of Burger King, Plot No. A-32, Main Road, Indrapuri, Bhopal, Madhya Pradesh 462022</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative group mt-2">
            {/* Animated glowing border behind button */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-pulse"></div>
            
            <a 
              href={googleFormLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative flex items-center justify-center gap-3 px-8 py-4 bg-black rounded-full text-white font-bold text-lg hover:bg-zinc-900 transition-colors duration-300 border border-white/10"
            >
              <span>Register Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          <p className="text-zinc-500 text-xs mt-6 font-medium">
            * Fill out the Google Form to be the first to know when official registrations open!
          </p>

        </div>
      </div>
    </div>
  );
};

export default Crew;