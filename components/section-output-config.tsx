"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormState, OutputFormat } from "@/lib/types";

interface Props {
  state: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

const OPTIONS: { value: OutputFormat; label: string; description: string }[] = [
  {
    value: "system-prompt",
    label: "System Prompt",
    description: "For Claude / GPT System Instructions",
  },
  {
    value: "markdown",
    label: "Markdown",
    description: "For documentation or Notion",
  },
];

export function SectionOutputConfig({ state, onChange }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-zinc-200">Output Format</p>
      <RadioGroup
        value={state.output_format}
        onValueChange={(v) => onChange({ output_format: v as OutputFormat })}
        className="space-y-2"
      >
        {OPTIONS.map((opt) => (
          <div
            key={opt.value}
            className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
              state.output_format === opt.value
                ? "border-[#A8E63D]/60 bg-[#A8E63D]/5"
                : "border-zinc-700 hover:border-zinc-600"
            }`}
            onClick={() => onChange({ output_format: opt.value })}
          >
            <RadioGroupItem
              value={opt.value}
              id={opt.value}
              className="mt-0.5 border-zinc-600 data-[state=checked]:border-[#A8E63D] data-[state=checked]:text-[#A8E63D]"
            />
            <div>
              <Label
                htmlFor={opt.value}
                className="text-zinc-100 font-medium cursor-pointer"
              >
                {opt.label}
              </Label>
              <p className="text-xs text-zinc-500 mt-0.5">{opt.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
