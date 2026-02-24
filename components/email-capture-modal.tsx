"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EmailCaptureModalProps {
  open: boolean;
  onSubmit: (email: string) => void;
}

export function EmailCaptureModal({
  open,
  onSubmit,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email.trim());
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-zinc-100">
            One last thing before you go
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm leading-relaxed mt-1">
            Drop your email and we will send you updates to the framework and
            tips on getting the most out of your Master Prompt.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="text-base sm:text-sm bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#A8E63D]/50 focus-visible:border-[#A8E63D] h-12 sm:h-9"
            />
          </div>

          <Button
            type="submit"
            disabled={!email.trim()}
            className="w-full bg-[#A8E63D] text-black font-semibold hover:bg-[#96d630] disabled:opacity-40 disabled:cursor-not-allowed h-12 sm:h-9 text-base sm:text-sm"
          >
            Submit & Export
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
