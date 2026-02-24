# Project Memory

## Overview
- **Name:** Brand Master Flex (Brand Identity Master Prompt Generator)
- **Purpose:** Free web tool that converts founder brand inputs into a structured LLM system prompt. Trust signal for Lime Studio. Captures leads via optional email at export.
- **Status:** App deployed. All export bugs fixed. Output Settings removed. PDF rendering confirmed working.
- **Last Updated:** 2026-02-24

## Tech Stack
- **Languages:** TypeScript
- **Frontend:** Next.js 14 (App Router), React
- **Backend:** Next.js API Routes (minimal — one Supabase POST)
- **Database:** Supabase (submissions table)
- **Deployment:** Vercel (subdomain: prompt.limestud.io)
- **Key Dependencies:**
  - shadcn/ui: Component library (Accordion, Dialog, Badge, Toast, etc.)
  - Tailwind CSS: Styling
  - html2pdf.js or @react-pdf/renderer: PDF export
  - @supabase/supabase-js: Database client
  - navigator.clipboard API: Clipboard copy (native)

## Architecture
- **Folder Structure:**
  - `/app` — Next.js App Router pages (landing, generator, privacy)
  - `/components` — All React UI components
  - `/lib` — Business logic (prompt gen, markdown gen, PDF export, Supabase client, types)
- **Patterns:** Client-first (form + preview fully client-side, "use client"). Static generation for landing page. Single server interaction: Supabase POST on export.

## File Index

### Core Logic
- `lib/generate-prompt.ts`: Assembles form state into the LLM system prompt string
- `lib/generate-markdown.ts`: Serializes form state into Markdown storage format
- `lib/export-pdf.ts`: PDF generation helper
- `lib/supabase.ts`: Supabase client + submission POST helper
- `lib/types.ts`: TypeScript interfaces for form state

### UI / Components
- `components/brand-form.tsx`: Full input form with accordion sections
- `components/prompt-preview.tsx`: Live preview card (right panel)
- `components/email-capture-modal.tsx`: Dialog for email capture on export
- `components/section-brand-core.tsx`: Section 1 form fields
- `components/section-voice-tone.tsx`: Section 2 form fields
- `components/section-visual-palette.tsx`: Section 3 form fields
- `components/section-output-config.tsx`: Section 4 form fields
- `components/badge-multi-select.tsx`: Custom tone tag toggle component

### Configuration
- `.env.local`: Supabase env vars (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)

### Data / Models
- Supabase `submissions` table: id, session_id, email, brand_name, form_data (JSONB), generated_prompt, markdown_export, created_at

## Decision Log
- **2026-02-22:** Email capture at export (Option A), not entry — preserves trust signal, reduces friction
- **2026-02-22:** Dark mode by default with Lime Studio palette (Lime Green, Off-Black, Cool Grey, White) as accent
- **2026-02-22:** Split-screen layout desktop (form left, preview right), stacked on mobile
- **2026-02-22:** "Skip & Export" option on email modal is non-negotiable — forcing email kills trust signal
- **2026-02-22:** All form/preview logic is client-side only; Supabase POST is the only network call

## Decision Log (continued)
- **2026-02-24:** Switched exportToPDF from DOM-cloning to text-based rendering — ScrollArea cloning produced blank PDFs
- **2026-02-24:** Used useRef for pendingAction to avoid stale closure in useCallback export handler
- **2026-02-24:** Removed Output Settings section (system-prompt vs markdown) — no meaningful difference in output
- **2026-02-24:** Fixed blank PDF by rendering container on-screen inside a hidden wrapper — html2canvas can't capture off-screen elements

## Known Issues
- **Active Bugs:** None
- **Technical Debt:** None yet

## Environment Variables
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
