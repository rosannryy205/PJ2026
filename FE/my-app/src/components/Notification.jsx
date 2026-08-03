import React, { useEffect, useRef, useState } from "react";

/**
 * Notification
 * -----------
 * Toast/notification có thể tái sử dụng, thiết kế theo DESIGN.md (Apple design language).
 *
 * Props:
 * - message     : string  — Nội dung thông báo.
 * - type        : string  — 'success' | 'warning' | 'error' (mặc định 'success').
 * - duration    : number  — Thời gian auto-close (ms). Mặc định 4000. Truyền 0 để không auto-close.
 * - isOpen      : boolean — Điều khiển hiển thị từ parent.
 * - onClose     : func    — Callback khi đóng (do auto-close hoặc bấm nút X / hành động).
 * - actionLabel : string  — (tùy chọn) Nhãn nút hành động, VD "Đăng nhập".
 * - onAction    : func    — (tùy chọn) Callback khi bấm nút hành động.
 *
 * Responsive:
 * - Mobile (< 640px): cố định dưới đáy màn hình, full-width, căn giữa.
 * - Tablet/Desktop (>= 640px): cố định góc trên-phải, dạng card thu gọn.
 *
 * Accessibility:
 * - role="alert" + aria-live="polite" để screen reader đọc nội dung khi hiện.
 * - Nút đóng có aria-label; tôn trọng prefers-reduced-motion.
 */

const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";

const TYPE_META = {
  success: {
    iconColor: "#0066cc",
    icon: (
      <svg
        width="18"
        height="18"
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
    ),
  },
  warning: {
    iconColor: "#b45309",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#b45309"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  error: {
    iconColor: "#d92d20",
    icon: (
      <svg
        width="18"
        height="18"
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
    ),
  },
};

function CloseIcon() {
  return (
    <svg
      width="12"
      height="12"
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
  );
}

export default function Notification({
  message,
  type = "success",
  duration = 4000,
  isOpen = false,
  onClose,
  actionLabel,
  onAction,
}) {
  // Trạng thái mounted để phục vụ animation transition (transform/opacity).
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef(null);

  // Lưu callback mới nhất vào ref để tránh effect phụ thuộc vào identity
  // của hàm (parent re-render sẽ tạo hàm mới mỗi lần => timer bị reset liên tục).
  const onCloseRef = useRef(onClose);
  const onActionRef = useRef(onAction);
  useEffect(() => {
    onCloseRef.current = onClose;
    onActionRef.current = onAction;
  }, [onClose, onAction]);

  const meta = TYPE_META[type] || TYPE_META.success;
  const showAction = typeof onAction === "function" && actionLabel;

  // Reset trạng thái + hẹn giờ auto-close mỗi khi notification mở lại.
  // Deps gồm message để khi parent đưa notification mới (nội dung mới) trong khi
  // component đã mounted thì timer cũng được reset — tránh đóng sớm/sai thông báo.
  useEffect(() => {
    // Xóa timer cũ (tránh đóng nhầm khi thông báo mới xuất hiện).
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (isOpen) {
      // Set mounted sau 1 frame để transition chạy đúng (mở → hiện).
      const raf = requestAnimationFrame(() => setMounted(true));

      // Auto-close theo duration (nếu duration > 0).
      if (duration > 0 && typeof onClose === "function") {
        timerRef.current = setTimeout(() => {
          setMounted(false);
          // Chờ animation đóng xong rồi gọi onClose.
          setTimeout(() => {
            if (typeof onCloseRef.current === "function") onCloseRef.current();
          }, 220);
        }, duration);
      }

      return () => {
        cancelAnimationFrame(raf);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    // Khi isOpen = false: reset mounted để ẩn notification.
    setMounted(false);
  }, [isOpen, duration, message]);

  // Cleanup timer khi unmount.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setMounted(false);
    setTimeout(() => {
      if (typeof onClose === "function") onClose();
    }, 220);
  };

  const handleAction = () => {
    setMounted(false);
    setTimeout(() => {
      if (typeof onAction === "function") onAction();
      if (typeof onClose === "function") onClose();
    }, 220);
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={[
        "fixed z-[120]",
        // Mobile: bottom-center, full-width có padding.
        "bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-auto",
        // Tablet/Desktop: top-right.
        "sm:top-6",
        "flex justify-center sm:justify-end pointer-events-none",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-auto",
          "w-full sm:w-auto sm:max-w-[400px]",
          "bg-white border border-[#e0e0e0] rounded-[11px]",
          "px-4 py-3 sm:px-5 sm:py-4",
          "flex items-start gap-3",
          "transition-all duration-200 ease-out",
          // Animation chỉ dùng transform + opacity (theo skill/performance).
          mounted
            ? "opacity-100 translate-y-0 sm:translate-y-0"
            : "opacity-0 translate-y-4 sm:translate-y-0",
          "will-change-transform",
        ].join(" ")}
        style={{
          fontFamily: SF_TEXT,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Icon */}
        <div className="mt-[2px] shrink-0">{meta.icon}</div>

        {/* Nội dung */}
        <div className="flex-1 min-w-0">
          {message ? (
            <div className="text-[14px] font-normal tracking-[-0.224px] leading-[1.43] text-[#1d1d1f]">
              {message}
            </div>
          ) : null}
        </div>

        {/* Nút hành động (VD: Đăng nhập) */}
        {showAction ? (
          <button
            type="button"
            onClick={handleAction}
            className="shrink-0 text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] text-[#0066cc] hover:text-[#0071e3] transition-colors bg-transparent border-none cursor-pointer outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 rounded-[5px] px-1"
          >
            {actionLabel}
          </button>
        ) : null}

        {/* Nút đóng */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng thông báo"
          className="shrink-0 w-[24px] h-[24px] flex items-center justify-center rounded-full text-[#7a7a7a] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors bg-transparent border-none outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
