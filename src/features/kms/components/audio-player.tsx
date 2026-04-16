'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  src?: string;
  title: string;
  author: string;
  duration: number;
  onBookmark?: (position: number) => void;
  initialPosition?: number;
  className?: string;
}

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({
  src = '/audio/sample.mp3',
  title,
  author,
  duration,
  onBookmark,
  initialPosition = 0,
  className
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialPosition);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [volume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSeek = useCallback((value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  }, []);

  const handleSpeedChange = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
  }, []);

  const handleBookmark = useCallback(() => {
    if (onBookmark) {
      onBookmark(currentTime);
    }
    setIsBookmarked(!isBookmarked);
  }, [currentTime, onBookmark, isBookmarked]);

  const skipForward = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 10, duration);
  }, [duration]);

  const skipBackward = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn('rounded-lg border bg-card p-4 space-y-4', className)}>
      <audio ref={audioRef} src={src} preload='metadata'>
        <track kind='captions' label='English' default />
      </audio>

      <div className='flex items-start gap-3'>
        <Button
          variant='outline'
          size='icon'
          className={cn(
            'h-12 w-12 rounded-full shrink-0 transition-all',
            isPlaying && 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Icons.pause className='h-5 w-5' />
          ) : (
            <Icons.play className='h-5 w-5 ml-0.5' />
          )}
        </Button>

        <div className='flex-1 min-w-0'>
          <p className='font-medium text-sm truncate'>{title}</p>
          <p className='text-xs text-muted-foreground truncate'>{author}</p>
        </div>
      </div>

      <div className='space-y-2'>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSeek}
          className='cursor-pointer'
        />
        <div className='flex justify-between text-xs text-muted-foreground'>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <Button variant='ghost' size='icon' className='h-8 w-8' onClick={skipBackward}>
            <Icons.replay className='h-4 w-4' />
            <span className='sr-only'>Skip back 10s</span>
          </Button>

          <Button variant='ghost' size='icon' className='h-8 w-8' onClick={skipForward}>
            <Icons.forward className='h-4 w-4' />
            <span className='sr-only'>Skip forward 10s</span>
          </Button>

          <Button
            variant='ghost'
            size='icon'
            className={cn('h-8 w-8', isBookmarked && 'text-amber-500')}
            onClick={handleBookmark}
          >
            <Icons.bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
            <span className='sr-only'>Bookmark</span>
          </Button>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <Icons.volumeOff className='h-4 w-4' />
            ) : (
              <Icons.volume className='h-4 w-4' />
            )}
            <span className='sr-only'>{isMuted ? 'Unmute' : 'Mute'}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm' className='text-xs h-7 px-2'>
                {playbackSpeed}x
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {playbackSpeeds.map((speed) => (
                <DropdownMenuItem
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={cn(playbackSpeed === speed && 'bg-muted')}
                >
                  {speed}x
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <div className='flex-1 h-1 bg-muted rounded-full overflow-hidden'>
          <div
            className='h-full bg-primary transition-all'
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
