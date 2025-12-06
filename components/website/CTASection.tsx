import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonRef = useRef(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const logoCountRef = useRef(0);
  const activeLogosRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.fromTo(
        ".cta-gridline",
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.inOut",
        }
      );

      tl.fromTo(
        titleRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.3"
      );

      tl.fromTo(
        subtextRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
        "-=0.6"
      );

      tl.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.8"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (logosRef.current && logoCountRef.current % 8 === 0) {
        const logoWrapper = document.createElement("div");
        logoWrapper.className = "absolute pointer-events-none";
        logoWrapper.style.left = `${x}px`;
        logoWrapper.style.top = `${y}px`;
        logoWrapper.style.width = "clamp(8rem, 15vw, 12rem)";
        logoWrapper.style.height = "clamp(8rem, 15vw, 12rem)";
        logoWrapper.style.transform = "translate(-50%, -50%)";

        const img = document.createElement("img");
        img.src = "/images/logo.png";
        img.alt = "DCLM Logo";
        img.className = "w-full h-full object-contain";
        img.style.opacity = "0.7";

        logoWrapper.appendChild(img);
        logosRef.current.appendChild(logoWrapper);
        activeLogosRef.current.push(logoWrapper);

        if (activeLogosRef.current.length > 5) {
          const oldestLogo = activeLogosRef.current.shift();
          if (oldestLogo) {
            oldestLogo.remove();
          }
        }

        gsap.to(logoWrapper, {
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            const index = activeLogosRef.current.indexOf(logoWrapper);
            if (index > -1) {
              activeLogosRef.current.splice(index, 1);
            }
            logoWrapper.remove();
          },
        });
      }

      logoCountRef.current++;
    };

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32 px-4 bg-navy overflow-hidden"
    >
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="cta-gridline border-r border-white/40 origin-top opacity-0"
          />
        ))}
      </div>

      <div
        ref={logosRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      <div className="w-full max-w-7xl text-center relative z-10">
        <h2
          ref={titleRef}
          className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[1.1] tracking-tight text-white mb-8 opacity-0"
        >
          FELLOWSHIP WITH US
        </h2>

        <p
          ref={subtextRef}
          className="text-[clamp(1.5rem,3vw,2rem)] leading-relaxed text-white/80 mb-16 max-w-3xl mx-auto opacity-0"
        >
          Join a vibrant community of believers committed to holiness, spiritual
          growth, and spreading the Gospel throughout Brikama and beyond.
        </p>

        <Link href="/contact">
          <button
            ref={buttonRef}
            className="px-16 py-6 bg-burgundy text-white text-lg uppercase tracking-[0.3em] cursor-pointer hover:bg-burgundy/80 transition-all duration-300 opacity-0"
          >
            Get In Touch
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
