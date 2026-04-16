import PageContainer from '@/components/layout/page-container';
import { getQueryClient } from '@/lib/query-client';
import { dashboardStatsOptions } from '@/features/kms/api/queries';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import KmsDashboardClient from '@/features/kms/components/kms-dashboard-client';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard: KMS'
};

export default async function KmsPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(dashboardStatsOptions());

  return (
    <PageContainer
      pageTitle='Knowledge Management'
      pageDescription='Centralized knowledge base for Ride operations'
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <KmsDashboardData />
        </Suspense>
      </HydrationBoundary>
    </PageContainer>
  );
}

async function KmsDashboardData() {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(dashboardStatsOptions());
  return <KmsDashboardClient stats={data.stats} />;
}
