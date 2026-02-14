export type PostVoice = 'contrarian' | 'authoritative' | 'friendly' | 'storytelling' | 'data-driven';
export type PostLength = 'short' | 'medium' | 'long';

interface PromptParams {
  voice: PostVoice;
  audience: string;
  topic: string;
  length: PostLength;
}

export function buildPrompt({ voice, audience, topic, length }: PromptParams): string {
  const lengthGuides = {
    short: '≈ 80–120 words',
    medium: '≈ 150–220 words',
    long: '≈ 250–350 words',
  };

  const voiceInstructions = {
    contrarian: 'Challenge common wisdom with a bold, authoritative stance. Provide a unique or counter-intuitive perspective.',
    authoritative: 'Write with deep expertise and confidence. Use strong declarations and a structured, professional tone.',
    friendly: 'A warm, approachable, and professional style. Speak as an industry peer offering helpful advice.',
    storytelling: 'Start with a professional narrative or case study. Use descriptive language to build context before delivering a lesson.',
    'data-driven': 'Focus on statistics, industry trends, and logical deductions. Use clear structure and evidence-based arguments.',
  };

  return `
You are a professional LinkedIn content strategist and advisor for executives and high-level professionals.
Your goal is to write a highly engaging, professional LinkedIn post that demonstrates expertise and encourages industry discussion.

CORE REQUIREMENTS:
- Writing Style: ${voiceInstructions[voice]}
- Target Audience: ${audience}
- Topic: ${topic}
- Target Length: ${lengthGuides[length]}

POST STRUCTURE:
1. HOOK: The first line must be a compelling, professional hook (max 15 words).
2. CORE INSIGHT: Provide a unique perspective or expert insight based on the topic.
3. FORMATTING: Use short paragraphs (1-3 sentences each) for high readability. Use professional spacing.
4. ACTIONABLE TAKEAWAY: Include one clear, valuable industry takeaway.
5. CALL TO ACTION: End with a thoughtful question that invites professional networking or discussion.

CRITICAL RULES:
- Avoid generic marketing clichés or AI-generated filler.
- Ensure the tone is authentic, professional, and sophisticated.
- Maintain the ${voice} voice consistently.
- DO NOT use emojis.
- DO NOT use generic hashtags. Only use if absolutely necessary and highly specific (max 2).
- Focus on providing value to ${audience}.

Return ONLY the post content.
`.trim();
}
