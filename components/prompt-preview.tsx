"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, FileText } from "lucide-react";

interface PromptPreviewProps {
  generatedPrompt: string;
  isEmpty: boolean;
  onCopy: () => void;
  onDownload: () => void;
}

export function PromptPreview({
  generatedPrompt,
  isEmpty,
  onCopy,
  onDownload,
}: PromptPreviewProps) {
  return (
    <Card className="flex flex-col h-full min-h-0 gap-0 py-0 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
      <CardHeader className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#A8E63D]" />
          <CardTitle className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 tracking-wide uppercase">
            Generated Brand Instructions
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 min-h-0 p-0 overflow-hidden">
        <ScrollArea className="flex-1 min-h-0 px-5 py-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-40 text-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <FileText className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              </div>
              <p className="text-zinc-400 dark:text-zinc-600 text-sm">
                Start filling in the form to see your instructions appear here.
              </p>
            </div>
          ) : (
            <div
              id="prompt-export-content"
              className="font-mono text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap break-words"
            >
              {generatedPrompt}
            </div>
          )}
        </ScrollArea>

        <div className="flex-shrink-0 border-t border-zinc-200 dark:border-zinc-800 p-4 flex gap-3">
          <Button
            onClick={onDownload}
            disabled={isEmpty}
            className="flex-1 bg-[#A8E63D] text-black font-semibold hover:bg-[#96d630] disabled:opacity-40 gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button
            onClick={onCopy}
            disabled={isEmpty}
            variant="outline"
            className="flex-1 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-40 gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy to Clipboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
