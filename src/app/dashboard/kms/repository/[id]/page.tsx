import { notFound } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import ArticleDetailClient from '@/features/kms/components/article-detail-client';
import { getQueryClient } from '@/lib/query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export const metadata = {
  title: 'Article - KMS'
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const articleId = parseInt(id, 10);

  if (isNaN(articleId)) {
    notFound();
  }

  return (
    <PageContainer>
      <HydrationBoundary state={dehydrate(getQueryClient())}>
        <ArticleDetailClient id={articleId} />
      </HydrationBoundary>
    </PageContainer>
  );
}
