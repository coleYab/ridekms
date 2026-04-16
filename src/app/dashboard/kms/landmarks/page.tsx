import PageContainer from '@/components/layout/page-container';
import LandmarksList from '@/features/kms/components/landmarks-list';
import LanguageSelector from '@/features/kms/components/language-selector';

export const metadata = {
  title: 'Dashboard: Landmark Tagging'
};

export default async function LandmarksPage() {
  return (
    <PageContainer
      pageTitle='Landmark Tagging'
      pageDescription='Location-based knowledge for Ethiopian roads and navigation'
      pageHeaderAction={<LanguageSelector />}
    >
      <div className='mb-6 rounded-lg border bg-muted/50 p-4'>
        <div className='flex items-center gap-3'>
          <div className='text-sm text-muted-foreground'>
            <p>
              <strong>Why Landmarks?</strong> GPS systems are often inaccurate in Ethiopia.
              Landmarks help drivers and customers find locations using well-known reference points
              like churches, mosques, hotels, and markets.
            </p>
          </div>
        </div>
      </div>
      <LandmarksList />
    </PageContainer>
  );
}
