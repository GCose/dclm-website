import { X } from "lucide-react";
import { EditAdminModalProps } from "@/types/interface/dashboard";

const EditAdminModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
}: EditAdminModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-navy w-full max-w-md p-8 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold uppercase text-navy dark:text-white">
            Edit Admin
          </h3>
          <button
            onClick={onClose}
            className="text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAdminModal;
