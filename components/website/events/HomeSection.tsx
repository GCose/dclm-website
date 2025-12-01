import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const formatDateRange = (dateFrom: string, dateTo?: string) => {
    const from = new Date(dateFrom);
    const fromFormatted = from.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    if (!dateTo || dateFrom === dateTo) {
      return fromFormatted;
    }

    const to = new Date(dateTo);
    const toFormatted = to.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return `${fromFormatted} - ${toFormatted}`;
  };

  const formatTimeRange = (timeFrom: string, timeTo?: string) => {
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    if (!timeTo) return formatTime(timeFrom);
    return `${formatTime(timeFrom)} - ${formatTime(timeTo)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-8 bg-off-white">
        <div className="w-full">
          <h1 className="text-[clamp(4rem,8vw,8rem)] font-heading leading-none text-black mb-24">
            All Events
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
            <div key={event._id} className="group">
              <div className="relative w-full aspect-3/2 mb-6 overflow-hidden bg-warm-gray">
                <Image
                  fill
                  src={event.image}
                  alt={event.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/favicon.png";
                  }}
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-black/50">
                  {event.venue}
                </p>
                <h3 className="text-3xl font-heading leading-tight text-black">
                  {event.title}
                </h3>
                <p className="text-xl text-black/70">
                  {formatDateRange(event.dateFrom, event.dateTo)}
                </p>
                <p className="text-xl text-black/70">
                  {formatTimeRange(event.timeFrom, event.timeTo)}
                </p>
                {event.description && (
                  <p className="text-lg text-black/60 leading-relaxed">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
