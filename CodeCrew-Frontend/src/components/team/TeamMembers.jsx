import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Aadarsh Dangi",
    role: "Founder & Developer",
    email: "aadarshdangi0001@gmail.com",
    phone: "+91 9516010257",
    image: "https://ui-avatars.com/api/?name=Aadarsh+Dangi&background=random&color=fff&size=200",
  },
  {
    name: "Shubh Shrivastava",
    role: "Co-Founder & Developer",
    email: "shrivastavashubh0001@gmail.com",
    phone: "+91 7828027332",
    image: "https://ui-avatars.com/api/?name=Shubh+Shrivastava&background=random&color=fff&size=200",
  },
  {
    name: "Mritunjay Sahu",
    role: "Co-Founder & Developer",
    email: "mrityunjaay0001@gmail.com",
    phone: "+91 62646 58751",
    image: "https://ui-avatars.com/api/?name=Pushkar+Sahu&background=random&color=fff&size=200",
  },
  {
    name: "Code Crew",
    role: "Official Contact",
    email: "codecrew0001@gmail.com",
    phone: "+91 6264658751",
    image: "https://ui-avatars.com/api/?name=Code+Crew&background=random&color=fff&size=200",
  },
  {
    name: "Swati Bhagat",
    role: "Marketing Manager",
    email: "swatibhagat0001@gmail.com",
    phone: "+91 9039435891",
    image: "https://ui-avatars.com/api/?name=Swati+Bhagat&background=random&color=fff&size=200",
  },
  {
    name: "Harsh Shrivastava",
    role: "Chief-Technology Officer",
    email: "codecrew0001@gmail.com",
    phone: "+91 6264658751",
    image: "https://ui-avatars.com/api/?name=Code+Crew&background=random&color=fff&size=200",
  },
  {
    name: "Kanishq Singh Negi",
    role: "Chief-Operating Officer",
    email: "kanishqsinghnegi0001@gmail.com",
    phone: "+91 7987453645",
    image: "https://ui-avatars.com/api/?name=Code+Crew&background=random&color=fff&size=200",
  }
];

const TeamMembers = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = cardsRef.current;
      
      // Pin the container while scrolling
      // Using a timeline ensures tweens play sequentially and perfectly match the scroll distance.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(cards.length + 1) * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      // Animate ALL cards to fly upwards and fade out
      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        
        // For the last card, we add a delay (`+=1` in timeline time) so it waits before flying
        const position = isLastCard ? "+=1" : ">";
        
        tl.to(card, {
          yPercent: -150,
          opacity: 0,
          scale: 0.8,
          rotation: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 15 + 5),
          ease: "power1.inOut",
          duration: 1 // Normalize duration so it perfectly maps to scroll distance
        }, position);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className="w-full relative flex flex-col items-center justify-center overflow-hidden bg-transparent" 
      ref={containerRef} 
      style={{ height: '100vh' }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 mb-12 text-center uppercase tracking-[0.3em] z-50 absolute top-20 drop-shadow-lg">
        MEET THE TEAM
      </h2>
      
      <div className="relative w-[90%] max-w-md h-[450px] mt-24 z-10 perspective-1000">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            ref={el => cardsRef.current[index] = el}
            className="absolute top-0 left-0 w-full h-full bg-zinc-900/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col group"
            style={{ zIndex: teamMembers.length - index, transformOrigin: 'bottom center' }}
          >
            {/* Glowing top edge on card hover */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
            
            <div className="relative h-[65%] overflow-hidden bg-black">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end items-center text-white pb-6 backdrop-blur-[2px]">
                <a href={`mailto:${member.email}`} className="text-sm tracking-wider text-center mb-3 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-xl">✉️</span> {member.email}
                </a>
                <a href={`tel:${member.phone}`} className="text-sm tracking-wider text-center hover:text-green-400 transition-colors flex items-center gap-2">
                  <span className="text-xl">📞</span> {member.phone}
                </a>
              </div>
            </div>
            <div className="p-6 h-[35%] flex flex-col justify-center items-center text-center bg-gradient-to-b from-zinc-900 to-black">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">{member.name}</h2>
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-xs font-bold uppercase tracking-[0.2em]">{member.role}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
