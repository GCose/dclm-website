import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const pastors = [
  { name: "Pastor Kayode Ayepola", branch: "Santosu", image: "/images/pastors/ro.jpg" },
  { name: "Pastor Philips Adewuyi", branch: "College", image: "/images/pastors/sukuta.jpg" },
  { name: "Pastor Chidera Nwosu", branch: "Brikama Market", image: "/images/pastors/market.jpg" },
  { name: "Pastor Ebrima Ceesay", branch: "Kafuta", image: "/images/pastors/kafuta.jpg" },
  { name: "Pastor Bukola Adeyemi", branch: "Gunjur", image: "/images/pastors/gunjur.jpg" },
  { name: "Pastor Lamin Sanneh", branch: "Tanji", image: "/images/pastors/tanji.jpg" },
  { name: "Pastor Ngozi Okeke", branch: "Brufut", image: "/images/pastors/brufut.jpg" },
  { name: "Pastor Modou Drammeh", branch: "Brikama Nema", image: "/images/pastors/nema.jpg" },
];

const PastorsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });

        tl.fromTo(
          ".about-gridline",
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.9, stagger: 0.05, ease: "power2.inOut" }
        );

        tl.fromTo(
          titleRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=0.3"
        );

        tl.fromTo(
          ".pastor-card",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
          "-=0.6"
        );
      }, sectionRef);

      return () => ctx.revert();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-40 px-4 md:px-8 bg-off-white overflow-hidden"
    >
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="about-gridline border-r border-burgundy/20 origin-top opacity-0"
          />
        ))}
      </div>

      <div className="relative z-20">
        <h2
          ref={titleRef}
          className="text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-navy mb-16 opacity-0"
        >
          OUR REGIONAL PASTORS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastors.map((pastor, index) => (
            <div key={index} className="pastor-card opacity-0 flex">
              <div className="bg-cream p-6 rounded-lg flex flex-col items-center h-full w-full">
                <div className="relative w-full aspect-square mb-6 rounded-full overflow-hidden border-4 border-burgundy/10">
                  <Image
                    fill
                    src={pastor.image}
                    alt={pastor.name}
                    className="object-cover"
                  />
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-2">
                  {pastor.name}
                </h4>
                <p className="text-lg sm:text-xl text-black/70 text-center">
                  {pastor.branch}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastorsSection;
