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
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-navy rounded-lg w-full max-w-md border border-black/10 dark:border-white/10">
          <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10">
            <h2 className="text-lg font-bold uppercase text-navy dark:text-white">
              Edit Admin
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded transition-colors"
            >
              <X size={20} className="text-black/60 dark:text-white/60" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white rounded focus:outline-none focus:border-navy dark:focus:border-white"
                placeholder="Admin name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white rounded focus:outline-none focus:border-navy dark:focus:border-white"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 text-sm uppercase rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase rounded hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors"
              >
                Update Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAdminModal;
