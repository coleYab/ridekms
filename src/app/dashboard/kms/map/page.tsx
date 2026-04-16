import { Suspense } from 'react';
import { getDashboardStats } from '@/features/kms/api/service';
import KmsDashboardClient from '@/features/kms/components/kms-dashboard-client';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Street Intelligence | Ride KMS'
};

export default async function Page() {
  const { stats } = await getDashboardStats();

  return (
    <div className="p-6 md:p-10 bg-green-50/30 min-h-screen">
      <Suspense fallback={<Skeleton className="h-screen w-full" />}>
        <KmsDashboardClient stats={stats} />
      </Suspense>
    </div>
  );
}
