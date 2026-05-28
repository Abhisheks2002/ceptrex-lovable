import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio/$slug")({
  // Portfolio entries redirect to detailed case studies
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/case-studies/$slug", params: { slug: params.slug } });
  },
  component: () => <Link to="/case-studies">View case studies</Link>,
});
