import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRef = useRef(null);
  const textLinesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.fromTo(
          titleWordsRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
          }
        ).fromTo(
          imageRef.current,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.8,
            ease: "power3.out",
          },
          "-=0.3"
        );

        gsap.fromTo(
          textLinesRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textLinesRef.current[0],
              start: "top 80%",
            },
          }
        );
      });

      return () => ctx.revert();
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  const titleWords = ["DCLM", "BRIKAMA", "REGION"];

  return (
    <section className="min-h-screen pt-22 pb-50 px-4 bg-cream ">
      <div className="mx-auto">
        <h1 className="text-[clamp(3rem,9.1vw,11rem)] [word-spacing:20px] font-semibold md:leading-[1.2] tracking-tighter">
          {titleWords.map((word, index) => (
            <span
              key={index}
              ref={(el) => {
                titleWordsRef.current[index] = el;
              }}
              className="inline-block opacity-0"
              style={{ marginRight: index === 2 ? "0" : "30px" }}
            >
              {word}
              {index === 2 && <br />}
            </span>
          ))}
        </h1>

        <div ref={imageRef} className="relative w-full h-screen mb-5 opacity-0">
          <Image
            fill
            priority
            src="/images/home/hero.jpg"
            className="object-cover"
            alt="DCLM Brikama congregation"
          />
        </div>

        <div className="max-w-4xl ml-auto">
          <p className="text-[clamp(1.5rem,4vw,2.1rem)] leading-relaxed text-black">
            <span
              ref={(el) => {
                textLinesRef.current[0] = el;
              }}
              className="pl-30 inline-block opacity-0"
            >
              A vibrant community of believers in Brikama
            </span>{" "}
            <span
              ref={(el) => {
                textLinesRef.current[1] = el;
              }}
              className="inline-block opacity-0"
            >
              united in faith and fellowship. With a commitment to holiness and
              spiritual growth. We prioritize righteous living amongst ourselves
              and ensure total commitment and concescration to GOD.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
