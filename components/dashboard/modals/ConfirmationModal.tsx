import { ConfirmationModalProps } from "@/types";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-off-white w-full max-w-md p-8">
        <h3 className="text-2xl font-bold uppercase mb-4">{title}</h3>
        <p className="text-lg text-black/70 mb-8">{message}</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 uppercase bg-navy text-white text-sm tracking-widest cursor-pointer hover:bg-burgundy/80 transition-colors"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-black text-black text-sm uppercase tracking-widest cursor-pointer hover:bg-black hover:text-white transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
