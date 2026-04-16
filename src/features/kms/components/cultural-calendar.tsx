'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { culturalEventsOptions } from '@/features/kms/api/queries';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/features/kms/components/language-provider';

export default function CulturalCalendar() {
  const { language, t } = useLanguage();
  const { data } = useSuspenseQuery(culturalEventsOptions());

  return (
    <Card className='h-full border-green-100 shadow-sm'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-bold flex items-center gap-2 text-green-800'>
          <Icons.palette className='h-4 w-4' />
          {t({ en: 'Cultural Knowledge Base', am: 'የባህል እውቀት ማዕከል', or: 'Gidduu Galaa Aadaa' })}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='bg-green-50 rounded-lg p-3 border border-green-100'>
          <p className='text-[11px] font-bold text-green-700 uppercase tracking-wider mb-2'>
            {t({ en: 'Active Seasonal Logic', am: 'ወቅታዊ የአሰራር ሁኔታ', or: 'Haala Hojii Ammaa' })}
          </p>
          <div className='space-y-3'>
            {data.events.slice(0, 3).map((event) => (
              <div key={event.id} className='border-b border-green-100 last:border-0 pb-2 last:pb-0'>
                <div className='flex items-center justify-between mb-1'>
                  <span className='font-bold text-xs'>
                    {language === 'am' ? event.nameAmharic : event.name}
                  </span>
                  <Badge variant={event.fastingPeriod ? 'secondary' : 'outline'} className='text-[9px] h-4'>
                    {event.date}
                  </Badge>
                </div>
                <p className='text-[10px] text-muted-foreground leading-relaxed'>
                  <Icons.warning className='h-3 w-3 inline mr-1 text-amber-500' />
                  {event.impact}
                </p>
                <div className='mt-1 bg-white/60 rounded px-1.5 py-1 text-[9px] font-medium text-green-800 border border-green-50'>
                  <span className='font-bold'>Logic:</span> {event.pricingLogic}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className='flex items-center gap-2 text-[10px] text-muted-foreground italic'>
          <Icons.info className='h-3 w-3 shrink-0' />
          {t({ 
            en: 'Pricing and dispatch logic automatically adjusts for religious holidays.',
            am: 'የዋጋ እና የስምሪት ሁኔታዎች በሃይማኖታዊ በዓላት ወቅት በራሳቸው ይስተካከላሉ።',
            or: 'Haalli kaffaltii fi tajaajilaa ayyaana amantii irratti hundaa\'uun ofiin sirreeffama.'
          })}
        </div>
      </CardContent>
    </Card>
  );
}
