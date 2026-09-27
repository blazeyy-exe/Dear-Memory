import { createFileRoute } from "@tanstack/react-router";
import { GripVertical } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { STUDIO, PHOTOS } from "@/lib/mock/data";

export const Route = createFileRoute("/dashboard/portfolio")({
  head: () => ({ meta: [{ title: "Studio Portfolio — DearMemory" }] }),
  component: Portfolio,
});

const SECTIONS = ["Hero banner", "About", "Our story", "Meet the team", "Portfolio showcase", "Featured events", "Packages", "Reviews", "Awards", "Contact"];

function Portfolio() {
  return (
    <AppShell
      title="Studio Portfolio"
      subtitle="goldenhour.dearmemory.com"
      action={
        <div className="flex gap-2">
          <a href={`/studio/${STUDIO.slug}`} className="bg-white ring-1 ring-border px-4 py-2 rounded-full text-sm font-semibold">View public</a>
          <button className="bg-emerald text-white px-5 py-2 rounded-full text-sm font-semibold">Save changes</button>
        </div>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3 bg-white rounded-[1.5rem] ring-1 ring-border p-5 h-fit">
          <div className="font-bold text-sm mb-3">Sections</div>
          <div className="space-y-1 text-sm">
            {SECTIONS.map((s, i) => (
              <div key={s} className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer ${i === 0 ? "bg-emerald-light text-emerald-deep font-semibold" : "hover:bg-cream"}`}>
                <GripVertical className="w-3.5 h-3.5 shrink-0 text-warm-gray" />
                {s}
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-sm font-semibold py-2 rounded-xl border border-dashed border-warm-gray/30 text-warm-gray hover:bg-cream">+ Add section</button>
        </aside>

        <div className="col-span-12 lg:col-span-9 bg-cream rounded-[1.5rem] p-6">
          <div className="bg-white rounded-[1.5rem] overflow-hidden shadow ring-1 ring-border">
            <div className="relative aspect-[16/8]">
              <img src={PHOTOS.weddingHero} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute inset-0 flex items-end p-8 text-white">
                <div>
                  <h2 className="text-3xl font-bold">{STUDIO.name}</h2>
                  <p className="font-serif italic text-lg opacity-90">{STUDIO.tagline}</p>
                </div>
              </div>
            </div>
            <div className="p-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center border-b border-border">
              {STUDIO.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-emerald text-xl">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-warm-gray mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="p-8">
              <div className="text-sm font-bold uppercase tracking-widest text-emerald mb-3">About</div>
              <p className="text-warm-gray">{STUDIO.about}</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
