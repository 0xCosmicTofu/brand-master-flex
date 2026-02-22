import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Brand Master Prompt Generator — Lime Studio",
  description:
    "Generate a structured AI system prompt that encodes your brand identity. Free, no signup required. Built by Lime Studio.",
  openGraph: {
    title: "Brand Master Prompt Generator",
    description:
      "Your AI doesn't know your brand. Fix that in 5 minutes. Free tool by Lime Studio.",
    siteName: "Lime Studio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <TooltipProvider>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </TooltipProvider>
      </body>
    </html>
  );
}
