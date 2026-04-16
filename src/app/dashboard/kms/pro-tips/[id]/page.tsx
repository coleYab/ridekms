import { notFound } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import ProTipDetailClient from '@/features/kms/components/pro-tip-detail-client';

export const metadata = {
  title: 'Pro Tip - KMS'
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProTipDetailPage({ params }: PageProps) {
  const { id } = await params;
  const proTipId = parseInt(id, 10);

  if (isNaN(proTipId)) {
    notFound();
  }

  return (
    <PageContainer>
      <ProTipDetailClient id={proTipId} />
    </PageContainer>
  );
}
