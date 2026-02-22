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
import { generatePrompt } from "@/lib/generate-prompt";
import { DEFAULT_FORM_STATE, FormState } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export function BrandForm() {
  const [state, setState] = useState<FormState>(DEFAULT_FORM_STATE);
  const [debouncedState, setDebouncedState] = useState<FormState>(DEFAULT_FORM_STATE);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const sessionId = useRef<string>(uuidv4());
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((patch: Partial<FormState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  // Debounce text field changes only; instant for select/badge
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

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left: Form */}
      <div className="lg:w-1/2 flex flex-col min-h-0">
        <div className="overflow-y-auto flex-1 pr-1">
          <Accordion
            type="multiple"
            defaultValue={["brand-core"]}
            className="space-y-2"
          >
            <AccordionItem
              value="brand-core"
              className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950"
            >
              <AccordionTrigger className="px-4 py-3 text-zinc-100 font-semibold hover:no-underline hover:bg-zinc-900 [&[data-state=open]]:bg-zinc-900">
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
              className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950"
            >
              <AccordionTrigger className="px-4 py-3 text-zinc-100 font-semibold hover:no-underline hover:bg-zinc-900 [&[data-state=open]]:bg-zinc-900">
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
              className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950"
            >
              <AccordionTrigger className="px-4 py-3 text-zinc-100 font-semibold hover:no-underline hover:bg-zinc-900 [&[data-state=open]]:bg-zinc-900">
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
              className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950"
            >
              <AccordionTrigger className="px-4 py-3 text-zinc-100 font-semibold hover:no-underline hover:bg-zinc-900 [&[data-state=open]]:bg-zinc-900">
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
        </div>

        {/* Mobile preview toggle */}
        <div className="lg:hidden mt-4 flex-shrink-0">
          <Button
            variant="outline"
            className="w-full border-zinc-700 text-zinc-200 hover:bg-zinc-800 gap-2"
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
                Show Preview
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Right: Preview — hidden on mobile unless toggled */}
      <div
        className={`lg:w-1/2 lg:flex flex-col ${
          showMobilePreview ? "flex" : "hidden"
        }`}
        style={{ minHeight: "520px" }}
      >
        <PromptPreview
          generatedPrompt={generatedPrompt}
          formState={debouncedState}
          sessionId={sessionId.current}
        />
      </div>
    </div>
  );
}
