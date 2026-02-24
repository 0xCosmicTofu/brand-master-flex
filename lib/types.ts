export type RoleDefinition =
  | "Chief Brand Officer"
  | "Senior Copywriter"
  | "Social Media Manager"
  | "Design Strategist";

export type PersonalityArchetype =
  | "The Pragmatic Expert: Grounded, direct, efficient"
  | "The Bold Disruptor: Loud, aggressive, provocative"
  | "The Friendly Neighbor: Warm, accessible, simple"
  | "The Futurist: High-level, abstract, visionary";

export type EmotionalTarget =
  | "Trust & Security"
  | "Excitement & Energy"
  | "Curiosity & Mystery"
  | "Comfort & Stability"
  | "Power & Dominance";

export type VisualStyle =
  | "Retro-Futuristic (80s Arcade, Neon, Chunky type)"
  | "Brutalist (Raw, Bold, High Contrast, Monospace)"
  | "Minimalist (Clean, White space, Sans-serif, Airy)"
  | "Cyberpunk (Dark, Neon accents, High-tech, Gritty)"
  | "Institutional (Blue/Grey, Structured, Conservative)";


export const TONE_DO_OPTIONS = [
  "Direct",
  "Concise",
  "Playful",
  "Professional",
  "Technical",
  "Witty",
  "Educational",
  "Conversational",
  "Authoritative",
  "Empathetic",
] as const;

export const TONE_DONT_OPTIONS = [
  "Corporate",
  "Flowery",
  "Buzzword-heavy",
  "Arrogant",
  "Passive",
  "Academic",
  "Sarcastic",
  "Overly Casual",
  "Aggressive",
] as const;

export type ToneDo = (typeof TONE_DO_OPTIONS)[number];
export type ToneDont = (typeof TONE_DONT_OPTIONS)[number];

export interface FormState {
  // Section 1: Brand Core
  brand_name: string;
  role_definition: RoleDefinition;
  target_audience: string;
  value_proposition: string;

  // Section 2: Voice & Tone
  personality_archetype: PersonalityArchetype;
  tone_do_list: ToneDo[];
  tone_dont_list: ToneDont[];
  formatting_rules: string;

  // Section 3: Visual & Emotional Palette
  emotional_target: EmotionalTarget;
  color_keywords: string;
  visual_style: VisualStyle;

}

export const DEFAULT_FORM_STATE: FormState = {
  brand_name: "",
  role_definition: "Chief Brand Officer",
  target_audience: "",
  value_proposition: "",
  personality_archetype: "The Pragmatic Expert: Grounded, direct, efficient",
  tone_do_list: ["Direct", "Concise"],
  tone_dont_list: ["Corporate", "Buzzword-heavy"],
  formatting_rules: "",
  emotional_target: "Trust & Security",
  color_keywords: "",
  visual_style: "Minimalist (Clean, White space, Sans-serif, Airy)",
};
