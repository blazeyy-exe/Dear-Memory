import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — DearMemory" },
      { name: "description", content: "Sign in to your DearMemory account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const { login, loginGoogle, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.navigate({ to: "/user-dashboard" });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.navigate({ to: "/user-dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0ece4] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7a7470] hover:text-[#4A7C6A] transition-colors mb-8"
        >
          <ArrowRight size={14} className="rotate-180" />
          Back to home
        </Link>

        <div className="bg-white rounded-[2rem] shadow-[0_8px_48px_rgba(45,42,41,0.10)] p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-baseline gap-[2px] text-xl tracking-[-0.02em] mb-6">
              <span className="font-normal text-[#2d2a29]">dear</span>
              <span className="font-semibold text-[#4A7C6A]">memory</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#1c1a18]">Welcome back</h1>
            <p className="text-[14px] text-[#a09c98] mt-1">Sign in to your account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#2d2a29] mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0aaa6]" strokeWidth={1.6} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e0dbd4] bg-white text-sm outline-none focus:ring-2 focus:ring-[#4A7C6A]/30 focus:border-[#4A7C6A] transition-all text-[#2d2a29] placeholder:text-[#b0aaa6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2d2a29] mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0aaa6]" strokeWidth={1.6} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#e0dbd4] bg-white text-sm outline-none focus:ring-2 focus:ring-[#4A7C6A]/30 focus:border-[#4A7C6A] transition-all text-[#2d2a29] placeholder:text-[#b0aaa6]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b0aaa6] hover:text-[#7a7470] transition-colors"
                >
                  {showPassword ? <EyeOff size={15} strokeWidth={1.6} /> : <Eye size={15} strokeWidth={1.6} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4A7C6A] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#3d6b5a] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e8e4de]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-[#a09c98]">or continue with</span>
            </div>
          </div>

          {/* Google OAuth */}
          <button
            onClick={loginGoogle}
            className="w-full border border-[#e0dbd4] rounded-xl px-4 py-3 text-sm font-medium text-[#2d2a29] hover:bg-[#faf8f5] transition-colors flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-[#a09c98]">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-[#4A7C6A] hover:text-[#3d6b5a] transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}