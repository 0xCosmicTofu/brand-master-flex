"use client";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeMultiSelect } from "@/components/badge-multi-select";
import { FieldLabel } from "@/components/section-brand-core";
import {
  FormState,
  PersonalityArchetype,
  TONE_DO_OPTIONS,
  TONE_DONT_OPTIONS,
  ToneDo,
  ToneDont,
} from "@/lib/types";

interface Props {
  state: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

const ARCHETYPES: PersonalityArchetype[] = [
  "The Pragmatic Expert: Grounded, direct, efficient",
  "The Bold Disruptor: Loud, aggressive, provocative",
  "The Friendly Neighbor: Warm, accessible, simple",
  "The Futurist: High-level, abstract, visionary",
];

export function SectionVoiceTone({ state, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <FieldLabel label="Personality Archetype" />
        <Select
          value={state.personality_archetype}
          onValueChange={(v) =>
            onChange({ personality_archetype: v as PersonalityArchetype })
          }
        >
          <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-[#A8E63D]/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {ARCHETYPES.map((a) => (
              <SelectItem
                key={a}
                value={a}
                className="text-zinc-200 focus:bg-zinc-800 focus:text-zinc-100"
              >
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <FieldLabel label="Tone: DO use these qualities" />
        <BadgeMultiSelect
          options={TONE_DO_OPTIONS}
          selected={state.tone_do_list}
          onChange={(v) => onChange({ tone_do_list: v as ToneDo[] })}
        />
      </div>

      <div>
        <FieldLabel label="Tone: DON'T use these qualities" />
        <BadgeMultiSelect
          options={TONE_DONT_OPTIONS}
          selected={state.tone_dont_list}
          onChange={(v) => onChange({ tone_dont_list: v as ToneDont[] })}
        />
      </div>

      <div>
        <FieldLabel
          label="Syntax & Formatting Rules"
          tooltip="Specific grammar, punctuation, or style constraints the AI must always follow."
        />
        <Textarea
          value={state.formatting_rules}
          onChange={(e) => onChange({ formatting_rules: e.target.value })}
          placeholder="e.g., No em dashes. Use active voice. Short sentences. Never use the word 'synergy.'"
          rows={3}
          className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#A8E63D]/50 focus-visible:border-[#A8E63D] resize-none"
        />
      </div>
    </div>
  );
}
