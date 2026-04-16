'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { proTipsOptions } from '@/features/kms/api/queries';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function ProTipCardSkeleton() {
  return (
    <Card>
      <CardContent className='p-4'>
        <div className='flex items-start gap-3'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProTipCard({ proTip }: { proTip: { id: number; title: string; description: string; duration: number; author: string; role: string; tags: string[]; likes: number; featured: boolean } }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(proTip.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked) {
      setLikesCount((c) => c - 1);
    } else {
      setLikesCount((c) => c + 1);
    }
    setLiked(!liked);
  };

  return (
    <Link href={`/dashboard/kms/pro-tips/${proTip.id}`}>
      <Card className='overflow-hidden hover:bg-muted/50 transition-colors cursor-pointer h-full'>
        <CardHeader className='pb-3'>
          <div className='flex items-start justify-between gap-2'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-1'>
                {proTip.featured && (
                  <Badge variant='outline' className='text-amber-600 border-amber-600 text-xs'>
                    <Icons.star className='mr-1 h-3 w-3' /> Featured
                  </Badge>
                )}
                <Badge variant='secondary' className='text-[10px] uppercase font-bold tracking-wider'>
                  Audio Bulletin
                </Badge>
              </div>
              <CardTitle className='text-lg leading-tight'>{proTip.title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-sm text-muted-foreground line-clamp-2'>{proTip.description}</p>
          
          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
            <span className='flex items-center gap-1'>
              <Icons.user className='h-4 w-4' />
              {proTip.author}
            </span>
            <span className='text-xs bg-muted px-2 py-1 rounded'>{proTip.role}</span>
          </div>

          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' className='flex-1 bg-green-50 hover:bg-green-100 border-green-200 text-green-700'>
              <Icons.play className='mr-2 h-4 w-4' />
              Listen
            </Button>
            <Button 
              variant='ghost' 
              size='sm' 
              className={cn('h-8 px-2 gap-1.5', liked && 'text-red-500 bg-red-50')}
              onClick={handleLike}
            >
              <Icons.heart className={cn('h-4 w-4', liked && 'fill-current')} />
              <span className='text-xs font-medium'>{likesCount}</span>
            </Button>
            <span className='flex items-center gap-1 text-xs text-muted-foreground ml-auto'>
              <Icons.clock className='h-3 w-3' />
              {formatDuration(proTip.duration)}
            </span>
          </div>

          {proTip.tags.length > 0 && (
            <div className='flex flex-wrap gap-1 pt-2 border-t'>
              {proTip.tags.slice(0, 3).map((tag) => (
                <span key={tag} className='inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px]'>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ProTipsList() {
  const { data, isLoading } = useSuspenseQuery(proTipsOptions());

  if (isLoading) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProTipCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const featuredTips = data.proTips.filter((t) => t.featured);
  const otherTips = data.proTips.filter((t) => !t.featured);

  return (
    <div className='space-y-8'>
      {featuredTips.length > 0 && (
        <section>
          <h2 className='text-lg font-semibold mb-4 flex items-center gap-2'>
            <Icons.star className='h-5 w-5 text-amber-500' />
            Featured Tips
          </h2>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {featuredTips.map((tip) => (
              <ProTipCard key={tip.id} proTip={tip} />
            ))}
          </div>
        </section>
      )}

      {otherTips.length > 0 && (
        <section>
          <h2 className='text-lg font-semibold mb-4'>All Tips</h2>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {otherTips.map((tip) => (
              <ProTipCard key={tip.id} proTip={tip} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
