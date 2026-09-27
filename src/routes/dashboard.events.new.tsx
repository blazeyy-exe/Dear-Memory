import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { EVENT_TYPES, TEMPLATES } from "@/lib/mock/data";
import { useState } from "react";
import { ArrowLeft, ArrowRight, PartyPopper, Upload } from "lucide-react";

export const Route = createFileRoute("/dashboard/events/new")({
  head: () => ({ meta: [{ title: "New event — DearMemory" }] }),
  component: NewEvent,
});

const STEPS = ["Event type", "Template", "Upload photos", "Customize", "Publish"];

function NewEvent() {
  const [step, setStep] = useState(0);

  return (
    <AppShell title="Create a new event" subtitle="Five gentle steps and you're ready to share.">
      {/* Step rail */}
      <div className="mb-8 bg-white rounded-[2rem] p-6 ring-1 ring-border">
        <div className="flex items-center gap-2 md:gap-4">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none last:w-auto">
              <button
                onClick={() => setStep(i)}
                className={`shrink-0 w-9 h-9 rounded-full grid place-items-center text-sm font-bold transition-colors ${
                  i <= step ? "bg-emerald text-white" : "bg-cream text-warm-gray"
                }`}
              >
                {i + 1}
              </button>
              <div className={`hidden md:block ml-3 text-sm font-semibold ${i === step ? "text-foreground" : "text-warm-gray"}`}>{s}</div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-3 rounded-full ${i < step ? "bg-emerald" : "bg-border"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 ring-1 ring-border min-h-[480px]">
        {step === 0 && (
          <>
            <h2 className="text-2xl font-bold mb-2">What kind of event is this?</h2>
            <p className="text-warm-gray mb-8">Pick a category — we'll tune templates and defaults to fit.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {EVENT_TYPES.map((t) => (
                <button key={t.type} className={`${t.color} rounded-3xl p-6 text-left hover:-translate-y-1 transition-transform`}>
                  <t.icon className="w-7 h-7 mb-3 text-foreground/75" />
                  <div className="font-bold">{t.type}</div>
                  <div className="text-xs text-warm-gray mt-1">{t.description}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Pick a template</h2>
            <p className="text-warm-gray mb-8">Tap any template to preview it. You can always change it later.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TEMPLATES.slice(0, 8).map((t) => (
                <div key={t.id} className="group cursor-pointer">
                  <div className="rounded-2xl overflow-hidden ring-1 ring-border mb-2">
                    <img src={t.cover} alt={t.name} className="aspect-[4/5] w-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-warm-gray">{t.category}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Upload your photos</h2>
            <p className="text-warm-gray mb-8">Drag a folder here or click to browse. RAW and JPEG welcome.</p>
            <div className="border-2 border-dashed border-emerald/30 bg-emerald-light/30 rounded-[2rem] p-16 text-center">
              <div className="w-16 h-16 rounded-full bg-white grid place-items-center text-emerald mx-auto mb-4 shadow-sm"><Upload className="w-6 h-6" /></div>
              <div className="font-bold mb-2">Drop photos here</div>
              <div className="text-sm text-warm-gray mb-6">or click to browse</div>
              <button className="bg-emerald text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-deep">Choose files</button>
            </div>
            <div className="grid grid-cols-6 gap-2 mt-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-cream rounded-xl" />
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Make it yours</h2>
            <p className="text-warm-gray mb-8">Colors, fonts, layout — fine-tune the feel.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Field label="Event title" value="The Laurent Wedding" />
                <Field label="Subtitle" value="Sophie & Étienne" />
                <Field label="Custom domain" value="sophie-and-etienne.com" />
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-warm-gray block mb-2">Palette</label>
                  <div className="flex gap-2">
                    {["#4a7c6a", "#e1f0f7", "#e6e1f2", "#f5e6e0", "#2d2a29"].map((c) => (
                      <button key={c} className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-emerald" style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-cream rounded-[1.5rem] aspect-square grid place-items-center text-xs text-warm-gray">
                Live preview
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-emerald-light grid place-items-center text-emerald-deep mx-auto mb-6"><PartyPopper className="w-9 h-9" /></div>
            <h2 className="text-3xl font-bold mb-3">Ready to publish</h2>
            <p className="text-warm-gray max-w-md mx-auto mb-8">Your event website is one click away. You can keep editing afterward — nothing is permanent.</p>
            <button className="bg-emerald text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-deep">Publish event</button>
          </div>
        )}

        <div className="flex justify-between mt-12 pt-6 border-t border-border">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full text-sm font-semibold text-warm-gray disabled:opacity-40 hover:bg-cream"><ArrowLeft className="w-4 h-4" /> Back</button>
          {step < STEPS.length - 1 && (
            <button onClick={() => setStep(step + 1)} className="inline-flex items-center gap-1 bg-emerald text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-deep">Continue <ArrowRight className="w-4 h-4" /></button>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-warm-gray block mb-2">{label}</label>
      <input defaultValue={value} className="w-full bg-cream rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald/30" />
    </div>
  );
}
