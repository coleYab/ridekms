import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import RepositoryPage from '@/features/kms/components/repository-list';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard: Knowledge Repository'
};

export default async function RepositoryRoutePage() {
  return (
    <PageContainer
      pageTitle='Knowledge Repository'
      pageDescription='Search and browse knowledge articles'
      pageHeaderAction={
        <Link href='/dashboard/kms/repository/new' className={cn(buttonVariants(), 'text-xs md:text-sm')}>
          <Icons.add className='mr-2 h-4 w-4' /> New Article
        </Link>
      }
    >
      <RepositoryPage />
    </PageContainer>
  );
}
