import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "How fast can you ship a production AI agent?", a: "Most agents go live in 14–28 days. Discovery (3–7 days) → build (2 weeks) → launch + 90 days optimization." },
  { q: "Do you sign NDAs and DPAs?", a: "Yes. Standard MNDA on request before discovery. DPA included with every enterprise engagement; SOC2-friendly subprocessors." },
  { q: "Who owns the IP?", a: "You do. All code, prompts, workflows and data live in your cloud and your repos. We deliver source on day one." },
  { q: "What if it doesn't work?", a: "Every project ships with measurable success criteria agreed before kickoff. If we miss them, we keep building free until we hit them." },
  { q: "Do you provide ongoing support?", a: "90 days of optimization is included on every build. After that, optional retainers from $2,500/mo cover monitoring, tuning and new feature requests." },
  { q: "What does it cost to run?", a: "Most production agents run for $200–$2,000/mo in LLM + infra costs. We size and forecast this in week one so there are no surprises." },
  { q: "Can you integrate with our existing CRM/EHR/stack?", a: "Almost certainly. We've integrated 200+ systems including Salesforce, HubSpot, NetSuite, Epic, Athena, custom internal APIs. If it has an API or a UI, we can wire it." },
  { q: "Do you work outside business hours?", a: "Our team spans Stockholm, Dubai and New York — covering 18 working hours/day. Enterprise retainers include 24/7 PagerDuty." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-14">
          <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-3">// FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Questions, <span className="text-gradient">answered</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <div key={f.q} className="rounded-2xl border border-border bg-surface/60 backdrop-blur overflow-hidden">
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-surface-elevated/50 transition-colors"
                >
                  <span className="font-display text-lg font-semibold">{f.q}</span>
                  {active ? <Minus className="h-4 w-4 text-cyan shrink-0" /> : <Plus className="h-4 w-4 text-muted-foreground shrink-0" />}
                </button>
                {active && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
