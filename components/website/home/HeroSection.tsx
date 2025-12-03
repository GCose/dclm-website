import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.from(titleWordsRef.current, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        }).from(
          imageRef.current,
          {
            scale: 0.6,
            opacity: 0,
            duration: 1.8,
            ease: "power3.out",
          },
          "-=0.3"
        );
      });

      return () => ctx.revert();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const titleWords = ["DCLM", "BRIKAMA", "REGION"];

  return (
    <section className="min-h-screen pt-22 pb-50 px-4 bg-cream ">
      <div className="mx-auto">
        <h1 className="text-[clamp(3rem,8.1vw,11rem)] [word-spacing:20px] font-semibold leading-[1.2] tracking-tighter mb-5">
          {titleWords.map((word, index) => (
            <span
              key={index}
              ref={(el) => {
                titleWordsRef.current[index] = el;
              }}
              className="inline-block"
              style={{ marginRight: index === 2 ? "0" : "30px" }}
            >
              {word}
              {index === 2 && <br />}
            </span>
          ))}
        </h1>

        <div ref={imageRef} className="relative w-full h-screen mb-5">
          <Image
            fill
            priority
            src="/images/home/hero.jpg"
            className="object-cover"
            alt="DCLM Brikama congregation"
          />
        </div>

        <div className="max-w-4xl ml-auto">
          <p className="text-[clamp(1.5rem,4vw,2.1rem)] leading-[1.1] text-black">
            <span className="pl-30">
              A vibrant community of believers in Brikama
            </span>{" "}
            <span>
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
