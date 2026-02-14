'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { PostVoice, PostLength } from '@/lib/buildPrompt';

interface PostFormProps {
    onGenerate: (data: any) => void;
    isLoading: boolean;
}

export default function PostForm({ onGenerate, isLoading }: PostFormProps) {
    const [voice, setVoice] = useState<PostVoice>('authoritative');
    const [audience, setAudience] = useState('Senior industry professionals');
    const [topic, setTopic] = useState('');
    const [length, setLength] = useState<PostLength>('medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;
        onGenerate({ voice, audience, topic, length });
    };

    const lengths: PostLength[] = ['short', 'medium', 'long'];

    return (
        <Card className="border-border/40 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400">
                    Content Configuration
                </CardTitle>
                <CardDescription>
                    Define parameters for industry-focused LinkedIn content.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="voice">Brand Voice</Label>
                        <Select value={voice} onValueChange={(v) => setVoice(v as PostVoice)}>
                            <SelectTrigger id="voice">
                                <SelectValue placeholder="Select brand voice" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="contrarian">Contrarian Perspective</SelectItem>
                                <SelectItem value="authoritative">Authoritative Expertise</SelectItem>
                                <SelectItem value="friendly">Professional Peer</SelectItem>
                                <SelectItem value="storytelling">Narrative Context</SelectItem>
                                <SelectItem value="data-driven">Analytical Insight</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="audience">Target Audience</Label>
                        <Input
                            id="audience"
                            placeholder="e.g., Senior Executives, Software Engineers"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            className="bg-background/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="topic">Strategic Topic or Insight</Label>
                        <Textarea
                            id="topic"
                            placeholder="Enter the core message, industry trend, or specific insight..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="min-h-[120px] bg-background/50 resize-none font-medium text-sm"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Content Volume</Label>
                        <div className="flex p-1 bg-muted rounded-lg w-full max-w-xs space-x-1">
                            {lengths.map((l) => (
                                <button
                                    key={l}
                                    type="button"
                                    onClick={() => setLength(l)}
                                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${length === l
                                        ? 'bg-background shadow-sm text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {l.charAt(0).toUpperCase() + l.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-sm font-bold tracking-tight transition-all hover:scale-[1.01] active:scale-[0.99] bg-blue-700 hover:bg-blue-800 text-white"
                        disabled={isLoading || !topic.trim()}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                Generate Content
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
