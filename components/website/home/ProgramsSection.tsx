import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Event, EventsResponse } from "@/types";
import EventCard from "@/components/dashboard/EventCard";

const ProgramsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <section className="min-h-screen py-32 px-8 bg-off-white">
        <div className="w-full">
          <h2 className="text-[clamp(4rem,7vw,7rem)] font-bold leading-tight text-black mb-20">
            Our Latest Programs
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
      <section className="min-h-screen py-32 px-8 bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[clamp(4rem,7vw,7rem)] font-bold leading-tight text-black mb-8">
            Our Latest Programs
          </h2>
          <p className="text-2xl text-black/40 uppercase tracking-widest">
            No upcoming programs at the moment
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-32 px-8 bg-off-white">
      <div className="w-full">
        <h2 className="text-[clamp(4rem,7vw,7rem)] font-bold leading-tight text-black mb-20">
          Our Latest Programs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
          {events.map((event) => (
            <EventCard
              key={event._id}
              image={event.image}
              title={event.title}
              venue={event.venue}
              dateTo={event.dateTo}
              timeTo={event.timeTo}
              dateFrom={event.dateFrom}
              timeFrom={event.timeFrom}
              description={event.description}
            />
          ))}
        </div>

        <div className="flex justify-center mt-24">
          <Link href="/events">
            <button className="px-12 py-5 border-2 border-black text-black text-sm uppercase tracking-[0.3em] cursor-pointer hover:bg-black hover:text-white transition-all duration-300">
              View All Events
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
