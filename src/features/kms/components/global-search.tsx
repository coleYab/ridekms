'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { searchAllOptions } from '@/features/kms/api/queries';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const { data, isLoading } = useQuery(searchAllOptions(query));

  // Shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div 
        className="flex items-center gap-3 bg-muted/50 border border-muted-foreground/10 rounded-2xl px-4 py-3 cursor-text group transition-all focus-within:ring-2 focus-within:ring-green-500/20 focus-within:bg-card focus-within:border-green-500/50"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-5 w-5 text-muted-foreground group-focus-within:text-green-600" />
        <input 
          type="text"
          placeholder="Search street intelligence, landmarks, or pro-tips... (Ctrl+K)"
          className="bg-transparent border-none outline-none flex-1 text-sm font-medium"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <AnimatePresence>
        {isOpen && query.length > 2 && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-background/10 backdrop-blur-[1px]" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[480px] overflow-y-auto bg-card border rounded-2xl shadow-2xl p-2 custom-scrollbar"
            >
              {isLoading ? (
                <div className="p-12 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                   <Icons.spinner className="h-8 w-8 animate-spin" />
                   <p className="text-sm font-medium">Scanning Repository...</p>
                </div>
              ) : data?.results?.length ? (
                <div className="space-y-1">
                  {data.results.map((result: any, i: number) => (
                    <div 
                      key={`${result.type}-${result.id}-${i}`}
                      onClick={() => {
                        const path = result.type === 'article' ? `/dashboard/kms/repository/${result.id}` :
                                     result.type === 'landmark' ? `/dashboard/kms/map?id=${result.id}` :
                                     `/dashboard/kms/pro-tips/${result.id}`;
                        router.push(path);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors group"
                    >
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                        result.type === 'article' ? "bg-blue-100 text-blue-600" :
                        result.type === 'landmark' ? "bg-amber-100 text-amber-600" :
                        "bg-green-100 text-green-600"
                      )}>
                        {result.type === 'article' ? <Icons.fileText className="h-5 w-5" /> :
                         result.type === 'landmark' ? <Icons.location className="h-5 w-5" /> :
                         <Icons.play className="h-5 w-5 fill-current" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold truncate text-sm">
                            {result.title || result.name}
                          </span>
                          <Badge variant="outline" className="text-[10px] uppercase font-bold py-0 h-4">
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate opacity-70">
                          {result.content || result.description || result.notes}
                        </p>
                      </div>

                      <Icons.chevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                   <Icons.alertCircle className="h-8 w-8" />
                   <p className="text-sm font-medium">No intelligence found for "{query}"</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isOpen, setIsOpen };
}
