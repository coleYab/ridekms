import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';

const huddles = [
  {
    id: 1,
    title: 'Traffic Navigation Tips',
    date: '2024-02-15',
    host: 'Tadesse K.',
    status: 'completed',
    participants: 4,
    recordingUrl: '/dashboard/kms/huddles/recording-1'
  },
  {
    id: 2,
    title: 'Customer Service Excellence',
    date: '2024-02-22',
    host: 'Almaz G.',
    status: 'scheduled',
    participants: 3
  }
];

export const metadata = { title: 'Community Huddles - KMS' };

export default function HuddlesPage() {
  return (
    <PageContainer
      pageTitle='Community Huddles'
      pageDescription='Weekly knowledge sharing sessions'
    >
      <div className='grid gap-4 md:grid-cols-2'>
        {huddles.map((huddle) => (
          <Card key={huddle.id}>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>{huddle.title}</CardTitle>
                <Badge variant={huddle.status === 'completed' ? 'secondary' : 'default'}>
                  {huddle.status}
                </Badge>
              </div>
              <CardDescription>
                Hosted by {huddle.host} on {huddle.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                <span className='flex items-center gap-1'>
                  <Icons.users className='h-4 w-4' />
                  {huddle.participants} participants
                </span>
                {huddle.recordingUrl && (
                  <span className='flex items-center gap-1'>
                    <Icons.video className='h-4 w-4' />
                    Recording available
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
