'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Copy, Check, RotateCcw, AlertCircle } from 'lucide-react';

interface OutputCardProps {
    content: string;
    isLoading: boolean;
    error: string | null;
    onRegenerate: () => void;
    voice: string;
}

export default function OutputCard({ content, isLoading, error, onRegenerate, voice }: OutputCardProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        if (!content) return;
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (error) {
        return (
            <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                    <CardTitle className="flex items-center text-destructive text-lg">
                        <AlertCircle className="mr-2 h-5 w-5" />
                        Generation Error
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-destructive/80 text-sm">{error}</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" onClick={onRegenerate} size="sm">
                        Try Again
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card className="border-border/40 shadow-xl overflow-hidden">
                <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </CardContent>
            </Card>
        );
    }

    if (!content) {
        return (
            <Card className="border-dashed border-2 border-border/60 bg-muted/20 flex flex-col items-center justify-center py-20 text-center">
                <CardContent>
                    <p className="text-slate-500 text-sm font-medium">
                        Content generation results will be displayed here.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const charCount = content.length;

    return (
        <Card className="border-border/40 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg font-bold tracking-tight">Generated Output</CardTitle>
                    <Badge variant="secondary" className="capitalize text-[10px] font-bold">
                        {voice}
                    </Badge>
                </div>
                <div className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                    {charCount} Characters
                </div>
            </CardHeader>
            <CardContent className="whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200 font-medium text-sm">
                {content}
            </CardContent>
            <CardFooter className="flex gap-3 justify-end pt-6 border-t border-border/10 bg-muted/5">
                <Button variant="ghost" size="sm" onClick={onRegenerate} className="text-xs font-bold text-muted-foreground hover:text-foreground">
                    <RotateCcw className="mr-2 h-3.5 w-3.5" />
                    Regenerate
                </Button>
                <Button
                    variant={copied ? 'outline' : 'default'}
                    size="sm"
                    onClick={copyToClipboard}
                    className={`text-xs font-bold ${copied ? 'border-green-600/50 text-green-700 bg-green-50/50' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'}`}
                >
                    {copied ? (
                        <>
                            <Check className="mr-2 h-3.5 w-3.5" />
                            Confirmed
                        </>
                    ) : (
                        <>
                            <Copy className="mr-2 h-3.5 w-3.5" />
                            Copy Result
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
