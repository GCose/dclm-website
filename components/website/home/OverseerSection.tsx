import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OverseerSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const dividerRef = useRef(null);
  const signatureRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 5%",
        },
      });

      entranceTl.fromTo(
        imageRef.current,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
        }
      );

      entranceTl.fromTo(
        titleRef.current,
        { y: -60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.2"
      );

      entranceTl.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.8"
      );

      entranceTl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.4"
      );

      entranceTl.fromTo(
        signatureRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-32 px-4 lg:px-0 bg-white"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          <div ref={imageRef} className="relative w-full aspect-3/4 opacity-0">
            <Image
              fill
              src="/images/home/RO.jpg"
              alt="Regional Overseer"
              className="object-cover"
            />
          </div>

          <div className="space-y-8 md:space-y-30">
            <h2
              ref={titleRef}
              className="text-[clamp(3rem,6vw,4rem)] font-bold leading-tight opacity-0"
            >
              A WORD FROM OUR REGIONAL OVERSEER
            </h2>

            <div className="space-y-6 text-[clamp(1.2rem,2.5vw,1.5rem)] leading-tight text-black/80 md:mr-4">
              <p
                ref={(el) => {
                  textRef.current[0] = el;
                }}
                className="opacity-0"
              >
                As we gather in worship and fellowship, let us remember that our
                strength lies in our unity and commitment to Christ. The Brikama
                Region continues to flourish as we stand firm on the word of God
                and pursue holiness in all our ways.
              </p>

              <p
                ref={(el) => {
                  textRef.current[1] = el;
                }}
                className="opacity-0"
              >
                I am proud of the dedication shown by our brothers and sisters
                across all our locations. Together, we are building a community
                that reflects the love and grace of our Lord Jesus Christ.
              </p>

              <p
                ref={(el) => {
                  textRef.current[2] = el;
                }}
                className="opacity-0"
              >
                May the Lord continue to guide us as we serve Him with all our
                hearts, spreading His gospel throughout Brikama and beyond.
              </p>
            </div>

            <div
              ref={dividerRef}
              className="pt-8 border-t border-burgundy/30 mr-0 md:mr-4 origin-left opacity-0"
            >
              <div ref={signatureRef} className="opacity-0">
                <p className="text-xl font-semibold text-black mb-1">
                  Pastor Kayode Ayepola
                </p>
                <p className="text-base uppercase tracking-widest text-black/60">
                  Regional Overseer, Brikama Region
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverseerSection;
