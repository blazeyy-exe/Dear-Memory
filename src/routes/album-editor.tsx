import { createFileRoute, Link } from "@tanstack/react-router";
import { GripVertical } from "lucide-react";
import { PHOTOS } from "@/lib/mock/data";

export const Route = createFileRoute("/album-editor")({
  head: () => ({ meta: [{ title: "Album Editor — DearMemory" }] }),
  component: AlbumEditor,
});

const SECTIONS = ["Hero", "Story", "Gallery", "Guestbook", "Vendors", "Map", "RSVP", "Footer"];

function AlbumEditor() {
  return (
    <div className="min-h-screen bg-[#f0ece4]">
      <div className="bg-[#faf8f5] shadow-[0_8px_48px_rgba(45,42,41,0.10)] md:m-4 md:rounded-[22px] overflow-hidden">
        <header className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-[#e8e4de]">
          <Link
            to="/"
            className="flex items-baseline gap-[2px] text-[17px] tracking-[-0.02em] select-none"
          >
            <span className="font-normal text-[#2d2a29]">dear</span>
            <span className="font-semibold text-[#4A7C6A]">memory</span>
          </Link>
          <button className="bg-emerald text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-deep transition-colors">
            Publish
          </button>
        </header>

        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
          <aside className="col-span-12 lg:col-span-3 bg-white rounded-2xl ring-1 ring-border p-4 overflow-y-auto">
            <div className="flex gap-1 mb-4 bg-cream rounded-full p-1">
              {["Sections", "Pages"].map((t, i) => (
                <button
                  key={t}
                  className={`flex-1 text-xs font-semibold py-1.5 rounded-full ${i === 0 ? "bg-white shadow" : "text-warm-gray"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="space-y-1">
              {SECTIONS.map((s) => (
                <div
                  key={s}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer ${s === "Gallery" ? "bg-emerald-light text-emerald-deep font-semibold" : "hover:bg-cream"}`}
                >
                  <GripVertical className="w-3.5 h-3.5 shrink-0 text-warm-gray" />
                  {s}
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-sm font-semibold py-2 rounded-xl border border-dashed border-warm-gray/30 text-warm-gray hover:bg-cream">
              + Add section
            </button>
          </aside>

          <div className="col-span-12 lg:col-span-9 space-y-4 overflow-y-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-cream px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald/60" />
                <div className="ml-4 text-[11px] text-warm-gray font-mono">
                  sophie-and-etienne.com
                </div>
              </div>
              <div>
                <div className="relative">
                  <img
                    src={PHOTOS.weddingHero}
                    alt="Album preview"
                    className="w-full aspect-[16/10] object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center text-white text-center">
                    <div>
                      <div className="font-serif italic text-3xl md:text-4xl">Sophie & Étienne</div>
                      <div className="text-xs uppercase tracking-widest mt-2">June 14, 2024</div>
                    </div>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <p className="font-serif italic text-xl md:text-2xl text-warm-gray">
                    "The way you held her hand told us everything."
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-1 p-1">
                  <img src={PHOTOS.weddingCouple} className="aspect-square object-cover" alt="" />
                  <img src={PHOTOS.weddingFlowers} className="aspect-square object-cover" alt="" />
                  <img src={PHOTOS.weddingDetails} className="aspect-square object-cover" alt="" />
                  <img src={PHOTOS.weddingDance} className="aspect-square object-cover" alt="" />
                  <img src={PHOTOS.portfolio1} className="aspect-square object-cover" alt="" />
                  <img src={PHOTOS.portfolio2} className="aspect-square object-cover" alt="" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl ring-1 ring-border p-5">
              <div className="font-bold mb-1">Gallery section</div>
              <div className="text-xs text-warm-gray mb-5">Style controls</div>
              <Block label="Layout">
                <div className="grid grid-cols-3 gap-2">
                  {["Grid", "Masonry", "Carousel"].map((l, i) => (
                    <button
                      key={l}
                      className={`text-xs font-semibold py-2 rounded-xl ${i === 0 ? "bg-emerald text-white" : "bg-cream"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </Block>
              <Block label="Columns">
                <input
                  type="range"
                  defaultValue={3}
                  min={1}
                  max={6}
                  className="w-full accent-emerald"
                />
              </Block>
              <Block label="Spacing">
                <input
                  type="range"
                  defaultValue={4}
                  min={0}
                  max={12}
                  className="w-full accent-emerald"
                />
              </Block>
              <Block label="Corner radius">
                <input
                  type="range"
                  defaultValue={12}
                  min={0}
                  max={32}
                  className="w-full accent-emerald"
                />
              </Block>
              <Block label="Background">
                <div className="flex gap-2">
                  {["#ffffff", "#EEEAFE", "#e8f0ed", "#2d2a29"].map((c) => (
                    <button
                      key={c}
                      className="w-8 h-8 rounded-full ring-1 ring-border"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </Block>
              <Block label="Animation">
                <select className="w-full bg-cream rounded-xl px-3 py-2 text-sm outline-none">
                  <option>Fade up</option>
                  <option>Scale in</option>
                  <option>None</option>
                </select>
              </Block>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="text-[10px] font-bold uppercase tracking-widest text-warm-gray mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}
