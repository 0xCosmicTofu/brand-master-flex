# Current Session

## Objective
Fix blank PDF export, remove Output Settings section, and deploy.

## Context
Previous session fixed export stale closure bug and header cleanup. This session tackled the remaining blank PDF issue and simplified the form by removing the output format toggle.

## Relevant Files
- lib/export-pdf.ts (PDF generation — root cause of blank PDF)
- lib/types.ts (removed OutputFormat type)
- lib/generate-prompt.ts (removed markdown wrapping)
- components/brand-form.tsx (removed Output Settings accordion)
- components/section-output-config.tsx (orphaned — can be deleted later)

## Attempts Log
- **Attempt 1:** Changed container from `position: fixed; top: -9999px` to `position: absolute; top: 0; opacity: 0`
- **Result:** Still blank — html2canvas ignores elements with opacity: 0 or partially off-screen
- **Conclusion:** Reverted

- **Attempt 2:** Wrapped container in a fixed full-viewport white wrapper (top: 0, left: 0, z-index: 99999, overflow: hidden, pointer-events: none). Container rendered inside wrapper with no hiding tricks.
- **Result:** PDF renders correctly with full prompt content
- **Conclusion:** Keep — this is the fix. html2canvas needs elements to be visually on-screen.

## Root Cause
html2canvas cannot capture elements positioned off-screen (`top: -9999px`) or hidden with `opacity: 0`. It renders based on viewport coordinates, producing an empty canvas for off-screen elements.

## Current Status
Fix confirmed locally. Output Settings section removed. Ready for production deploy.

## Next Steps
1. Verify PDF works on production (Vercel)
2. Delete orphaned section-output-config.tsx if desired
