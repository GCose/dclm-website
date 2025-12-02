import Image from "next/image";
import { EventCardProps } from "@/types";

const EventCard = ({
  image,
  title,
  description,
  venue,
  dateFrom,
  dateTo,
  timeFrom,
  timeTo,
}: EventCardProps) => {
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
    <div className="group">
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

      <div className="space-y-4">
        <h3 className="text-4xl font-heading leading-tight text-black">
          {title}
        </h3>
        {description && (
          <p className="text-xl text-black/70 leading-relaxed line-clamp-3">
            {description}
          </p>
        )}
        <p className="text-lg uppercase tracking-[0.2em] text-black/50">
          {venue}
        </p>
        <div className="space-y-1">
          <p className="text-lg text-black/60">
            {formatDateRange(dateFrom, dateTo)}
          </p>
          <p className="text-lg text-black/60">
            {formatTimeRange(timeFrom, timeTo)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
