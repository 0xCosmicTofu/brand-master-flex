"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmailCaptureModal } from "@/components/email-capture-modal";
import { generateMarkdown } from "@/lib/generate-markdown";
import { saveSubmission } from "@/lib/supabase";
import { exportToPDF, copyToClipboard } from "@/lib/export-pdf";
import { FormState } from "@/lib/types";
import { toast } from "sonner";
import { Copy, Download, FileText } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface PromptPreviewProps {
  generatedPrompt: string;
  formState: FormState;
  sessionId: string;
}

type ExportAction = "copy" | "download" | null;

export function PromptPreview({
  generatedPrompt,
  formState,
  sessionId,
}: PromptPreviewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ExportAction>(null);

  const handleExportTrigger = (action: ExportAction) => {
    setPendingAction(action);
    setModalOpen(true);
  };

  const executeExport = useCallback(
    async (email: string) => {
      setModalOpen(false);

      const markdownExport = generateMarkdown({
        email,
        sessionId,
        generatedPrompt,
        formState,
      });

      // Fire-and-forget Supabase save
      saveSubmission({
        session_id: sessionId,
        email,
        form_data: formState,
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
    [pendingAction, generatedPrompt, formState, sessionId]
  );

  const handleSubmit = (email: string) => executeExport(email);
  const handleSkip = () => executeExport("anonymous");

  const isEmpty = !formState.brand_name && !formState.target_audience;

  return (
    <>
      <Card className="flex flex-col h-full bg-zinc-950 border-zinc-800">
        <CardHeader className="pb-3 border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#A8E63D]" />
            <CardTitle className="text-sm font-semibold text-zinc-200 tracking-wide uppercase">
              Generated Master Prompt
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 p-0 overflow-hidden">
          <ScrollArea className="flex-1 px-5 py-4">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-40 text-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-zinc-600" />
                </div>
                <p className="text-zinc-600 text-sm">
                  Start filling in the form to see your prompt appear here.
                </p>
              </div>
            ) : (
              <div
                id="prompt-export-content"
                className="font-mono text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap break-words"
              >
                {generatedPrompt}
              </div>
            )}
          </ScrollArea>

          <div className="flex-shrink-0 border-t border-zinc-800 p-4 flex gap-3">
            <Button
              onClick={() => handleExportTrigger("copy")}
              disabled={isEmpty}
              className="flex-1 bg-[#A8E63D] text-black font-semibold hover:bg-[#96d630] disabled:opacity-40 gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy to Clipboard
            </Button>
            <Button
              onClick={() => handleExportTrigger("download")}
              disabled={isEmpty}
              variant="outline"
              className="flex-1 border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-40 gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <EmailCaptureModal
        open={modalOpen}
        onSubmit={handleSubmit}
        onSkip={handleSkip}
      />
    </>
  );
}
