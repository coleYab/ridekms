'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { articleCategories } from '@/constants/mock-api-kms';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function getCategoryLabel(category: string) {
  return articleCategories.find((c) => c.value === category)?.label ?? category;
}

function formatDateShort(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: number; positive: boolean };
}

function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>{title}</CardTitle>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='mt-1 text-xs text-muted-foreground'>{description}</p>
        {trend && (
          <div
            className={`mt-2 flex items-center text-xs ${trend.positive ? 'text-green-600' : 'text-red-600'}`}
          >
            {trend.positive ? (
              <Icons.trendingUp className='mr-1 h-3 w-3' />
            ) : (
              <Icons.trendingDown className='mr-1 h-3 w-3' />
            )}
            {trend.positive ? '+' : ''}{trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface RecentArticle {
  id: number;
  title: string;
  category: string;
  author: string;
  updated_at: string;
  views: number;
}

interface KmsDashboardClientProps {
  stats: {
    totalArticles: number;
    totalViews: number;
    totalExperts: number;
    totalLessons: number;
    recentArticles: RecentArticle[];
  };
}

import CulturalCalendar from './cultural-calendar';
import GlobalSearch from './global-search';
import PodcastLibrary from './podcast-library';
import LandmarkMap from './landmark-map';
import SentimentHarvesting from './sentiment-harvesting';
import RepositoryList from './repository-list';
import ExpertsList from './experts-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useSuspenseQuery } from '@tanstack/react-query';
import { landmarksOptions } from '@/features/kms/api/queries';

export default function KmsDashboardClient({ stats }: KmsDashboardClientProps) {
  const { data: landmarksData } = useSuspenseQuery(landmarksOptions());

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-black tracking-tight text-green-900'>Street Intelligence Dashboard</h1>
        <p className='text-muted-foreground max-w-2xl'>
          Strategic Knowledge Management System for Ride. Capturing tacit street wisdom and cultural intelligence to power Ethiopia's leading ride-hailing service.
        </p>
      </div>

      <GlobalSearch />

      <Tabs defaultValue='overview' className='w-full'>
        <TabsList className='bg-muted/50 p-1 h-12 rounded-xl mb-6'>
          <TabsTrigger value='overview' className='rounded-lg px-6'>Overview</TabsTrigger>
          <TabsTrigger value='podcast' className='rounded-lg px-6'>Podcast Library</TabsTrigger>
          <TabsTrigger value='map' className='rounded-lg px-6'>Tacit Map</TabsTrigger>
          <TabsTrigger value='culture' className='rounded-lg px-6'>Cultural Intel</TabsTrigger>
          <TabsTrigger value='experts' className='rounded-lg px-6'>Expert Council</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-8'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <StatCard
              title='Total Articles'
              value={stats.totalArticles}
              description='Knowledge base entries'
              icon={Icons.fileText}
              trend={{ value: 12, positive: true }}
            />
            <StatCard
              title='Total Views'
              value={stats.totalViews.toLocaleString()}
              description='Article views this month'
              icon={Icons.eyeOff}
              trend={{ value: 8, positive: true }}
            />
            <StatCard
              title='Expert Contributors'
              value={stats.totalExperts}
              description='Active knowledge sharers'
              icon={Icons.account}
              trend={{ value: 3, positive: true }}
            />
            <StatCard
              title='Lessons Learned'
              value={stats.totalLessons}
              description='Operational insights captured'
              icon={Icons.book}
            />
          </div>

          <div className='grid gap-6 lg:grid-cols-3'>
            <div className='lg:col-span-2'>
              <RepositoryList />
            </div>
            <div className='space-y-6'>
              <SentimentHarvesting />
            </div>
          </div>
        </TabsContent>

        <TabsContent value='podcast'>
          <PodcastLibrary />
        </TabsContent>

        <TabsContent value='map'>
          <div className='h-[700px] border rounded-2xl overflow-hidden shadow-xl bg-card'>
            <LandmarkMap landmarks={landmarksData?.landmarks || []} />
          </div>
        </TabsContent>

        <TabsContent value='culture'>
          <div className='grid gap-6 md:grid-cols-2'>
            <CulturalCalendar />
            <SentimentHarvesting />
          </div>
        </TabsContent>

        <TabsContent value='experts'>
          <ExpertsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
