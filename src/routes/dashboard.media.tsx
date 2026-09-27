import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { PHOTOS } from "@/lib/mock/data";

export const Route = createFileRoute("/dashboard/media")({
  head: () => ({ meta: [{ title: "Media Library — DearMemory" }] }),
  component: Media,
});

const ALL_PHOTOS = [
  PHOTOS.weddingHero, PHOTOS.weddingCouple, PHOTOS.weddingFlowers, PHOTOS.weddingDetails,
  PHOTOS.weddingDance, PHOTOS.graduation, PHOTOS.graduationGroup, PHOTOS.concert,
  PHOTOS.concertCrowd, PHOTOS.birthday, PHOTOS.corporate, PHOTOS.sports,
  PHOTOS.portfolio1, PHOTOS.portfolio2, PHOTOS.portfolio3, PHOTOS.weddingHero,
];

function Media() {
  return (
    <AppShell
      title="Media Library"
      subtitle="6,420 photos across 12 events"
      action={
        <div className="flex gap-2">
          <button className="bg-white ring-1 ring-border px-4 py-2 rounded-full text-sm font-semibold">+ Folder</button>
          <button className="inline-flex items-center gap-1.5 bg-emerald text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-deep"><Upload className="w-4 h-4" /> Upload</button>
        </div>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3 bg-white rounded-[1.5rem] ring-1 ring-border p-5 h-fit">
          <div className="font-bold text-sm mb-3">Collections</div>
          <div className="space-y-1 text-sm">
            {[
              { l: "All photos", c: 6420 },
              { l: "Recent uploads", c: 124 },
              { l: "Favorites", c: 218 },
              { l: "Shared", c: 38 },
              { l: "Archive", c: 1840 },
            ].map((c, i) => (
              <div key={c.l} className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer ${i === 0 ? "bg-emerald-light text-emerald-deep font-semibold" : "hover:bg-cream"}`}>
                <span>{c.l}</span>
                <span className="text-xs text-warm-gray font-mono">{c.c.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="font-bold text-sm mt-6 mb-3">By event</div>
          <div className="space-y-1 text-sm">
            {["Laurent Wedding", "Midnight Bloom", "Class of '24", "Olive's Birthday"].map((e) => (
              <div key={e} className="px-3 py-2 rounded-xl hover:bg-cream cursor-pointer">{e}</div>
            ))}
          </div>
        </aside>

        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {ALL_PHOTOS.map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden group relative">
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-emerald/0 group-hover:bg-emerald/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
