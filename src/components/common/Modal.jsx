import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const modalSize =
    sizeClasses[size] || sizeClasses.md;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-3xl bg-white shadow-xl ${modalSize}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={
          title ? "modal-title" : undefined
        }
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
          {title ? (
            <h2
              id="modal-title"
              className="text-lg font-bold text-gray-900"
            >
              {title}
            </h2>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
          >
            <FaXmark />
          </button>
        </div>

        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}