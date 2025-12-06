import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

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
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.9,
            stagger: 0.05,
            ease: "power2.inOut",
          }
        );

        tl.fromTo(
          titleRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
          "-=0.3"
        );

        tl.fromTo(
          imageRef.current,
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" },
          "-=0.6"
        );

        tl.fromTo(
          textRef.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.6, ease: "power3.out" },
          "-=1"
        );
      }, sectionRef);

      return () => ctx.revert();
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 px-4 bg-cream overflow-hidden"
    >
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="about-gridline border-r border-burgundy/20 origin-top opacity-0"
          />
        ))}
      </div>

      <div className="relative z-20 grid grid-cols-12 gap-6 items-center">
        <h1
          ref={titleRef}
          className="col-start-1 col-span-12 md:col-start-1 md:col-span-11 md:row-start-1 text-[clamp(2.5rem,8vw,7rem)] font-bold md:leading-[0.99] tracking-tight text-navy opacity-0"
        >
          WE{"'"}RE PART OF THE GLOBAL DEEPER LIFE FAMILY
        </h1>

        <div
          ref={imageRef}
          className="col-start-1 col-span-12 md:col-start-2 md:col-span-7 md:row-start-3 opacity-0"
        >
          <div className="relative w-full h-[85vh] md:h-screen">
            <Image
              fill
              src="/images/home/hero.jpg"
              alt="DCLM Brikama Region congregation"
              className="object-cover"
            />
          </div>
        </div>

        <div
          ref={textRef}
          className="col-start-1 col-span-12 md:col-start-9 md:col-span-4 md:row-start-3 md:row-span-2 flex items-center opacity-0"
        >
          <div className="text-[clamp(1.15rem,2vw,1.7rem)] leading-relaxed text-navy space-y-6">
            <p>
              Deeper Christian Life Ministry is a global network of believers
              committed to holiness, spiritual growth, and spreading the Gospel
              of Jesus Christ.
            </p>
            <p>
              In The Gambia, DCLM has established a vibrant presence with
              multiple regions serving communities across the nation.
            </p>
            <p>
              The Brikama Region is one of these regions, comprising eight
              branches united in faith, fellowship, and the shared mission of
              building strong Christian communities throughout the Brikama area.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
