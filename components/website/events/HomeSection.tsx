import EventCard from "@/components/dashboard/EventCard";
import axios from "axios";
import { useEffect, useState } from "react";

interface Event {
  _id: string;
  title: string;
  venue: string;
  image: string;
  description?: string;
  dateFrom: string;
  dateTo?: string;
  timeFrom: string;
  timeTo?: string;
  createdAt: string;
}

const HomeSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/api/events");
        setEvents(data.reverse());
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
          <h1 className="text-[clamp(4rem,8vw,8rem)] font-heading leading-none text-black mb-24">
            All Events
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-warm-gray animate-pulse aspect-3/2"
              />
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
          <h1 className="text-[clamp(4rem,8vw,8rem)] font-heading leading-none text-black mb-8">
            All Events
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
        <h1 className="text-[clamp(4rem,8vw,8rem)] font-heading leading-none text-black mb-24">
          All Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {events.map((event) => (
            <EventCard
              key={event._id}
              image={event.image}
              title={event.title}
              description={event.description}
              venue={event.venue}
              dateFrom={event.dateFrom}
              dateTo={event.dateTo}
              timeFrom={event.timeFrom}
              timeTo={event.timeTo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
