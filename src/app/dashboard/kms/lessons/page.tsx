import PageContainer from '@/components/layout/page-container';
import LessonsList from '@/features/kms/components/lessons-list';

export const metadata = {
  title: 'Dashboard: Lessons Learned'
};

export default async function LessonsPage() {
  return (
    <PageContainer
      pageTitle='Lessons Learned'
      pageDescription='Case studies and operational insights captured from experience'
    >
      <LessonsList />
    </PageContainer>
  );
}
