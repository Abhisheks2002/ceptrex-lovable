export type Industry = {
  slug: string;
  name: string;
  emoji: string;
  hero: string;
  painPoints: string[];
  solutions: { title: string; desc: string }[];
  caseStudy: { title: string; metric: string; label: string };
  stack: string[];
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    emoji: "🏥",
    hero: "HIPAA-aware AI agents for patient intake, scheduling, and clinical ops.",
    painPoints: ["Front-desk burnout", "30%+ no-show rates", "Manual insurance verification"],
    solutions: [
      { title: "Voice intake agent", desc: "24/7 phone bookings with EHR sync (Epic, Athena, eClinicalWorks)." },
      { title: "WhatsApp reminders", desc: "Multilingual confirmations cut no-shows by 47%." },
      { title: "Insurance bot", desc: "Auto-verify eligibility before the patient walks in." },
    ],
    caseStudy: { title: "Helio Health patient intake", metric: "$1.2M", label: "annual labor savings" },
    stack: ["Vapi", "Twilio", "Epic FHIR", "OpenAI", "Supabase"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    emoji: "🏠",
    hero: "Lead qualifiers, broker assignment and listing automation for agencies.",
    painPoints: ["Slow lead response", "Brokers chasing cold leads", "Manual listing distribution"],
    solutions: [
      { title: "WhatsApp lead qualifier", desc: "Qualifies & assigns to 9+ brokers in <30 seconds." },
      { title: "Listing syndicator", desc: "Auto-publish to Bayut, PropertyFinder, Zillow & social." },
      { title: "AI viewing scheduler", desc: "Calendar-aware bot that books property tours." },
    ],
    caseStudy: { title: "Levant Properties WhatsApp agent", metric: "63%", label: "faster response time" },
    stack: ["Meta Cloud API", "HubSpot", "n8n", "Cal.com", "OpenAI"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    emoji: "🛒",
    hero: "Auto-support, returns, and personalised concierge for Shopify & WooCommerce brands.",
    painPoints: ["80% repetitive support tickets", "Cart abandonment", "Slow returns handling"],
    solutions: [
      { title: "Multi-store support agent", desc: "One agent across 12 Shopify stores, multilingual." },
      { title: "Returns auto-pilot", desc: "RMA, label generation and refund — fully automated." },
      { title: "WhatsApp concierge", desc: "Personalised product recs & order tracking." },
    ],
    caseStudy: { title: "12-store Shopify support agent", metric: "91%", label: "tickets auto-resolved" },
    stack: ["Shopify", "Gorgias", "Klaviyo", "OpenAI", "n8n"],
  },
  {
    slug: "finance",
    name: "Finance",
    emoji: "💸",
    hero: "Document intelligence, KYC, and analyst co-pilots for FinTech and PE.",
    painPoints: ["Manual KYC review", "Slow invoice processing", "Compliance reporting nightmare"],
    solutions: [
      { title: "KYC AI reviewer", desc: "ID + AML + sanctions screening with <2% false-positive rate." },
      { title: "Invoice processor", desc: "95% accurate extraction → ERP, no human in the loop." },
      { title: "Analyst co-pilot", desc: "Earnings call summaries, memo drafts, comp tables in seconds." },
    ],
    caseStudy: { title: "PE-firm analyst co-pilot", metric: "20→0.7", label: "hours per deal memo" },
    stack: ["Anthropic", "Mistral", "Postgres", "n8n", "Snowflake"],
  },
  {
    slug: "saas",
    name: "SaaS",
    emoji: "🚀",
    hero: "Outbound AI SDRs, onboarding agents, and product copilots for B2B SaaS.",
    painPoints: ["SDR ramp = 6 months & $120K", "Activation drop-off", "Churn signals seen too late"],
    solutions: [
      { title: "AI SDR", desc: "Personalised outbound at 10× human capacity with 8%+ reply rates." },
      { title: "Onboarding agent", desc: "In-app coach that adapts to user role & goal." },
      { title: "Churn radar", desc: "Detect at-risk accounts 30 days earlier than today." },
    ],
    caseStudy: { title: "Vantor outbound AI SDR", metric: "+412%", label: "qualified meetings" },
    stack: ["Apollo", "Smartlead", "HubSpot", "OpenAI", "Mixpanel"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    emoji: "📦",
    hero: "Track-and-trace agents, dispatch automation and customer comms for 3PLs.",
    painPoints: ["WISMO tickets clog support", "Manual dispatch", "Carrier exception handling"],
    solutions: [
      { title: "WISMO bot", desc: "Where-is-my-order across all carriers in one chat." },
      { title: "Dispatch optimiser", desc: "AI route planning + driver assignment." },
      { title: "Exception handler", desc: "Auto-detect delays, reroute, and notify customers." },
    ],
    caseStudy: { title: "Mid-mile 3PL ops co-pilot", metric: "47%", label: "fewer WISMO tickets" },
    stack: ["ShipStation", "EasyPost", "n8n", "OpenAI", "Twilio"],
  },
];
