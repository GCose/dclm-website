import { useEffect } from "react";
import { ModalProps } from "@/types";

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-off-white w-full max-w-3xl max-h-[85vh] overflow-y-auto my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-12 px-6">
          <div className="flex justify-between items-start mb-12">
            <h2 className="text-5xl font-heading font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-navy/40 hover:text-navy text-6xl cursor-pointer"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
