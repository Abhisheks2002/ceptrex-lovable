import { Clock, TrendingDown, Users, DollarSign } from "lucide-react";

const problems = [
  { icon: Clock, title: "Hours lost to busywork", desc: "Your team spends 60%+ of the day on tasks an AI agent could finish in seconds." },
  { icon: TrendingDown, title: "Leads dying in inbox", desc: "Slow follow-up murders pipeline. By hour 2, your conversion rate has halved." },
  { icon: Users, title: "Scaling = hiring = pain", desc: "Headcount is the most expensive way to grow. Every new hire is 6 months to ramp." },
  { icon: DollarSign, title: "Margin gets squeezed", desc: "Manual ops cap your margin. Competitors with AI run lean and outprice you." },
];

export function ProblemSection() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-3">// The problem</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Manual work is <span className="text-gradient">silently bleeding</span> your business
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-6 hover:border-destructive/40 transition-colors">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 border border-destructive/30 mb-4">
                <p.icon className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
