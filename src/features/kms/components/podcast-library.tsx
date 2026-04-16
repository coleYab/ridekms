'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { proTipsOptions } from '@/features/kms/api/queries';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function PodcastLibrary() {
  const { data } = useSuspenseQuery(proTipsOptions());
  const [activeTipId, setActiveTipId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [searchQuery, setSearchQuery] = useState('');
  
  const activeTip = data.proTips.find(t => t.id === activeTipId) || data.proTips[0];
  
  const filteredTips = data.proTips.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const togglePlay = (id?: number) => {
    if (id && id !== activeTipId) {
      setActiveTipId(id);
      setIsPlaying(true);
      setProgress(0);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Mock progress increment
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[600px]">
      {/* Left Sidebar: Library List */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="relative">
          <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search pro-tips, series, or tags..."
            className="w-full bg-muted/50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {filteredTips.map((tip) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => setActiveTipId(tip.id)}
            >
              <Card className={cn(
                "group cursor-pointer border-none transition-all duration-300",
                activeTipId === tip.id ? "bg-green-600 text-white shadow-lg shadow-green-200" : "bg-card hover:bg-muted"
              )}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                    activeTipId === tip.id ? "bg-white/20" : "bg-green-100 text-green-600"
                  )}>
                    {activeTipId === tip.id && isPlaying ? (
                       <motion.div 
                        animate={{ scaleY: [1, 1.5, 1] }} 
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="flex gap-0.5 items-end h-6"
                       >
                         {[1,2,3].map(i => <div key={i} className="w-1 bg-current rounded-full" style={{ height: `${i*30}%` }} />)}
                       </motion.div>
                    ) : (
                      <Icons.play className="h-6 w-6 fill-current" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      {tip.seriesTitle && (
                        <span className={cn(
                          "text-[10px] uppercase font-bold tracking-wider opacity-70",
                          activeTipId === tip.id ? "text-white" : "text-green-600"
                        )}>
                          {tip.seriesTitle} • Ep {tip.episodeNumber}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold truncate">{tip.title}</h3>
                    <p className={cn(
                      "text-xs truncate opacity-70",
                      activeTipId === tip.id ? "text-white" : "text-muted-foreground"
                    )}>
                      {tip.author} • {formatDuration(tip.duration)}
                    </p>
                  </div>

                  {activeTipId === tip.id && (
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Content: Active Player & Transcript */}
      <div className="lg:w-[400px] flex flex-col gap-6">
        <Card className="border-none bg-gradient-to-br from-green-500 to-green-700 text-white overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <Icons.globe className="h-48 w-48 rotate-12" />
          </div>
          
          <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
            <motion.div 
              key={activeTip?.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-48 h-48 bg-white/10 rounded-3xl backdrop-blur-md mb-8 flex items-center justify-center shadow-inner border border-white/20"
            >
               {activeTip?.featured ? (
                 <Icons.star className="h-20 w-20 text-yellow-300 fill-yellow-300 animate-pulse" />
               ) : (
                 <Icons.user className="h-20 w-20 text-white/40" />
               )}
            </motion.div>

            <h2 className="text-2xl font-black mb-2 line-clamp-2">{activeTip?.title}</h2>
            <p className="text-white/80 font-medium mb-6">{activeTip?.author} — {activeTip?.role}</p>

            <div className="w-full space-y-4">
              <div className="space-y-1">
                <Slider 
                  value={[progress]} 
                  max={100} 
                  step={0.1} 
                  className="[&>[role=slider]]:bg-white [&>[role=slider]]:border-none"
                  onValueChange={(val) => setProgress(val[0])}
                />
                <div className="flex justify-between text-[10px] font-bold opacity-70">
                  <span>{formatDuration((activeTip?.duration || 0) * (progress / 100))}</span>
                  <span>{formatDuration(activeTip?.duration || 0)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-12 w-12">
                   <Icons.replay className="h-6 w-6" />
                </Button>
                <Button 
                  onClick={() => togglePlay()}
                  className="bg-white text-green-600 hover:bg-green-50 rounded-full h-16 w-16 shadow-xl transition-transform hover:scale-110 active:scale-95"
                >
                  {isPlaying ? <Icons.pause className="h-8 w-8 fill-current" /> : <Icons.play className="h-8 w-8 fill-current ml-1" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-12 w-12">
                   <Icons.forward className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                 <Icons.volume className="h-4 w-4 opacity-70" />
                 <Slider 
                   value={[volume]} 
                   max={100} 
                   className="flex-1 [&>[role=slider]]:h-3 [&>[role=slider]]:w-3 [&>[role=slider]]:bg-white"
                   onValueChange={(val) => setVolume(val[0])}
                 />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 border-none bg-muted/30 overflow-hidden flex flex-col">
           <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Expert Transcript</h3>
              <Badge variant="outline" className="text-[10px] border-green-200 text-green-700 bg-green-50">Translated: Amharic</Badge>
           </div>
           <div className="p-6 overflow-y-auto text-sm leading-relaxed text-muted-foreground/80 italic font-medium flex-1 custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTip?.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {activeTip?.transcript || "Transcript not available for this session. Our expert shared tactical street intelligence through direct audio briefing."}
                </motion.div>
              </AnimatePresence>
           </div>
        </Card>
      </div>
    </div>
  );
}
