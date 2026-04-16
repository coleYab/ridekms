import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

const bookmarks = [
  { id: 1, type: 'article', title: 'Navigating Addis Traffic', date: '2024-01-20' },
  { id: 2, type: 'landmark', title: 'Holy Trinity Cathedral', date: '2024-01-21' },
  { id: 3, type: 'protip', title: 'Reading Traffic Flow', date: '2024-01-22' }
];

export const metadata = { title: 'Bookmarks - KMS' };

export default function BookmarksPage() {
  const getIcon = (type: string) => {
    if (type === 'article') return Icons.fileText;
    if (type === 'landmark') return Icons.location;
    return Icons.play;
  };

  return (
    <PageContainer pageTitle='My Bookmarks' pageDescription='Saved articles and resources'>
      <div className='space-y-3'>
        {bookmarks.map((item) => {
          const Icon = getIcon(item.type);
          return (
            <Card key={item.id} className='hover:bg-muted/50 transition-colors cursor-pointer'>
              <CardContent className='p-4 flex items-center gap-4'>
                <div className='p-2 bg-muted rounded-lg'>
                  <Icon className='h-5 w-5' />
                </div>
                <div className='flex-1'>
                  <CardTitle className='text-sm'>{item.title}</CardTitle>
                  <p className='text-xs text-muted-foreground'>Saved on {item.date}</p>
                </div>
                <Icons.bookmark className='h-5 w-5 text-amber-500' />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
