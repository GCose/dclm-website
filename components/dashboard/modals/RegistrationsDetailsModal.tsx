import { X } from "lucide-react";
import { RegistrationsDetailsModalProps } from "@/types/interface/dashboard";

const RegistrationsDetailsModal = ({
  isOpen,
  onClose,
  registration,
}: RegistrationsDetailsModalProps) => {
  if (!isOpen || !registration) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-navy w-full max-w-2xl p-8 rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/10 dark:border-white/10">
          <h3 className="text-xl font-bold uppercase text-navy dark:text-white">
            Registration Details
          </h3>
          <button
            onClick={onClose}
            className="text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
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
              Day Registered
            </label>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
              Day {registration.dayRegistered}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
              Location
            </label>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
              {registration.location}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm uppercase tracking-wider text-black/60 dark:text-white/60 font-bold mb-1">
              Phone Number
            </label>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-navy dark:text-white">
              {registration.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationsDetailsModal;
