import PageContainer from '@/components/layout/page-container';
import ArticleForm from '@/features/kms/components/article-form';

export const metadata = {
  title: 'Create Article - KMS'
};

export default async function NewArticlePage() {
  return (
    <PageContainer>
      <ArticleForm initialData={null} pageTitle='Create New Article' />
    </PageContainer>
  );
}
