import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Search, Star, Wallet } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DISCOVER_PROFILES } from "@/lib/mock/data";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover Studios — DearMemory" },
      { name: "description", content: "Discover photography studios and freelancers by location, style, and budget." },
    ],
  }),
  component: DiscoverPage,
});

function parseBudgetValue(label: string) {
  const digits = label.replace(/[^\d]/g, "");
  if (!digits) return 0;
  return Number(digits);
}

function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [budget, setBudget] = useState("Any budget");

  const locationOptions = ["All locations", ...new Set(DISCOVER_PROFILES.map((profile) => profile.location))];
  const budgetOptions = ["Any budget", "Under $2k", "$2k - $4k", "$4k - $8k", "$8k+"];

  const filteredProfiles = useMemo(() => {
    return DISCOVER_PROFILES.filter((profile) => {
      const matchesSearch =
        !search ||
        [profile.name, profile.role, profile.specialty, profile.location, profile.description]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesLocation = location === "All locations" || profile.location === location;

      const matchesBudget = (() => {
        if (budget === "Any budget") return true;

        const value = parseBudgetValue(profile.budget);

        if (budget === "Under $2k") return value < 2000;
        if (budget === "$2k - $4k") return value >= 2000 && value <= 4000;
        if (budget === "$4k - $8k") return value > 4000 && value <= 8000;
        if (budget === "$8k+") return value > 8000;

        return true;
      })();

      return matchesSearch && matchesLocation && matchesBudget;
    });
  }, [budget, location, search]);

  return (
    <div className="bg-background font-display text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-light px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald">
            Discover
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Find your next photography partner</h1>
          <p className="mt-4 text-lg text-warm-gray">
            Search vetted studios and freelancers by location, budget, and experience.
          </p>
        </div>

        <div className="mb-10 grid gap-4 rounded-[2rem] bg-cream p-4 ring-1 ring-border md:grid-cols-[1.5fr_1fr_1fr]">
          <label className="flex items-center gap-3 rounded-full border border-border bg-white px-4 py-3 text-sm text-warm-gray shadow-sm">
            <Search className="w-4 h-4 shrink-0 text-emerald" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, style, or city"
              className="w-full bg-transparent outline-none placeholder:text-warm-gray/70"
            />
          </label>

          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="rounded-full border border-border bg-white px-4 py-3 text-sm text-warm-gray shadow-sm outline-none"
          >
            {locationOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="rounded-full border border-border bg-white px-4 py-3 text-sm text-warm-gray shadow-sm outline-none"
          >
            {budgetOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="text-sm text-warm-gray">{filteredProfiles.length} profile{filteredProfiles.length === 1 ? "" : "s"} found</div>
          <Link to="/" className="text-sm font-semibold text-emerald hover:text-emerald-deep">
            Back home
          </Link>
        </div>

        {filteredProfiles.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-border bg-cream p-10 text-center text-warm-gray">
            No profiles match the current search. Try another location or budget range.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <article key={profile.id} className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_20px_50px_rgba(45,42,41,0.04)] transition-transform hover:-translate-y-1">
                <img src={profile.image} alt={profile.name} className="h-60 w-full object-cover" />
                <div className="space-y-5 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">{profile.name}</h2>
                    </div>
                    <span className="rounded-full bg-emerald-light px-2.5 py-1 text-xs font-bold text-emerald">
                      {profile.yearsExperience}+ yrs
                    </span>
                  </div>

                  <div className="text-sm text-warm-gray">{profile.role}</div>

                  <div className="flex flex-wrap gap-2 text-xs text-warm-gray">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1"><Wallet className="w-3.5 h-3.5" /> {profile.budget}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1"><Star className="w-3.5 h-3.5" /> {profile.rating} ({profile.reviewCount})</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profile.services.map((service) => (
                      <span key={service} className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-foreground">
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="text-warm-gray">{profile.availability}</span>
                    <Link
                      to="/studio/$slug"
                      params={{ slug: profile.slug }}
                      className="inline-flex items-center gap-1 font-semibold text-emerald hover:text-emerald-deep"
                    >
                      View profile <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
