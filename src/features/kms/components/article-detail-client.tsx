'use client';

import { useQuery } from '@tanstack/react-query';
import { articleByIdOptions } from '@/features/kms/api/queries';
import { articleCategories } from '@/constants/mock-api-kms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import ArticleComments from './article-comments';

function formatDateLong(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

interface ArticleDetailClientProps {
  id: number;
}

export default function ArticleDetailClient({ id }: ArticleDetailClientProps) {
  useRouter(); // Keep for future navigation
  const { data, isLoading, error } = useQuery(articleByIdOptions(id));

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (error || !data?.success || !data.article) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12'>
          <Icons.alertCircle className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Article not found</h3>
          <p className='text-muted-foreground text-center mb-4'>
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href='/dashboard/kms/repository'>Back to Repository</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const article = data.article;
  const category = articleCategories.find((c) => c.value === article.category);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Link href='/dashboard/kms/repository' className='hover:underline'>
            Repository
          </Link>
          <Icons.chevronRight className='h-4 w-4' />
          <span>{category?.label ?? article.category}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' asChild>
            <Link href={`/dashboard/kms/repository/${id}/edit`}>
              <Icons.edit className='mr-2 h-4 w-4' /> Edit
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                <Badge variant='secondary'>{category?.label}</Badge>
                {article.featured && (
                  <Badge variant='outline' className='text-amber-600 border-amber-600'>
                    <Icons.star className='mr-1 h-3 w-3' /> Featured
                  </Badge>
                )}
              </div>
              <CardTitle className='text-2xl'>{article.title}</CardTitle>
            </div>
          </div>
          <div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
            <span className='flex items-center gap-1'>
              <Icons.user className='h-4 w-4' />
              {article.author}
            </span>
            <span className='flex items-center gap-1'>
              <Icons.calendar className='h-4 w-4' />
              Updated {formatDateLong(article.updated_at)}
            </span>
            <span className='flex items-center gap-1'>
              <Icons.eyeOff className='h-4 w-4' />
              {article.views} views
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className='prose prose-sm max-w-none'>
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className={paragraph.startsWith('-') ? 'pl-4' : ''}>
                {paragraph || <br />}
              </p>
            ))}
          </div>

          {article.tags.length > 0 && (
            <div className='mt-8 pt-6 border-t'>
              <h4 className='text-sm font-medium mb-3'>Tags</h4>
              <div className='flex flex-wrap gap-2'>
                {article.tags.map((tag) => (
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

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Helpful Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-3 sm:grid-cols-2'>
            <Link
              href='/dashboard/kms/repository?category=related'
              className='flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50'
            >
              <Icons.fileText className='h-5 w-5 text-muted-foreground' />
              <span className='text-sm'>Related Articles</span>
            </Link>
            <Link
              href='/dashboard/kms/repository'
              className='flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50'
            >
              <Icons.users className='h-5 w-5 text-muted-foreground' />
              <span className='text-sm'>Find an Expert</span>
            </Link>
          </div>
        </CardContent>
      </Card>

      <ArticleComments articleId={article.id} />
    </div>
  );
}

function ArticleDetailSkeleton() {
  return (
    <div className='space-y-6'>
      <Skeleton className='h-4 w-48' />
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-32 mb-2' />
          <Skeleton className='h-10 w-3/4 mb-4' />
          <div className='flex gap-4'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-24' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
