'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { expertsOptions } from '@/features/kms/api/queries';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

function ExpertCardSkeleton() {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-start gap-4'>
          <Skeleton className='h-16 w-16 rounded-full' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-5 w-32' />
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-full' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ExpertCard({
  expert
}: {
  expert: {
    id: number;
    name: string;
    role: string;
    expertise: string[];
    yearsOfExperience: number;
    location: string;
    contact: string;
  }
}) {
  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex items-start gap-4'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-primary/10'>
            <Icons.user className='h-7 w-7 text-primary' />
          </div>
          <div>
            <CardTitle className='text-lg'>{expert.name}</CardTitle>
            <p className='text-sm text-muted-foreground'>{expert.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-wrap gap-2'>
          {expert.expertise.map((skill) => (
            <Badge key={skill} variant='secondary'>
              {skill}
            </Badge>
          ))}
        </div>

        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <Icons.clock className='h-4 w-4' />
            {expert.yearsOfExperience} years
          </div>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <Icons.location className='h-4 w-4' />
            {expert.location}
          </div>
        </div>

        <div className='pt-2 border-t'>
          <Button variant='outline' size='sm' className='w-full'>
            <Icons.phone className='mr-2 h-4 w-4' />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExpertsList() {
  const { data, isLoading } = useSuspenseQuery(expertsOptions());

  if (isLoading) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <ExpertCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          {data.experts.length} expert{data.experts.length !== 1 ? 's' : ''} available
        </p>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {data.experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
    </div>
  );
}
