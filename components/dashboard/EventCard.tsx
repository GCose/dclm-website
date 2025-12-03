import Image from "next/image";
import { EventCardProps } from "@/types";

interface EventCardWithClickProps extends EventCardProps {
  onClick?: () => void;
}

const EventCard = ({
  image,
  title,
  description,
  venue,
  dateFrom,
  dateTo,
  timeFrom,
  timeTo,
  onClick,
}: EventCardWithClickProps) => {
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
    <div className="group h-full flex flex-col">
      <div className="relative w-full aspect-3/2 mb-6 overflow-hidden bg-warm-gray">
        <Image
          fill
          src={image}
          alt={title}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/favicon.png";
          }}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-[clamp(1.75rem,3vw,2.25rem)] font-heading font-bold leading-tight text-black mb-1">
          {title}
        </h3>

        {description && (
          <p className="text-[clamp(1.2rem,3vw,1.4rem)] text-black/60 leading-tight line-clamp-2 mb-4">
            {description}
          </p>
        )}

        <div className="space-y-2 mt-4">
          <p className="text-[clamp(1rem,3vw,1.1rem)] uppercase tracking-[0.15em] text-black/50">
            Location: {venue}
          </p>
          <p className="text-[clamp(1rem,3vw,1.1rem)] uppercase tracking-[0.15em] text-black/60">
            Date: {formatDateRange(dateFrom, dateTo)}
          </p>
          <p className="text-[clamp(1rem,3vw,1.1rem)] uppercase tracking-[0.15em] text-black/60">
            Time: {formatTimeRange(timeFrom, timeTo)}
          </p>
        </div>

        {onClick && (
          <button
            onClick={onClick}
            className="mt-4 text-sm uppercase tracking-widest text-terracotta hover:text-black transition-colors cursor-pointer text-left"
          >
            View Details →
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
