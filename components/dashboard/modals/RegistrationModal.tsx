import { X } from "lucide-react";
import { RegistrationModalProps } from "@/types/interface/dashboard";

const RegistrationModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  totalDays,
}: RegistrationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-navy w-full max-w-2xl p-8 rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold uppercase text-navy dark:text-white">
            Add Registration
          </h3>
          <button
            onClick={onClose}
            className="text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Gender *
              </label>
              <select
                required
                value={form.gender}
                onChange={(e) =>
                  setForm({
                    ...form,
                    gender: e.target.value as "Male" | "Female",
                  })
                }
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Age *
              </label>
              <input
                type="number"
                required
                min="1"
                value={form.age}
                onChange={(e) =>
                  setForm({ ...form, age: parseInt(e.target.value) })
                }
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Address *
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Nationality *
              </label>
              <input
                type="text"
                required
                value={form.nationality}
                onChange={(e) =>
                  setForm({ ...form, nationality: e.target.value })
                }
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Invited By / Worker / Member *
              </label>
              <input
                type="text"
                required
                value={form.invitedBy}
                onChange={(e) =>
                  setForm({ ...form, invitedBy: e.target.value })
                }
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Day Registered *
              </label>
              <select
                required
                value={form.dayRegistered}
                onChange={(e) =>
                  setForm({ ...form, dayRegistered: parseInt(e.target.value) })
                }
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy cursor-pointer"
              >
                {Array.from({ length: totalDays }, (_, i) => i + 1).map(
                  (day) => (
                    <option key={day} value={day}>
                      Day {day}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
          >
            Add Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
