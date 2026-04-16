import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const collections = [
  { id: 1, name: 'Navigation Essentials', description: 'Essential navigation tips and landmarks', items: 4, public: true },
  { id: 2, name: 'Safety Procedures', description: 'All safety-related content', items: 6, public: false }
];

export const metadata = { title: 'Collections - KMS' };

export default function CollectionsPage() {
  return (
    <PageContainer pageTitle='My Collections' pageDescription='Organized knowledge collections'>
      <div className='grid gap-4 md:grid-cols-2'>
        {collections.map((collection) => (
          <Card key={collection.id} className='hover:bg-muted/50 transition-colors cursor-pointer'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>{collection.name}</CardTitle>
                <Badge variant={collection.public ? 'default' : 'secondary'}>
                  {collection.public ? 'Public' : 'Private'}
                </Badge>
              </div>
              <CardDescription>{collection.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>{collection.items} items</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
