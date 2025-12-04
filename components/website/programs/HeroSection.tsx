import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "@/components/dashboard/ProgramCard";
import { Event, EventsResponse, PaginationData } from "@/types";
import EventDetailsModal from "@/components/dashboard/modals/ProgramDetailsModal";

const HeroSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const fetchEvents = async (page: number) => {
    setLoading(true);
    try {
      const { data } = await axios.get<EventsResponse>(
        `/api/events?page=${page}&limit=15`
      );
      setEvents(data.events);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-8 bg-off-white">
        <div className="w-full">
          <h1 className="text-[clamp(3rem,6vw,5rem)] uppercase font-bold leading-none mb-24">
            All Programs
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
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
    <>
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
                onClick={() => {
                  setSelectedEvent(event);
                  setShowDetailsModal(true);
                }}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-20">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-6 py-3 border border-navy text-navy text-sm uppercase tracking-wider cursor-pointer hover:bg-navy hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-navy"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-12 h-12 border border-navy text-sm uppercase cursor-pointer transition-colors ${
                      page === pagination.page
                        ? "bg-navy text-white"
                        : "text-navy hover:bg-navy hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-6 py-3 border border-navy text-navy text-sm uppercase tracking-wider cursor-pointer hover:bg-navy hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-navy"
              >
                Next
              </button>
            </div>
          )}
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
    </>
  );
};

export default HeroSection;
