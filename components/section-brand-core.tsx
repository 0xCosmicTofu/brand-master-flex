"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormState, RoleDefinition } from "@/lib/types";
import { InfoIcon } from "lucide-react";
import { Label } from "./ui/label";

interface Props {
  state: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

const ROLES: RoleDefinition[] = [
  "Chief Brand Officer",
  "Senior Copywriter",
  "Social Media Manager",
  "Design Strategist",
];

function FieldLabel({
  label,
  tooltip,
  required,
}: {
  label: string;
  tooltip?: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <Label className="text-sm font-medium text-zinc-200">
        {label}
        {required && <span className="text-[#A8E63D] ml-0.5">*</span>}
      </Label>
      {tooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="h-3.5 w-3.5 text-zinc-500 cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-xs">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export { FieldLabel };

export function SectionBrandCore({ state, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <FieldLabel label="Brand Name" required />
        <Input
          value={state.brand_name}
          onChange={(e) => onChange({ brand_name: e.target.value })}
          placeholder="e.g., Acme Protocol"
          className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#A8E63D]/50 focus-visible:border-[#A8E63D]"
        />
      </div>

      <div>
        <FieldLabel label="AI Agent Role" />
        <Select
          value={state.role_definition}
          onValueChange={(v) =>
            onChange({ role_definition: v as RoleDefinition })
          }
        >
          <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-[#A8E63D]/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {ROLES.map((r) => (
              <SelectItem
                key={r}
                value={r}
                className="text-zinc-200 focus:bg-zinc-800 focus:text-zinc-100"
              >
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <FieldLabel
          label="Target Audience"
          tooltip="Who are we primarily talking to? Be specific about their technical literacy and pain points."
        />
        <Textarea
          value={state.target_audience}
          onChange={(e) => onChange({ target_audience: e.target.value })}
          placeholder="e.g., DeFi power users, institutional investors, retail crypto enthusiasts"
          rows={3}
          className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#A8E63D]/50 focus-visible:border-[#A8E63D] resize-none"
        />
      </div>

      <div>
        <FieldLabel
          label="Primary Value Proposition"
          tooltip="What is the one thing you offer that no one else does?"
        />
        <Textarea
          value={state.value_proposition}
          onChange={(e) => onChange({ value_proposition: e.target.value })}
          placeholder="e.g., Smart liquidity without the complexity. Security without the friction."
          rows={3}
          className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#A8E63D]/50 focus-visible:border-[#A8E63D] resize-none"
        />
      </div>
    </div>
  );
}
