"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldLabel } from "@/components/section-brand-core";
import { EmotionalTarget, FormState, VisualStyle } from "@/lib/types";

interface Props {
  state: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

const EMOTIONAL_TARGETS: EmotionalTarget[] = [
  "Trust & Security",
  "Excitement & Energy",
  "Curiosity & Mystery",
  "Comfort & Stability",
  "Power & Dominance",
];

const VISUAL_STYLES: VisualStyle[] = [
  "Retro-Futuristic (80s Arcade, Neon, Chunky type)",
  "Brutalist (Raw, Bold, High Contrast, Monospace)",
  "Minimalist (Clean, White space, Sans-serif, Airy)",
  "Cyberpunk (Dark, Neon accents, High-tech, Gritty)",
  "Institutional (Blue/Grey, Structured, Conservative)",
];

export function SectionVisualPalette({ state, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <FieldLabel label="Emotional Target" />
        <Select
          value={state.emotional_target}
          onValueChange={(v) =>
            onChange({ emotional_target: v as EmotionalTarget })
          }
        >
          <SelectTrigger className="text-base sm:text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-[#A8E63D]/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
            {EMOTIONAL_TARGETS.map((t) => (
              <SelectItem
                key={t}
                value={t}
                className="text-zinc-700 dark:text-zinc-200 focus:bg-zinc-100 dark:focus:bg-zinc-800 focus:text-zinc-900 dark:focus:text-zinc-100"
              >
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <FieldLabel
          label="Color Keywords"
          tooltip="Descriptive color terms for image generation prompts. Not hex codes. Think adjectives."
        />
        <Input
          value={state.color_keywords}
          onChange={(e) => onChange({ color_keywords: e.target.value })}
          placeholder="e.g., Electric Yellow, Deep Navy, Matte Red"
          className="text-base sm:text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-[#A8E63D]/50 focus-visible:border-[#A8E63D]"
        />
      </div>

      <div>
        <FieldLabel label="Visual Style" />
        <Select
          value={state.visual_style}
          onValueChange={(v) => onChange({ visual_style: v as VisualStyle })}
        >
          <SelectTrigger className="text-base sm:text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-[#A8E63D]/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
            {VISUAL_STYLES.map((s) => (
              <SelectItem
                key={s}
                value={s}
                className="text-zinc-700 dark:text-zinc-200 focus:bg-zinc-100 dark:focus:bg-zinc-800 focus:text-zinc-900 dark:focus:text-zinc-100"
              >
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
