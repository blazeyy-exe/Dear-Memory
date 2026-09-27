import { createFileRoute, Link } from "@tanstack/react-router";
import { BookImage, Heart, Sparkles, Clock, Plus, ArrowRight, Share2, Camera } from "lucide-react";
import { PHOTOS } from "@/lib/mock/data";

export const Route = createFileRoute("/user-dashboard/")({
  head: () => ({ meta: [{ title: "My DearMemory — Home" }] }),
  component: UserDashboardHome,
});

const USER_ALBUMS = [
  {
    id: "ua1",
    title: "Summer Road Trip 2024",
    cover: PHOTOS.weddingCouple,
    photos: 184,
    date: "Aug 2024",
    shared: true,
    mood: "Adventure",
  },
  {
    id: "ua2",
    title: "Olivia's 5th Birthday",
    cover: PHOTOS.birthday,
    photos: 96,
    date: "Apr 2024",
    shared: true,
    mood: "Joyful",
  },
  {
    id: "ua3",
    title: "Beach Sunset Sessions",
    cover: PHOTOS.weddingHero,
    photos: 52,
    date: "Jun 2024",
    shared: false,
    mood: "Serene",
  },
  {
    id: "ua4",
    title: "Family Reunion — Lake House",
    cover: PHOTOS.graduationGroup,
    photos: 210,
    date: "Jul 2024",
    shared: true,
    mood: "Warm",
  },
  {
    id: "ua5",
    title: "New York City Week",
    cover: PHOTOS.concertCrowd,
    photos: 320,
    date: "Mar 2024",
    shared: false,
    mood: "Energetic",
  },
  {
    id: "ua6",
    title: "Autumn in the Park",
    cover: PHOTOS.weddingDetails,
    photos: 78,
    date: "Oct 2024",
    shared: true,
    mood: "Cozy",
  },
];

const RECENT_MEMORIES = [
  { text: "The sunset at Big Sur was absolutely breathtaking. We pulled over just in time.", album: "Summer Road Trip 2024", date: "2 days ago" },
  { text: "Olivia blowing out her candles — she wished for a puppy!", album: "Olivia's 5th Birthday", date: "1 week ago" },
  { text: "Dad telling his famous fishing story for the 100th time. Still hilarious.", album: "Family Reunion — Lake House", date: "2 weeks ago" },
];

function UserDashboardHome() {
  const totalPhotos = USER_ALBUMS.reduce((s, a) => s + a.photos, 0);
  const sharedAlbums = USER_ALBUMS.filter((a) => a.shared).length;

  return (
    <div>
      {/* Welcome + quick stats */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="inline-flex items-center gap-2 text-xl md:text-2xl font-bold tracking-[-0.02em] text-[#1c1a18]">
              Welcome back, Alex <Sparkles className="w-5 h-5 text-emerald" />
            </h2>
            <p className="text-[14px] text-[#a09c98] mt-1">
              You've captured {totalPhotos} memories across {USER_ALBUMS.length} albums
            </p>
          </div>
          <Link
            to="/user-dashboard/albums/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4A7C6A] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#3d6b5a] transition-colors shadow-sm"
          >
            <Plus size={16} strokeWidth={2} />
            New album
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickStat icon={BookImage} label="Albums" value={USER_ALBUMS.length.toString()} accent="emerald" />
          <QuickStat icon={Camera} label="Photos" value={totalPhotos.toString()} accent="stone" />
          <QuickStat icon={Share2} label="Shared" value={sharedAlbums.toString()} accent="warning" />
          <QuickStat icon={Sparkles} label="Moments" value={`${USER_ALBUMS.length * 3}+`} accent="neutral" />
        </div>
      </div>

      {/* Recent albums grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[16px] font-semibold tracking-[-0.015em] text-[#1c1a18]">Your albums</h2>
            <p className="text-[13px] text-[#a09c98] mt-0.5">The stories you've collected</p>
          </div>
          <Link
            to="/user-dashboard/albums"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#4A7C6A] hover:text-[#3d6b5a] transition-colors"
          >
            View all
            <ArrowRight size={14} strokeWidth={1.8} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {USER_ALBUMS.slice(0, 6).map((album) => (
            <Link
              key={album.id}
              to="/user-dashboard/albums/$id"
              params={{ id: album.id }}
              className="group bg-white rounded-[1.5rem] overflow-hidden border border-[#e8e4de] hover:shadow-[0_4px_20px_rgba(45,42,41,0.08)] hover:-translate-y-0.5 transition-all"
            >
              <div className="aspect-[16/11] overflow-hidden relative">
                <img
                  src={album.cover}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Camera size={12} />
                    {album.photos}
                  </div>
                  {album.shared && (
                    <div className="flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      <Share2 size={12} />
                      Shared
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold tracking-[-0.01em] text-[#2d2a29] truncate">
                      {album.title}
                    </h3>
                    <p className="text-[12px] text-[#a09c98] mt-0.5">{album.date} · {album.mood}</p>
                  </div>
                  <ArrowRight size={14} strokeWidth={1.6} className="text-[#b0aaa6] group-hover:text-[#4A7C6A] shrink-0 mt-0.5 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent memories strip */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart size={15} strokeWidth={1.8} className="text-[#4A7C6A]" />
          <h2 className="text-[16px] font-semibold tracking-[-0.015em] text-[#1c1a18]">Recent moments</h2>
        </div>
        <div className="space-y-4">
          {RECENT_MEMORIES.map((m, i) => (
            <div key={i} className="flex gap-3 pb-4 border-b border-[#f0ece8] last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-full bg-[#edf4f1] grid place-items-center shrink-0">
                <Sparkles size={13} strokeWidth={1.8} className="text-[#4A7C6A]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#2d2a29] leading-relaxed">"{m.text}"</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] font-medium text-[#4A7C6A]">{m.album}</span>
                  <span className="text-[10px] text-[#b0aaa6]">·</span>
                  <span className="text-[11px] text-[#a09c98]">{m.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick action banner */}
      <div className="bg-gradient-to-br from-[#edf4f1] to-[#f4f1eb] rounded-[2rem] p-8 md:p-10 text-center border border-[#e0dbd4]">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm grid place-items-center mx-auto mb-4">
          <Sparkles size={24} strokeWidth={1.4} className="text-[#4A7C6A]" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[#1c1a18] mb-2">Start a new memory book</h2>
        <p className="text-[14px] text-[#7a7470] max-w-sm mx-auto mb-6">
          Create a beautiful album for your latest adventure, celebration, or quiet moment worth keeping.
        </p>
        <Link
          to="/user-dashboard/albums/new"
          className="inline-flex items-center gap-2 bg-[#4A7C6A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#3d6b5a] transition-colors shadow-sm"
        >
          <Plus size={16} strokeWidth={2} />
          Create album
        </Link>
      </div>
    </div>
  );
}

function QuickStat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: "emerald" | "stone" | "warning" | "neutral";
}) {
  const accentStyles = {
    emerald: "bg-[#edf4f1] text-[#4A7C6A]",
    stone: "bg-[#f4f1eb] text-[#7a7470]",
    warning: "bg-[#f0ece8] text-[#d4802a]",
    neutral: "bg-[#faf8f5] text-[#a09c98]",
  };

  return (
    <div className="rounded-xl p-4 bg-white border border-[#f0ece8]">
      <div className={`w-8 h-8 rounded-lg grid place-items-center ${accentStyles[accent]}`}>
        <Icon size={14} strokeWidth={1.8} />
      </div>
      <div className="mt-3 text-[20px] font-bold tracking-[-0.02em] text-[#1c1a18]">{value}</div>
      <div className="text-[11px] uppercase tracking-wider font-medium text-[#a09c98] mt-0.5">{label}</div>
    </div>
  );
}