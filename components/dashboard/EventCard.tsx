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
    <div
      className={`group flex flex-col ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
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

      <div className="flex-1 flex flex-col space-y-4">
        <h3 className="text-[clamp(1.75rem,3vw,2.25rem)] font-heading font-bold leading-tight text-black">
          {title}
        </h3>

        {description && (
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-black/60 leading-relaxed line-clamp-2 mb-6">
            {description}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-transparent ">
            <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
              VENUE
            </p>
            <p className="text-[clamp(0.9rem,2vw,1rem)] text-black/70 leading-tight">
              {venue}
            </p>
          </div>

          <div className="bg-transparent ">
            <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
              DATE
            </p>
            <p className="text-[clamp(0.9rem,2vw,1rem)] text-black/70 leading-tight">
              {formatDateRange(dateFrom, dateTo)}
            </p>
          </div>

          <div className="bg-transparent ">
            <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
              TIME
            </p>
            <p className="text-[clamp(0.9rem,2vw,1rem)] text-black/70 leading-tight">
              {formatTimeRange(timeFrom, timeTo)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
