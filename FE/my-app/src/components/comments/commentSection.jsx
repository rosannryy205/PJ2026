import { useEffect, useMemo, useState } from "react";
import CommentForm from "./commentForm";
import CommentItem from "./commentItem";

// Mock data mẫu (tạm thời, chưa cần đụng BE)
const MOCK_COMMENTS = [
  {
    id: 1,
    user: {
      name: "Nguyễn Văn An",
      avatar: "",
    },
    rating: 5,
    content:
      "Sản phẩm rất tốt, chất lượng vượt trội so với giá tiền. Tôi rất hài lòng với trải nghiệm sử dụng. Máy chạy nhanh, mượt mà, pin trâu, camera chụp đẹp. Đặc biệt màn hình hiển thị rất sắc nét và sống động. Tôi sẽ giới thiệu cho bạn bè và người thân của mình sản phẩm tuyệt vời này. Đây thực sự là một trong những sản phẩm đáng mua nhất trong tầm giá.",
    hasPurchased: true,
    likeCount: 12,
    userLiked: false,
    createdAt: "2024-12-15T10:30:00",
    replies: [],
  },
  {
    id: 2,
    user: {
      name: "Trần Thị Bình",
      avatar: "",
    },
    rating: 4,
    content:
      "Sản phẩm tốt, giao hàng nhanh, đóng gói cẩn thận. Tuy nhiên màu sắc thực tế hơi khác so với hình ảnh trên website. Tổng thể vẫn đáng mua.",
    hasPurchased: true,
    likeCount: 8,
    userLiked: false,
    createdAt: "2024-12-10T08:45:00",
    replies: [],
  },
  {
    id: 3,
    user: {
      name: "Lê Văn Cường",
      avatar: "",
    },
    rating: 5,
    content:
      "Sản phẩm tuyệt vời! Chất lượng xứng đáng với số tiền bỏ ra. Dùng được 2 tuần rồi mà vẫn hoạt động hoàn hảo. Đáng mua!",
    hasPurchased: true,
    likeCount: 25,
    userLiked: true,
    createdAt: "2024-12-05T14:20:00",
    replies: [],
  },
  {
    id: 4,
    user: {
      name: "Phạm Minh Đức",
      avatar: "",
    },
    rating: 3,
    content:
      "Sản phẩm ổn, nhưng thời gian giao hàng hơi lâu. Chất lượng sản phẩm tạm ổn so với giá.",
    hasPurchased: true,
    likeCount: 3,
    userLiked: false,
    createdAt: "2024-11-28T09:10:00",
    replies: [],
  },
  {
    id: 5,
    user: {
      name: "Hoàng Thu Hà",
      avatar: "",
    },
    rating: 5,
    content:
      "Rất hài lòng với sản phẩm! Shop tư vấn nhiệt tình, sản phẩm đúng như mô tả. Sẽ ủng hộ shop dài dài.",
    hasPurchased: true,
    likeCount: 18,
    userLiked: false,
    createdAt: "2024-11-20T16:00:00",
    replies: [],
  },
  {
    id: 6,
    user: {
      name: "Vũ Quốc Khánh",
      avatar: "",
    },
    rating: 4,
    content:
      "Mua lần thứ 2 rồi, chất lượng ổn định. Giá cả hợp lý, dịch vụ tốt. Mong shop thêm nhiều ưu đãi hơn.",
    hasPurchased: true,
    likeCount: 10,
    userLiked: false,
    createdAt: "2024-11-15T11:30:00",
    replies: [],
  },
  {
    id: 7,
    user: {
      name: "Đặng Thị Mai",
      avatar: "",
    },
    rating: 2,
    content:
      "Sản phẩm không như mong đợi. Chất lượng kém hơn so với mô tả. Hy vọng shop cải thiện chất lượng.",
    hasPurchased: true,
    likeCount: 5,
    userLiked: false,
    createdAt: "2024-11-10T13:40:00",
    replies: [],
  },
];

// Số comment hiển thị mỗi lần load
const INITIAL_VISIBLE_COUNT = 5;
const LOAD_MORE_COUNT = 5;

/**
 * CommentSection
 * - Component tổng quản lý state & data
 * - Loading state: Skeleton UI
 * - Empty state: chưa có bình luận
 * - Error state: lỗi tải dữ liệu
 * - Load more: hiển thị giới hạn + nút xem thêm
 * - Sắp xếp sao từ cao xuống thấp
 * - Optimistic UI cho Like
 */
export default function CommentSection({
  productId,
  isAuthenticated,
  user,
  onRequireLogin,
}) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdmin = user?.role === "admin";

  // Kiểm tra user đã mua hàng chưa (demo: giả định true khi đã đăng nhập)
  const hasPurchased = isAuthenticated;

  // Load comments (mock data)
  useEffect(() => {
    // Giả lập delay API
    const timer = setTimeout(() => {
      try {
        setComments([...MOCK_COMMENTS]);
        setLoading(false);
      } catch {
        setError("Không thể tải bình luận. Vui lòng thử lại.");
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [productId]);

  // Sắp xếp sao từ cao xuống thấp
  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => b.rating - a.rating);
  }, [comments]);

  // Comment hiển thị (giới hạn)
  const visibleComments = useMemo(
    () => sortedComments.slice(0, visibleCount),
    [sortedComments, visibleCount],
  );

  const hasMore = visibleCount < sortedComments.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  // Submit comment mới
  const handleSubmitComment = ({ rating, content }) => {
    setIsSubmitting(true);

    // Giả lập API call
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        user: {
          name: user?.name || "Người dùng",
          avatar: user?.avatar || "",
        },
        rating,
        content,
        hasPurchased: true,
        likeCount: 0,
        userLiked: false,
        createdAt: new Date().toISOString(),
        replies: [],
      };

      setComments((prev) => [newComment, ...prev]);
      setIsSubmitting(false);
    }, 500);
  };

  // Optimistic UI cho Like
  const handleLike = (comment) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === comment.id
          ? {
              ...c,
              userLiked: !c.userLiked,
              likeCount: c.userLiked
                ? Math.max(0, (c.likeCount || 0) - 1)
                : (c.likeCount || 0) + 1,
            }
          : c,
      ),
    );
  };

  // Reply (admin)
  const handleReply = (comment, replyText) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === comment.id
          ? {
              ...c,
              replies: [
                ...(c.replies || []),
                {
                  id: Date.now(),
                  user: {
                    name: user?.name || "Admin",
                    avatar: user?.avatar || "",
                  },
                  content: replyText,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : c,
      ),
    );
  };

  // Skeleton loading
  if (loading) {
    return (
      <div
        className="w-full"
        style={{
          fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
        }}
      >
        <div className="mt-10">
          <div className="h-8 w-64 bg-[#f5f5f7] rounded animate-pulse" />
          <div className="mt-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#f5f5f7] animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-[#f5f5f7] rounded animate-pulse" />
                    <div className="mt-2 h-3 w-24 bg-[#f5f5f7] rounded animate-pulse" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full bg-[#f5f5f7] rounded animate-pulse" />
                  <div className="h-3 w-3/4 bg-[#f5f5f7] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="w-full rounded-[18px] border border-[#e0e0e0] bg-[#fafafc] p-8 text-center"
        style={{
          fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
        }}
      >
        <p className="text-[17px] font-normal tracking-[-0.374px] leading-[1.47] text-[#1d1d1f]">
          {error}
        </p>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            setError(null);
            setTimeout(() => {
              setComments([...MOCK_COMMENTS]);
              setLoading(false);
            }, 500);
          }}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0066cc] text-white text-[14px] font-normal px-5 py-2 hover:bg-[#0071e3] active:scale-95 transition-all cursor-pointer border-none outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
          style={{
            fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
          }}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-full"
      style={{
        fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h2
          className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.374px] leading-[1.1] text-[#1d1d1f]"
          style={{
            fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif",
          }}
        >
          Đánh giá sản phẩm
        </h2>
        <span className="text-[14px] text-[#7a7a7a]">
          {sortedComments.length} đánh giá
        </span>
      </div>

      {/* Form bình luận */}
      <div className="mt-6">
        <CommentForm
          isAuthenticated={isAuthenticated}
          hasPurchased={hasPurchased}
          onSubmit={handleSubmitComment}
          onRequireLogin={onRequireLogin}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Danh sách bình luận */}
      <div className="mt-8 space-y-4">
        {visibleComments.length === 0 ? (
          // Empty state
          <div className="rounded-[18px] border border-[#e0e0e0] bg-[#fafafc] p-8 text-center">
            <p className="text-[17px] font-normal tracking-[-0.374px] leading-[1.47] text-[#1d1d1f]">
              Chưa có đánh giá nào.
            </p>
            <p className="mt-2 text-[14px] text-[#7a7a7a]">
              Hãy là người đầu tiên đánh giá sản phẩm này!
            </p>
          </div>
        ) : (
          <>
            {visibleComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUser={user}
                onLike={handleLike}
                onReply={handleReply}
                isAdmin={isAdmin}
              />
            ))}

            {/* Load more */}
            {hasMore && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center justify-center rounded-full bg-transparent text-[#0066cc] text-[15px] font-normal px-6 py-2.5 border border-[#0066cc] hover:bg-[rgba(0,102,204,0.06)] active:scale-95 transition-all cursor-pointer outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
                  style={{
                    fontFamily:
                      "SF Pro Text, system-ui, -apple-system, sans-serif",
                  }}
                >
                  Xem thêm bình luận ({sortedComments.length - visibleCount})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
