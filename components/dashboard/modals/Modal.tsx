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
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 z-50"
      onClick={onClose}
    >
      <div
        className="bg-off-white w-full max-w-3xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-12 overflow-y-auto flex-1">
          <div className="flex justify-between items-start mb-12">
            <h2 className="text-5xl font-heading font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-black/40 hover:text-black text-3xl cursor-pointer"
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
