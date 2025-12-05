import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LocationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isDark, setIsDark] = useState(false);

  const locations = [
    {
      id: "santosu",
      name: "SANTOSU",
      label: "HeadQuarters Location",
      image: "/images/home/location-1.jpg",
      description:
        "Our foundation rests on biblical truth—salvation through Christ alone, righteous living, fervent prayer, and the Great Commission.",
    },
    {
      id: "college",
      name: "COLLEGE",
      label: "Mbali junction",
      image: "/images/home/location-2.jpg",
      description:
        "A thriving community dedicated to discipleship and spiritual growth through systematic study of God's Word.",
    },
    {
      id: "medina",
      name: "MEDINA",
      label: "Medina Road",
      image: "/images/home/location-1.jpg",
      description:
        "Our foundation rests on biblical truth—salvation through Christ alone, righteous living, fervent prayer, and the Great Commission.",
    },
    {
      id: "kartong",
      name: "KARTONG",
      label: "Kartong Village",
      image: "/images/home/location-4.jpg",
      description:
        "A gathering place for fervent prayer and fellowship, where faith meets community in transformative ways.",
    },
    {
      id: "jalangba",
      name: "JALANGBA",
      label: "Medina Highway",
      image: "/images/home/location-3.jpg",
      description:
        "Committed to holiness and authentic worship, building believers who walk in righteousness and truth.",
    },
    {
      id: "kasakunda",
      name: "KASAKUNDA",
      label: "Mbali junction",
      image: "/images/home/location-2.jpg",
      description:
        "A thriving community dedicated to discipleship and spiritual growth through systematic study of God's Word.",
    },
    {
      id: "kabeke",
      name: "KABEKE",
      label: "Kabeke Village",
      image: "/images/home/location-4.jpg",
      description:
        "A gathering place for fervent prayer and fellowship, where faith meets community in transformative ways.",
    },
    {
      id: "kiti",
      name: "KITI",
      label: "Kitti Village",
      image: "/images/home/location-3.jpg",
      description:
        "Committed to holiness and authentic worship, building believers who walk in righteousness and truth.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;

      if (!container) return;

      const cards = container.querySelectorAll(".location-card");
      if (cards.length === 0) return;

      // Calculate horizontal scroll distance
      const cardWidth = (cards[0] as HTMLElement).offsetWidth;
      const gap = 48;
      const titleWidth = window.innerWidth * 0.55;
      const visibleArea = window.innerWidth - titleWidth;
      const totalCardsWidth =
        cardWidth * cards.length + gap * (cards.length - 1);
      const scrollDistance = totalCardsWidth - visibleArea + cardWidth * 0.2;

      let entranceComplete = false;

      const entranceTl = gsap.timeline({
        paused: true,
        onComplete: () => {
          entranceComplete = true;
        },
      });

      entranceTl.fromTo(
        titleRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      entranceTl.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, ease: "power2.out" },
        "-=0.8"
      );

      entranceTl.fromTo(
        cards,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=1.2"
      );

      entranceTl.fromTo(
        ".branch-gridline",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.inOut",
        },
        "-=0.3"
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 0",
        end: () => `+=${scrollDistance * 1.5}`,
        pin: true,
        onEnter: () => {
          if (!entranceComplete) {
            entranceTl.play();
          }
        },
        onUpdate: (self) => {
          if (entranceComplete) {
            gsap.to(container, {
              x: -scrollDistance * self.progress,
              duration: 0,
            });

            if (self.progress >= 0.15 && self.progress < 0.85) {
              setIsDark(true);
            } else {
              setIsDark(false);
            }
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden md:transition-colors md:duration-500 bg-cream ${
        isDark ? "md:bg-navy" : ""
      }`}
    >
      <div className="absolute inset-0 grid grid-rows-12 pointer-events-none z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`branch-gridline border-b origin-left transition-colors duration-500 ${
              isDark ? "border-white/20" : "border-black/20"
            }`}
          />
        ))}
      </div>
      <div className="hidden md:block h-screen py-20 px-8">
        <div className="flex items-center h-full gap-12">
          <div className="shrink-0 w-[55vw] flex flex-col items-start justify-center pr-12">
            <h2
              ref={titleRef}
              className={`text-[clamp(3rem,6.5vw,9rem)] font-semibold leading-[1.1] tracking-tight transition-colors duration-500 whitespace-nowrap opacity-0 ${
                isDark ? "text-white" : ""
              }`}
            >
              OUR BRANCHES
            </h2>
            <p
              ref={textRef}
              className={`text-[clamp(1.2rem,6vw,1.8rem)] mt-4 transition-colors duration-500 opacity-0 ${
                isDark ? "text-white/70" : "text-black/70"
              }`}
            >
              Spread across 8 locations in the region
            </p>
          </div>

          <div ref={containerRef} className="flex items-center h-full gap-12 z-20">
            {locations.map((location, index) => (
              <div
                key={location.id}
                className="location-card shrink-0 w-[40vw] h-[80vh] flex flex-col pb-8 relative opacity-0"
              >
                <div className="relative w-full h-[50vh] mb-6">
                  <Image
                    fill
                    src={location.image}
                    alt={location.name}
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <h3
                    className={`text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight mb-2 transition-colors duration-500 ${
                      isDark ? "text-white" : ""
                    }`}
                  >
                    {location.name}
                  </h3>
                  <p
                    className={`text-sm uppercase tracking-[0.2em] mb-4 transition-colors duration-500 ${
                      isDark ? "text-white/60" : "text-black/60"
                    }`}
                  >
                    {location.label}
                  </p>
                  <p
                    className={`text-[clamp(1.5rem,4vw,1.5rem)] leading-relaxed transition-colors duration-500 ${
                      isDark ? "text-white/80" : "text-black/80"
                    }`}
                  >
                    {location.description}
                  </p>
                </div>

                <div
                  className={`absolute bottom-0 right-0 text-6xl font-bold transition-colors duration-500 ${
                    isDark ? "text-burgundy/50" : "text-burgundy"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden py-20 px-6 space-y-16 bg-cream">
        <div className="text-left mb-12">
          <h2 className="text-5xl font-semibold leading-[1.1] tracking-tight text-navy mb-4">
            OUR LOCATIONS
          </h2>
          <p className="text-lg text-navy/70">
            Spread across 8 locations in the region
          </p>
        </div>

        {locations.map((location, index) => (
          <div
            key={location.id}
            className="pb-8 border-b-2 border-navy/20 relative"
          >
            <div className="relative w-full h-[50vh] mb-6">
              <Image
                fill
                src={location.image}
                alt={location.name}
                className="object-cover"
              />
            </div>

            <h3 className="text-4xl font-semibold leading-[1.1] tracking-tight text-navy mb-2">
              {location.name}
            </h3>
            <p className="text-sm uppercase tracking-[0.2em] text-navy/60 mb-4">
              {location.label}
            </p>
            <p className="text-lg leading-relaxed text-navy/80 mb-6">
              {location.description}
            </p>

            <div className="absolute bottom-0 right-0 text-6xl font-bold text-burgundy/80">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LocationSection;
