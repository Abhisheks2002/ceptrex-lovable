import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2, suffix: "M+", prefix: "$", label: "Revenue generated for clients" },
  { value: 10000, suffix: "+", label: "Hours automated annually" },
  { value: 180, suffix: "+", label: "AI systems shipped" },
  { value: 95, suffix: "%", label: "Client satisfaction" },
];

function useCount(target: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return n;
}

function StatItem({ s }: { s: typeof stats[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setVisible(true));
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const n = useCount(s.value, visible);
  const display = n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : n.toString();
  return (
    <div ref={ref} className="bg-surface/80 backdrop-blur p-8 text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-gradient">
        {s.prefix}{s.value >= 1000 ? display : n}{s.suffix}
      </div>
      <div className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
    </div>
  );
}

export function StatsBand() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border">
          {stats.map((s) => <StatItem key={s.label} s={s} />)}
        </div>
      </div>
    </section>
  );
}
