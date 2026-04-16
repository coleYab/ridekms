'use client';

import { useQueryState } from 'nuqs';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { articlesQueryOptions } from '@/features/kms/api/queries';
import { articleCategories } from '@/constants/mock-api-kms';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

function SearchFilters() {
  const [search, setSearch] = useQueryState('search', { shallow: false });
  const [category, setCategory] = useQueryState('category', { shallow: false });

  return (
    <div className='flex flex-col gap-4 sm:flex-row'>
      <div className='relative flex-1'>
        <Icons.search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          placeholder='Search articles...'
          value={search ?? ''}
          onChange={(e) => setSearch(e.target.value || null)}
          className='pl-10'
        />
      </div>
      <Select value={category ?? 'all'} onValueChange={(v) => setCategory(v === 'all' ? null : v)}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Category' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Categories</SelectItem>
          {articleCategories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ArticleCardSkeleton() {
  return (
    <Card>
      <CardContent className='p-4'>
        <Skeleton className='h-5 w-3/4 mb-2' />
        <Skeleton className='h-4 w-full mb-2' />
        <Skeleton className='h-4 w-2/3 mb-4' />
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-20' />
          <Skeleton className='h-4 w-24' />
        </div>
      </CardContent>
    </Card>
  );
}

function ArticlesList() {
  const [search] = useQueryState('search', { shallow: false });
  const [category] = useQueryState('category', { shallow: false });

  const { data, isLoading } = useSuspenseQuery(
    articlesQueryOptions({
      search: search ?? undefined,
      category: category ?? undefined,
      limit: 20
    })
  );

  const getCategoryLabel = (cat: string) => {
    return articleCategories.find((c) => c.value === cat)?.label ?? cat;
  };

  if (isLoading) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (data.articles.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12'>
          <Icons.fileText className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>No articles found</h3>
          <p className='text-muted-foreground text-center mb-4'>
            {search
              ? `No results for "${search}"`
              : 'Get started by creating your first article'}
          </p>
          <Button asChild>
            <Link href='/dashboard/kms/repository/new'>
              <Icons.add className='mr-2 h-4 w-4' /> Create Article
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      <p className='text-sm text-muted-foreground'>
        {data.total_articles} article{data.total_articles !== 1 ? 's' : ''} found
      </p>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {data.articles.map((article) => (
          <Link key={article.id} href={`/dashboard/kms/repository/${article.id}`}>
            <Card className='h-full transition-colors hover:bg-muted/50'>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between gap-2 mb-2'>
                  <h3 className='font-semibold line-clamp-2'>{article.title}</h3>
                  {article.featured && (
                    <Icons.star className='h-4 w-4 flex-shrink-0 text-amber-500' />
                  )}
                </div>
                <p className='text-sm text-muted-foreground line-clamp-3 mb-4'>
                  {article.content.substring(0, 150)}...
                </p>
                <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                  <Badge variant='secondary'>{getCategoryLabel(article.category)}</Badge>
                  <span className='flex items-center gap-1'>
                    <Icons.user className='h-3 w-3' />
                    {article.author}
                  </span>
                  <span className='flex items-center gap-1'>
                    <Icons.eyeOff className='h-3 w-3' />
                    {article.views}
                  </span>
                </div>
                {article.tags.length > 0 && (
                  <div className='flex flex-wrap gap-1 mt-3'>
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className='inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function RepositoryPage() {
  return (
    <div className='space-y-6'>
      <SearchFilters />
      <Suspense fallback={<div>Loading articles...</div>}>
        <ArticlesList />
      </Suspense>
    </div>
  );
}
