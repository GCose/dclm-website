import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroSection = () => {
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.8 });

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
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  const titleWords = ["WELCOME", "TO", "DCLM", "BRIKAMA", "REGION"];

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 bg-cream">
      <div className="mx-auto">
        <h1 className="text-[clamp(3rem,7vw,8.5rem)] [word-spacing:20px] text-black font-semibold leading-[1.2] tracking-tight mb-10">
          {titleWords.map((word, index) => (
            <span
              key={index}
              ref={(el) => {
                titleWordsRef.current[index] = el;
              }}
              className="inline-block"
              style={{ marginRight: index === 2 ? "0" : "20px" }}
            >
              {word}
              {index === 2 && <br />}
            </span>
          ))}
        </h1>

        <div ref={imageRef} className="relative w-full h-screen mb-10">
          <Image
            fill
            priority
            src="/images/hero.jpg"
            className="object-cover"
            alt="DCLM Brikama congregation"
          />
        </div>

        <div className="max-w-4xl ml-auto">
          <p className="text-[clamp(1.5rem,4vw,1.9rem)] leading-[1.1] text-black">
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
