import axios from "axios";
import { useEffect, useState } from "react";
import { Event, EventsResponse } from "@/types";
import EventCard from "@/components/dashboard/EventCard";

const HeroSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get<EventsResponse>("/api/events");
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
      <div className="min-h-screen pt-32 pb-20 px-8 bg-off-white">
        <div className="w-full">
          <h1 className="text-[clamp(3rem,6vw,5rem)] uppercase font-bold leading-none mb-24">
            All Programs
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-warm-gray animate-pulse aspect-3/2" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-8 bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[clamp(3rem,6vw,5rem)] uppercase font-bold leading-none mb-8">
            All Programs
          </h1>
          <p className="text-2xl text-black/40 uppercase tracking-widest">
            No events available at the moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 bg-off-white">
      <div className="w-full">
        <h1 className="text-[clamp(3rem,6vw,5rem)] uppercase font-bold leading-none mb-24">
          All Programs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
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
      </div>
    </div>
  );
};

export default HeroSection;
