const groups = [
  { label: "Models", items: ["GPT-4o", "Claude 3.5", "Gemini 2.0", "Llama 3.1", "Mistral", "o1"] },
  { label: "Orchestration", items: ["LangGraph", "LangChain", "n8n", "Make.com", "Inngest", "Temporal"] },
  { label: "Data", items: ["Supabase", "Postgres", "Pinecone", "Weaviate", "Snowflake", "BigQuery"] },
  { label: "Voice & Chat", items: ["Vapi", "Retell", "ElevenLabs", "Deepgram", "WhatsApp Cloud", "Twilio"] },
  { label: "CRM & Ops", items: ["HubSpot", "Salesforce", "Apollo", "Clay", "Smartlead", "Slack"] },
];

export function TechCloud() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-3">// Stack</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Battle-tested across the <span className="text-gradient">entire AI stack</span>
          </h2>
        </div>
        <div className="space-y-5">
          {groups.map((g) => (
            <div key={g.label} className="flex flex-wrap items-center gap-3">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground w-28 shrink-0">{g.label}</div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <span key={i} className="px-3.5 py-1.5 rounded-full text-sm border border-border bg-surface/60 hover:border-primary/50 hover:text-foreground text-foreground/80 transition-colors">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
