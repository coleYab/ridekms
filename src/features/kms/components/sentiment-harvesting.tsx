'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { sentimentLogsOptions } from '@/features/kms/api/queries';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function SentimentHarvesting() {
  const { data } = useSuspenseQuery(sentimentLogsOptions());

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-semibold flex items-center gap-2'>
          <Icons.trendingUp className='h-4 w-4 text-green-600' />
          Customer Sentiment Harvesting
        </h3>
        <Badge variant='outline' className='text-[10px]'>Live Feed</Badge>
      </div>
      
      <div className='grid gap-4 md:grid-cols-2'>
        {data.logs.map((log) => (
          <Card key={log.id} className='overflow-hidden border-l-4' style={{ borderLeftColor: log.sentiment === 'positive' ? '#22c55e' : log.sentiment === 'negative' ? '#ef4444' : '#94a3b8' }}>
            <CardContent className='p-3'>
              <div className='flex items-start justify-between mb-2'>
                <div>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>Keyword</span>
                  <p className='font-bold text-sm'>"{log.keyword}"</p>
                </div>
                <div className='text-right'>
                  <div className='flex items-center gap-1 justify-end'>
                    {log.trend === 'up' ? <Icons.trendingUp className='h-3 w-3 text-red-500' /> : <Icons.trendingDown className='h-3 w-3 text-green-500' />}
                    <span className='text-xs font-bold'>{log.count}</span>
                  </div>
                  <span className='text-[10px] text-muted-foreground'>mentions</span>
                </div>
              </div>
              <div className='bg-muted/50 p-2 rounded text-[11px] italic'>
                <span className='font-bold not-italic mr-1'>Insight:</span>
                {log.insight}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
