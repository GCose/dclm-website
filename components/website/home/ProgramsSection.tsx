import axios from "axios";
import Link from "next/link";
import { gsap } from "gsap";
import { Event, EventsResponse } from "@/types";
import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import EventCard from "@/components/dashboard/ProgramCard";
import EventDetailsModal from "@/components/dashboard/modals/ProgramDetailsModal";

gsap.registerPlugin(ScrollTrigger);

const ProgramsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get<EventsResponse>("/api/events?limit=3");
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!loading && events.length > 0) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });

        tl.fromTo(
          titleRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );

        tl.fromTo(
          cardsRef.current,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.6"
        );

        tl.fromTo(
          buttonRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.4"
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, events]);

  if (loading) {
    return (
      <section
        ref={sectionRef}
        className="min-h-screen py-32 px-8 bg-off-white"
      >
        <div className="w-full">
          <h2 className="text-[clamp(2.7rem,7vw,7rem)] font-bold leading-tight text-black mb-20">
            OUR LATEST PROGRAMS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-warm-gray animate-pulse aspect-3/2" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section
        ref={sectionRef}
        className="min-h-screen py-32 px-8 bg-off-white flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-[clamp(2.7rem,7vw,7rem)] font-bold leading-tight text-black mb-8">
            OUR LATEST PROGRAMS
          </h2>
          <p className="text-2xl text-black/40 uppercase tracking-widest">
            No upcoming programs at the moment
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-4 bg-off-white">
      <div className="w-full">
        <h2
          ref={titleRef}
          className="text-[clamp(2.7rem,7vw,7rem)] font-bold leading-tight mb-10 md:mb-20 opacity-0"
        >
          OUR LATEST PROGRAMS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {events.map((event, index) => (
            <div
              key={event._id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="opacity-0"
            >
              <EventCard
                image={event.image}
                title={event.title}
                venue={event.venue}
                dateTo={event.dateTo}
                timeTo={event.timeTo}
                dateFrom={event.dateFrom}
                timeFrom={event.timeFrom}
                description={event.description}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowDetailsModal(true);
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-24">
          <Link href="/programs">
            <button
              ref={buttonRef}
              className="px-12 py-5 border-2 border-navy text-sm uppercase tracking-[0.3em] cursor-pointer hover:bg-navy hover:text-white transition-all duration-300 opacity-0"
            >
              View All Programs
            </button>
          </Link>
        </div>
      </div>

      <EventDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
      />
    </section>
  );
};

export default ProgramsSection;
