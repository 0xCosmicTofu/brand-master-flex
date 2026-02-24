import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Brand Instructions Generator — LIME STUDIØ",
  description:
    "Create a set of instructions that teaches your AI how to write and design like your brand. Free, no signup required. Built by LIME STUDIØ.",
  openGraph: {
    title: "Brand Instructions Generator",
    description:
      "Your AI doesn't know your brand. Fix that in 5 minutes. Free tool by LIME STUDIØ.",
    siteName: "LIME STUDIØ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TooltipProvider>
            {children}
            <Toaster position="bottom-right" mobileOffset={{ bottom: 72 }} />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
