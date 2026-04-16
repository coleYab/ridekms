import { queryOptions } from '@tanstack/react-query';
import type { ArticleFilters } from './types';
import {
  getArticles,
  getArticleById,
  getDashboardStats,
  getExperts,
  getLessons,
  getProTips,
  getProTipById,
  getLandmarks,
  getLandmarkById,
  getSentimentLogs,
  getCulturalEvents
} from './service';

const kmsKeys = {
  all: ['kms'] as const,
  sentimentLogs: ['kms', 'sentimentLogs'] as const,
  culturalEvents: ['kms', 'culturalEvents'] as const,
  articles: {
    all: ['kms', 'articles'] as const,
    list: (filters: ArticleFilters) => ['kms', 'articles', 'list', filters] as const,
    detail: (id: number) => ['kms', 'articles', 'detail', id] as const
  },
  dashboard: ['kms', 'dashboard'] as const,
  experts: ['kms', 'experts'] as const,
  lessons: ['kms', 'lessons'] as const,
  proTips: {
    all: ['kms', 'proTips'] as const,
    list: () => [...kmsKeys.proTips.all, 'list'] as const,
    detail: (id: number) => [...kmsKeys.proTips.all, 'detail', id] as const
  },
  landmarks: {
    all: ['kms', 'landmarks'] as const,
    list: (category?: string) => [...kmsKeys.landmarks.all, 'list', category ?? 'all'] as const,
    detail: (id: number) => [...kmsKeys.landmarks.all, 'detail', id] as const
  }
};

export { kmsKeys };

export const articlesQueryOptions = (filters: ArticleFilters) =>
  queryOptions({
    queryKey: kmsKeys.articles.list(filters),
    queryFn: () => getArticles(filters)
  });

export const articleByIdOptions = (id: number) =>
  queryOptions({
    queryKey: kmsKeys.articles.detail(id),
    queryFn: () => getArticleById(id)
  });

export const dashboardStatsOptions = () =>
  queryOptions({
    queryKey: kmsKeys.dashboard,
    queryFn: () => getDashboardStats()
  });

export const expertsOptions = () =>
  queryOptions({
    queryKey: kmsKeys.experts,
    queryFn: () => getExperts()
  });

export const lessonsOptions = () =>
  queryOptions({
    queryKey: kmsKeys.lessons,
    queryFn: () => getLessons()
  });

export const proTipsOptions = () =>
  queryOptions({
    queryKey: kmsKeys.proTips.list(),
    queryFn: () => getProTips()
  });

export const searchAllOptions = (query: string) =>
  queryOptions({
    queryKey: ['kms', 'search', query],
    queryFn: () => import('./service').then(s => s.searchAll(query)),
    enabled: query.length > 2
  });

export const proTipByIdOptions = (id: number) =>
  queryOptions({
    queryKey: kmsKeys.proTips.detail(id),
    queryFn: () => getProTipById(id)
  });

export const landmarksOptions = (category?: string) =>
  queryOptions({
    queryKey: kmsKeys.landmarks.list(category),
    queryFn: () => getLandmarks({ category })
  });

export const landmarkByIdOptions = (id: number) =>
  queryOptions({
    queryKey: kmsKeys.landmarks.detail(id),
    queryFn: () => getLandmarkById(id)
  });

export const sentimentLogsOptions = () =>
  queryOptions({
    queryKey: kmsKeys.sentimentLogs,
    queryFn: () => getSentimentLogs()
  });

export const culturalEventsOptions = () =>
  queryOptions({
    queryKey: kmsKeys.culturalEvents,
    queryFn: () => getCulturalEvents()
  });
