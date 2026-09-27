import { createFileRoute, Link, useParams, useRouter } from "@tanstack/react-router";
import { ArrowRight, Camera, Share2, Heart, Download, Trash2, Edit3, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { PHOTOS } from "@/lib/mock/data";

export const Route = createFileRoute("/user-dashboard/albums/$id")({
  head: () => ({ meta: [{ title: "Album — DearMemory" }] }),
  component: AlbumDetail,
});

const ALBUMS_DATA: Record<string, {
  title: string;
  cover: string;
  photos: number;
  date: string;
  shared: boolean;
  mood: string;
  description: string;
  images: string[];
}> = {
  ua1: {
    title: "Summer Road Trip 2024",
    cover: PHOTOS.weddingCouple,
    photos: 184,
    date: "Aug 2024",
    shared: true,
    mood: "Adventure",
    description: "Two weeks driving the Pacific Coast Highway. Every stop was a new postcard.",
    images: [PHOTOS.weddingHero, PHOTOS.weddingDetails, PHOTOS.weddingFlowers, PHOTOS.weddingDance, PHOTOS.weddingCouple, PHOTOS.graduationGroup],
  },
  ua2: {
    title: "Olivia's 5th Birthday",
    cover: PHOTOS.birthday,
    photos: 96,
    date: "Apr 2024",
    shared: true,
    mood: "Joyful",
    description: "A backyard party filled with laughter, cake, and glitter everywhere.",
    images: [PHOTOS.birthday, PHOTOS.weddingCouple, PHOTOS.weddingDetails, PHOTOS.graduation, PHOTOS.concertCrowd, PHOTOS.weddingHero],
  },
  ua3: {
    title: "Beach Sunset Sessions",
    cover: PHOTOS.weddingHero,
    photos: 52,
    date: "Jun 2024",
    shared: false,
    mood: "Serene",
    description: "Golden hour every evening. A week of chasing the light.",
    images: [PHOTOS.weddingHero, PHOTOS.weddingCouple, PHOTOS.weddingDetails, PHOTOS.graduationGroup],
  },
  ua4: {
    title: "Family Reunion — Lake House",
    cover: PHOTOS.graduationGroup,
    photos: 210,
    date: "Jul 2024",
    shared: true,
    mood: "Warm",
    description: "Three generations, one lake house. Stories were told, memories were made.",
    images: [PHOTOS.graduationGroup, PHOTOS.graduation, PHOTOS.weddingHero, PHOTOS.concertCrowd, PHOTOS.weddingCouple, PHOTOS.weddingDetails],
  },
  ua5: {
    title: "New York City Week",
    cover: PHOTOS.concertCrowd,
    photos: 320,
    date: "Mar 2024",
    shared: false,
    mood: "Energetic",
    description: "Seven days, five boroughs, too many steps to count.",
    images: [PHOTOS.concertCrowd, PHOTOS.concert, PHOTOS.weddingHero, PHOTOS.graduationGroup, PHOTOS.weddingCouple, PHOTOS.weddingDetails],
  },
  ua6: {
    title: "Autumn in the Park",
    cover: PHOTOS.weddingDetails,
    photos: 78,
    date: "Oct 2024",
    shared: true,
    mood: "Cozy",
    description: "Crisp air, golden leaves, and hot chocolate after every walk.",
    images: [PHOTOS.weddingDetails, PHOTOS.weddingCouple, PHOTOS.weddingHero, PHOTOS.graduationGroup],
  },
};

const DEFAULT_IMAGES = [PHOTOS.weddingHero, PHOTOS.weddingCouple, PHOTOS.weddingDetails, PHOTOS.graduationGroup];

function AlbumDetail() {
  const router = useRouter();
  const { id } = useParams({ from: "/user-dashboard/albums/$id" });
  const album = ALBUMS_DATA[id];

  if (!album) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#f4f1eb] grid place-items-center mb-4">
          <Camera size={28} strokeWidth={1.4} className="text-[#b0aaa6]" />
        </div>
        <h2 className="text-xl font-bold text-[#1c1a18] mb-2">Album not found</h2>
        <p className="text-sm text-[#a09c98] mb-6">This album doesn't exist or has been removed.</p>
        <Link to="/user-dashboard/albums" className="inline-flex items-center gap-2 bg-[#4A7C6A] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#3d6b5a] transition-colors">
          <ArrowRight size={14} className="rotate-180" />
          Back to albums
        </Link>
      </div>
    );
  }

  const images = album.images.length > 0 ? album.images : DEFAULT_IMAGES;

  return (
    <div className="px-7 md:px-9 py-8 space-y-8">
      {/* Back + actions */}
      <div className="flex items-center justify-between">
        <a
          href="/user-dashboard/albums"
          onClick={(e) => { e.preventDefault(); router.navigate({ to: "/user-dashboard/albums" }); }}
          className="inline-flex items-center gap-2 text-sm text-[#7a7470] hover:text-[#2d2a29] transition-colors"
        >
          <ArrowRight size={14} className="rotate-180" />
          Back to albums
        </a>

        <div className="flex items-center gap-2">
          <button className="h-9 px-4 rounded-xl border border-[#e0dbd4] bg-white text-[13px] font-medium text-[#7a7470] hover:bg-[#f4f1eb] transition-colors inline-flex items-center gap-1.5">
            <Edit3 size={13} strokeWidth={1.6} />
            Edit
          </button>
          <button className="h-9 px-4 rounded-xl border border-[#e0dbd4] bg-white text-[13px] font-medium text-[#7a7470] hover:bg-[#f4f1eb] transition-colors inline-flex items-center gap-1.5">
            <Trash2 size={13} strokeWidth={1.6} className="text-[#c0392b]" />
          </button>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative rounded-[2rem] overflow-hidden aspect-[21/9] min-h-[240px]">
        <img src={album.cover} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-2">
            <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">{album.mood}</span>
            <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">{album.date}</span>
            {album.shared && (
              <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Share2 size={10} />
                Shared
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white tracking-[-0.02em]">{album.title}</h1>
          {album.description && (
            <p className="text-white/70 text-sm mt-1 max-w-xl">{album.description}</p>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-[#e8e4de] p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-[#7a7470]">
            <Camera size={15} strokeWidth={1.6} className="text-[#4A7C6A]" />
            <span className="font-semibold text-[#2d2a29]">{album.photos}</span> photos
          </div>
          <div className="flex items-center gap-2 text-sm text-[#7a7470]">
            <Heart size={15} strokeWidth={1.6} className="text-[#c0392b]" />
            <span className="font-semibold text-[#2d2a29]">24</span> likes
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4A7C6A] hover:text-[#3d6b5a] transition-colors">
          <Share2 size={14} strokeWidth={1.8} />
          {album.shared ? "Shared" : "Share"}
        </button>
      </div>

      {/* Photo grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold tracking-[-0.015em] text-[#1c1a18]">Photos</h2>
          <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4A7C6A] hover:text-[#3d6b5a] transition-colors">
            <Plus size={14} strokeWidth={1.8} />
            Add photos
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#f4f1eb] group relative">
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button className="w-7 h-7 rounded-full bg-white/90 grid place-items-center text-[#7a7470] hover:bg-white transition-colors">
                  <Download size={12} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share section */}
      {album.shared && (
        <div className="bg-[#edf4f1] rounded-2xl p-6 border border-[#dcebe5]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[#2d2a29]">Shared album link</h3>
              <p className="text-xs text-[#7a7470] mt-1">Anyone with this link can view the album.</p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-[#dcebe5] min-w-0 max-w-[280px]">
              <span className="text-xs text-[#a09c98] truncate">dearmemory.com/shared/{id}</span>
              <button className="text-xs font-semibold text-[#4A7C6A] hover:text-[#3d6b5a] shrink-0">Copy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}