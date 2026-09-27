import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ArrowRight, Bird, Cake, Camera, Check, ChevronLeft, Clapperboard, Film, Flower2, Gift, GraduationCap, Heart, Leaf, Mic, Moon, Sparkles, Sun, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PHOTOS } from "@/lib/mock/data";
import { useAuth } from "@/lib/auth/AuthContext";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — DearMemory" },
      {
        name: "description",
        content: "Create your DearMemory account. Choose between a business or personal account.",
      },
    ],
  }),
  component: SignupPage,
});

/* ─── Floating element helpers ─── */

interface FloatItem {
  id: number;
  type: "photo" | "icon" | "shape" | "polaroid";
  src?: string;
  label?: string;
  icon?: LucideIcon;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity?: number;
}

function generateFloaters(
  count: number,
  seed: { photos?: string[]; icons?: LucideIcon[]; labels?: string[] },
): FloatItem[] {
  const items: FloatItem[] = [];
  const types: FloatItem["type"][] = ["photo", "icon", "shape", "polaroid"];
  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];
    const base: FloatItem = {
      id: i,
      type,
      size: type === "polaroid" ? 80 + Math.random() * 60 : 28 + Math.random() * 48,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      rotation: (Math.random() - 0.5) * 24,
    };
    if (type === "photo" && seed.photos?.length) {
      base.src = seed.photos[Math.floor(Math.random() * seed.photos.length)];
    }
    if (type === "icon" && seed.icons?.length) {
      base.icon = seed.icons[Math.floor(Math.random() * seed.icons.length)];
    }
    if (type === "polaroid") {
      base.src = seed.photos?.[Math.floor(Math.random() * (seed.photos?.length ?? 1))];
      base.label = seed.labels?.[Math.floor(Math.random() * (seed.labels?.length ?? 1))];
      base.rotation = (Math.random() - 0.5) * 16;
    }
    base.opacity = 0.5 + Math.random() * 0.4;
    items.push(base);
  }
  return items;
}

const BUSINESS_PHOTOS = [
  PHOTOS.weddingCouple,
  PHOTOS.weddingDetails,
  PHOTOS.weddingFlowers,
  PHOTOS.weddingDance,
  PHOTOS.concertCrowd,
  PHOTOS.graduation,
];

const PERSONAL_PHOTOS = [
  PHOTOS.birthday,
  PHOTOS.portfolio1,
  PHOTOS.portfolio2,
  PHOTOS.weddingCouple,
  PHOTOS.weddingFlowers,
];

const BUSINESS_ICONS: LucideIcon[] = [Camera, Clapperboard, Sparkles, Film, Heart, Mic, GraduationCap, Trophy];
const PERSONAL_ICONS: LucideIcon[] = [Flower2, Leaf, Sparkles, Cake, Gift, Sun, Moon, Bird];

const BUSINESS_LABELS = [
  "Golden Hour",
  "Laurent Wedding",
  "Midnight Fest",
  "Class of '24",
  "Harbor Run",
];
const PERSONAL_LABELS = [
  "Summer 2024",
  "Olive's Party",
  "Camping Trip",
  "Sunday Brunch",
  "Beach Day",
];

function FloatParticle({ item }: { item: FloatItem }) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: `${item.x}%`,
    top: `${item.y}%`,
    width: item.size,
    height: item.size,
    animation: `float-particle ${item.duration}s ease-in-out ${item.delay}s infinite`,
    transform: `rotate(${item.rotation}deg)`,
    opacity: item.opacity ?? 0.7,
    pointerEvents: "none",
    zIndex: 1,
  };

  if (item.type === "icon") {
    return (
      <span style={style} className="flex items-center justify-center text-lg select-none">
        {item.icon ? <item.icon style={{ width: "60%", height: "60%" }} strokeWidth={1.5} /> : null}
      </span>
    );
  }

  if (item.type === "shape") {
    return (
      <div style={style} className="rounded-full border-2 border-current opacity-30 select-none" />
    );
  }

  if (item.type === "polaroid") {
    const pSize = item.size;
    return (
      <div
        style={{
          ...style,
          width: pSize,
          height: pSize * 1.2,
        }}
        className="bg-white rounded-lg shadow-md p-1.5 pb-5 select-none"
      >
        {item.src && (
          <img
            src={item.src}
            alt=""
            className="w-full h-full object-cover rounded"
            loading="lazy"
          />
        )}
        {item.label && (
          <div
            className="text-[8px] text-center mt-1 font-serif italic truncate"
            style={{ color: "#736f6e" }}
          >
            {item.label}
          </div>
        )}
      </div>
    );
  }

  // photo type
  return (
    <div
      style={{
        ...style,
        borderRadius: item.size * 0.2,
        overflow: "hidden",
      }}
      className="shadow-lg ring-1 ring-black/5 select-none"
    >
      {item.src && (
        <img src={item.src} alt="" className="w-full h-full object-cover" loading="lazy" />
      )}
    </div>
  );
}

function FloatingBackground({ items }: { items: FloatItem[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <FloatParticle key={item.id} item={item} />
      ))}
    </div>
  );
}

/* ─── Signup page ─── */

function SignupPage() {
  const [role, setRole] = useState<"business" | "user" | null>(null);
  const [step, setStep] = useState<"choose" | "form">("choose");

  return (
    <div className="bg-background font-display text-foreground min-h-screen flex flex-col relative">
      {/* Back to home / Back to choice button */}
      {step === "form" && (
        <button
          onClick={() => setStep("choose")}
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-1.5 text-sm font-medium text-warm-gray hover:text-emerald transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={1.8} />
          Back to choice
        </button>
      )}
      {step === "choose" && (
        <Link
          to="/"
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-1.5 text-sm font-medium text-warm-gray hover:text-emerald transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={1.8} />
          Back to home
        </Link>
      )}

      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {step === "choose" ? (
            <RoleSelection role={role} setRole={setRole} onContinue={() => setStep("form")} />
          ) : (
            <SignupForm role={role!} onBack={() => setStep("choose")} />
          )}
        </div>
      </main>
    </div>
  );
}

function RoleSelection({
  role,
  setRole,
  onContinue,
}: {
  role: "business" | "user" | null;
  setRole: (r: "business" | "user") => void;
  onContinue: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Decorative header */}
      <div className="text-center mb-12 animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance mb-4">
          Create your account
        </h1>
        <p className="text-warm-gray text-lg max-w-lg mx-auto">
          Choose the experience that fits you best. You can always switch later.
        </p>
      </div>

      {/* Role cards — clean, no floating elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 animate-fade-up [animation-delay:100ms]">
        {/* Business */}
        <button
          onClick={() => setRole("business")}
          className={`relative text-left p-8 md:p-10 rounded-[2.5rem] border-2 transition-all duration-300 ${
            role === "business"
              ? "border-emerald bg-emerald-light/40 shadow-lg shadow-emerald/10"
              : "border-border bg-white hover:border-emerald/30 hover:shadow-md hover:-translate-y-1"
          }`}
        >
          {role === "business" && (
            <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-emerald grid place-items-center">
              <Check size={15} className="text-white" strokeWidth={3} />
            </div>
          )}
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-2xl grid place-items-center shrink-0 transition-colors ${
                role === "business" ? "bg-emerald text-white" : "bg-emerald-light text-emerald"
              }`}
            >
              <Camera className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">For Business</h2>
          </div>
          <p className="text-warm-gray text-sm leading-relaxed mb-6">
            I'm a photographer, studio owner, or creative professional. I want to create stunning
            event websites, manage clients, and grow my business.
          </p>
          <ul className="space-y-2.5">
            {[
              "Premium event websites & galleries",
              "Client management & lead tracking",
              "Studio portfolio & brand kit",
              "Advanced analytics & team tools",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </button>

        {/* Personal / User */}
        <button
          onClick={() => setRole("user")}
          className={`relative text-left p-8 md:p-10 rounded-[2.5rem] border-2 transition-all duration-300 ${
            role === "user"
              ? "border-emerald bg-sky/40 shadow-lg shadow-sky/10"
              : "border-border bg-white hover:border-sky/40 hover:shadow-md hover:-translate-y-1"
          }`}
        >
          {role === "user" && (
            <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-emerald grid place-items-center">
              <Check size={15} className="text-white" strokeWidth={3} />
            </div>
          )}
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-2xl grid place-items-center shrink-0 transition-colors ${
                role === "user" ? "bg-emerald text-white" : "bg-sky text-foreground"
              }`}
            >
              <Flower2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">For Me</h2>
          </div>
          <p className="text-warm-gray text-sm leading-relaxed mb-6">
            I want a beautiful space to preserve my personal memories. Create albums for family,
            travel, celebrations, and everyday moments.
          </p>
          <ul className="space-y-2.5">
            {[
              "Beautiful personal photo albums",
              "Share with family & friends",
              "No complex tools — just create",
              "Free to start, always simple",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </button>
      </div>

      {/* Continue button */}
      <div className="text-center animate-fade-up [animation-delay:200ms]">
        <button
          onClick={onContinue}
          disabled={!role}
          className={`inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold transition-all ${
            role
              ? "bg-emerald text-white shadow-lg shadow-emerald/15 hover:bg-emerald-deep hover:-translate-y-0.5"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue with {role === "business" ? "Business" : "Personal"} account
          <ArrowRight size={18} strokeWidth={2} />
        </button>
        <p className="mt-4 text-sm text-warm-gray">
          Already have an account?{" "}
          <Link to="/dashboard" className="text-emerald font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

function SignupForm({ role, onBack }: { role: "business" | "user"; onBack: () => void }) {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(name, email, password, role);
      router.navigate({ to: role === "business" ? "/dashboard" : "/user-dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const floaters = useRef(
    generateFloaters(16, {
      photos: role === "business" ? BUSINESS_PHOTOS : PERSONAL_PHOTOS,
      icons: role === "business" ? BUSINESS_ICONS : PERSONAL_ICONS,
      labels: role === "business" ? BUSINESS_LABELS : PERSONAL_LABELS,
    }),
  );

  return (
    <div className="max-w-5xl mx-auto animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      {/* Left — floating gallery preview */}
      <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
        <FloatingBackground items={floaters.current} />

        {/* Decorative label */}
        <div className="absolute bottom-0 left-0 right-0 z-20 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg ring-1 ring-black/5">
            <div className="text-xs font-bold uppercase tracking-widest text-warm-gray">
              {role === "business" ? "What you'll create" : "What your memories look like"}
            </div>
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold mt-0.5">
              {role === "business" ? <>Stunning event websites <Sparkles className="w-3.5 h-3.5 text-emerald" /></> : <>Beautiful personal albums <Flower2 className="w-3.5 h-3.5 text-emerald" /></>}
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="relative">
        {/* Small floating accents visible on all screens */}
        <div
          className="absolute -top-6 -right-6 w-20 h-20 opacity-30 animate-float hidden sm:block"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="w-full h-full rounded-2xl bg-white shadow-lg p-1.5 rotate-6">
            {role === "business" ? (
              <img
                src={PHOTOS.weddingDetails}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <img src={PHOTOS.birthday} alt="" className="w-full h-full object-cover rounded-xl" />
            )}
          </div>
        </div>
        <div
          className="absolute -bottom-4 -left-6 w-14 h-14 opacity-25 animate-float hidden sm:block"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="w-full h-full rounded-full bg-white shadow-md grid place-items-center text-lg -rotate-12">
            {role === "business" ? <Film className="w-6 h-6 text-emerald-deep" /> : <Leaf className="w-6 h-6 text-emerald-deep" />}
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div
            className={`w-12 h-12 rounded-2xl grid place-items-center mb-4 ${
              role === "business" ? "bg-emerald-light text-emerald" : "bg-sky text-foreground"
            }`}
          >
            {role === "business" ? <Camera className="w-6 h-6" /> : <Flower2 className="w-6 h-6" />}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {role === "business" ? "Create your studio account" : "Create your personal account"}
          </h1>
          <p className="text-warm-gray">
            {role === "business"
              ? "Start creating stunning event websites for your clients."
              : "Start preserving your memories in beautiful albums."}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5">
              {role === "business" ? "Studio / Full name" : "Full name"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === "business" ? "e.g. Goldenhour Studio" : "e.g. Alex Rivera"}
              required
              className="w-full px-4 py-3.5 rounded-2xl border border-border bg-white/95 text-sm outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3.5 rounded-2xl border border-border bg-white/95 text-sm outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
              className="w-full px-4 py-3.5 rounded-2xl border border-border bg-white/95 text-sm outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all"
            />
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 rounded-md border-border accent-emerald"
            />
            <label htmlFor="terms" className="text-sm text-warm-gray">
              I agree to the{" "}
              <a href="#" className="text-emerald font-semibold hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-emerald font-semibold hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald text-white py-3.5 rounded-full font-bold text-base hover:bg-emerald-deep transition-colors shadow-lg shadow-emerald/15"
          >
            Create {role === "business" ? "studio" : "personal"} account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-warm-gray">
          Already have an account?{" "}
          <Link to="/dashboard" className="text-emerald font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
