import { useState } from "react";
import StarRating from "./starRating";

/**
 * CommentForm
 * - Form gửi bình luận: chọn sao (1-5) + textarea + nút gửi
 * - Kiểm tra điều kiện: đã đăng nhập + đã mua hàng
 * - Nếu chưa đăng nhập → hiện nút "Đăng nhập để đánh giá"
 * - Nếu chưa mua → hiện thông báo cần mua hàng
 * - Tuân thủ chuẩn DESIGN.md
 */
export default function CommentForm({
  isAuthenticated,
  hasPurchased,
  onSubmit,
  onRequireLogin,
  isSubmitting = false,
}) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (rating === 0) {
      setError("Vui lòng chọn số sao đánh giá.");
      return;
    }
    if (!content.trim()) {
      setError("Vui lòng nhập nội dung bình luận.");
      return;
    }

    setError("");
    onSubmit({ rating, content: content.trim() });
    // Reset form
    setRating(0);
    setContent("");
  };

  // Chưa đăng nhập
  if (!isAuthenticated) {
    return (
      <div
        className="w-full rounded-[18px] border border-[#e0e0e0] bg-[#fafafc] p-6 sm:p-8"
        style={{
          fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
        }}
      >
        <p className="text-[17px] font-normal tracking-[-0.374px] leading-[1.47] text-[#1d1d1f]">
          Bạn muốn chia sẻ đánh giá về sản phẩm này?
        </p>
        <button
          type="button"
          onClick={onRequireLogin}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0066cc] text-white text-[17px] font-normal tracking-[-0.374px] leading-[1.47] px-5 py-2.5 hover:bg-[#0071e3] active:scale-95 transition-transform cursor-pointer border-none outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
          style={{
            fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
          }}
        >
          Đăng nhập để đánh giá
        </button>
      </div>
    );
  }

  // Chưa mua hàng
  if (!hasPurchased) {
    return (
      <div
        className="w-full rounded-[18px] border border-[#e0e0e0] bg-[#fafafc] p-6 sm:p-8"
        style={{
          fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
        }}
      >
        <p className="text-[17px] font-normal tracking-[-0.374px] leading-[1.47] text-[#1d1d1f]">
          Bạn cần mua sản phẩm này để có thể đánh giá.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-[18px] border border-[#e0e0e0] bg-[#fafafc] p-6 sm:p-8"
      style={{
        fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
      }}
    >
      <h3 className="text-[17px] font-semibold tracking-[-0.374px] leading-[1.47] text-[#1d1d1f]">
        Viết đánh giá của bạn
      </h3>

      {/* Chọn sao */}
      <div className="mt-4">
        <div className="text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] text-[#1d1d1f] mb-2">
          Chất lượng sản phẩm
        </div>
        <StarRating
          value={rating}
          onChange={setRating}
          size="lg"
          label="Chọn số sao đánh giá"
        />
      </div>

      {/* Textarea */}
      <div className="mt-4">
        <label
          htmlFor="comment-content"
          className="block text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] text-[#1d1d1f] mb-2"
        >
          Nội dung đánh giá
        </label>
        <textarea
          id="comment-content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
          maxLength={500}
          className="w-full rounded-[11px] border border-[#e0e0e0] bg-white px-4 py-3 text-[15px] text-[#1d1d1f] placeholder:text-[#7a7a7a] focus:border-[#0066cc] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 transition-all resize-y min-h-24"
          style={{
            fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
          }}
        />
        <div className="mt-1 text-right text-[12px] text-[#7a7a7a]">
          {content.length}/500
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-3 text-[14px] text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Submit */}
      <div className="mt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-[#0066cc] text-white text-[17px] font-normal tracking-[-0.374px] leading-[1.47] px-6 py-2.5 hover:bg-[#0071e3] active:scale-95 transition-transform cursor-pointer border-none outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
          }}
        >
          {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </div>
    </form>
  );
}
