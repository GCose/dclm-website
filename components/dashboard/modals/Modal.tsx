import { useEffect } from "react";
import { ModalProps } from "@/types";
import { useLenis } from "lenis/react";

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "unset";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "unset";
    };
  }, [isOpen, lenis]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 z-50 overflow-y-auto">
      <div
        className="bg-off-white w-full max-w-3xl max-h-[85vh] overflow-y-auto my-8 modal-scrollbar"
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
