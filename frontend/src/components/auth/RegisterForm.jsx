import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

export default function RegisterForm({ onSwitch, onRegisterSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await register({ name, email, password });
      toast.success("Registered successfully! Please verify OTP.");
      if (onRegisterSuccess) onRegisterSuccess(email);
    } catch (err) {
      const msg =
        err?.message ||
        err?.response?.data?.message ||
        "Registration failed";
      toast.error(msg);
      console.error("Registration error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .input-text-black {
          color: #000000 !important;
        }
        .input-text-black:focus {
          color: #000000 !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-shine {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          background-size: 200% 100%;
          animation: shine 1.5s infinite;
        }
        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px); }
          33% { transform: scale(1.1) translate(30px, -50px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, -0.28, 0.735, 0.04);
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
        <div className="w-full max-w-md transform transition-all duration-500 ease-out animate-fadeIn">
          <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 shadow-3xl rounded-3xl p-10 hover:shadow-4xl transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 transform -rotate-12 scale-150 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-indigo-100 to-transparent animate-pulse" />
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-slideDown">
                Create Your Account
              </h2>
              <p className="text-gray-700 text-lg mb-8 animate-slideUp">
                Get started and join the community.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* Name Input */}
              <div className="relative group">
                <label htmlFor="name-input" className="block text-gray-700 font-medium mb-1 ml-1">
                  Full Name
                </label>
                <input
                  id="name-input"
                  type="text"
                  className={`input-text-black w-full p-5 bg-white/80 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:scale-105 focus:bg-white placeholder-gray-500 ${
                    focusedField === "name"
                      ? "border-purple-500 shadow-lg shadow-purple-200/50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative group">
                <label htmlFor="email-input" className="block text-gray-700 font-medium mb-1 ml-1">
                  Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  className={`input-text-black w-full p-5 bg-white/80 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:scale-105 focus:bg-white placeholder-gray-500 ${
                    focusedField === "email"
                      ? "border-blue-500 shadow-lg shadow-blue-200/50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label htmlFor="password-input" className="block text-gray-700 font-medium mb-1 ml-1">
                  Password
                </label>
                <input
                  id="password-input"
                  type="password"
                  className={`input-text-black w-full p-5 bg-white/80 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:scale-105 focus:bg-white placeholder-gray-500 ${
                    focusedField === "password"
                      ? "border-purple-500 shadow-lg shadow-purple-200/50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className={`w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-5 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed scale-95"
                    : "hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 active:scale-95 cursor-pointer"
                }`}
              >
                {submitting ? "Creating Account..." : "Create Account"}
                {!submitting && <span className="absolute inset-0 animate-shine rounded-xl"></span>}
              </button>
            </form>

            {/* Login Link */}
            <div className="relative z-10 text-center mt-8">
              <p className="text-gray-600 mb-2">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitch}
                  className="relative font-bold text-blue-600 hover:text-purple-600 transition-all duration-300 transform hover:scale-110"
                >
                  Sign In Here →
                </button>
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-10 -right-10 w-40 h-40 bg-purple-400 opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute -top-10 left-1/4 w-32 h-32 bg-indigo-400 opacity-10 rounded-full blur-3xl animate-blob animation-delay-4000" />
          </div>
        </div>
      </div>
    </>
  );
}