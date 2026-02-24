import Link from "next/link";
import { BrandForm } from "@/components/brand-form";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Generator — Brand Instructions",
};

export default function GeneratorPage() {
  return (
    <div className="min-h-screen bg-[#F1FFE7] dark:bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#d4f0b0] dark:border-zinc-900 px-6 py-4 sticky top-0 z-10 bg-[#F1FFE7] dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[#A8E63D] font-bold text-sm tracking-widest uppercase group-hover:opacity-80 transition-opacity">
              LIME STUDIØ
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Brand Instructions Generator
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Tool */}
      <main className="flex-1 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Build your Brand Instructions
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Fill in the sections below. Your instructions generate in
              real-time on the right.
            </p>
          </div>

          <BrandForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d4f0b0] dark:border-zinc-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            Built by{" "}
            <a
              href="https://limestud.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
            >
              LIME STUDIØ
            </a>
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/instructions"
              className="text-[#1A1B41] dark:text-[#A8E63D] hover:opacity-70 transition-opacity"
            >
              Instructions
            </Link>
            <Link
              href="/privacy"
              className="text-[#1A1B41] dark:text-[#A8E63D] hover:opacity-70 transition-opacity"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
