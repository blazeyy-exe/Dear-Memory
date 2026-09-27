import { createFileRoute } from "@tanstack/react-router";
import { GripVertical, Redo2, Undo2 } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { PHOTOS } from "@/lib/mock/data";

export const Route = createFileRoute("/dashboard/builder")({
  head: () => ({ meta: [{ title: "Website Builder — DearMemory" }] }),
  component: Builder,
});

const SECTIONS = ["Hero", "Story", "Guestbook", "Vendors", "Map", "RSVP", "Footer"];

function Builder() {
  return (
    <AppShell
      title="Website Builder"
      subtitle="The Laurent Wedding · live preview"
      action={
        <div className="flex gap-2">
          <button aria-label="Undo" className="inline-flex items-center bg-white ring-1 ring-border px-4 py-2 rounded-full text-sm font-semibold text-warm-gray hover:text-foreground"><Undo2 className="w-4 h-4" /></button>
          <button aria-label="Redo" className="inline-flex items-center bg-white ring-1 ring-border px-4 py-2 rounded-full text-sm font-semibold text-warm-gray hover:text-foreground"><Redo2 className="w-4 h-4" /></button>
          <div className="bg-white ring-1 ring-border rounded-full p-1 flex gap-1">
            {["Desktop", "Tablet", "Mobile"].map((d, i) => (
              <button key={d} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${i === 0 ? "bg-emerald text-white" : "text-warm-gray"}`}>{d}</button>
            ))}
          </div>
          <button className="bg-emerald text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-deep">Publish</button>
        </div>
      }
    >
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
        {/* Left panel */}
        <aside className="col-span-12 lg:col-span-3 bg-white rounded-[1.5rem] ring-1 ring-border p-4 overflow-y-auto">
          <div className="flex gap-1 mb-4 bg-cream rounded-full p-1">
            {["Sections", "Pages"].map((t, i) => (
              <button key={t} className={`flex-1 text-xs font-semibold py-1.5 rounded-full ${i === 0 ? "bg-white shadow" : "text-warm-gray"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="space-y-1">
            {SECTIONS.map((s) => (
              <div key={s} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer ${s === "Hero" ? "bg-emerald-light text-emerald-deep font-semibold" : "hover:bg-cream"}`}>
                <GripVertical className="w-3.5 h-3.5 shrink-0 text-warm-gray" />
                {s}
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-sm font-semibold py-2 rounded-xl border border-dashed border-warm-gray/30 text-warm-gray hover:bg-cream">+ Add section</button>
        </aside>

        {/* Album preview */}
        <div className="col-span-12 lg:col-span-9 bg-cream rounded-[1.5rem] p-6 overflow-y-auto">
          <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-lg max-w-3xl mx-auto">
            <div className="bg-cream px-4 py-3 flex items-center gap-2 border-b border-border">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald/60" />
              <div className="ml-4 text-[11px] text-warm-gray font-mono">sophie-and-etienne.com</div>
            </div>
            <div>
              <div className="relative">
                <img src={PHOTOS.weddingHero} alt="" className="w-full aspect-[16/10] object-cover" />
                <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center text-white text-center">
                  <div>
                    <div className="font-serif italic text-3xl">Sophie & Étienne</div>
                    <div className="text-xs uppercase tracking-widest mt-2">June 14, 2024</div>
                  </div>
                </div>
              </div>
              <div className="p-8 text-center">
                <p className="font-serif italic text-2xl text-warm-gray">"The way you held her hand told us everything."</p>
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
        </div>

      </div>
    </AppShell>
  );
}

