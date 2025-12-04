import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".gridline",
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.inOut",
        }
      )
        .fromTo(
          logoRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "+=0.2"
        )
        .fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power1.inOut",
          },
          "-=0.5"
        )
        .to(
          containerRef.current,
          {
            y: "-100%",
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onComplete,
          },
          "+=0.2"
        );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 bg-cream flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="gridline border-r border-black/20 origin-top opacity-0"
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div
          ref={logoRef}
          className="relative w-40 h-40 md:w-52 md:h-52 mb-6 md:mb-8 opacity-0"
        >
          <Image
            fill
            alt="DCLM Logo"
            src="/images/logo.png"
            className="object-contain"
          />
        </div>

        <h1
          ref={textRef}
          className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-navy opacity-0 text-center px-4"
        >
          WELCOME TO DCLM THE GAMBIA
        </h1>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5">
        <div
          ref={progressRef}
          className="h-full bg-terracotta origin-left opacity-0"
        />
      </div>
    </div>
  );
}
