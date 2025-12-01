import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const CommunityHighlight = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [isDark, setIsDark] = useState(false);

  const highlights = [
    {
      id: 1,
      startCol: 2,
      spanCols: 3,
      image: "/images/highlight-1.jpg",
      title: "SUNDAY WORSHIP",
      description: "Powerful worship services filled with the presence of God",
    },
    {
      id: 2,
      startCol: 8,
      spanCols: 4,
      image: "/images/highlight-2.jpg",
      title: "YOUTH FELLOWSHIP",
      description: "Young believers growing together in faith and purpose",
    },
    {
      id: 3,
      startCol: 1,
      spanCols: 3,
      image: "/images/highlight-3.jpg",
      title: "OUTREACH PROGRAMS",
      description: "Reaching the community with the love of Christ",
    },
    {
      id: 4,
      startCol: 6,
      spanCols: 4,
      image: "/images/highlight-4.jpg",
      title: "PRAYER MEETINGS",
      description: "United in fervent prayer and intercession",
    },
    {
      id: 5,
      startCol: 3,
      spanCols: 4,
      image: "/images/highlight-5.jpg",
      title: "COMMUNITY SERVICE",
      description: "Serving the people of Brikama with compassion",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (self.progress >= 0.5) {
              setIsDark(true);
            } else {
              setIsDark(false);
            }
          },
        },
      });

      tl.to(titleRef.current, {
        y: "40vh",
        duration: 50,
      });

      highlights.forEach((highlight, index) => {
        tl.fromTo(
          `#highlight-${highlight.id}`,
          { yPercent: 100 },
          { yPercent: -100, duration: 30 },
          50 + index * 5
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen w-full overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-cream"
      }`}
    >
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`border-r ${
              isDark ? "border-white/40" : "border-black/40"
            }`}
          />
        ))}
      </div>

      <div
        ref={titleRef}
        className="absolute top-0 left-0 right-0 flex justify-center pt-20 z-20"
      >
        <h2
          className={`text-[clamp(3rem,6vw,7rem)] font-semibold leading-[1.1] tracking-tight transition-colors duration-500 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          THE BRIKAMA COMMUNITY
        </h2>
      </div>

      {highlights.map((highlight) => {
        const leftPercent = ((highlight.startCol - 1) / 12) * 100;
        const widthPercent = (highlight.spanCols / 12) * 100;

        return (
          <div
            key={highlight.id}
            id={`highlight-${highlight.id}`}
            className="absolute h-screen flex flex-col justify-center px-4 z-30"
            style={{
              left: `${leftPercent}%`,
              width: `${widthPercent}%`,
            }}
          >
            <div className="relative w-full aspect-3/4 mb-4">
              <Image
                fill
                src={highlight.image}
                alt={highlight.title}
                className="object-cover"
              />
            </div>

            <div className="text-center">
              <h3
                className={`text-lg font-semibold mb-2 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {highlight.title}
              </h3>
              <p
                className={`text-sm transition-colors duration-500 ${
                  isDark ? "text-white/70" : "text-black/70"
                }`}
              >
                {highlight.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CommunityHighlight;
