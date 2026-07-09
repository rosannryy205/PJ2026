import { useEffect, useRef } from "react";
import { useAuthModal } from "../contexts/AuthModalContext";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";

const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";

/**
 * Auth modal overlay.
 * Renders a centered card over a dark, blurred backdrop.
 * Switches content between Login / Register / ForgetPassword
 * based on AuthModalContext.modalType.
 */
export default function AuthModal() {
  const { isOpen, modalType, closeModal } = useAuthModal();
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  /* Lock body scroll while open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeModal]);

  /* Close when clicking backdrop (not the card) */
  function handleBackdropClick(e) {
    if (e.target === overlayRef.current) {
      closeModal();
    }
  }

  const content = {
    login: <Login />,
    register: <Register />,
    forget_password: <ForgetPassword />,
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center",
        "transition-all duration-300 ease-out",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      ].join(" ")}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        fontFamily: SF_TEXT,
      }}
      aria-modal="true"
      role="dialog"
      aria-label="Authentication"
    >
      {/* Close button – floating top-right */}
      <button
        onClick={closeModal}
        className={[
          "absolute top-4 right-4 sm:top-6 sm:right-6",
          "w-[36px] h-[36px] rounded-full",
          "flex items-center justify-center",
          "text-white/70 hover:text-white",
          "transition-all duration-200",
          "cursor-pointer bg-white/10 hover:bg-white/20 border-none outline-none",
          "z-[101]",
        ].join(" ")}
        aria-label="Đóng"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Card */}
      <div
        ref={cardRef}
        className={[
          "relative w-full mx-4 sm:mx-0",
          "max-w-[440px]",
          "bg-white rounded-[18px]",
          "shadow-[0_24px_48px_rgba(0,0,0,0.25)]",
          "overflow-y-auto max-h-[90vh]",
          "transition-all duration-300 ease-out",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-[0.97] opacity-0",
        ].join(" ")}
        style={{
          /* scrollbar hidden */
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Inner padding */}
        <div className="px-8 sm:px-10 py-10 sm:py-12">
          {content[modalType] || content.login}
        </div>
      </div>
    </div>
  );
}
