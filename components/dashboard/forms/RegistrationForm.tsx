import { RegistrationFormProps } from "@/types/interface/dashboard";

const nationalities = [
  "Gambian",
  "Senegalese",
  "Nigerian",
  "Ghanaian",
  "Sierra Leonean",
  "Liberian",
  "Guinean",
  "Other",
];

const locations = [
  "Santosu",
  "College",
  "Kiti",
  "Kabekel",
  "Kasasunda",
  "Jalambang",
  "Karton",
  "Medina",
];

const RegistrationForm = ({
  form,
  setForm,
  onSubmit,
  totalDays,
  submitText,
}: RegistrationFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="md:col-span-2">
          <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
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
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white cursor-pointer"
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
            type="text"
            required
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
          />
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
            Category *
          </label>
          <select
            required
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value as
                  | "Adult"
                  | "Campus"
                  | "Youth"
                  | "Children",
              })
            }
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white cursor-pointer"
          >
            <option value="Adult">Adult</option>
            <option value="Campus">Campus</option>
            <option value="Youth">Youth</option>
            <option value="Children">Children</option>
          </select>
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
            Nationality *
          </label>
          <select
            required
            value={form.nationality}
            onChange={(e) => setForm({ ...form, nationality: e.target.value })}
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white cursor-pointer"
          >
            <option value="">Select Nationality</option>
            {nationalities.map((nat) => (
              <option key={nat} value={nat}>
                {nat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
            Type *
          </label>
          <select
            required
            value={form.invitedBy}
            onChange={(e) =>
              setForm({
                ...form,
                invitedBy: e.target.value as "Invited" | "Member" | "Worker",
              })
            }
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white cursor-pointer"
          >
            <option value="Invited">Invited</option>
            <option value="Member">Member</option>
            <option value="Worker">Worker</option>
          </select>
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
            Location *
          </label>
          <select
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white cursor-pointer"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
          />
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
            Day Registered *
          </label>
          <select
            required
            value={form.dayRegistered}
            onChange={(e) =>
              setForm({ ...form, dayRegistered: parseInt(e.target.value) })
            }
            className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white cursor-pointer"
          >
            {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                Day {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
      >
        {submitText}
      </button>
    </form>
  );
};

export default RegistrationForm;
