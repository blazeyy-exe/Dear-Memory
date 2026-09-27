import { Link, useRouter } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { BrandIcon } from "./BrandIcon";

export function SiteNav() {
  const router = useRouter();
  const [showRolePicker, setShowRolePicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowRolePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-6 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/70 bg-white/75 px-4 py-3 shadow-[0_10px_30px_rgba(45,42,41,0.06)] backdrop-blur-xl">
        <Link to="/" className="text-xl font-bold tracking-tight text-emerald flex items-center gap-2.5">
          <BrandIcon className="w-6 h-6 rounded-[7px] shrink-0 shadow-sm" />
          <span>DearMemory</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-warm-gray">
          <Link to="/templates" className="hover:text-emerald transition-colors">Templates</Link>
          <Link to="/discover" className="hover:text-emerald transition-colors">Discovery</Link>
          <a href="/#features" className="hover:text-emerald transition-colors">Features</a>
          <Link to="/pricing" className="hover:text-emerald transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative" ref={pickerRef}>
            <button
              onClick={() => setShowRolePicker(!showRolePicker)}
              className="hidden sm:inline text-sm font-medium text-warm-gray hover:text-emerald transition-colors cursor-pointer"
            >
              Sign in
            </button>
            {showRolePicker && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-border shadow-xl p-2 animate-fade-up">
                <button
                  onClick={() => { setShowRolePicker(false); router.navigate({ to: "/dashboard" }); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-cream transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald/10 grid place-items-center text-emerald">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Studio Dashboard</div>
                    <div className="text-[11px] text-warm-gray">Manage events & clients</div>
                  </div>
                </button>
                <div className="mx-3 h-px bg-border my-1" />
                <button
                  onClick={() => { setShowRolePicker(false); router.navigate({ to: "/user-dashboard" }); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-cream transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky/10 grid place-items-center text-sky-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">User Dashboard</div>
                    <div className="text-[11px] text-warm-gray">View your personal albums</div>
                  </div>
                </button>
              </div>
            )}
          </div>
          <Link
            to="/signup"
            className="bg-emerald text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-deep transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
