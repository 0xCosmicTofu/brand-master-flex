# Current Session

## Objective
Add an Instructions page explaining how to upload the brand PDF to popular AI agents, link it from all page footers, and update footer link colours.

## Context
App is deployed and working. All export bugs fixed. This session adds a new content page and footer navigation update.

## Relevant Files
- app/instructions/page.tsx (new — Instructions page)
- app/page.tsx (footer updated)
- app/generator/page.tsx (footer updated)
- app/privacy/page.tsx (footer updated)

## Attempts Log
- **Attempt 1:** Created /app/instructions/page.tsx with platform-specific upload instructions for ChatGPT, Claude, Gemini, Copilot, Grok, Perplexity, and custom agents. Updated all three existing page footers to include an "Instructions" link beside "Privacy Policy". Applied link colours: #1A1B41 in light mode, lime (#A8E63D) in dark mode.
- **Result:** All files pass linting. No errors.
- **Conclusion:** Keep.

## Current Status
Instructions page created. All footers updated with both links and correct colour scheme. Ready for review/deploy.

## Next Steps
1. Verify the Instructions page renders correctly on Vercel preview
2. Confirm link colours in both light and dark mode
