import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import Cal from "@calcom/embed-react";

type Props = {
  calLink?: string;
  className?: string;
};

/**
 * Embedded Cal.com scheduler — themed for the Ceptrex dark glassmorphism UI.
 * Lazy by default; no API key required for the inline embed.
 */
export function CalBooking({ calLink = "ceptrex/30min", className = "" }: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "ceptrex-booking" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#6C63FF",
          },
          dark: {
            "cal-brand": "#6C63FF",
            "cal-bg": "#0A0A0F",
            "cal-bg-emphasis": "#16161F",
            "cal-text": "#F5F5F7",
            "cal-text-emphasis": "#FFFFFF",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-border bg-background/40 backdrop-blur ${className}`}
      style={{ minHeight: 640 }}
    >
      <Cal
        namespace="ceptrex-booking"
        calLink={calLink}
        style={{ width: "100%", height: "100%", minHeight: 640, overflow: "auto" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
