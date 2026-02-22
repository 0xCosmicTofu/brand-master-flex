"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeMultiSelectProps {
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export function BadgeMultiSelect({
  options,
  selected,
  onChange,
  className,
}: BadgeMultiSelectProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full min-h-[44px] flex items-center"
          >
            <Badge
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "cursor-pointer select-none transition-all duration-150 text-xs font-medium px-4 py-2 sm:px-3 sm:py-1",
                isSelected
                  ? "bg-[#A8E63D] text-black border-[#A8E63D] hover:bg-[#96d630]"
                  : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              )}
            >
              {option}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
