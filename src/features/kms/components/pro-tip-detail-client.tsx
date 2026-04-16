'use client';

import { useQuery } from '@tanstack/react-query';
import { proTipByIdOptions } from '@/features/kms/api/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import AudioPlayer from '@/features/kms/components/audio-player';
import { useLanguage } from '@/features/kms/components/language-provider';

function formatDateLong(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

interface ProTipDetailClientProps {
  id: number;
}

export default function ProTipDetailClient({ id }: ProTipDetailClientProps) {
  const { data, isLoading, error } = useQuery(proTipByIdOptions(id));
  const [bookmarkedPosition, setBookmarkedPosition] = useState<number | null>(null);
  const { t } = useLanguage();

  if (isLoading) {
    return <ProTipDetailSkeleton />;
  }

  if (error || !data?.success || !data.proTip) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12'>
          <Icons.alertCircle className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Pro Tip not found</h3>
          <p className='text-muted-foreground text-center mb-4'>
            This pro tip doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href='/dashboard/kms/pro-tips'>Back to Pro Tips</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const proTip = data.proTip;

  const handleBookmark = (position: number) => {
    setBookmarkedPosition(position);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <Link href='/dashboard/kms/pro-tips' className='hover:underline'>
          Pro Tips
        </Link>
        <Icons.chevronRight className='h-4 w-4' />
        <span>Detail</span>
      </div>

      <AudioPlayer
        src={proTip.audioUrl}
        title={proTip.title}
        author={proTip.author}
        duration={proTip.duration}
        onBookmark={handleBookmark}
        initialPosition={bookmarkedPosition ?? 0}
        className='max-w-2xl'
      />

      {bookmarkedPosition !== null && (
        <Card className='max-w-2xl bg-amber-50 border-amber-200'>
          <CardContent className='py-3 flex items-center gap-2'>
            <Icons.bookmark className='h-4 w-4 text-amber-600' />
            <span className='text-sm'>
              Position saved at {Math.floor(bookmarkedPosition / 60)}:{String(Math.floor(bookmarkedPosition % 60)).padStart(2, '0')}
            </span>
            <Button
              variant='ghost'
              size='sm'
              className='ml-auto h-7 text-xs'
              onClick={() => setBookmarkedPosition(null)}
            >
              Clear
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className='max-w-2xl'>
        <CardHeader>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                {proTip.featured && (
                  <Badge variant='outline' className='text-amber-600 border-amber-600'>
                    <Icons.star className='mr-1 h-3 w-3' /> Featured
                  </Badge>
                )}
              </div>
              <CardTitle className='text-2xl'>{proTip.title}</CardTitle>
            </div>
          </div>
          <div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
            <span className='flex items-center gap-1'>
              <Icons.user className='h-4 w-4' />
              {proTip.author}
            </span>
            <span className='text-xs bg-muted px-2 py-1 rounded'>{proTip.role}</span>
            <span className='flex items-center gap-1'>
              <Icons.calendar className='h-4 w-4' />
              {formatDateLong(proTip.created_at)}
            </span>
            <span className='flex items-center gap-1'>
              <Icons.heart className='h-4 w-4' />
              {proTip.likes} likes
            </span>
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div>
            <h4 className='font-medium mb-2'>{t({ en: 'Description', am: 'ማብራሪያ', or: 'Gabaa' })}</h4>
            <p className='text-muted-foreground'>{proTip.description}</p>
          </div>

          {proTip.tags.length > 0 && (
            <div>
              <h4 className='font-medium mb-2'>Tags</h4>
              <div className='flex flex-wrap gap-2'>
                {proTip.tags.map((tag) => (
                  <span
                    key={tag}
                    className='inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ProTipDetailSkeleton() {
  return (
    <div className='space-y-6 max-w-2xl'>
      <Skeleton className='h-4 w-32' />
      <Skeleton className='h-48 w-full rounded-lg' />
      <Card>
        <CardHeader>
          <Skeleton className='h-8 w-3/4 mb-2' />
          <div className='flex gap-4'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-24' />
          </div>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
        </CardContent>
      </Card>
    </div>
  );
}
