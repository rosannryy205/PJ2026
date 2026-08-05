import { useState } from "react";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import StarRating from "./starRating";

// Hàm format thời gian tương đối
function formatRelativeTime(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Vừa xong";
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;

  // Format DD/MM/YYYY
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

/**
 * CommentItem
 * - Card hiển thị bình luận: avatar, tên, badge "Đã mua hàng", sao, ngày
 * - Body: nội dung + "Xem thêm/Thu gọn" nếu quá dài
 * - Actions: Like (Optimistic UI) + Reply (chỉ admin)
 * - Trạng thái isReplying riêng cho từng comment
 */
export default function CommentItem({
  comment,
  onLike,
  onReply,
  isAdmin = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isLiking, setIsLiking] = useState(false);

  const MAX_LENGTH = 200;
  const isLong = (comment?.content || "").length > MAX_LENGTH;
  const displayContent = isExpanded
    ? comment?.content
    : (comment?.content || "").slice(0, MAX_LENGTH) + (isLong ? "..." : "");

  const hasLiked = comment?.userLiked || false;
  const likeCount = comment?.likeCount || 0;

  const handleLike = () => {
    if (isLiking) return;
    setIsLiking(true);
    // Optimistic UI: gọi callback, parent sẽ cập nhật state tức thì
    onLike?.(comment);
    setTimeout(() => setIsLiking(false), 300);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply?.(comment, replyText.trim());
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <article className="w-full rounded-[18px] border border-[#e0e0e0] bg-white p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          {comment?.user?.avatar ? (
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-[#e0e0e0]"
            />
          ) : (
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#f5f5f7] flex items-center justify-center">
              <UserCircleIcon
                className="h-8 w-8 sm:h-10 sm:w-10 text-[#7a7a7a]"
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] sm:text-[17px] font-semibold tracking-[-0.374px] text-[#1d1d1f]">
              {comment?.user?.name || "Người dùng"}
            </span>
            {comment?.hasPurchased && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-2 py-0.5 text-[11px] font-semibold text-[#2e7d32]">
                <CheckBadgeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                Đã mua hàng
              </span>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <StarRating value={comment?.rating || 0} readOnly size="sm" />
            <span className="text-[12px] text-[#7a7a7a]">
              {formatRelativeTime(comment?.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 pl-0 sm:pl-16">
        <p className="text-[15px] sm:text-[17px] font-normal tracking-[-0.374px] leading-[1.47] text-[#1d1d1f] wrap-break-word">
          {displayContent}
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-[14px] font-semibold text-[#0066cc] hover:text-[#0071e3] transition-colors cursor-pointer bg-transparent border-none p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 rounded"
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-4 pl-0 sm:pl-16">
        {/* Like */}
        <button
          type="button"
          onClick={handleLike}
          disabled={isLiking}
          aria-label={hasLiked ? "Bỏ thích bình luận" : "Thích bình luận"}
          aria-pressed={hasLiked}
          className={[
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2",
            hasLiked
              ? "bg-[#fee2e2] text-[#dc2626]"
              : "bg-[#f5f5f7] text-[#7a7a7a] hover:bg-[#e8e8ed] hover:text-[#1d1d1f]",
            isLiking
              ? "opacity-70 cursor-wait"
              : "cursor-pointer active:scale-95",
          ].join(" ")}
        >
          {hasLiked ? (
            <HeartIconSolid className="h-4 w-4" aria-hidden="true" />
          ) : (
            <HeartIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span>{likeCount}</span>
        </button>

        {/* Reply - chỉ admin */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => setIsReplying(!isReplying)}
            aria-label="Trả lời bình luận"
            aria-expanded={isReplying}
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2",
              isReplying
                ? "bg-[#e8f0fe] text-[#0066cc]"
                : "bg-[#f5f5f7] text-[#7a7a7a] hover:bg-[#e8e8ed] hover:text-[#1d1d1f]",
              "cursor-pointer active:scale-95",
            ].join(" ")}
          >
            <ChatBubbleOvalLeftIcon className="h-4 w-4" aria-hidden="true" />
            <span>Trả lời</span>
          </button>
        )}
      </div>

      {/* Reply form - nested level 1 */}
      {isAdmin && isReplying && (
        <form onSubmit={handleReplySubmit} className="mt-4 pl-0 sm:pl-16">
          <div className="flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Viết phản hồi..."
              aria-label="Nội dung phản hồi"
              className="flex-1 min-w-0 rounded-[11px] border border-[#e0e0e0] bg-white px-4 py-2.5 text-[14px] text-[#1d1d1f] placeholder:text-[#7a7a7a] focus:border-[#0066cc] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 transition-all"
              style={{
                fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
              }}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#0066cc] text-white text-[14px] font-normal px-4 py-2 hover:bg-[#0071e3] active:scale-95 transition-all cursor-pointer border-none outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
              style={{
                fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
              }}
            >
              Gửi
            </button>
          </div>
        </form>
      )}
    </article>
  );
}
