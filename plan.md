```markdown
# Project: Brand Identity Master Prompt Generator

## Overview
A web-based tool that takes a founder's brand inputs and distills them into a "Master System Prompt" for LLMs (like Claude or GPT-4). This allows the AI agent to maintain consistent brand identity, tone of voice, and visual style during content generation.

## Strategic Intent

### Trust Signal: The Inverse Incentive
This tool is not a sales funnel. It is a trust signal. The messaging throughout the tool must communicate the following:

"We know not everyone is ready for a full brand sprint or identity engagement. That is okay. This tool is our way of saying: you have a problem right now, and we are giving you a free solution. No strings. No upsell wall. Use it, build with it, and when you are ready for the real thing, you know where to find us."

This is the inverse incentive. Instead of gatekeeping expertise to create demand, we give it away to create trust. The tool should feel generous, not transactional.

**Messaging guidelines:**
*   The landing page copy must lead with the problem (inconsistent AI-generated brand content) and position the tool as a free, no-commitment solution.
*   Do not use language like "free trial" or "limited access." This is not a freemium product. It is a gift.
*   The subtle implication is: if a free tool from Lime Studio is this good, imagine what a full engagement looks like.
*   Avoid any hard sell. The tool sells by existing.

### Email Capture Strategy
We need to capture the user's email address for lead generation purposes. There are two options to consider. The final decision can be made after testing, but the architecture should support both.

**Option A: Capture at Export (Recommended)**
*   The user completes the entire form and sees the full preview of their generated prompt.
*   When they click "Copy to Clipboard" or "Download as PDF," a modal appears asking for their email address.
*   Copy: "Before you export, drop your email so we can send you updates to the framework and tips on getting the most out of it."
*   The modal has two buttons:
    *   "Submit & Export" (primary)
    *   "Skip & Export" (text link, subtle but visible)
*   The "Skip" option is important. Forcing the email kills the trust signal. Making it optional but prominent captures high-intent leads without alienating others.

**Option B: Capture at Entry**
*   The very first screen before the form asks for the user's email.
*   Copy: "Enter your email to save your progress and get tips on using your Master Prompt."
*   This captures more emails but creates friction before the user has experienced any value.
*   Risk: higher bounce rate, weaker trust signal.

**Architecture Note:** Build the email capture modal as a standalone component that can be triggered at either point. This allows A/B testing both options without refactoring.

**Email Storage:**
*   Store emails in a simple database (Supabase, PlanetScale, or even a Google Sheet via API if MVP).
*   Each email record should be associated with the user's generated prompt data (see Data Capture below).

### Data Capture: Silent Response Storage
Every completed form submission should be stored as a Markdown file in our database. This is for internal use only.

**Purpose:** If a user who has used this tool later reaches out to Lime Studio for a full engagement, we already have a baseline understanding of their brand. We can reference their inputs and move faster. This reduces onboarding friction and demonstrates attentiveness.

**Implementation:**
*   On export (whether the user provides an email or skips), serialize the form state into a Markdown string using the same template logic as the prompt generator.
*   Store this Markdown string in the database, associated with:
    *   Email address (if provided)
    *   Timestamp
    *   A unique session ID (for anonymous users who skipped email)
*   The Markdown file should include all raw inputs, not just the generated prompt. This gives us the full picture of their brand thinking.

**Privacy Consideration:** We do not need to explicitly tell users we are storing their responses. The tool is a free utility, and the data captured is what the user voluntarily inputs into a web form. However, a standard privacy policy page should be linked in the footer that covers data collection in general terms. This keeps us legally clean without creating unnecessary friction or suspicion.

**Markdown Storage Format:**

```text
# Brand Identity Submission
## Metadata
- **Timestamp:** [ISO 8601 timestamp]
- **Email:** [email or "anonymous"]
- **Session ID:** [unique ID]

## Brand Core
- **Brand Name:** [brand_name]
- **AI Agent Role:** [role_definition]
- **Target Audience:** [target_audience]
- **Value Proposition:** [value_proposition]

## Voice & Tone
- **Personality Archetype:** [personality_archetype]
- **Tone DO:** [tone_do_list]
- **Tone DON'T:** [tone_dont_list]
- **Formatting Rules:** [formatting_rules]

## Visual & Emotional Palette
- **Emotional Target:** [emotional_target]
- **Color Keywords:** [color_keywords]
- **Visual Style:** [visual_style]

## Generated Prompt
[Full generated prompt text]
```

### Branding: Subtle Lime Studio Presence
The tool should look and feel like a Lime Studio product, but it should not scream it. The tool is the star, not the studio.

**Guidelines:**
*   The Lime Studio logo should appear once in the header or top-left corner. Small. Not a hero element.
*   Use Lime Studio's color palette (Lime Green, Off-Black, Cool Grey, White) as the accent colors within the shadcn/ui theme.
*   The footer should contain: "Built by Lime Studio" with a link to limestud.io. Simple. One line.
*   Do not use a Lime Studio hero banner, tagline splash, or any "about us" section on the tool page itself.
*   The landing/marketing page can be slightly more branded, but the tool interface itself should feel like a neutral, high-quality utility that happens to be Lime Studio green.

---

## Tech Stack
*   **Framework:** Next.js (App Router)
*   **UI Library:** shadcn/ui
*   **Styling:** Tailwind CSS (included with shadcn/ui)
*   **Deployment:** Vercel
*   **Database:** Supabase (for email capture and response storage)
*   **PDF Export:** html2pdf.js or @react-pdf/renderer
*   **Clipboard:** navigator.clipboard API
*   **State Management:** React useState / useReducer (no external library needed)

---

## UI Layout Strategy
*   **Layout:** Split screen on desktop (Left: Input Form, Right: Live Preview). Stacked on mobile (Form on top, Preview below with a sticky "Preview" toggle button).
*   **Input Flow:** Collapsible accordion sections using shadcn/ui Accordion component.
*   **Preview:** Sticky panel on the right that updates in real-time as the user types or selects options.
*   **Actions:** Primary action "Copy to Clipboard" and secondary action "Download as PDF." Both pinned to the bottom of the Preview panel.
*   **Theme:** Dark mode by default. Use shadcn/ui theming with Lime Studio brand colors as the accent palette (subtle, not loud).

## shadcn/ui Components Used
*   `Accordion` for collapsible sections
*   `Input` for text fields
*   `Textarea` for multi-line fields
*   `Select` for dropdowns
*   `RadioGroup` for output format selection
*   `Badge` for tag-style multi-select (tone DO/DON'T lists)
*   `Button` for actions (Copy, Download)
*   `Card` for the Preview panel container
*   `Dialog` for email capture modal
*   `Tooltip` for help text on hover
*   `Separator` for visual section breaks
*   `ScrollArea` for the Preview panel content
*   `Toast` for "Copied!" confirmation

---

## Wireframe & Field Specifications

### Section 1: Brand Core (Foundation)
Accordion label: "Brand Core"
Default state: Open

*   **Field 1:** `brand_name`
    *   **Component:** `Input`
    *   **Label:** Brand Name
    *   **Placeholder:** e.g., Acme Protocol
    *   **Required:** Yes

*   **Field 2:** `role_definition`
    *   **Component:** `Select`
    *   **Label:** AI Agent Role
    *   **Options:**
        *   Chief Brand Officer (Default)
        *   Senior Copywriter
        *   Social Media Manager
        *   Design Strategist

*   **Field 3:** `target_audience`
    *   **Component:** `Textarea`
    *   **Label:** Target Audience
    *   **Placeholder:** e.g., DeFi power users, institutional investors, retail crypto enthusiasts
    *   **Tooltip:** Who are we primarily talking to? Be specific about their technical literacy and pain points.

*   **Field 4:** `value_proposition`
    *   **Component:** `Textarea`
    *   **Label:** Primary Value Proposition
    *   **Placeholder:** e.g., Smart liquidity without the complexity. Security without the friction.
    *   **Tooltip:** What is the one thing you offer that no one else does?

---

### Section 2: Voice & Tone
Accordion label: "Voice & Tone"
Default state: Collapsed

*   **Field 5:** `personality_archetype`
    *   **Component:** `Select`
    *   **Label:** Personality Archetype
    *   **Options:**
        *   The Pragmatic Expert: Grounded, direct, efficient
        *   The Bold Disruptor: Loud, aggressive, provocative
        *   The Friendly Neighbor: Warm, accessible, simple
        *   The Futurist: High-level, abstract, visionary

*   **Field 6:** `tone_do_list`
    *   **Component:** `Badge` multi-select (click to toggle)
    *   **Label:** Tone: DO use these qualities
    *   **Options:** Direct, Concise, Playful, Professional, Technical, Witty, Educational, Conversational, Authoritative, Empathetic
    *   **Default Selected:** Direct, Concise

*   **Field 7:** `tone_dont_list`
    *   **Component:** `Badge` multi-select (click to toggle)
    *   **Label:** Tone: DON'T use these qualities
    *   **Options:** Corporate, Flowery, Buzzword-heavy, Arrogant, Passive, Academic, Sarcastic, Overly Casual, Aggressive
    *   **Default Selected:** Corporate, Buzzword-heavy

*   **Field 8:** `formatting_rules`
    *   **Component:** `Textarea`
    *   **Label:** Syntax & Formatting Rules
    *   **Placeholder:** e.g., No em dashes. Use active voice. Short sentences. Never use the word "synergy."
    *   **Tooltip:** Specific grammar, punctuation, or style constraints the AI must always follow.

---

### Section 3: Visual & Emotional Palette
Accordion label: "Visual & Emotional Palette"
Default state: Collapsed

*   **Field 9:** `emotional_target`
    *   **Component:** `Select`
    *   **Label:** Emotional Target
    *   **Options:**
        *   Trust & Security
        *   Excitement & Energy
        *   Curiosity & Mystery
        *   Comfort & Stability
        *   Power & Dominance

*   **Field 10:** `color_keywords`
    *   **Component:** `Input`
    *   **Label:** Color Keywords
    *   **Placeholder:** e.g., Electric Yellow, Deep Navy, Matte Red
    *   **Tooltip:** Descriptive color terms for image generation prompts. Not hex codes. Think adjectives.

*   **Field 11:** `visual_style`
    *   **Component:** `Select`
    *   **Label:** Visual Style
    *   **Options:**
        *   Retro-Futuristic (80s Arcade, Neon, Chunky type)
        *   Brutalist (Raw, Bold, High Contrast, Monospace)
        *   Minimalist (Clean, White space, Sans-serif, Airy)
        *   Cyberpunk (Dark, Neon accents, High-tech, Gritty)
        *   Institutional (Blue/Grey, Structured, Conservative)

---

### Section 4: Output Configuration
Accordion label: "Output Settings"
Default state: Collapsed

*   **Field 12:** `output_format`
    *   **Component:** `RadioGroup`
    *   **Label:** Output Format
    *   **Options:**
        *   System Prompt (For Claude/GPT System Instructions) (Default)
        *   Markdown (For documentation or Notion)

---

## Email Capture Modal Specification

*   **Component:** `Dialog`
*   **Trigger:** Fires when user clicks "Copy to Clipboard" or "Download as PDF"
*   **Header:** "One last thing before you go"
*   **Body Copy:** "Drop your email and we will send you updates to the framework and tips on getting the most out of your Master Prompt."
*   **Field:** `email`
    *   **Component:** `Input`
    *   **Type:** email
    *   **Placeholder:** you@company.com
*   **Primary Button:** "Submit & Export" (captures email, triggers export action, stores data)
*   **Secondary Action:** "Skip & Export" (text link below button, triggers export action, stores data with email as "anonymous")
*   **Post-Submit Behavior:** Close modal, execute the original export action (copy or download), show `Toast` confirmation ("Copied!" or "Downloading...")

---

## Live Preview Panel Specification

*   **Component:** `Card` with `ScrollArea` inside
*   **Header:** "Generated Master Prompt"
*   **Content:** The generated prompt text, rendered in a monospace font for readability.
*   **Footer:** Two buttons pinned to the bottom of the card.
    *   `Button` (Primary): "Copy to Clipboard"
    *   `Button` (Secondary/Outline): "Download as PDF"
*   **Behavior:** The preview updates in real-time with a 300ms debounce on text input changes. Select/Radio/Badge changes update instantly.

---

## Prompt Generation Template

The tool concatenates user inputs into a structured system prompt.

### Template String:

```text
You are the [role_definition] for [brand_name].

# CORE IDENTITY
Your primary audience is: [target_audience].
Our core value proposition is: [value_proposition].
Every piece of content you generate must reinforce this value proposition.

# VOICE & TONE
Your personality archetype is: [personality_archetype].

When writing content, you MUST embody these qualities:
[tone_do_list, formatted as a bulleted list]

You must STRICTLY AVOID these qualities:
[tone_dont_list, formatted as a bulleted list]

Formatting and syntax rules you must always follow:
[formatting_rules]

# VISUAL & EMOTIONAL PALETTE
When describing visuals, suggesting imagery, or generating image prompts, adhere to these guidelines:

Emotional Target: All visual content should evoke a feeling of [emotional_target].
Visual Style: [visual_style].
Color Palette Keywords: [color_keywords].

# RULES
1. Never deviate from this brand identity.
2. If you are unsure about a specific detail, default to the constraints defined above.
3. Do not hallucinate brand details. If you do not have the information, ask the user.
4. Maintain consistency across all outputs. Every response should feel like it came from the same voice.
```

### Handling Empty Fields:
*   If a text field is empty, omit the entire line or section from the output.
*   If a select field is left at default, include the default value.
*   If no Badge tags are selected for tone lists, omit those bullet lists entirely and replace with: "[Define your tone qualities to populate this section]".

---

## Data Pipeline

### On Export (Copy or Download):
1. Trigger email capture modal.
2. On "Submit & Export" or "Skip & Export":
    a. Serialize the full form state into the Markdown storage format (see below).
    b. POST the Markdown string, email (or "anonymous"), timestamp, and session ID to Supabase.
    c. Execute the export action (clipboard copy or PDF download).
    d. Show Toast confirmation.

### Supabase Table Schema:

```sql
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  email TEXT DEFAULT 'anonymous',
  brand_name TEXT,
  form_data JSONB NOT NULL,
  generated_prompt TEXT NOT NULL,
  markdown_export TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Markdown Storage Format:

```text
# Brand Identity Submission
## Metadata
- **Timestamp:** [ISO 8601 timestamp]
- **Email:** [email or "anonymous"]
- **Session ID:** [unique ID]

## Brand Core
- **Brand Name:** [brand_name]
- **AI Agent Role:** [role_definition]
- **Target Audience:** [target_audience]
- **Value Proposition:** [value_proposition]

## Voice & Tone
- **Personality Archetype:** [personality_archetype]
- **Tone DO:** [tone_do_list]
- **Tone DON'T:** [tone_dont_list]
- **Formatting Rules:** [formatting_rules]

## Visual & Emotional Palette
- **Emotional Target:** [emotional_target]
- **Color Keywords:** [color_keywords]
- **Visual Style:** [visual_style]

## Generated Prompt
[Full generated prompt text]
```

---

## Landing Page Copy (Above the Form)

### Headline:
"Your AI doesn't know your brand. Fix that in 5 minutes."

### Subheadline:
"Not everyone is ready for a full brand sprint. We get it. This tool gives you a free, structured system prompt that encodes your brand identity into any AI agent. Consistent tone. Consistent visuals. No guesswork."

### Body (Optional, below subheadline):
"We built this using the same framework we use at Lime Studio when designing brand systems for Web3 and AI companies. Consider it a head start. Use it, build with it, and when you are ready for the real thing, you know where to find us."

### CTA Button:
"Start Building Your Prompt" (scrolls down to the form)

---

## Test Case: Lime Studio Brand

Use the following inputs to test the tool's output quality. The generated prompt should produce content that feels authentically like Lime Studio.

### Test Inputs:
*   **Brand Name:** Lime Studio
*   **AI Agent Role:** Chief Brand Officer
*   **Target Audience:** Web3 founders, AI builders, and technical teams who are engineering-led and lack design capability. They need foundational brand systems and product UX that builds trust and converts users.
*   **Value Proposition:** We build the foundational brand identity and product experience that Web3 and AI companies launch with. We are the design partner for teams that have powerful tech but need a user-facing layer that builds trust and drives adoption.
*   **Personality Archetype:** The Pragmatic Expert
*   **Tone DO:** Direct, Concise, Technical, Educational, Conversational
*   **Tone DON'T:** Corporate, Flowery, Buzzword-heavy, Arrogant, Passive
*   **Formatting Rules:** Never use em dashes. Use commas, periods, colons, or semicolons instead. Use active voice. Short sentences. No fluff. Speak like someone who builds things, not someone who writes about building things.
*   **Emotional Target:** Trust & Security
*   **Color Keywords:** Lime Green, Off-Black, Cool Grey, White
*   **Visual Style:** Minimalist (Clean, White space, Sans-serif, Airy)

### Expected Output (Generated Master Prompt):

```text
You are the Chief Brand Officer for Lime Studio.

# CORE IDENTITY
Your primary audience is: Web3 founders, AI builders, and technical teams who are engineering-led and lack design capability. They need foundational brand systems and product UX that builds trust and converts users.
Our core value proposition is: We build the foundational brand identity and product experience that Web3 and AI companies launch with. We are the design partner for teams that have powerful tech but need a user-facing layer that builds trust and drives adoption.
Every piece of content you generate must reinforce this value proposition.

# VOICE & TONE
Your personality archetype is: The Pragmatic Expert (Grounded, direct, efficient).

When writing content, you MUST embody these qualities:
- Direct
- Concise
- Technical
- Educational
- Conversational

You must STRICTLY AVOID these qualities:
- Corporate
- Flowery
- Buzzword-heavy
- Arrogant
- Passive

Formatting and syntax rules you must always follow:
Never use em dashes. Use commas, periods, colons, or semicolons instead. Use active voice. Short sentences. No fluff. Speak like someone who builds things, not someone who writes about building things.

# VISUAL & EMOTIONAL PALETTE
When describing visuals, suggesting imagery, or generating image prompts, adhere to these guidelines:

Emotional Target: All visual content should evoke a feeling of Trust & Security.
Visual Style: Minimalist (Clean, White space, Sans-serif, Airy).
Color Palette Keywords: Lime Green, Off-Black, Cool Grey, White.

# RULES
1. Never deviate from this brand identity.
2. If you are unsure about a specific detail, default to the constraints defined above.
3. Do not hallucinate brand details. If you do not have the information, ask the user.
4. Maintain consistency across all outputs. Every response should feel like it came from the same voice.
```

### Validation Criteria:
After generating the Lime Studio test prompt, paste it into Claude or ChatGPT as the system instructions. Then ask the agent to:
1. Write a tweet announcing a new client signing.
2. Write a cold DM to a Web3 founder.
3. Describe a visual concept for a social media post.

If all three outputs feel like they could have been written by the Lime Studio CEO, the tool works.

---

## Deployment

### Vercel Configuration:
*   **Framework Preset:** Next.js
*   **Build Command:** `next build`
*   **Output Directory:** `.next`
*   **Node Version:** 18.x or 20.x
*   **Environment Variables:**
    *   `NEXT_PUBLIC_SUPABASE_URL` (Supabase project URL)
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase anonymous key)

### Domain:
*   Deploy to a subdomain (e.g., `prompt.limestud.io`) or a standalone domain.

### Performance:
*   The form and preview logic is fully client-side. No server-side rendering needed for the form.
*   Use `"use client"` directive for the main form component.
*   Static generation for the landing/marketing page wrapper.
*   The Supabase POST on export is the only network request.

---

## Privacy Policy (Footer Link)

A simple privacy policy page must be included. It should cover:
*   We collect email addresses (optionally) to send updates and tips.
*   We collect form input data to improve our tools and services.
*   We do not sell or share data with third parties.
*   Contact email for data deletion requests.

This page does not need to be elaborate. A single page with clear, plain language is sufficient.

---

## File Structure (Suggested)

```
/app
  /page.tsx                    (Landing / Marketing wrapper)
  /privacy
    /page.tsx                  (Privacy policy page)
  /generator
    /page.tsx                  (Main tool page with split layout)
/components
  /brand-form.tsx              (The full input form with accordions)
  /prompt-preview.tsx          (The live preview card)
  /email-capture-modal.tsx     (The Dialog for email capture)
  /section-brand-core.tsx
  /section-voice-tone.tsx
  /section-visual-palette.tsx
  /section-output-config.tsx
  /badge-multi-select.tsx      (Custom component for tone tag selection)
/lib
  /generate-prompt.ts          (The template string logic)
  /generate-markdown.ts        (The markdown storage format logic)
  /export-pdf.ts               (PDF generation helper)
  /supabase.ts                 (Supabase client and submission helper)
  /types.ts                    (TypeScript interfaces for form state)
```
```

This now covers all four of your strategic requirements. The trust signal is baked into the copy, the email capture is flexible for A/B testing, the silent data storage pipeline is defined, and the branding is subtle. Ready for Cursor.