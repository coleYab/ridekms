'use client';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { landmarksOptions } from '@/features/kms/api/queries';
import { landmarkCategories, type Landmark } from '@/constants/mock-api-kms';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import LanguageSelector from '@/features/kms/components/language-selector';
import LandmarkMap from '@/features/kms/components/landmark-map';

function getCategoryIcon(category: string) {
  switch (category) {
    case 'church':
      return Icons.fileText;
    case 'mosque':
      return Icons.fileText;
    case 'hotel':
      return Icons.fileText;
    case 'restaurant':
      return Icons.fileText;
    case 'market':
      return Icons.fileText;
    case 'hospital':
      return Icons.phone;
    case 'school':
      return Icons.fileText;
    case 'government':
      return Icons.fileText;
    case 'landmark':
      return Icons.location;
    default:
      return Icons.location;
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'church':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'mosque':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'hotel':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'restaurant':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'market':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'hospital':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'school':
      return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'government':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'landmark':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

function LandmarkCardSkeleton() {
  return (
    <Card>
      <CardContent className='p-4'>
        <div className='flex items-start gap-3'>
          <Skeleton className='h-10 w-10 rounded-lg' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LandmarkCard({
  landmark
}: {
  landmark: {
    id: number;
    name: string;
    nameAmharic: string;
    nameOromo: string;
    description: string;
    category: string;
    notes: string;
    verified: boolean;
    author: string;
  };
}) {
  const Icon = getCategoryIcon(landmark.category);
  const colorClass = getCategoryColor(landmark.category);
  const categoryLabel = landmarkCategories.find((c) => c.value === landmark.category)?.label ?? landmark.category;

  return (
    <Card className='hover:bg-muted/30 transition-colors'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex items-start gap-3'>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${colorClass}`}>
              <Icon className='h-5 w-5' />
            </div>
            <div>
              <CardTitle className='text-base leading-tight'>{landmark.name}</CardTitle>
              {landmark.verified && (
                <Badge variant='outline' className='mt-1 text-xs text-green-600 border-green-600'>
                  <Icons.badgeCheck className='mr-1 h-3 w-3' /> Verified
                </Badge>
              )}
            </div>
          </div>
          <Badge variant='secondary' className='text-xs'>{categoryLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        <p className='text-sm text-muted-foreground'>{landmark.description}</p>
        
        <div className='space-y-1 text-xs text-muted-foreground'>
          <p className='font-medium'>Local Names:</p>
          <p>🇪🇹 {landmark.nameAmharic}</p>
          <p>🇴🇲 {landmark.nameOromo}</p>
        </div>

        {landmark.notes && (
          <div className='pt-2 border-t'>
            <p className='text-xs text-muted-foreground'>
              <span className='font-medium'>Notes:</span> {landmark.notes}
            </p>
          </div>
        )}

        <div className='pt-2 border-t flex items-center justify-between text-xs text-muted-foreground'>
          <span>Added by {landmark.author}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LandmarksList() {
  const [category, setCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  
  const { data, isLoading } = useSuspenseQuery(
    landmarksOptions(category === 'all' ? undefined : category)
  );

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between gap-4 flex-wrap'>
        <div className='flex items-center gap-4'>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Filter by category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Categories</SelectItem>
              {landmarkCategories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className='text-sm text-muted-foreground'>
            {data.landmarks.length} landmark{data.landmarks.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className='flex items-center gap-1 bg-muted rounded-lg p-1'>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-muted/50'
            }`}
          >
            <Icons.list className='h-4 w-4 mr-1.5 inline' />
            List
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'map' ? 'bg-background shadow-sm' : 'hover:bg-muted/50'
            }`}
          >
            <Icons.location className='h-4 w-4 mr-1.5 inline' />
            Map
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className='space-y-4'>
          <LandmarkMap
            landmarks={data.landmarks}
            selectedId={selectedLandmark?.id}
            onSelectLandmark={setSelectedLandmark}
          />
          
          {selectedLandmark && (
            <Card className='max-w-xl'>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>{selectedLandmark.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground mb-3'>{selectedLandmark.description}</p>
                <div className='flex flex-wrap gap-4 text-sm'>
                  <div>
                    <span className='text-muted-foreground'>Coordinates:</span>{' '}
                    <span className='font-mono'>{selectedLandmark.latitude.toFixed(4)}, {selectedLandmark.longitude.toFixed(4)}</span>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Added by:</span> {selectedLandmark.author}
                  </div>
                </div>
                {selectedLandmark.notes && (
                  <div className='mt-3 pt-3 border-t'>
                    <p className='text-sm'>
                      <span className='font-medium'>Driver Notes:</span> {selectedLandmark.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        isLoading ? (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <LandmarkCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {data.landmarks.map((landmark) => (
              <LandmarkCard key={landmark.id} landmark={landmark} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
