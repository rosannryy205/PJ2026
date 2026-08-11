import { useState } from "react";
import { useAuthModal } from "../contexts/authModalContext";

const SF_DISPLAY = "SF Pro Display, system-ui, -apple-system, sans-serif";
const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";

/**
 * Forget Password form — rendered inside AuthModal.
 * Design tokens from DESIGN.md (Apple design language).
 */
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { openLogin } = useAuthModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", { email });
    setIsSubmitted(true);
  };

  const inputClass =
    "h-[44px] px-4 text-[17px] leading-[1.47] tracking-[-0.374px] text-[#1d1d1f] bg-[#f5f5f7] rounded-[8px] border border-[#e0e0e0] outline-none transition-all duration-200 placeholder:text-[#7a7a7a] focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/20 focus:bg-white";

  return (
    <>
      {/* Header */}
      <h1
        className="text-[28px] sm:text-[34px] font-semibold leading-[1.07] tracking-[-0.374px] text-[#1d1d1f] text-center"
        style={{ fontFamily: SF_DISPLAY }}
      >
        Quên mật khẩu
      </h1>

      {!isSubmitted ? (
        <>
          <p
            className="mt-2 text-[14px] sm:text-[17px] leading-[1.47] tracking-[-0.374px] text-[#333333] text-center"
            style={{ fontFamily: SF_TEXT, fontWeight: 400 }}
          >
            Nhập email liên kết với tài khoản để nhận liên kết đặt lại mật khẩu.
          </p>

          {/* Form */}
          <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col text-left">
              <label
                htmlFor="forget-email"
                className="text-[12px] font-semibold tracking-[0.5px] uppercase text-[#1d1d1f] mb-2 pl-1"
                style={{ fontFamily: SF_TEXT }}
              >
                Email
              </label>
              <input
                id="forget-email"
                type="email"
                placeholder="Nhập địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
                style={{ fontFamily: SF_TEXT }}
                aria-label="Email cho việc đặt lại mật khẩu"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full h-11 rounded-full bg-[#0066cc] text-white text-[17px] font-normal tracking-[-0.374px] leading-[1.47] border-none cursor-pointer hover:bg-[#0071e3] active:scale-[0.95] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
              style={{ fontFamily: SF_TEXT }}
            >
              Gửi liên kết đặt lại
            </button>
          </form>
        </>
      ) : (
        /* Success state */
        <div className="mt-6">
          {/* Success icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center">
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <p
            className="text-[17px] leading-[1.47] tracking-[-0.374px] text-[#1d1d1f] text-center"
            style={{ fontFamily: SF_TEXT, fontWeight: 500 }}
          >
            Nếu tài khoản tồn tại cho <strong>{email}</strong>, bạn sẽ nhận được
            hướng dẫn đặt lại mật khẩu trong ít phút.
          </p>

          {/* Try another email */}
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-6 w-full h-11 rounded-full bg-transparent text-[#0066cc] text-[17px] font-normal tracking-[-0.374px] leading-[1.47] border border-[#0066cc] cursor-pointer hover:bg-[#0066cc]/5 active:scale-[0.95] transition-all duration-200"
            style={{ fontFamily: SF_TEXT }}
          >
            Thử email khác
          </button>
        </div>
      )}

      {/* Back to login */}
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={openLogin}
          className="text-[14px] tracking-[-0.224px] font-medium text-[#0066cc] hover:text-[#0071e3] transition-colors bg-transparent border-none cursor-pointer p-0 inline-flex items-center gap-1"
          style={{ fontFamily: SF_TEXT }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Quay lại đăng nhập
        </button>
      </div>
    </>
  );
}
