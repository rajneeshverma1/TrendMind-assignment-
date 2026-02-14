import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { buildPrompt, PostVoice, PostLength } from '@/lib/buildPrompt';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { topic, voice, audience, length } = body;

        if (!topic) {
            return NextResponse.json(
                { error: 'Topic is required' },
                { status: 400 }
            );
        }

        const prompt = buildPrompt({
            voice: (voice as PostVoice) || 'authoritative',
            audience: audience || 'professionals',
            topic: topic,
            length: (length as PostLength) || 'medium',
        });

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional LinkedIn content strategist.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
        });

        const content = completion.choices[0]?.message?.content || '';

        if (!content) {
            throw new Error('Failed to generate content');
        }

        return NextResponse.json({ content });
    } catch (error: any) {
        console.error('Generation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong during generation' },
            { status: 500 }
        );
    }
}
