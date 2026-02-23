"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionBrandCore } from "@/components/section-brand-core";
import { SectionVoiceTone } from "@/components/section-voice-tone";
import { SectionVisualPalette } from "@/components/section-visual-palette";
import { SectionOutputConfig } from "@/components/section-output-config";
import { PromptPreview } from "@/components/prompt-preview";
import { EmailCaptureModal } from "@/components/email-capture-modal";
import { generatePrompt } from "@/lib/generate-prompt";
import { generateMarkdown } from "@/lib/generate-markdown";
import { saveSubmission } from "@/lib/supabase";
import { exportToPDF, copyToClipboard } from "@/lib/export-pdf";
import { DEFAULT_FORM_STATE, FormState } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

type ExportAction = "copy" | "download" | null;

export function BrandForm() {
  const [state, setState] = useState<FormState>(DEFAULT_FORM_STATE);
  const [debouncedState, setDebouncedState] = useState<FormState>(DEFAULT_FORM_STATE);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Export modal state — lifted here so the sticky mobile bar can trigger it
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ExportAction>(null);

  const sessionId = useRef<string>(uuidv4());
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((patch: Partial<FormState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedState(state);
    }, 300);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [state]);

  const generatedPrompt = useMemo(
    () => generatePrompt(debouncedState),
    [debouncedState]
  );

  const isEmpty = !debouncedState.brand_name && !debouncedState.target_audience;

  const handleExportTrigger = (action: ExportAction) => {
    setPendingAction(action);
    setModalOpen(true);
  };

  const executeExport = useCallback(
    async (email: string) => {
      setModalOpen(false);

      const markdownExport = generateMarkdown({
        email,
        sessionId: sessionId.current,
        generatedPrompt,
        formState: debouncedState,
      });

      saveSubmission({
        session_id: sessionId.current,
        email,
        form_data: debouncedState,
        generated_prompt: generatedPrompt,
        markdown_export: markdownExport,
      });

      if (pendingAction === "copy") {
        try {
          await copyToClipboard(generatedPrompt);
          toast.success("Copied to clipboard", {
            description: "Your Master Prompt is ready to paste.",
          });
        } catch {
          toast.error("Copy failed", {
            description: "Please copy the text manually.",
          });
        }
      } else if (pendingAction === "download") {
        try {
          await exportToPDF("prompt-export-content", "brand-master-prompt.pdf");
          toast.success("PDF downloading", {
            description: "Your Master Prompt is being exported.",
          });
        } catch {
          toast.error("Export failed", {
            description: "Please try copying instead.",
          });
        }
      }

      setPendingAction(null);
    },
    [pendingAction, generatedPrompt, debouncedState]
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Form — scrolls naturally with the page */}
        {/* pb-28 on mobile creates space above the sticky copy bar */}
        <div className={`w-full lg:w-1/2 ${!isEmpty ? "pb-28 lg:pb-6" : ""}`}>
          <Accordion
            type="multiple"
            defaultValue={["brand-core"]}
            className="space-y-2"
          >
            <AccordionItem
              value="brand-core"
              className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950"
            >
              <AccordionTrigger className="px-4 py-3 text-zinc-900 dark:text-zinc-100 font-semibold hover:no-underline hover:bg-zinc-50 dark:hover:bg-zinc-900 [&[data-state=open]]:bg-zinc-50 dark:[&[data-state=open]]:bg-zinc-900">
                <span className="flex items-center gap-2">
                  <span className="text-[#A8E63D] text-xs font-mono">01</span>
                  Brand Core
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5 pt-2">
                <SectionBrandCore state={state} onChange={handleChange} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="voice-tone"
              className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950"
            >
              <AccordionTrigger className="px-4 py-3 text-zinc-900 dark:text-zinc-100 font-semibold hover:no-underline hover:bg-zinc-50 dark:hover:bg-zinc-900 [&[data-state=open]]:bg-zinc-50 dark:[&[data-state=open]]:bg-zinc-900">
                <span className="flex items-center gap-2">
                  <span className="text-[#A8E63D] text-xs font-mono">02</span>
                  Voice & Tone
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5 pt-2">
                <SectionVoiceTone state={state} onChange={handleChange} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="visual-palette"
              className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950"
            >
              <AccordionTrigger className="px-4 py-3 text-zinc-900 dark:text-zinc-100 font-semibold hover:no-underline hover:bg-zinc-50 dark:hover:bg-zinc-900 [&[data-state=open]]:bg-zinc-50 dark:[&[data-state=open]]:bg-zinc-900">
                <span className="flex items-center gap-2">
                  <span className="text-[#A8E63D] text-xs font-mono">03</span>
                  Visual & Emotional Palette
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5 pt-2">
                <SectionVisualPalette state={state} onChange={handleChange} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="output-config"
              className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950"
            >
              <AccordionTrigger className="px-4 py-3 text-zinc-900 dark:text-zinc-100 font-semibold hover:no-underline hover:bg-zinc-50 dark:hover:bg-zinc-900 [&[data-state=open]]:bg-zinc-50 dark:[&[data-state=open]]:bg-zinc-900">
                <span className="flex items-center gap-2">
                  <span className="text-[#A8E63D] text-xs font-mono">04</span>
                  Output Settings
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5 pt-2">
                <SectionOutputConfig state={state} onChange={handleChange} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Mobile preview toggle (secondary action) */}
          <div className="lg:hidden mt-4">
            <Button
              variant="outline"
              className="w-full border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 gap-2"
              onClick={() => setShowMobilePreview((v) => !v)}
            >
              {showMobilePreview ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Preview Generated Prompt
                </>
              )}
            </Button>

            {showMobilePreview && (
              <div className="mt-4" style={{ height: "min(60vh, 540px)" }}>
                <PromptPreview
                  generatedPrompt={generatedPrompt}
                  isEmpty={isEmpty}
                  onCopy={() => handleExportTrigger("copy")}
                  onDownload={() => handleExportTrigger("download")}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Preview — sticky on desktop, hidden on mobile */}
        <div
          className="hidden lg:block lg:w-1/2 sticky top-[73px]"
          style={{ height: "calc(100vh - 9rem)" }}
        >
          <PromptPreview
            generatedPrompt={generatedPrompt}
            isEmpty={isEmpty}
            onCopy={() => handleExportTrigger("copy")}
            onDownload={() => handleExportTrigger("download")}
          />
        </div>
      </div>

      {/* Sticky mobile copy bar — slides up once form has content */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 px-4 py-3 bg-[#F1FFE7]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#d4f0b0] dark:border-zinc-800 transition-all duration-300 ${
          isEmpty ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        <Button
          onClick={() => handleExportTrigger("copy")}
          className="w-full bg-[#A8E63D] text-black font-semibold hover:bg-[#96d630] gap-2 h-12 text-base"
        >
          <Copy className="h-5 w-5" />
          Copy Prompt to Clipboard
        </Button>
      </div>

      {/* Single modal instance, controlled at this level */}
      <EmailCaptureModal
        open={modalOpen}
        onSubmit={(email) => executeExport(email)}
        onSkip={() => executeExport("anonymous")}
      />
    </>
  );
}
