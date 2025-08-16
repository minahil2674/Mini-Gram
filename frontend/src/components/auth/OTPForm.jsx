import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

export default function OTPForm() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const email = useAuthStore((state) => state.registeredEmail);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please register again.");
      return;
    }

    setLoading(true);
    try {
      await verifyOtp({ email, otp: otpString });
      toast.success("OTP Verified");
      navigate("/auth");
    } catch (err) {
      toast.error(err?.message || "Invalid OTP");
      setOtp(new Array(6).fill(""));
      inputRefs.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setTimeLeft(300);
    toast.success("OTP resent to your email");
    setOtp(new Array(6).fill(""));
    inputRefs.current[0].focus();

    // If you have an API to resend OTP, call here:
    // await api.post("/auth/resend-otp", { email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>

          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-600 text-sm">We've sent a 6-digit code to</p>
              <p className="text-blue-600 font-semibold text-sm truncate">
                {email || "your email"}
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-3"></div>
            </div>

            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex justify-center space-x-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    disabled={loading}
                    className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                      digit
                        ? "border-blue-500 bg-blue-50 text-blue-600 shadow-lg shadow-blue-200 scale-110"
                        : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                ))}
              </div>

              <p className="text-center text-gray-500 text-sm">
                Enter the 6-digit code sent to your email
              </p>

              <button
                type="submit"
                disabled={loading || otp.join("").length !== 6}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 transform cursor-pointer mb-6 ${
                  loading || otp.join("").length !== 6
                    ? "bg-gray-400 cursor-not-allowed scale-95"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl active:scale-95"
                }`}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </form>

            <div className="text-center">
              <p className="text-gray-600 text-sm mb-3">Didn't receive the code?</p>
              {timeLeft > 0 ? (
                <p className="text-gray-400 text-sm">
                  Resend available in {formatTime(timeLeft)}
                </p>
              ) : (
                <button
                  onClick={resendOtp}
                  className="text-blue-600 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 transform inline-block text-sm"
                >
                  Resend Code →
                </button>
              )}
            </div>

            <div
              className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
