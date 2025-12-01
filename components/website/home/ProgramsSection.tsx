import Image from "next/image";
import { useEffect, useState } from "react";

interface Event {
  _id: string;
  title: string;
  venue: string;
  image: string;
  description?: string;
  date: string;
  createdAt: string;
}

const ProgramsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          const data = await res.json();
          setEvents(data.slice(0, 6));
        }
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
      <section className="min-h-screen py-32 px-4 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[clamp(3rem,6vw,7rem)] font-semibold leading-[1.1] tracking-tight text-black mb-20">
            OUR LATEST PROGRAMS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-warm-gray animate-pulse h-[400px] rounded"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="min-h-screen py-32 px-4 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[clamp(3rem,6vw,7rem)] font-semibold leading-[1.1] tracking-tight text-black mb-20">
            OUR PROGRAMS
          </h2>
          <p className="text-xl text-black/60">
            No upcoming programs at the moment. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-32 px-4 bg-off-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[clamp(3rem,6vw,7rem)] font-semibold leading-[1.1] tracking-tight text-black mb-20">
          OUR PROGRAMS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative w-full aspect-4/3 mb-4 overflow-hidden">
                <Image
                  fill
                  src={event.image}
                  alt={event.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-black/60 uppercase tracking-wider">
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>{event.venue}</span>
                </div>

                <h3 className="text-2xl font-semibold leading-tight text-black">
                  {event.title}
                </h3>

                {event.description && (
                  <p className="text-base text-black/70 line-clamp-2">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
