import { notFound } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import ArticleForm from '@/features/kms/components/article-form';
import { getQueryClient } from '@/lib/query-client';
import { articleByIdOptions } from '@/features/kms/api/queries';

export const metadata = {
  title: 'Edit Article - KMS'
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const articleId = parseInt(id, 10);

  if (isNaN(articleId)) {
    notFound();
  }

  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(articleByIdOptions(articleId));

  if (!data.success || !data.article) {
    notFound();
  }

  return (
    <PageContainer>
      <ArticleForm initialData={data.article} pageTitle='Edit Article' />
    </PageContainer>
  );
}
