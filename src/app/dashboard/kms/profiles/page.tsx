import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';

const profiles = [
  { id: 1, name: 'Tadesse K.', role: 'Senior Driver', expertise: ['Navigation', 'Customer Service'], articles: 12, tips: 8 },
  { id: 2, name: 'Almaz G.', role: 'Lead Dispatcher', expertise: ['Conflict Resolution', 'Training'], articles: 8, tips: 5 }
];

export const metadata = { title: 'User Profiles - KMS' };

export default function ProfilesPage() {
  return (
    <PageContainer pageTitle='User Profiles' pageDescription='Contributor profiles and activity'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {profiles.map((profile) => (
          <Card key={profile.id}>
            <CardHeader className='pb-2'>
              <div className='flex items-center gap-3'>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
                  <Icons.user className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <CardTitle className='text-base'>{profile.name}</CardTitle>
                  <p className='text-sm text-muted-foreground'>{profile.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex flex-wrap gap-1'>
                {profile.expertise.map((exp) => (
                  <Badge key={exp} variant='secondary' className='text-xs'>{exp}</Badge>
                ))}
              </div>
              <div className='flex gap-4 text-sm text-muted-foreground'>
                <span>{profile.articles} articles</span>
                <span>{profile.tips} tips</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
