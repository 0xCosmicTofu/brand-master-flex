import { FormState } from "./types";

export function generatePrompt(state: FormState): string {
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
  } = state;

  const lines: string[] = [];

  const header = brand_name
    ? `You are the ${role_definition} for ${brand_name}.`
    : `You are a ${role_definition}.`;

  lines.push(header);
  lines.push("");

  // CORE IDENTITY
  const hasCoreContent = target_audience || value_proposition;
  if (hasCoreContent) {
    lines.push("# CORE IDENTITY");
    if (target_audience) {
      lines.push(`Your primary audience is: ${target_audience}.`);
    }
    if (value_proposition) {
      lines.push(`Our core value proposition is: ${value_proposition}.`);
      lines.push(
        "Every piece of content you generate must reinforce this value proposition."
      );
    }
    lines.push("");
  }

  // VOICE & TONE
  lines.push("# VOICE & TONE");
  lines.push(`Your personality archetype is: ${personality_archetype}.`);
  lines.push("");

  if (tone_do_list.length > 0) {
    lines.push("When writing content, you MUST embody these qualities:");
    tone_do_list.forEach((t) => lines.push(`- ${t}`));
    lines.push("");
  } else {
    lines.push(
      "[Define your tone qualities to populate this section]"
    );
    lines.push("");
  }

  if (tone_dont_list.length > 0) {
    lines.push("You must STRICTLY AVOID these qualities:");
    tone_dont_list.forEach((t) => lines.push(`- ${t}`));
    lines.push("");
  }

  if (formatting_rules) {
    lines.push(
      "Formatting and syntax rules you must always follow:"
    );
    lines.push(formatting_rules);
    lines.push("");
  }

  // VISUAL & EMOTIONAL PALETTE
  const hasVisualContent = emotional_target || color_keywords || visual_style;
  if (hasVisualContent) {
    lines.push("# VISUAL & EMOTIONAL PALETTE");
    lines.push(
      "When describing visuals, suggesting imagery, or generating image prompts, adhere to these guidelines:"
    );
    lines.push("");
    if (emotional_target) {
      lines.push(
        `Emotional Target: All visual content should evoke a feeling of ${emotional_target}.`
      );
    }
    if (visual_style) {
      lines.push(`Visual Style: ${visual_style}.`);
    }
    if (color_keywords) {
      lines.push(`Color Palette Keywords: ${color_keywords}.`);
    }
    lines.push("");
  }

  // RULES
  lines.push("# RULES");
  lines.push("1. Never deviate from this brand identity.");
  lines.push(
    "2. If you are unsure about a specific detail, default to the constraints defined above."
  );
  lines.push(
    "3. Do not hallucinate brand details. If you do not have the information, ask the user."
  );
  lines.push(
    "4. Maintain consistency across all outputs. Every response should feel like it came from the same voice."
  );

  return lines.join("\n");
}
