import { X } from "lucide-react";
import { RegistrationModalProps } from "@/types/interface/dashboard";
import RegistrationForm from "@/components/dashboard/forms/RegistrationForm";

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

        <RegistrationForm
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
          totalDays={totalDays}
          submitText="Add Registration"
        />
      </div>
    </div>
  );
};

export default RegistrationModal;
