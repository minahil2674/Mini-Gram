import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const success = await login({ email, password });

    if (success) {
      toast.success("Login successful ✅");
      navigate("/feed");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <style>{`
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
      `}</style>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
        <div className="w-full max-w-md transform transition-all duration-500 ease-out animate-fadeIn">
          <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 shadow-3xl rounded-3xl p-10 hover:shadow-4xl transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 transform -rotate-12 scale-150 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-indigo-100 to-transparent animate-pulse" />
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-slideDown">
                Welcome Back!
              </h2>
              <p className="text-gray-700 text-lg mb-8 animate-slideUp">
                Please sign in to your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* Email input */}
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="email"
                  className={`relative w-full p-5 bg-white/80 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:scale-105 focus:bg-white placeholder-gray-500 ${
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

              {/* Password input */}
              <div className="relative group">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className={`relative w-full p-5 bg-white/80 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:scale-105 focus:bg-white placeholder-gray-500 ${
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

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className={`w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-5 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed scale-95"
                    : "hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 active:scale-95 cursor-pointer"
                }`}
              >
                {submitting ? "Logging in..." : "Login"}
                {!submitting && <span className="absolute inset-0 animate-shine rounded-xl"></span>}
              </button>
            </form>

            {/* Register link and decorative elements */}
            <div className="relative z-10 text-center mt-8">
              <p className="text-gray-600 mb-2">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="relative font-bold text-blue-600 hover:text-purple-600 transition-all duration-300 transform hover:scale-110"
                >
                  Register Here →
                </Link>
              </p>
            </div>
            
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-10 -right-10 w-40 h-40 bg-purple-400 opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute -top-10 left-1/4 w-32 h-32 bg-indigo-400 opacity-10 rounded-full blur-3xl animate-blob animation-delay-4000" />
          </div>
        </div>
      </div>
    </>
  );
}