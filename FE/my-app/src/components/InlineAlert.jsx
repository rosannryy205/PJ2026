

const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";

function AlertIcon({ variant }) {
  if (variant === "success") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0066cc"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }

  if (variant === "error") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d92d20"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="7" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }

  // info / default
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0066cc"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

/**
 * InlineAlert
 * - Apple-style inline info box for auth forms
 * - Responsive padding/typography via tailwind breakpoints
 */
export default function InlineAlert({
  variant = "info", // info | success | error
  title,
  message,
  onDismiss,
  className = "",
}) {
  const showDismiss = typeof onDismiss === "function";

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={[
        "w-full",
        "border",
        "bg-[#f5f5f7]",
        "border-[#e0e0e0]",
        "rounded-[11px]",
        "px-4 py-3",
        "sm:px-5 sm:py-4",
        "text-left",
        "flex items-start gap-3",
        "transition-all duration-200",
        className,
      ].join(" ")}
      style={{ fontFamily: SF_TEXT }}
    >
      <div className="mt-0.5 shrink-0">
        <AlertIcon variant={variant} />
      </div>

      <div className="flex-1">
        {title ? (
          <div className="text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] text-[#1d1d1f]">
            {title}
          </div>
        ) : null}
        {message ? (
          <div className="mt-1 text-[14px] font-normal tracking-[-0.224px] leading-[1.29] text-[#333333]">
            {message}
          </div>
        ) : null}
      </div>

      {showDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Close"
          className="shrink-0 w-7.5 h-7.5 rounded-full"
          style={{ color: "#7a7a7a" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

