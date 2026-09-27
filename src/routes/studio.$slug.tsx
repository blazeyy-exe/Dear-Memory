import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { STUDIO, EVENTS, PHOTOS } from "@/lib/mock/data";

export const Route = createFileRoute("/studio/$slug")({
  head: () => ({
    meta: [
      { title: `${STUDIO.name} — DearMemory Studio` },
      { name: "description", content: STUDIO.tagline },
      { property: "og:title", content: STUDIO.name },
      { property: "og:description", content: STUDIO.tagline },
      { property: "og:image", content: PHOTOS.weddingHero },
    ],
  }),
  component: Studio,
});

function Studio() {
  return (
    <div className="bg-background">
      <SiteNav />
      {/* Hero banner */}
      <header className="relative">
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img src={PHOTOS.weddingHero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12 text-white">
            <div className="text-xs font-bold uppercase tracking-widest mb-3 opacity-80">Photography Studio · Lisbon</div>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight max-w-3xl">{STUDIO.name}</h1>
            <p className="font-serif italic text-xl md:text-2xl mt-4 opacity-90">{STUDIO.tagline}</p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {STUDIO.stats.map((s) => (
            <div key={s.label}>
              <div className="font-mono text-emerald text-3xl mb-2">{s.value}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-warm-gray">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl rotate-1">
            <img src={PHOTOS.portfolio1} alt="" className="aspect-[4/5] object-cover w-full" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald mb-3">About the studio</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Stories worth holding onto</h2>
            <p className="text-warm-gray mb-6 leading-relaxed">{STUDIO.about}</p>
            <p className="text-warm-gray leading-relaxed">Founded {STUDIO.founded}. Available worldwide.</p>
          </div>
        </div>
      </section>

      {/* Portfolio showcase */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald mb-3">Featured events</div>
              <h2 className="text-3xl md:text-5xl font-bold">Recent work</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.slice(0, 3).map((e) => (
              <Link to="/event/$slug" params={{ slug: e.slug }} key={e.id} className="group">
                <div className="rounded-[2rem] overflow-hidden mb-4">
                  <img src={e.cover} alt={e.title} className="aspect-[4/5] object-cover w-full group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="font-bold">{e.title}</div>
                <div className="text-sm text-warm-gray">{e.subtitle} · {e.date}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald mb-3">Packages</div>
            <h2 className="text-3xl md:text-5xl font-bold">Choose your day</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {STUDIO.packages.map((p, i) => (
              <div key={p.name} className={`rounded-[2.5rem] p-8 ${i === 1 ? "bg-emerald text-white" : "bg-white ring-1 ring-border"}`}>
                <div className="font-bold text-xl mb-2">{p.name}</div>
                <div className={`text-sm mb-6 ${i === 1 ? "text-white/80" : "text-warm-gray"}`}>{p.description}</div>
                <div className="text-2xl font-bold font-mono">{p.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald mb-3">Kind words</div>
            <h2 className="text-3xl md:text-5xl font-bold">From the people we've photographed</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDIO.reviews.map((r) => (
              <div key={r.name} className="bg-cream rounded-[2rem] p-8">
                <div className="flex gap-0.5 text-amber-500 mb-3">{Array.from({ length: r.rating }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-current" />))}</div>
                <p className="font-serif italic text-lg mb-4">"{r.text}"</p>
                <div className="text-sm font-bold">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / quote */}
      <section className="py-24 bg-emerald-light/40">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald mb-3">Get in touch</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's create something beautiful</h2>
            <p className="text-warm-gray mb-8">Tell us about your event and we'll send a custom quote within 24 hours.</p>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3"><span className="font-bold">Email</span><span className="text-warm-gray">hello@goldenhour.studio</span></div>
              <div className="flex gap-3"><span className="font-bold">WhatsApp</span><span className="text-warm-gray">+351 912 345 678</span></div>
              <div className="flex gap-3"><span className="font-bold">Studio</span><span className="text-warm-gray">Rua das Flores, Lisbon</span></div>
            </div>
          </div>
          <form className="bg-white rounded-[2.5rem] p-8 space-y-4 ring-1 ring-border">
            <div className="grid grid-cols-2 gap-4">
              <input className="w-full bg-cream rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald/30" placeholder="Your name" />
              <input className="w-full bg-cream rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald/30" placeholder="Email" />
            </div>
            <input className="w-full bg-cream rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald/30" placeholder="Event type & date" />
            <textarea rows={4} className="w-full bg-cream rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald/30" placeholder="Tell us a bit about your day…" />
            <button type="button" className="w-full bg-emerald text-white py-4 rounded-full font-bold hover:bg-emerald-deep transition-colors">
              Request Quote
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
