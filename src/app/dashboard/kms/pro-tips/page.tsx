import PageContainer from '@/components/layout/page-container';
import ProTipsList from '@/features/kms/components/pro-tips-list';

export const metadata = {
  title: 'Dashboard: Weekly Pro Tips'
};

export default async function ProTipsPage() {
  return (
    <PageContainer
      pageTitle='Weekly Pro Tips'
      pageDescription='Audio knowledge sharing from experienced staff'
    >
      <ProTipsList />
    </PageContainer>
  );
}
