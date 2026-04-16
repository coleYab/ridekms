'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { lessonsOptions } from '@/features/kms/api/queries';
import { Skeleton } from '@/components/ui/skeleton';

function getImpactColor(impact: 'high' | 'medium' | 'low') {
  switch (impact) {
    case 'high':
      return 'text-red-600 bg-red-100 border-red-200';
    case 'medium':
      return 'text-amber-600 bg-amber-100 border-amber-200';
    case 'low':
      return 'text-green-600 bg-green-100 border-green-200';
  }
}

function LessonCardSkeleton() {
  return (
    <Card>
      <CardContent className='p-4'>
        <div className='space-y-3'>
          <Skeleton className='h-5 w-3/4' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
          <div className='flex gap-2'>
            <Skeleton className='h-5 w-16' />
            <Skeleton className='h-5 w-24' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LessonCard({
  lesson
}: {
  lesson: {
    id: number;
    title: string;
    description: string;
    category: string;
    created_at: string;
    author: string;
    impact: 'high' | 'medium' | 'low';
  };
}) {
  return (
    <Card className='hover:bg-muted/30 transition-colors'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-2'>
          <CardTitle className='text-base leading-tight pr-2'>{lesson.title}</CardTitle>
          <Badge className={getImpactColor(lesson.impact)} variant='outline'>
            {lesson.impact.toUpperCase()} IMPACT
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        <p className='text-sm text-muted-foreground'>{lesson.description}</p>
        <div className='flex items-center justify-between pt-2 border-t text-xs text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary'>{lesson.category}</Badge>
          </div>
          <div className='flex items-center gap-2'>
            <Icons.user className='h-3 w-3' />
            <span>{lesson.author}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import SentimentHarvesting from './sentiment-harvesting';

export default function LessonsList() {
  const { data, isLoading } = useSuspenseQuery(lessonsOptions());

  if (isLoading) {
    return (
      <div className='space-y-4'>
        {Array.from({ length: 6 }).map((_, i) => (
          <LessonCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const sortedLessons = [...data.lessons].toSorted((a, b) => {
    const impactOrder = { high: 0, medium: 1, low: 2 };
    return impactOrder[a.impact] - impactOrder[b.impact];
  });

  return (
    <div className='space-y-8'>
      <section>
        <SentimentHarvesting />
      </section>

      <section>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold flex items-center gap-2'>
            <Icons.page className='h-5 w-5 text-amber-500' />
            Searchable Dispatch Lessons
          </h2>
          <div className='flex items-center gap-4 text-xs'>
            <span className='flex items-center gap-1'>
              <span className='h-2 w-2 rounded-full bg-red-500' />
              High Impact
            </span>
            <span className='flex items-center gap-1'>
              <span className='h-2 w-2 rounded-full bg-amber-500' />
              Medium Impact
            </span>
            <span className='flex items-center gap-1'>
              <span className='h-2 w-2 rounded-full bg-green-500' />
              Low Impact
            </span>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-1'>
            {sortedLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
