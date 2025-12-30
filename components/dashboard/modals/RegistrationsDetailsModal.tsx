import { X } from "lucide-react";
import { RegistrationsDetailsModalProps } from "@/types/interface/dashboard";

const RegistrationsDetailsModal = ({
  isOpen,
  onClose,
  registration,
}: RegistrationsDetailsModalProps) => {
  if (!isOpen || !registration) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-navy rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-navy border-b border-black/10 dark:border-white/10 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase text-navy dark:text-white">
            Registration Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
                Full Name
              </label>
              <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
                {registration.name}
              </p>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
                Gender
              </label>
              <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
                {registration.gender}
              </p>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
                Age
              </label>
              <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
                {registration.age}
              </p>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
                Category
              </label>
              <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
                {registration.category}
              </p>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
                Nationality
              </label>
              <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
                {registration.nationality}
              </p>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
                Type
              </label>
              <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
                {registration.invitedBy}
              </p>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
                Phone
              </label>
              <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
                {registration.phone}
              </p>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
                Day Registered
              </label>
              <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
                Day {registration.dayRegistered}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
                Address
              </label>
              <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
                {registration.address}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
                Registration Date
              </label>
              <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white/70">
                {formatDate(registration.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationsDetailsModal;
