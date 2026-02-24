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

import { PromptPreview } from "@/components/prompt-preview";
import { EmailCaptureModal } from "@/components/email-capture-modal";
import { generatePrompt } from "@/lib/generate-prompt";
import { generateMarkdown } from "@/lib/generate-markdown";
import { saveSubmission } from "@/lib/supabase";
import { exportToPDF, copyToClipboard } from "@/lib/export-pdf";
import { DEFAULT_FORM_STATE, FormState } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Download, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";

type ExportAction = "copy" | "download" | null;

export function BrandForm() {
  const [state, setState] = useState<FormState>(DEFAULT_FORM_STATE);
  const [debouncedState, setDebouncedState] = useState<FormState>(DEFAULT_FORM_STATE);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ExportAction>(null);
  const pendingActionRef = useRef<ExportAction>(null);
  const sessionId = useRef<string>(uuidv4());
  const hasShownCta = useRef(false);
  const savedEmail = useRef<string | null>(null);
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
    pendingActionRef.current = action;
    if (savedEmail.current) {
      executeExport(savedEmail.current);
    } else {
      setPendingAction(action);
      setModalOpen(true);
    }
  };

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setPendingAction(null);
    pendingActionRef.current = null;
  }, []);

  const executeExport = useCallback(
    async (email: string) => {
      const action = pendingActionRef.current;
      setModalOpen(false);
      if (email.trim()) savedEmail.current = email.trim();

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

      if (action === "copy") {
        try {
          await copyToClipboard(generatedPrompt);
          toast.success("Copied to clipboard", {
            description: "Your Brand Instructions are ready to paste.",
          });
        } catch {
          toast.error("Copy failed", {
            description: "Please copy the text manually.",
          });
        }
      } else if (action === "download") {
        try {
          await exportToPDF(generatedPrompt, "brand-instructions.pdf");
          toast.success("PDF downloading", {
            description: "Your Brand Instructions are being exported.",
          });
        } catch {
          toast.error("Export failed", {
            description: "Please try copying instead.",
          });
        }
      }

      if (!hasShownCta.current) {
        hasShownCta.current = true;
        setTimeout(() => {
          toast.custom(() => (
            <div className="w-[356px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-lg">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Want to go deeper?
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                Our full brand discovery process covers positioning, audience
                strategy, and competitive analysis.
              </p>
              <a
                href="https://www.limestud.io#booking"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#A8E63D] hover:text-[#96d630] mt-3 transition-colors"
              >
                Book a discovery call
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ), { duration: 10000 });
        }, 1500);
      }

      setPendingAction(null);
      pendingActionRef.current = null;
    },
    [generatedPrompt, debouncedState]
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Form — scrolls naturally with the page */}
        <div className={`w-full lg:w-1/2 lg:pb-6 ${!isEmpty ? "pb-28" : ""}`}>
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
              className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950 last:border-b"
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
                  Preview Brand Instructions
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

      {/* Sticky mobile export bar — slides up once form has content */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 px-4 py-3 bg-[#F1FFE7]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#d4f0b0] dark:border-zinc-800 transition-all duration-300 ${
          isEmpty ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        <Button
          onClick={() => handleExportTrigger("download")}
          className="w-full bg-[#A8E63D] text-black font-semibold hover:bg-[#96d630] gap-2 h-12 text-base"
        >
          <Download className="h-5 w-5" />
          Download PDF
        </Button>
      </div>

      {/* Single modal instance, controlled at this level */}
      <EmailCaptureModal
        open={modalOpen}
        onSubmit={(email) => executeExport(email)}
        onClose={handleModalClose}
      />
    </>
  );
}
