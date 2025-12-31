import { X, Save } from "lucide-react";
import { EditRetreatModalProps } from "@/types/interface/report";

const EditRetreatModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
}: EditRetreatModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-navy w-full max-w-2xl p-8 rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold uppercase text-navy dark:text-white">
            Edit Retreat
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
            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Year *
              </label>
              <input
                type="number"
                required
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: parseInt(e.target.value) })
                }
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Type *
              </label>
              <select
                required
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as "Easter" | "December",
                  })
                }
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white cursor-pointer"
              >
                <option value="Easter">Easter</option>
                <option value="December">December</option>
              </select>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Total Days *
              </label>
              <input
                type="number"
                required
                min="1"
                value={form.totalDays}
                onChange={(e) =>
                  setForm({ ...form, totalDays: parseInt(e.target.value) })
                }
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Date From *
              </label>
              <input
                type="date"
                required
                value={form.dateFrom}
                onChange={(e) => setForm({ ...form, dateFrom: e.target.value })}
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Date To *
              </label>
              <input
                type="date"
                required
                value={form.dateTo}
                onChange={(e) => setForm({ ...form, dateTo: e.target.value })}
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Venue *
              </label>
              <input
                type="text"
                required
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Theme
              </label>
              <input
                type="text"
                value={form.theme}
                onChange={(e) => setForm({ ...form, theme: e.target.value })}
                className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
          >
            <Save size={16} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRetreatModal;
