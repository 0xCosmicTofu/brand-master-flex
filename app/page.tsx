import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, Zap, Shield, Copy } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F1FFE7] dark:bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#d4f0b0] dark:border-zinc-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#A8E63D] font-bold text-sm tracking-widest uppercase">
              Lime Studio
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-zinc-500">
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#A8E63D]/10 border border-[#A8E63D]/20 rounded-full px-4 py-1.5 text-xs font-medium text-zinc-900 dark:text-[#A8E63D] mb-2">
              <Zap className="h-3 w-3" />
              Free. No account. Email optional on export.
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight tracking-tight">
              Your AI doesn&apos;t know{" "}
              <br className="hidden sm:block" />
              your brand.{" "}
              <span className="text-[#A8E63D]">Fix that in 5 minutes.</span>
            </h1>

            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Not everyone is ready for a full brand sprint. We get it. This
              tool gives you a free, structured system prompt that encodes your
              brand identity into any AI agent. Consistent tone. Consistent
              visuals. No guesswork.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generator">
                <Button className="bg-[#A8E63D] text-black font-semibold hover:bg-[#96d630] px-8 py-6 text-base gap-2 rounded-lg cursor-pointer">
                  Start Building Your Prompt
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-zinc-400 dark:text-zinc-600 max-w-xl mx-auto">
              We built this using the same framework we use at Lime Studio when
              designing brand systems for Web3 and AI companies. Consider it a
              head start.
            </p>
          </div>
        </section>

        {/* Feature strip */}
        <section className="border-t border-[#d4f0b0] dark:border-zinc-900 px-6 py-16">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900/8 dark:bg-[#A8E63D]/10 flex items-center justify-center">
                <Zap className="h-4 w-4 text-zinc-700 dark:text-[#A8E63D]" />
              </div>
              <h3 className="text-zinc-900 dark:text-zinc-100 font-semibold">Instant output</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Your prompt updates live as you type. Copy and paste straight
                into Claude, GPT-4, or any LLM.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900/8 dark:bg-[#A8E63D]/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-zinc-700 dark:text-[#A8E63D]" />
              </div>
              <h3 className="text-zinc-900 dark:text-zinc-100 font-semibold">Brand-safe AI</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Stop getting generic AI content. Define your voice, tone, and
                visual identity once. Enforce it everywhere.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900/8 dark:bg-[#A8E63D]/10 flex items-center justify-center">
                <Copy className="h-4 w-4 text-zinc-700 dark:text-[#A8E63D]" />
              </div>
              <h3 className="text-zinc-900 dark:text-zinc-100 font-semibold">Export anywhere</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Copy to clipboard or download as PDF. Works as a system prompt
                or a Notion doc. Your call.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d4f0b0] dark:border-zinc-900 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-zinc-400 dark:text-zinc-600">
          <span>
            Built by{" "}
            <a
              href="https://limestud.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Lime Studio
            </a>
          </span>
          <Link
            href="/privacy"
            className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
