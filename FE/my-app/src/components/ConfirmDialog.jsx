import React, { useEffect, useRef, useCallback } from "react";

const SF_DISPLAY = "SF Pro Display, system-ui, -apple-system, sans-serif";
const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";

/**
 * ConfirmDialog — Apple-style confirmation modal.
 *
 * Props:
 *  - isOpen        : boolean – controls visibility
 *  - title         : string – headline text
 *  - message       : string – body copy
 *  - confirmLabel  : string – primary button text (default "Confirm")
 *  - cancelLabel   : string – secondary button text (default "Go Back")
 *  - variant       : "danger" | "default" – controls primary button color
 *  - loading       : boolean – shows spinner on confirm button
 *  - onConfirm     : () => void
 *  - onCancel      : () => void
 */
export default function ConfirmDialog({
  isOpen = false,
  title = "Are you sure?",
  message = "",
  confirmLabel = "Confirm",
  cancelLabel = "Go Back",
  variant = "default",
  loading = false,
  onConfirm,
  onCancel,
}) {
  const overlayRef = useRef(null);

  // Lock body scroll while open
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

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === "Escape" && !loading) onCancel?.();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, loading, onCancel]);

  // Close when clicking backdrop
  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === overlayRef.current && !loading) {
        onCancel?.();
      }
    },
    [loading, onCancel],
  );

  const isDanger = variant === "danger";

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className={[
        "fixed inset-0 z-[200] flex items-center justify-center px-4",
        "transition-all duration-300 ease-out",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      ].join(" ")}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.48)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        fontFamily: SF_TEXT,
      }}
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      {/* Card */}
      <div
        className={[
          "relative w-full",
          "max-w-[380px]",
          "bg-[#ffffff] rounded-[18px]",
          "shadow-[0_24px_48px_rgba(0,0,0,0.20)]",
          "transition-all duration-300 ease-out",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-[0.97] opacity-0",
        ].join(" ")}
      >
        {/* Content */}
        <div className="px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8 text-center">
          {/* Icon */}
          <div
            className={[
              "mx-auto w-[52px] h-[52px] rounded-full flex items-center justify-center mb-5",
              isDanger ? "bg-[#fff0f0]" : "bg-[#e8f4ff]",
            ].join(" ")}
          >
            {isDanger ? (
              /* Danger / Warning Icon */
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e30000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            ) : (
              /* Info / Question Icon */
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0066cc"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f] mb-2"
            style={{ fontFamily: SF_DISPLAY }}
          >
            {title}
          </h3>

          {/* Message */}
          {message && (
            <p className="text-[15px] leading-[1.47] tracking-[-0.374px] text-[#7a7a7a] mb-0 max-w-[300px] mx-auto">
              {message}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#f0f0f0] mx-6 sm:mx-8" />

        {/* Actions */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          {/* Cancel — Secondary */}
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={[
              "px-[22px] py-[11px] rounded-full text-[17px] font-normal",
              "border border-[#e0e0e0] bg-[#ffffff] text-[#1d1d1f]",
              "hover:bg-[#f5f5f7]",
              "active:scale-95 transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "cursor-pointer",
              "w-full sm:w-auto",
            ].join(" ")}
          >
            {cancelLabel}
          </button>

          {/* Confirm — Primary */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={[
              "px-[22px] py-[11px] rounded-full text-[17px] font-normal",
              "text-[#ffffff]",
              isDanger
                ? "bg-[#e30000] hover:bg-[#cc0000]"
                : "bg-[#0066cc] hover:bg-[#0071e3]",
              "active:scale-95 transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "cursor-pointer",
              "inline-flex items-center justify-center gap-2",
              "w-full sm:w-auto",
            ].join(" ")}
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="32"
                  strokeDashoffset="12"
                />
              </svg>
            )}
            {confirmLabel}
          </button>
        </div>
      </div>

      {/* Inline animation keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            .animate-spin {
              animation: spin 0.8s linear infinite;
            }
          `,
        }}
      />
    </div>
  );
}
