import { useRef, useState } from "react";
import StarRating from "./starRating";

// Icon đơn giản (dùng SVG inline để tránh phụ thuộc).
const UploadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Giới hạn số file media tối đa 1 lần gửi.
const MAX_MEDIA = 5;

/**
 * CommentForm
 * - Form gửi bình luận: chọn sao (1-5) + textarea + upload ảnh/video.
 * - Kiểm tra điều kiện: đã đăng nhập + đã mua hàng.
 * - Xuất dữ liệu qua onSubmit với FormData (hỗ trợ media).
 * - Tuân thủ chuẩn DESIGN.md (SF Pro, Action Blue, pill).
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
  const [media, setMedia] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Thêm file vào danh sách đính kèm (ảnh/video).
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setError("");

    const remaining = MAX_MEDIA - media.length;
    if (remaining <= 0) {
      setError(`Chỉ được đăng tối đa ${MAX_MEDIA} ảnh/video.`);
      e.target.value = "";
      return;
    }

    const picked = files.slice(0, remaining);
    const next = [...media, ...picked];
    setMedia(next);

    // Reset input để có thể chọn lại cùng file.
    e.target.value = "";
  };

  const removeMedia = (index) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate.
    if (rating === 0) {
      setError("Vui lòng chọn số sao đánh giá.");
      return;
    }
    if (!content.trim()) {
      setError("Vui lòng nhập nội dung bình luận.");
      return;
    }

    setError("");

    // Tạo FormData chứa text + media để gửi lên backend.
    const formData = new FormData();
    formData.append("content", content.trim());
    media.forEach((file) => formData.append("media", file));

    onSubmit({ rating, content: content.trim(), media, formData });

    // Reset form.
    setRating(0);
    setContent("");
    setMedia([]);
  };

  // Chưa đăng nhập.
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

  // Chưa mua hàng.
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
          maxLength={2000}
          className="w-full rounded-[11px] border border-[#e0e0e0] bg-white px-4 py-3 text-[15px] text-[#1d1d1f] placeholder:text-[#7a7a7a] focus:border-[#0066cc] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 transition-all resize-y min-h-24"
          style={{
            fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
          }}
        />
        <div className="mt-1 text-right text-[12px] text-[#7a7a7a]">
          {content.length}/2000
        </div>
      </div>

      {/* Upload ảnh/video */}
      <div className="mt-4">
        <div className="text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] text-[#1d1d1f] mb-2">
          Đính kèm ảnh / video (tùy chọn, tối đa {MAX_MEDIA})
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/mp4,video/webm,video/quicktime"
          multiple
          onChange={handleFiles}
          className="hidden"
          id="comment-media"
        />

        <label
          htmlFor="comment-media"
          className="inline-flex items-center gap-2 rounded-full border border-[#0066cc] text-[#0066cc] text-[14px] font-normal px-4 py-2 hover:bg-[rgba(0,102,204,0.06)] active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
        >
          <UploadIcon />
          Chọn ảnh / video
        </label>

        {/* Preview các file đã chọn */}
        {media.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-3">
            {media.map((file, index) => {
              const isVideo = file.type?.startsWith("video");
              const previewUrl = URL.createObjectURL(file);
              return (
                <li
                  key={`${file.name}-${index}`}
                  className="relative h-20 w-20 rounded-[11px] overflow-hidden border border-[#e0e0e0] bg-white"
                >
                  {isVideo ? (
                    <video
                      src={previewUrl}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    aria-label="Xóa file đính kèm"
                    className="absolute top-1 right-1 inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#1d1d1f]/70 text-white hover:bg-[#1d1d1f] active:scale-95 transition-all cursor-pointer border-none outline-none"
                  >
                    <XIcon />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
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
