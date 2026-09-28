import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { MotionConfig, motion } from "framer-motion";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PHOTOS, TEMPLATES, TESTIMONIALS, EVENT_TYPES } from "@/lib/mock/data";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { HeroScene, HeroLayer, HeroHeadline, HeroWord } from "@/components/motion/Hero";
import { EASE, VIEWPORT } from "@/components/motion/tokens";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DearMemory — Beautiful Event Websites for Photography Studios" },
      { name: "description", content: "Turn galleries into memorable digital experiences. Premium event websites, studio portfolios, and storytelling for photographers." },
      { property: "og:title", content: "DearMemory — Beautiful Event Websites" },
      { property: "og:description", content: "Turn galleries into memorable digital experiences. Premium event websites for photographers." },
      { property: "og:image", content: PHOTOS.weddingHero },
      { name: "twitter:image", content: PHOTOS.weddingHero },
    ],
  }),
  component: Landing,
});

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/40 focus-visible:ring-offset-2";

function Landing() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="bg-background font-display text-foreground">
      <SiteNav />

      {/* Hero — one choreographed scene (~1.5s): atmosphere > cards > headline > copy > CTAs */}
      <HeroScene className="relative pt-6 md:pt-10 pb-32 overflow-hidden">
        {/* Atmosphere: a soft wash from the existing emerald-light token; slowest layer */}
        <HeroLayer enter={false} depth={60} className="absolute inset-x-0 top-0 h-3/5 pointer-events-none">
          <motion.div
            className="h-full bg-gradient-to-b from-emerald-light/50 to-transparent"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </HeroLayer>

        <HeroLayer enter={false} depth={16} className="container mx-auto px-6 text-center relative z-10">
          <HeroHeadline className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance mb-6 max-w-4xl mx-auto leading-[1.05]">
            <HeroWord>Create</HeroWord>{" "}<HeroWord>Stunning</HeroWord>{" "}<HeroWord>Event</HeroWord>{" "}<HeroWord>Websites</HeroWord>{" "}
            <br className="hidden md:block" />
            <HeroWord>That</HeroWord>{" "}<HeroWord>People</HeroWord>{" "}
            <HeroWord className="text-emerald italic font-serif font-normal">Never</HeroWord>{" "}
            <HeroWord className="text-emerald italic font-serif font-normal">Forget</HeroWord>
          </HeroHeadline>
          <Reveal immediate delay={0.65} y={16}>
            <p className="max-w-xl mx-auto text-lg text-warm-gray mb-10">
              Transform your photo galleries into emotional digital experiences. Designed for studios who value the art of the memory.
            </p>
          </Reveal>
          <Reveal immediate delay={0.8} y={16}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/dashboard"
                className={`bg-emerald text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-emerald/15 hover:bg-emerald-deep transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${focusRing}`}
              >
                Start Creating
              </Link>
              <button className={`bg-white border border-border px-8 py-4 rounded-full font-bold hover:bg-cream transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${focusRing}`}>
                Watch Demo
              </button>
            </div>
          </Reveal>
        </HeroLayer>

        {/* Layered collage: three depth layers, each its own object */}
        <div className="mt-16 relative h-[420px] md:h-[600px]">
          <HeroLayer
            className="absolute left-[4%] md:left-[10%] top-10 w-56 md:w-72"
            rotate={-5} delay={0.3} depth={-50} tilt={{ r: 2.5, x: 10, y: 6 }} blur
          >
            <div className="shadow-2xl ring-8 ring-white rounded-[2rem] overflow-hidden">
              <img src={PHOTOS.weddingCouple} alt="Wedding archive preview" className="aspect-[4/5] object-cover w-full" loading="eager" />
            </div>
          </HeroLayer>
          <HeroLayer
            className="absolute right-[4%] md:right-[10%] top-0 w-52 md:w-72 hidden sm:block"
            rotate={4} delay={0.4} depth={-70} tilt={{ r: 3, x: 12, y: 8 }} blur
          >
            <div className="shadow-2xl ring-8 ring-white rounded-[2rem] overflow-hidden">
              <img src={PHOTOS.graduationGroup} alt="Graduation gallery preview" className="aspect-[4/5] object-cover w-full" />
            </div>
          </HeroLayer>
          <HeroLayer
            className="absolute inset-x-0 mx-auto top-16 md:top-20 w-[92%] md:w-[640px] z-20"
            delay={0.5} depth={-20} tilt={{ r: 0.6, x: 5, y: 3 }}
          >
            <div className="shadow-2xl ring-[10px] md:ring-[12px] ring-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
              <BrowserMockup />
            </div>
          </HeroLayer>
        </div>
      </HeroScene>

      {/* Social proof — intentionally static */}
      <section className="py-12 border-y border-border bg-white/60">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: "1,200+", l: "Studios" },
              { v: "45,000", l: "Events published" },
              { v: "12M+", l: "Photos delivered" },
              { v: "2.3M", l: "Memories preserved" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-mono text-emerald text-2xl mb-2">{s.v}</div>
                <div className="text-xs uppercase tracking-widest font-bold text-warm-gray">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — bento */}
      <section id="features" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <RevealGroup className="text-center mb-16">
            <RevealItem><h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Everything for the modern studio</h2></RevealItem>
            <RevealItem><p className="text-warm-gray max-w-lg mx-auto">Tools built to honor the craft of photography — not bury it in software.</p></RevealItem>
          </RevealGroup>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[240px]" stagger={0.09}>
            {/* AI Search */}
            <RevealItem className="md:col-span-2 bg-emerald-light rounded-[2.5rem] p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-emerald mb-3">Intelligent search</div>
                <h3 className="text-2xl font-bold mb-2">Find yourself in seconds</h3>
                <p className="text-sm text-emerald-deep/70 max-w-sm">AI facial recognition and semantic search. Guests stop scrolling — they discover.</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-black/5 flex items-center gap-3 max-w-md">
                <div className="w-8 h-8 rounded-full bg-emerald/20 grid place-items-center text-emerald font-bold text-xs">AI</div>
                <div className="text-sm text-warm-gray">find photos of the bride dancing…</div>
              </div>
            </RevealItem>
            {/* QR */}
            <RevealItem className="bg-sky rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-white rounded-3xl mb-6 shadow-md grid place-items-center ring-1 ring-black/5">
                <QRGlyph />
              </div>
              <h3 className="text-xl font-bold">Instant QR Sharing</h3>
              <p className="text-xs text-warm-gray mt-2">One scan, the gallery opens.</p>
            </RevealItem>
            {/* Guestbooks */}
            <RevealItem className="bg-lavender rounded-[2.5rem] p-8">
              <h3 className="text-xl font-bold mb-2">Digital Guestbooks</h3>
              <p className="text-sm text-warm-gray">Collect heartfelt messages alongside the photos.</p>
              <RevealGroup className="mt-6 space-y-2" stagger={0.14} delay={0.35}>
                <div>
                  <RevealItem y={12} className="bg-white/70 p-3 rounded-xl text-[11px] shadow-sm">"Best wedding ever"</RevealItem>
                </div>
                <div className="translate-x-4">
                  <RevealItem y={12} className="bg-white/70 p-3 rounded-xl text-[11px] shadow-sm">"Beautiful photos, thank you!"</RevealItem>
                </div>
                <div className="translate-x-2">
                  <RevealItem y={12} className="bg-white/70 p-3 rounded-xl text-[11px] shadow-sm">"We'll never forget this night."</RevealItem>
                </div>
              </RevealGroup>
            </RevealItem>
            {/* Analytics */}
            <RevealItem className="md:col-span-2 bg-cream rounded-[2.5rem] p-8 ring-1 ring-border">
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-warm-gray mb-3">Studio analytics</div>
                  <h3 className="text-2xl font-bold mb-2">See what guests love most</h3>
                  <p className="text-sm text-warm-gray max-w-sm">Track views, favorites, and downloads. Turn engagement into new bookings.</p>
                </div>
                <div className="w-full md:w-72 h-32 bg-white rounded-2xl p-4 flex items-end gap-1.5 ring-1 ring-border">
                  {[40, 60, 90, 50, 70, 85, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 ${i === 6 ? "bg-emerald" : "bg-emerald/25"} rounded-t-md`}
                      style={{ height: `${h}%`, originY: 1 }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.06, ease: EASE }}
                    />
                  ))}
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Zigzag showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 space-y-28">
          <ZigzagRow
            tag="Weddings"
            tagColor="bg-emerald-light text-emerald"
            title="A digital heirloom for the modern couple"
            body="Our wedding websites are more than galleries. They are living archives of one of life's most beautiful chapters."
            bullets={["Elegant editorial typography", "Password-protected galleries", "Direct high-res downloads"]}
            image={PHOTOS.weddingDetails}
            tilt={2}
            variant="wipe"
          />
          <ZigzagRow
            reverse
            tag="Concerts & Festivals"
            tagColor="bg-lavender text-foreground"
            title="Energy captured, shared instantly"
            body="High-energy event photography becomes interactive portfolios fans explore while the music is still ringing."
            bullets={["Live publishing during the event", "Fan-favoriting & social sharing", "Tens of thousands of photos, zero friction"]}
            image={PHOTOS.concertCrowd}
            tilt={-2}
            variant="slow"
            quote={{ text: "DearMemory changed how we handle festival delivery. 10,000 photos, zero friction.", studio: "Noise & Light Studio" }}
          />
          <ZigzagRow
            tag="Graduations"
            tagColor="bg-sky text-foreground"
            title="A milestone every family can keep"
            body="Beautiful class galleries with face-find search so every family lands on their student in one tap."
            bullets={["Smart class & section grouping", "Print store ready", "Trusted by 200+ schools"]}
            image={PHOTOS.graduation}
            tilt={1}
            variant="soft"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <RevealGroup className="text-center mb-16">
            <RevealItem><div className="text-xs font-bold uppercase tracking-widest text-emerald mb-3">How it works</div></RevealItem>
            <RevealItem><h2 className="text-3xl md:text-5xl font-bold tracking-tight">From event to experience in minutes</h2></RevealItem>
          </RevealGroup>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-5 gap-6" stagger={0.07}>
            {[
              { n: "01", t: "Create Event", d: "Pick an event type — wedding, concert, anything." },
              { n: "02", t: "Choose Template", d: "Visual gallery of award-level themes." },
              { n: "03", t: "Upload Photos", d: "Drag, drop, done. We handle the rest." },
              { n: "04", t: "Customize", d: "Colors, fonts, animations — all yours." },
              { n: "05", t: "Publish", d: "Instant website, custom domain ready." },
            ].map((s) => (
              <RevealItem key={s.n}>
                <div className="h-full bg-white rounded-[2rem] p-6 ring-1 ring-border hover:-translate-y-1 transition-transform">
                  <div className="font-mono text-emerald text-sm mb-4">{s.n}</div>
                  <div className="font-bold mb-2">{s.t}</div>
                  <div className="text-sm text-warm-gray">{s.d}</div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Event types */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <RevealGroup className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" stagger={0.1}>
            <RevealItem>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald mb-3">Every kind of event</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-lg">From intimate to unforgettable</h2>
            </RevealItem>
            <RevealItem>
              <Link to="/templates" className={`group inline-flex items-center gap-1 text-sm font-semibold text-emerald hover:underline ${focusRing}`}>
                Browse all templates <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </RevealItem>
          </RevealGroup>
          <RevealGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" stagger={0.05}>
            {EVENT_TYPES.map((t) => (
              <RevealItem key={t.type} y={16}>
                <div
                  className={`group relative flex min-h-[176px] cursor-pointer flex-col justify-between gap-5 overflow-hidden rounded-[2rem] p-5 shadow-[0_8px_24px_rgba(45,42,41,0.05)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(45,42,41,0.13)] sm:p-6 lg:aspect-square lg:min-h-0 ${t.color}`}
                >
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[1.25rem] bg-white/80 shadow-[0_6px_16px_rgba(45,42,41,0.08)] ring-1 ring-white/80 backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <t.icon className="h-9 w-9 text-emerald-deep" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold tracking-tight">{t.type}</div>
                    <div className="mt-1 text-[11px] leading-snug text-warm-gray transition-colors group-hover:text-foreground/70">
                      {t.description}
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Template strip */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <RevealGroup className="text-center mb-12">
            <RevealItem><h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Templates that feel like memories</h2></RevealItem>
            <RevealItem><p className="text-warm-gray">Each one designed with the emotion of the event in mind.</p></RevealItem>
          </RevealGroup>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.09}>
            {TEMPLATES.slice(0, 4).map((t) => (
              <RevealItem key={t.id} y={28}>
                <div className="group bg-white rounded-[2rem] overflow-hidden ring-1 ring-border hover:-translate-y-1 transition-transform">
                  <div className="overflow-hidden">
                    <img src={t.cover} alt={t.name} className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.category}</div>
                    <div className="font-bold">{t.name}</div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <RevealGroup className="text-center mb-12">
            <RevealItem><div className="text-xs font-bold uppercase tracking-widest text-emerald mb-3">Loved by studios</div></RevealItem>
            <RevealItem><h2 className="text-3xl md:text-5xl font-bold tracking-tight">More bookings. Better client experiences.</h2></RevealItem>
          </RevealGroup>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
            {TESTIMONIALS.map((t) => (
              <RevealItem key={t.studio} className="bg-cream rounded-[2rem] p-8 flex flex-col justify-between">
                <p className="text-lg leading-relaxed font-serif italic">"{t.text}"</p>
                <div className="mt-8">
                  <div className="font-bold">{t.studio}</div>
                  <div className="text-xs text-warm-gray">{t.name} · {t.city}</div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-24 bg-emerald-light/40">
        <div className="container mx-auto px-6 text-center">
          <RevealGroup>
            <RevealItem><h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Simple, studio-friendly pricing</h2></RevealItem>
            <RevealItem><p className="text-warm-gray max-w-md mx-auto mb-12">Start free. Upgrade when your clients fall in love with their galleries.</p></RevealItem>
          </RevealGroup>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6" stagger={0.12} delay={0.15}>
            <RevealItem y={28} className="bg-white p-10 rounded-[2.5rem] shadow-sm text-left ring-1 ring-border">
              <div className="text-sm font-bold uppercase tracking-widest text-warm-gray mb-2">The Creative</div>
              <div className="text-5xl font-bold mb-4">$29<span className="text-base font-normal text-warm-gray">/mo</span></div>
              <p className="text-sm text-warm-gray mb-8">Perfect for independent photographers and small studios.</p>
              <Link to="/pricing" className={`block w-full text-center py-4 rounded-full border-2 border-emerald text-emerald font-bold hover:bg-emerald/5 transition-all active:scale-[0.98] ${focusRing}`}>
                Start Trial
              </Link>
            </RevealItem>
            <RevealItem y={28} className="bg-emerald p-10 rounded-[2.5rem] shadow-xl text-left text-white">
              <div className="text-sm font-bold uppercase tracking-widest text-white/60 mb-2">The Agency</div>
              <div className="text-5xl font-bold mb-4">$89<span className="text-base font-normal text-white/60">/mo</span></div>
              <p className="text-sm text-white/80 mb-8">For high-volume studios and event production teams.</p>
              <Link to="/pricing" className={`block w-full text-center py-4 rounded-full bg-white text-emerald font-bold hover:bg-cream transition-all active:scale-[0.98] ${focusRing}`}>
                See full pricing
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <SiteFooter />
    </div>
    </MotionConfig>
  );
}

function ZigzagRow({
  tag, tagColor, title, body, bullets, image, tilt, variant, reverse, quote,
}: {
  tag: string; tagColor: string; title: string; body: string; bullets: string[];
  image: string; tilt: number; variant: "wipe" | "slow" | "soft"; reverse?: boolean;
  quote?: { text: string; studio: string };
}) {
  return (
    <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-16`}>
      <RevealGroup className="flex-1" stagger={0.09}>
        <RevealItem><div className={`inline-block px-3 py-1 rounded-full ${tagColor} text-[10px] font-bold uppercase tracking-widest mb-4`}>{tag}</div></RevealItem>
        <RevealItem><h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-lg">{title}</h2></RevealItem>
        <RevealItem><p className="text-warm-gray mb-8 max-w-md">{body}</p></RevealItem>
        <RevealItem>
          <ul className="space-y-3 text-sm font-medium mb-6">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald/10 flex items-center justify-center text-emerald"><Check className="w-3 h-3" strokeWidth={3} /></div>
                {b}
              </li>
            ))}
          </ul>
        </RevealItem>
        {quote && (
          <RevealItem>
            <div className="bg-cream p-5 rounded-3xl border border-border max-w-md">
              <p className="text-sm italic text-warm-gray mb-3">"{quote.text}"</p>
              <div className="text-xs font-bold">{quote.studio}</div>
            </div>
          </RevealItem>
        )}
      </RevealGroup>
      <div className="flex-1 w-full">
        <ImageReveal
          src={image}
          alt={title}
          tilt={tilt}
          variant={variant}
          from={reverse ? "left" : "right"}
          className="rounded-[2.5rem] shadow-2xl"
        />
      </div>
    </div>
  );
}

function MockupTile({ src, i, className = "" }: { src: string; i: number; className?: string }) {
  return (
    <motion.img
      src={src}
      alt=""
      className={`aspect-square object-cover ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.95 + i * 0.05, ease: EASE }}
    />
  );
}

function BrowserMockup() {
  return (
    <div className="bg-white">
      <div className="bg-cream px-4 py-3 flex items-center gap-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald/60" />
        <div className="ml-4 text-[11px] text-warm-gray font-mono">goldenhour.dearmemory.com</div>
      </div>
      <div className="grid grid-cols-3 gap-1 p-1 bg-white">
        <MockupTile i={0} src={PHOTOS.weddingHero} />
        <MockupTile i={1} src={PHOTOS.weddingFlowers} className="row-span-2 h-full" />
        <MockupTile i={2} src={PHOTOS.weddingDetails} />
        <MockupTile i={3} src={PHOTOS.weddingDance} />
        <MockupTile i={4} src={PHOTOS.weddingCouple} />
      </div>
    </div>
  );
}

function QRGlyph() {
  return (
    <div className="grid grid-cols-5 gap-0.5 w-14 h-14">
      {Array.from({ length: 25 }).map((_, i) => {
        const filled = [0, 1, 2, 5, 7, 10, 11, 13, 16, 18, 20, 22, 23, 24, 4, 8, 14].includes(i);
        return <div key={i} className={`rounded-[2px] ${filled ? "bg-foreground" : "bg-transparent"}`} />;
      })}
    </div>
  );
}