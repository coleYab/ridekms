'use client';

import { useState, useMemo } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { landmarkCategories, type Landmark } from '@/constants/mock-api-kms';
import { useLanguage } from '@/features/kms/components/language-provider';

interface LandmarkMapProps {
  landmarks: Landmark[];
  onSelectLandmark?: (landmark: Landmark) => void;
  selectedId?: number;
}

const INITIAL_VIEW_STATE = {
  latitude: 9.025,
  longitude: 38.746,
  zoom: 12
};

function getCategoryIcon(category: string) {
  switch (category) {
    case 'church':
      return '⛪';
    case 'mosque':
      return '🕌';
    case 'hotel':
      return '🏨';
    case 'restaurant':
      return '🍽️';
    case 'market':
      return '🏪';
    case 'hospital':
      return '🏥';
    case 'school':
      return '🏫';
    case 'government':
      return '🏛️';
    case 'landmark':
      return '📍';
    default:
      return '📍';
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'church':
      return 'bg-purple-500';
    case 'mosque':
      return 'bg-green-500';
    case 'hotel':
      return 'bg-blue-500';
    case 'restaurant':
      return 'bg-orange-500';
    case 'market':
      return 'bg-yellow-500';
    case 'hospital':
      return 'bg-red-500';
    case 'school':
      return 'bg-indigo-500';
    case 'government':
      return 'bg-gray-500';
    case 'landmark':
      return 'bg-amber-500';
    default:
      return 'bg-gray-500';
  }
}

export default function LandmarkMap({
  landmarks,
  onSelectLandmark,
  selectedId
}: LandmarkMapProps) {
  const { language, t } = useLanguage();
  const [popupInfo, setPopupInfo] = useState<Landmark | null>(null);

  // Synchronize popup with selectedId from outside
  useMemo(() => {
    if (selectedId) {
      const selected = landmarks.find((l) => l.id === selectedId);
      if (selected) setPopupInfo(selected);
    }
  }, [selectedId, landmarks]);

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4 text-sm text-muted-foreground'>
        <span className='flex items-center gap-1'>
          <Icons.info className='h-4 w-4' />
          {t({
            en: 'Interact with markers to see tacit street intelligence.',
            am: 'የጎዳና ላይ እውቀቶችን ለማየት ማርከሮችን ይንኩ።',
            or: 'Oolmaa karaa arguuf mallattoolee tuqi.'
          })}
        </span>
        <span className='text-xs'>
          {landmarks.length}{' '}
          {t({ en: 'landmarks', am: 'ላንድማርከሮች', or: ' mana lawwwii' })}
        </span>
      </div>

      <div className='relative h-[500px] w-full rounded-lg border overflow-hidden shadow-sm'>
        <Map
          initialViewState={INITIAL_VIEW_STATE}
          mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position='top-right' />

          {landmarks.map((landmark) => (
            <Marker
              key={landmark.id}
              latitude={landmark.latitude}
              longitude={landmark.longitude}
              anchor='bottom'
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(landmark);
                onSelectLandmark?.(landmark);
              }}
            >
              <div
                className={cn(
                  'group relative flex cursor-pointer items-center justify-center transition-transform hover:scale-110',
                  selectedId === landmark.id && 'scale-125 z-10'
                )}
              >
                <span className='text-3xl drop-shadow-md filter'>
                  {getCategoryIcon(landmark.category)}
                </span>
                <span
                  className={cn(
                    'absolute -bottom-1 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-white shadow-sm',
                    getCategoryColor(landmark.category)
                  )}
                />
                {landmark.verified && (
                  <Icons.badgeCheck className='absolute -top-1 -right-1 h-4 w-4 text-green-600 bg-white rounded-full' />
                )}
              </div>
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              latitude={popupInfo.latitude}
              longitude={popupInfo.longitude}
              offset={35}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setPopupInfo(null)}
              anchor='bottom'
              className='z-20'
            >
              <div className='p-2 min-w-[220px] max-w-[300px]'>
                <div className='flex items-center justify-between mb-1'>
                  <Badge variant='outline' className='text-[10px] py-0'>
                    {t({
                      en: landmarkCategories.find(
                        (c) => c.value === popupInfo.category
                      )?.label || 'Landmark',
                      am: 'ላንድማርክ',
                      or: 'Iddoo'
                    })}
                  </Badge>
                  {popupInfo.verified && (
                    <span className='text-[10px] text-green-600 flex items-center font-medium'>
                      <Icons.badgeCheck className='h-3 w-3 mr-0.5' />{' '}
                      {t({ en: 'Verified', am: 'የተረጋገጠ', or: 'Mirkanaa\'aa' })}
                    </span>
                  )}
                </div>
                <h3 className='font-bold text-sm mb-1'>
                  {language === 'am'
                    ? popupInfo.nameAmharic
                    : language === 'or'
                    ? popupInfo.nameOromo
                    : popupInfo.name}
                </h3>
                <p className='text-xs text-muted-foreground mb-2'>
                  {popupInfo.description}
                </p>

                {popupInfo.notes && (
                  <div className='bg-amber-50 border-l-2 border-amber-400 p-2 rounded-r'>
                    <p className='text-[11px] leading-relaxed italic text-amber-900'>
                      <span className='font-bold not-italic mr-1'>
                        {t({ en: 'Tacit Note:', am: 'የውስጥ ማስታወሻ:', or: 'Yaada:' })}
                      </span>
                      "{popupInfo.notes}"
                    </p>
                  </div>
                )}

                <div className='mt-2 pt-2 border-t flex items-center justify-between'>
                  <span className='text-[10px] text-muted-foreground'>
                    By {popupInfo.author}
                  </span>
                  <Button variant='ghost' size='sm' className='h-6 px-2 text-[10px]'>
                    {t({ en: 'Report Error', am: 'ስህተት ጥቆማ', or: 'Dogoggora' })}
                  </Button>
                </div>
              </div>
            </Popup>
          )}

          <div className='absolute bottom-4 left-4 flex flex-col gap-2 z-10'>
            <div className='bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-3 border'>
              <p className='font-bold text-xs mb-2 border-b pb-1'>
                {t({ en: 'Legend', am: 'መግለጫ', or: 'Hiika' })}
              </p>
              <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                {landmarkCategories.slice(0, 8).map((cat) => (
                  <div key={cat.value} className='flex items-center gap-1.5 text-[10px]'>
                    <span
                      className={cn('h-2 w-2 rounded-full', getCategoryColor(cat.value))}
                    />
                    <span className='whitespace-nowrap'>{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Map>
      </div>
    </div>
  );
}
