import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ArrowRight, Camera, Share2, Search, SlidersHorizontal } from "lucide-react";
import { PHOTOS } from "@/lib/mock/data";

export const Route = createFileRoute("/user-dashboard/albums/")({
  head: () => ({ meta: [{ title: "My Albums — DearMemory" }] }),
  component: UserAlbums,
});

const USER_ALBUMS = [
  { id: "ua1", title: "Summer Road Trip 2024", cover: PHOTOS.weddingCouple, photos: 184, date: "Aug 2024", shared: true, mood: "Adventure" },
  { id: "ua2", title: "Olivia's 5th Birthday", cover: PHOTOS.birthday, photos: 96, date: "Apr 2024", shared: true, mood: "Joyful" },
  { id: "ua3", title: "Beach Sunset Sessions", cover: PHOTOS.weddingHero, photos: 52, date: "Jun 2024", shared: false, mood: "Serene" },
  { id: "ua4", title: "Family Reunion — Lake House", cover: PHOTOS.graduationGroup, photos: 210, date: "Jul 2024", shared: true, mood: "Warm" },
  { id: "ua5", title: "New York City Week", cover: PHOTOS.concertCrowd, photos: 320, date: "Mar 2024", shared: false, mood: "Energetic" },
  { id: "ua6", title: "Autumn in the Park", cover: PHOTOS.weddingDetails, photos: 78, date: "Oct 2024", shared: true, mood: "Cozy" },
];

function UserAlbums() {
  return (
    <div className="px-7 md:px-9 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#1c1a18]">My Albums</h2>
          <p className="text-[13px] text-[#a09c98] mt-0.5">{USER_ALBUMS.length} albums · {USER_ALBUMS.reduce((s, a) => s + a.photos, 0)} photos</p>
        </div>
        <Link to="/user-dashboard/albums/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4A7C6A] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#3d6b5a] transition-colors shadow-sm">
          <Plus size={16} strokeWidth={2} />
          New album
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-[#e0dbd4] rounded-xl px-4 py-2.5">
          <Search size={15} strokeWidth={1.6} className="text-[#b0aaa6]" />
          <input placeholder="Search albums..." className="flex-1 bg-transparent text-sm outline-none text-[#2d2a29] placeholder:text-[#b0aaa6]" />
        </div>
        <button className="h-10 w-10 rounded-xl border border-[#e0dbd4] bg-white grid place-items-center text-[#7a7470] hover:bg-[#f4f1eb] transition-colors">
          <SlidersHorizontal size={15} strokeWidth={1.6} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {USER_ALBUMS.map((album) => (
          <Link key={album.id} to="/user-dashboard/albums/$id" params={{ id: album.id }} className="group bg-white rounded-[1.5rem] overflow-hidden border border-[#e8e4de] hover:shadow-[0_4px_20px_rgba(45,42,41,0.08)] hover:-translate-y-0.5 transition-all">
            <div className="aspect-[16/11] overflow-hidden relative">
              <img src={album.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
                  <h3 className="text-[14px] font-semibold tracking-[-0.01em] text-[#2d2a29] truncate">{album.title}</h3>
                  <p className="text-[12px] text-[#a09c98] mt-0.5">{album.date} · {album.mood}</p>
                </div>
                <ArrowRight size={14} strokeWidth={1.6} className="text-[#b0aaa6] group-hover:text-[#4A7C6A] shrink-0 mt-0.5 transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}