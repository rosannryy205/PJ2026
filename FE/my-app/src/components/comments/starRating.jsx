import { useId, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

/**
 * StarRating
 * - Hỗ trợ 2 chế độ: readonly (hiển thị) và interactive (cho phép chọn sao)
 * - Hiệu ứng hover khi di chuột (chế độ interactive)
 * - Hỗ trợ điều hướng bàn phím: Tab + Arrow Left/Right/Home/End + Enter/Space
 * - Tuân thủ chuẩn DESIGN.md
 */
export default function StarRating({
  value = 0,
  onChange,
  readOnly = false,
  size = "md",
  label = "Đánh giá",
}) {
  const [hovered, setHovered] = useState(0);
  const baseId = useId();

  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const starSize = sizeMap[size] || sizeMap.md;
  const isInteractive = !readOnly && typeof onChange === "function";

  // Giá trị đang hiển thị (ưu tiên hovered khi interactive)
  const displayValue = isInteractive && hovered > 0 ? hovered : value;

  const handleKeyDown = (e) => {
    if (!isInteractive) return;

    let next;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = Math.min(5, value + 1);
        e.preventDefault();
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = Math.max(1, value - 1);
        e.preventDefault();
        break;
      case "Home":
        next = 1;
        e.preventDefault();
        break;
      case "End":
        next = 5;
        e.preventDefault();
        break;
      case "Enter":
      case " ":
        next = value === 5 ? 0 : value + 1;
        e.preventDefault();
        break;
      default:
        return;
    }
    onChange(next);
  };

  return (
    <div
      role={isInteractive ? "radiogroup" : "img"}
      aria-label={isInteractive ? label : `${label}: ${value} trên 5 sao`}
      className="inline-flex items-center gap-0.5"
      onKeyDown={handleKeyDown}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= displayValue;
        const isHovered = star <= hovered;

        return (
          <button
            key={star}
            type="button"
            id={isInteractive ? `${baseId}-star-${star}` : undefined}
            role={isInteractive ? "radio" : undefined}
            aria-checked={isInteractive ? value === star : undefined}
            aria-label={isInteractive ? `${star} sao` : undefined}
            disabled={!isInteractive}
            tabIndex={isInteractive ? (star === 1 ? 0 : -1) : -1}
            onClick={() => isInteractive && onChange(star)}
            onMouseEnter={() => isInteractive && setHovered(star)}
            onMouseLeave={() => isInteractive && setHovered(0)}
            onFocus={() => isInteractive && setHovered(star)}
            onBlur={() => isInteractive && setHovered(0)}
            aria-labelledby={
              isInteractive ? `${baseId}-star-${star}` : undefined
            }
            className={[
              "inline-flex items-center justify-center rounded-full",
              "transition-all duration-150 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2",
              isInteractive
                ? "cursor-pointer active:scale-90"
                : "cursor-default",
              isActive
                ? "text-[#ff9500]"
                : isHovered
                  ? "text-[#ff9500]"
                  : "text-[#d2d2d7]",
            ].join(" ")}
          >
            <StarIcon className={starSize} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
