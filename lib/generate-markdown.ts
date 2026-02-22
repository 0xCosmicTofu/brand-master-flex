import { FormState } from "./types";

interface MarkdownOptions {
  email: string;
  sessionId: string;
  generatedPrompt: string;
  formState: FormState;
}

export function generateMarkdown({
  email,
  sessionId,
  generatedPrompt,
  formState,
}: MarkdownOptions): string {
  const timestamp = new Date().toISOString();
  const {
    brand_name,
    role_definition,
    target_audience,
    value_proposition,
    personality_archetype,
    tone_do_list,
    tone_dont_list,
    formatting_rules,
    emotional_target,
    color_keywords,
    visual_style,
  } = formState;

  return `# Brand Identity Submission
## Metadata
- **Timestamp:** ${timestamp}
- **Email:** ${email}
- **Session ID:** ${sessionId}

## Brand Core
- **Brand Name:** ${brand_name || "—"}
- **AI Agent Role:** ${role_definition}
- **Target Audience:** ${target_audience || "—"}
- **Value Proposition:** ${value_proposition || "—"}

## Voice & Tone
- **Personality Archetype:** ${personality_archetype}
- **Tone DO:** ${tone_do_list.join(", ") || "—"}
- **Tone DON'T:** ${tone_dont_list.join(", ") || "—"}
- **Formatting Rules:** ${formatting_rules || "—"}

## Visual & Emotional Palette
- **Emotional Target:** ${emotional_target}
- **Color Keywords:** ${color_keywords || "—"}
- **Visual Style:** ${visual_style}

## Generated Prompt
${generatedPrompt}
`;
}
