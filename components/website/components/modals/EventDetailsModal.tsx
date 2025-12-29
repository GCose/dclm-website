import Image from "next/image";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { EventDetailsModalProps } from "@/types";

const EventDetailsModal = ({
  isOpen,
  onClose,
  event,
}: EventDetailsModalProps) => {
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "unset";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "unset";
    };
  }, [isOpen, lenis]);

  if (!isOpen || !event) return null;

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

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-off-white w-full max-w-4xl max-h-[90vh] overflow-y-auto modal-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 md:py-12">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-4xl md:text-5xl uppercase font-heading font-bold pr-8">
              {event.title}
            </h2>
            <button
              onClick={onClose}
              className="text-black/40 hover:text-black text-3xl cursor-pointer shrink-0"
            >
              ×
            </button>
          </div>

          <div className="relative w-full aspect-3/2 mb-8 overflow-hidden bg-warm-gray">
            <Image
              fill
              src={event.image}
              alt={event.title}
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-burgundy mb-2">
                VENUE
              </p>
              <p className="text-xl text-black">{event.venue}</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-burgundy mb-2">
                DATE
              </p>
              <p className="text-xl text-black">
                {formatDateRange(event.dateFrom, event.dateTo)}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-burgundy mb-2">
                TIME
              </p>
              <p className="text-xl text-black">
                {formatTimeRange(event.timeFrom, event.timeTo)}
              </p>
            </div>

            {event.description && (
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-burgundy mb-2">
                  ABOUT THIS PROGRAM
                </p>
                <p className="text-[clamp(1.1rem,2vw,1.3rem)] text-black font-light leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
