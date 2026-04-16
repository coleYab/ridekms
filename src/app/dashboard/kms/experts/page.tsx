import PageContainer from '@/components/layout/page-container';
import ExpertsList from '@/features/kms/components/experts-list';

export const metadata = {
  title: 'Dashboard: Expert Locator'
};

export default async function ExpertsPage() {
  return (
    <PageContainer
      pageTitle='Expert Locator'
      pageDescription='Find experienced staff who can help with your questions'
    >
      <ExpertsList />
    </PageContainer>
  );
}
