import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Brand Master Prompt",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <header className="border-b border-zinc-900 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="text-[#A8E63D] font-bold text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
          >
            Lime Studio
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100 mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-zinc-600">
              Last updated: February 2026
            </p>
          </div>

          <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-zinc-200 font-semibold text-base">
                What we collect
              </h2>
              <p>
                When you use the Brand Master Prompt Generator, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  Your email address, if you choose to provide it at export.
                  This is optional.
                </li>
                <li>
                  The form inputs you submit (brand name, tone preferences,
                  etc.) to improve our tools and services.
                </li>
                <li>
                  A session identifier to associate your inputs with your
                  submission.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-zinc-200 font-semibold text-base">
                How we use it
              </h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  Email addresses are used to send you occasional updates and
                  tips related to the tool.
                </li>
                <li>
                  Form data helps us understand how founders think about brand,
                  which informs our work at Lime Studio.
                </li>
                <li>We do not use your data for advertising.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-zinc-200 font-semibold text-base">
                What we do not do
              </h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>We do not sell your data to any third party.</li>
                <li>We do not share your data with any third party.</li>
                <li>We do not use your data to train AI models.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-zinc-200 font-semibold text-base">
                Data deletion
              </h2>
              <p>
                To request deletion of your data, email us at{" "}
                <a
                  href="mailto:hello@limestud.io"
                  className="text-[#A8E63D] hover:underline"
                >
                  hello@limestud.io
                </a>
                . We will remove your record within 7 business days.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-zinc-200 font-semibold text-base">
                Questions
              </h2>
              <p>
                Questions about this policy? Reach us at{" "}
                <a
                  href="mailto:hello@limestud.io"
                  className="text-[#A8E63D] hover:underline"
                >
                  hello@limestud.io
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-900 px-6 py-5">
        <div className="max-w-6xl mx-auto text-sm text-zinc-600">
          Built by{" "}
          <a
            href="https://limestud.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Lime Studio
          </a>
        </div>
      </footer>
    </div>
  );
}
