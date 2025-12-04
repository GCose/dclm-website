import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      id: "sunday",
      day: "SUNDAY WORSHIP SERVICE",
      time: "8:30 AM GMT",
      description:
        "A time of spiritual nourishment and worship with the body of Christ.",
    },
    {
      id: "monday",
      day: "MONDAY BIBLE STUDY",
      time: "5:00 PM GMT",
      description:
        "A time for systematic and expository study of the word of God.",
    },
    {
      id: "thursday",
      day: "THURSDAY REVIVAL SERVICE",
      time: "6:00 PM GMT",
      description: "A time of teaching, healing and deliverance.",
    },
    {
      id: "powernight",
      day: "POWER NIGHT",
      time: "6:00 PM GMT",
      description: "3rd Thursdays of every month.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Title from top down
      entranceTl.fromTo(
        titleRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      entranceTl.fromTo(
        imageRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" },
        "-=0.6"
      );

      entranceTl.fromTo(
        servicesRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=1.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-4 bg-cream">
      <div className="mx-auto">
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-12 md:col-span-5">
            <div className="mb-20 md:mb-85">
              <h2
                ref={titleRef}
                className="text-[clamp(3rem,5vw,8.5rem)] font-semibold leading-[1.1] tracking-tight mb-4 opacity-0"
              >
                OUR SERVICES
              </h2>
            </div>

            <div className="md:hidden relative w-full h-[60vh] mb-12 opacity-0">
              <Image
                fill
                className="object-cover"
                src="/images/home/services.jpg"
                alt="DCLM Brikama worship service"
              />
            </div>

            <div className="space-y-20 md:space-y-85">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  ref={(el) => {
                    servicesRef.current[index] = el;
                  }}
                  className="pb-8 border-b opacity-0"
                >
                  <h3 className="text-[clamp(1.5rem,5vw,2.5rem)] font-bold leading-[1.1] tracking-tight mb-2">
                    {service.day}
                  </h3>
                  <p className="font-body text-[clamp(1.25rem,2vw,1.75rem)] text-burgundy/80 mb-2">
                    {service.time}
                  </p>
                  {service.description && (
                    <p className="font-body text-[clamp(1.2rem,4vw,1.5rem)] text-black/60 mt-4">
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          <div className="hidden md:block md:col-span-6">
            <div className="sticky top-0 h-screen">
              <div ref={imageRef} className="relative w-full h-screen">
                <Image
                  fill
                  className="object-cover"
                  src="/images/home/services.jpg"
                  alt="DCLM Brikama worship service"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
