import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Instructions — Brand Instructions",
};

export default function InstructionsPage() {
  return (
    <div className="min-h-screen bg-[#F1FFE7] dark:bg-[#0a0a0a] flex flex-col">
      <header className="border-b border-[#d4f0b0] dark:border-zinc-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-[#A8E63D] font-bold text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
          >
            LIME STUDIØ
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/generator">
              <Button className="bg-[#A8E63D] text-black font-semibold hover:bg-[#96d630] gap-1.5 h-8 px-4 text-sm cursor-pointer">
                Build Your Instructions
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              How to Use Your Brand Instructions
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-600">
              Upload the PDF to your AI agent so it writes and designs on-brand, every time.
            </p>
          </div>

          <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-zinc-800 dark:text-zinc-200 font-semibold text-base">
                Quick start
              </h2>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Export your brand instructions as a PDF from the generator.</li>
                <li>Open your AI tool of choice (see below).</li>
                <li>Upload or paste the PDF into the agent&apos;s memory / knowledge base.</li>
                <li>Start prompting — your AI now knows your brand.</li>
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className="text-zinc-800 dark:text-zinc-200 font-semibold text-base">
                Upload instructions by platform
              </h2>

              <ul className="space-y-4 ml-2">
                <li>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">ChatGPT (OpenAI)</span>
                  <p className="mt-1">
                    Go to <span className="font-medium text-zinc-800 dark:text-zinc-200">Settings → Personalization → Memory</span> or create a custom GPT and upload the PDF as a knowledge file.
                  </p>
                </li>
                <li>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">Claude (Anthropic)</span>
                  <p className="mt-1">
                    Open a new conversation, click the attachment icon, and upload the PDF directly. Claude reads the full document as context. For persistent use, add it to a <span className="font-medium text-zinc-800 dark:text-zinc-200">Project</span> as a knowledge file.
                  </p>
                </li>
                <li>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">Gemini (Google)</span>
                  <p className="mt-1">
                    Attach the PDF using the upload button in the chat. Gemini will process the document inline. For Google Workspace users, you can also save the PDF to Drive and reference it in Gemini conversations.
                  </p>
                </li>
                <li>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">Copilot (Microsoft)</span>
                  <p className="mt-1">
                    In Microsoft Copilot, use the file attachment button to upload the PDF into your chat. For enterprise users, save the PDF to OneDrive or SharePoint so Copilot can reference it across sessions.
                  </p>
                </li>
                <li>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">Grok (xAI)</span>
                  <p className="mt-1">
                    Upload the PDF directly in the Grok chat interface using the attachment button. Grok will use the content as context for the conversation.
                  </p>
                </li>
                <li>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">Perplexity</span>
                  <p className="mt-1">
                    Attach the PDF in the search bar using the file upload option. Perplexity will reference it alongside web results when answering your prompts.
                  </p>
                </li>
                <li>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">Custom / Open-Source Agents</span>
                  <p className="mt-1">
                    For tools like LangChain, AutoGPT, or CrewAI, add the PDF to your agent&apos;s knowledge base or vector store. Most frameworks support PDF ingestion out of the box.
                  </p>
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-zinc-800 dark:text-zinc-200 font-semibold text-base">
                Tips
              </h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Re-export a new PDF whenever your brand evolves — keep your AI up to date.</li>
                <li>For best results, tell your AI to &ldquo;follow the brand instructions document&rdquo; at the start of each session.</li>
                <li>Pair the PDF with a short prompt like: &ldquo;You are my brand assistant. Use the attached brand guide for all responses.&rdquo;</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

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
