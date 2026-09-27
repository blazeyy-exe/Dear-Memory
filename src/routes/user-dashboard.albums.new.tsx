import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Camera, Flame, Heart, ImageIcon, Leaf, MountainSnow, PartyPopper, Sparkles, Wine, X, Zap } from "lucide-react";

export const Route = createFileRoute("/user-dashboard/albums/new")({
  head: () => ({ meta: [{ title: "New Album — DearMemory" }] }),
  component: NewAlbum,
});

const MOODS = [
  { label: "Joyful", icon: PartyPopper, color: "bg-amber-100 text-amber-700" },
  { label: "Serene", icon: Leaf, color: "bg-emerald-light text-emerald-deep" },
  { label: "Adventure", icon: MountainSnow, color: "bg-sky text-foreground" },
  { label: "Cozy", icon: Flame, color: "bg-blush text-foreground" },
  { label: "Energetic", icon: Zap, color: "bg-lavender text-foreground" },
  { label: "Romantic", icon: Heart, color: "bg-rose-100 text-rose-700" },
  { label: "Nostalgic", icon: Camera, color: "bg-cream text-foreground" },
  { label: "Celebratory", icon: Wine, color: "bg-emerald-light text-emerald-deep" },
];

function NewAlbum() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState("");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create the album
    router.navigate({ to: "/user-dashboard/albums" });
  };

  return (
    <div className="px-7 md:px-9 py-8 max-w-3xl mx-auto space-y-8">
      {/* Back link */}
      <a
        href="/user-dashboard/albums"
        onClick={(e) => { e.preventDefault(); router.navigate({ to: "/user-dashboard/albums" }); }}
        className="inline-flex items-center gap-2 text-sm text-[#7a7470] hover:text-[#2d2a29] transition-colors"
      >
        <ArrowRight size={14} className="rotate-180" />
        Back to albums
      </a>

      {/* Header */}
      <div>
        <div className="w-12 h-12 rounded-2xl bg-[#edf4f1] grid place-items-center mb-4">
          <Sparkles size={22} strokeWidth={1.4} className="text-[#4A7C6A]" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#1c1a18]">Create a new album</h1>
        <p className="text-[14px] text-[#a09c98] mt-1">Give your memories a beautiful home.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Cover image */}
        <div>
          <label className="block text-sm font-semibold text-[#2d2a29] mb-2">Cover photo</label>
          <div
            onClick={() => document.getElementById("cover-upload")?.click()}
            className="aspect-[16/9] rounded-2xl border-2 border-dashed border-[#e0dbd4] bg-[#faf8f5] flex flex-col items-center justify-center cursor-pointer hover:border-[#4A7C6A] hover:bg-[#edf4f1] transition-all group"
          >
            {coverPreview ? (
              <div className="relative w-full h-full">
                <img src={coverPreview} alt="" className="w-full h-full object-cover rounded-2xl" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setCoverPreview(null); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white grid place-items-center hover:bg-black/70 transition-colors"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm grid place-items-center mb-3 group-hover:scale-110 transition-transform">
                  <ImageIcon size={24} strokeWidth={1.4} className="text-[#b0aaa6]" />
                </div>
                <p className="text-sm font-medium text-[#7a7470]">Click to upload a cover</p>
                <p className="text-xs text-[#b0aaa6] mt-1">Recommended: 16:9 ratio</p>
              </>
            )}
            <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setCoverPreview(URL.createObjectURL(file));
            }} />
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-[#2d2a29] mb-2">Album title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Summer Road Trip 2024"
            required
            className="w-full px-4 py-3.5 rounded-2xl border border-[#e0dbd4] bg-white text-sm outline-none focus:ring-2 focus:ring-[#4A7C6A]/30 focus:border-[#4A7C6A] transition-all text-[#2d2a29] placeholder:text-[#b0aaa6]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-[#2d2a29] mb-2">Description <span className="text-[#b0aaa6] font-normal">(optional)</span></label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What makes this album special? Add a note..."
            rows={3}
            className="w-full px-4 py-3.5 rounded-2xl border border-[#e0dbd4] bg-white text-sm outline-none focus:ring-2 focus:ring-[#4A7C6A]/30 focus:border-[#4A7C6A] transition-all resize-none text-[#2d2a29] placeholder:text-[#b0aaa6]"
          />
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-semibold text-[#2d2a29] mb-3">Mood <span className="text-[#b0aaa6] font-normal">(optional)</span></label>
          <div className="flex flex-wrap gap-2.5">
            {MOODS.map((m) => (
              <button
                key={m.label}
                type="button"
                onClick={() => setMood(m.label === mood ? "" : m.label)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mood === m.label
                    ? "ring-2 ring-[#4A7C6A] ring-offset-2 " + m.color
                    : "bg-white border border-[#e0dbd4] text-[#7a7470] hover:border-[#4A7C6A]/30 hover:text-[#2d2a29]"
                }`}
              >
                <m.icon className="w-4 h-4" />
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#f0ece8]">
          <button
            type="submit"
            disabled={!title}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all ${
              title
                ? "bg-[#4A7C6A] text-white shadow-sm hover:bg-[#3d6b5a]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Heart size={15} strokeWidth={2} />
            Create album
          </button>
          <button
            type="button"
            onClick={() => router.navigate({ to: "/user-dashboard/albums" })}
            className="px-6 py-3 rounded-full text-sm font-medium text-[#7a7470] hover:text-[#2d2a29] hover:bg-[#f4f1eb] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}