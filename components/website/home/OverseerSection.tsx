import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OverseerSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(contentRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-32 bg-cream">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div ref={imageRef} className="relative w-full aspect-3/4">
            <Image
              fill
              src="/images/home/RO.jpg"
              alt="Regional Overseer"
              className="object-cover"
            />
          </div>

          <div ref={contentRef} className="space-y-8">
            <h2 className="text-[clamp(3rem,6vw,3rem)] font-bold leading-tight text-black">
              A WORD FROM OUR REGIONAL OVERSEER
            </h2>

            <div className="space-y-6 text-[clamp(1.2rem,2.5vw,1.5rem)] leading-relaxed text-black/80">
              <p>
                {'"'}As we gather in worship and fellowship, let us remember
                that our strength lies in our unity and commitment to Christ.
                The Brikama Region continues to flourish as we stand firm on the
                word of God and pursue holiness in all our ways.{'"'}
              </p>

              <p>
                {'"'}I am proud of the dedication shown by our brothers and
                sisters across all our locations. Together, we are building a
                community that reflects the love and grace of our Lord Jesus
                Christ.{'"'}
              </p>

              <p>
                {'"'}May the Lord continue to guide us as we serve Him with all
                our hearts, spreading His gospel throughout Brikama and beyond.
                {'"'}
              </p>
            </div>

            <div className="pt-8 border-t border-black/20">
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
    </section>
  );
};

export default OverseerSection;
