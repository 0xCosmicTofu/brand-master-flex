import Link from "next/link";
import { BrandForm } from "@/components/brand-form";

export const metadata = {
  title: "Generator — Brand Master Prompt",
};

export default function GeneratorPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-900 px-6 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[#A8E63D] font-bold text-sm tracking-widest uppercase group-hover:opacity-80 transition-opacity">
              Lime Studio
            </span>
          </Link>
          <div className="text-xs text-zinc-600 hidden sm:block">
            Brand Master Prompt Generator
          </div>
        </div>
      </header>

      {/* Tool */}
      <main className="flex-1 flex flex-col px-6 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0">
          <div className="mb-6 flex-shrink-0">
            <h1 className="text-xl font-semibold text-zinc-100">
              Build your Master Prompt
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Fill in the sections below. Your prompt generates in real-time on
              the right.
            </p>
          </div>

          <div className="flex-1 min-h-0">
            <BrandForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 px-6 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-700">
          <span>
            Built by{" "}
            <a
              href="https://limestud.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-500 transition-colors"
            >
              Lime Studio
            </a>
          </span>
          <Link href="/privacy" className="hover:text-zinc-500 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
