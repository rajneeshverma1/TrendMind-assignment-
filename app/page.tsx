'use client';

import React, { useState } from 'react';
import PostForm from '@/components/PostForm';
import OutputCard from '@/components/OutputCard';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastInputs, setLastInputs] = useState<any>(null);

  const handleGenerate = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    setLastInputs(formData);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate post');
      }

      setContent(data.content);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastInputs) {
      handleGenerate(lastInputs);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-slate-100 to-white dark:from-slate-900 dark:via-slate-950 dark:to-black py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold tracking-widest uppercase mb-2">
            <span>Enterprise Content Intelligence</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            LinkedIn Post <span className="text-blue-700 dark:text-blue-500">Generator</span>
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Professional-grade content generation for executives and industry leaders.
            High-impact LinkedIn posts tailored to your voice and audience.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1 transition-all duration-500 ease-in-out">
            <PostForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 sticky top-8 transition-all duration-500 ease-in-out">
            <OutputCard
              content={content}
              isLoading={isLoading}
              error={error}
              onRegenerate={handleRegenerate}
              voice={lastInputs?.voice || '...'}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-400 text-sm pt-8 border-t border-slate-100 dark:border-slate-800">
          <p>© 2026 TrendMind - Made by rajneesh</p>
        </footer>
      </div>
    </main>
  );
}
