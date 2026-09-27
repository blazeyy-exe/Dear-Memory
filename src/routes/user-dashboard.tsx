import { createFileRoute, Link, Outlet, useRouterState, useRouter } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  BookImage,
  Plus,
  Heart,
  Settings,
  Menu,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

export const Route = createFileRoute("/user-dashboard")({
  head: () => ({
    meta: [
      { title: "My DearMemory — Personal Albums" },
      { name: "description", content: "Your personal album space on DearMemory." },
    ],
  }),
  component: UserDashboardLayout,
});

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV_ITEMS: { label: string; href: string; icon: React.ElementType }[] = [
  { label: "Home", href: "/user-dashboard", icon: Home },
  { label: "My Albums", href: "/user-dashboard/albums", icon: BookImage },
  { label: "New Album", href: "/user-dashboard/albums/new", icon: Plus },
];

// ─── Wordmark ─────────────────────────────────────────────────────────────────

function Wordmark() {
  return (
    <Link
      to="/"
      className="flex items-baseline gap-[2px] text-[17px] tracking-[-0.02em] select-none"
    >
      <span className="font-normal text-[#2d2a29]">dear</span>
      <span className="font-semibold text-[#4A7C6A]">memory</span>
    </Link>
  );
}

// ─── Nav item ─────────────────────────────────────────────────────────────────

function NavItem({
  item,
  active,
  onClick,
}: {
  item: { label: string; href: string; icon: React.ElementType };
  active: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      onClick={onClick}
      className={[
        "group relative flex items-center gap-3 rounded-xl px-3 py-[9px] text-[13.5px] transition-colors duration-150",
        active
          ? "text-[#2d2a29] font-[540]"
          : "text-[#7a7470] font-normal hover:text-[#2d2a29] hover:bg-[#f4f1eb]/70",
      ].join(" ")}
    >
      {active && (
        <span
          aria-hidden
          className="absolute inset-y-[6px] left-0 w-[2.5px] rounded-full bg-[#4A7C6A]"
        />
      )}
      <Icon
        size={15}
        strokeWidth={active ? 2 : 1.6}
        className={
          active ? "text-[#4A7C6A]" : "text-[#b0aaa6] group-hover:text-[#7a7470] transition-colors"
        }
      />
      {item.label}
    </a>
  );
}

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

function SidebarNav({ isActive, onNav }: { isActive: (href: string) => boolean; onNav?: () => void }) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
      {NAV_ITEMS.map((item) => (
        <NavItem key={item.href} item={item} active={isActive(item.href)} onClick={onNav} />
      ))}
      <div className="my-2 mx-3 h-px bg-[#e8e4de]" />
      <Link
        to="/"
        className="group relative flex items-center gap-3 rounded-xl px-3 py-[9px] text-[13.5px] text-[#7a7470] font-normal hover:text-[#2d2a29] hover:bg-[#f4f1eb]/70 transition-colors duration-150"
      >
        <LogOut size={15} strokeWidth={1.6} className="text-[#b0aaa6] group-hover:text-[#7a7470] transition-colors" />
        Back to site
      </Link>
    </nav>
  );
}

// ─── User identity row ────────────────────────────────────────────────────────

function UserRow() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.navigate({ to: "/" });
  };

  return (
    <div className="px-4 pb-5 pt-3">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#e8e4de] shrink-0 grid place-items-center text-[11px] font-semibold tracking-wide text-[#5c5753]" aria-hidden>
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            <User size={14} strokeWidth={1.8} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#2d2a29] truncate leading-snug">{user?.name ?? "User"}</p>
          <p className="text-[11.5px] text-[#a09c98] truncate leading-snug">{user?.role === "business" ? "Business account" : "Personal account"}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12.5px] text-[#a09c98] hover:text-[#c0392b] hover:bg-red-50/50 transition-colors"
      >
        <LogOut size={13} strokeWidth={1.6} />
        Sign out
      </button>
    </div>
  );
}

// ─── UserDashboardLayout ──────────────────────────────────────────────────────

function UserDashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (href: string) =>
    href === "/user-dashboard" ? pathname === "/user-dashboard" : pathname.startsWith(href);

  return (
    <div className="h-dvh overflow-hidden bg-[#F9F8F6]">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-[220px] shrink-0 border-r border-[#e8e4de] bg-[#F9F8F6]">
          <div className="px-5 py-5">
            <Wordmark />
          </div>
          <SidebarNav isActive={isActive} />
          <div className="mx-4 h-px bg-[#e8e4de]" />
          <UserRow />
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
          {/* Header */}
          <header className="sticky top-0 z-40 flex items-center justify-between gap-4 px-7 md:px-9 py-5 bg-[#F9F8F6] border-b border-[#e8e4de]">
            <div className="flex items-center gap-4 min-w-0">
              {/* Mobile menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      aria-label="Open menu"
                      className="h-9 w-9 grid place-items-center rounded-xl border border-[#e0dbd4] bg-white text-[#7a7470] hover:bg-[#f4f1eb] transition-colors"
                    >
                      <Menu size={17} strokeWidth={1.7} />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 bg-[#faf8f5] border-r border-[#e8e4de] flex flex-col p-0">
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <div className="px-5 py-5 flex items-center justify-between">
                      <Wordmark />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <SidebarNav isActive={isActive} />
                    </div>
                    <div className="mx-4 h-px bg-[#e8e4de]" />
                    <UserRow />
                  </SheetContent>
                </Sheet>
              </div>

              <div className="min-w-0">
                <h1 className="text-lg md:text-xl font-semibold tracking-[-0.025em] text-[#1c1a18] leading-tight truncate">
                  My DearMemory
                </h1>
                <p className="text-[13px] text-[#a09c98] mt-0.5 leading-snug">Your personal album space</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/user-dashboard/albums/new"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4A7C6A] px-4 py-2 text-[13.5px] font-semibold text-white hover:bg-[#3d6b5a] transition-colors"
              >
                <Plus size={15} strokeWidth={1.6} />
                New album
              </Link>
            </div>
          </header>

          {/* Page content — full bleed */}
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}