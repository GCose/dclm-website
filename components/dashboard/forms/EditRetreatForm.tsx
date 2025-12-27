import { Save } from "lucide-react";

interface RetreatForm {
  year: number;
  type: "Easter" | "December";
  status: "ongoing" | "completed";
  totalDays: number;
  dateFrom: string;
  dateTo: string;
  venue: string;
  theme: string;
}

interface EditRetreatFormProps {
  onSubmit: (e: React.FormEvent) => void;
  form: RetreatForm;
  setForm: React.Dispatch<React.SetStateAction<RetreatForm>>;
}

const EditRetreatForm = ({ onSubmit, form, setForm }: EditRetreatFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-navy/50 border border-black/0 dark:border-white/10 p-8 rounded-lg"
    >
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-lg font-bold uppercase text-navy dark:text-white">
          Edit Retreat
        </h2>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div>
          <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
            Year *
          </label>
          <input
            type="number"
            required
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: parseInt(e.target.value) })
            }
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
          />
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
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
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy cursor-pointer"
          >
            <option value="Easter">Easter</option>
            <option value="December">December</option>
          </select>
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
            Status *
          </label>
          <select
            required
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as "ongoing" | "completed",
              })
            }
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy cursor-pointer"
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
            Total Days *
          </label>
          <input
            type="number"
            required
            min="1"
            max="5"
            value={form.totalDays}
            onChange={(e) =>
              setForm({ ...form, totalDays: parseInt(e.target.value) })
            }
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
          />
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
            Date From *
          </label>
          <input
            type="date"
            required
            value={form.dateFrom}
            onChange={(e) => setForm({ ...form, dateFrom: e.target.value })}
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
            Date To *
          </label>
          <input
            type="date"
            required
            value={form.dateTo}
            onChange={(e) => setForm({ ...form, dateTo: e.target.value })}
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy cursor-pointer"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
            Venue *
          </label>
          <input
            type="text"
            required
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
            Theme
          </label>
          <input
            type="text"
            value={form.theme}
            onChange={(e) => setForm({ ...form, theme: e.target.value })}
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
          />
        </div>
      </div>
    </form>
  );
};

export default EditRetreatForm;
