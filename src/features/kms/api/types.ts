export type { Article, ArticleCategory, Expert, Lesson, ProTip, Landmark, LandmarkCategory, Comment, CommentReply, ArticleRating, Huddle, UserProfile, Bookmark, Collection, ArticleVersion, SentimentLog, CulturalEvent } from '@/constants/mock-api-kms';

export type SentimentLogsResponse = {
  success: boolean;
  logs: import('@/constants/mock-api-kms').SentimentLog[];
};

export type CulturalEventsResponse = {
  success: boolean;
  events: import('@/constants/mock-api-kms').CulturalEvent[];
};

export type ArticleFilters = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
};

export type ArticlesResponse = {
  success: boolean;
  time: string;
  message: string;
  total_articles: number;
  offset: number;
  limit: number;
  articles: import('@/constants/mock-api-kms').Article[];
};

export type ArticleByIdResponse = {
  success: boolean;
  message?: string;
  article?: import('@/constants/mock-api-kms').Article;
};

export type ArticleMutationPayload = {
  title: string;
  content: string;
  category: import('@/constants/mock-api-kms').ArticleCategory;
  tags: string[];
  author: string;
  featured?: boolean;
};

export type DashboardStatsResponse = {
  success: boolean;
  stats: {
    totalArticles: number;
    totalViews: number;
    totalExperts: number;
    totalLessons: number;
    recentArticles: import('@/constants/mock-api-kms').Article[];
  };
};

export type ExpertsResponse = {
  success: boolean;
  experts: import('@/constants/mock-api-kms').Expert[];
};

export type LessonsResponse = {
  success: boolean;
  lessons: import('@/constants/mock-api-kms').Lesson[];
};

export type ProTipsResponse = {
  success: boolean;
  proTips: import('@/constants/mock-api-kms').ProTip[];
};

export type ProTipByIdResponse = {
  success: boolean;
  message?: string;
  proTip?: import('@/constants/mock-api-kms').ProTip;
};

export type LandmarksResponse = {
  success: boolean;
  landmarks: import('@/constants/mock-api-kms').Landmark[];
};

export type LandmarkByIdResponse = {
  success: boolean;
  message?: string;
  landmark?: import('@/constants/mock-api-kms').Landmark;
};

export type LandmarkMutationPayload = {
  name: string;
  nameAmharic: string;
  nameOromo: string;
  description: string;
  latitude: number;
  longitude: number;
  category: import('@/constants/mock-api-kms').LandmarkCategory;
  notes: string;
  author: string;
  verified?: boolean;
};

export type CommentsResponse = {
  success: boolean;
  comments: import('@/constants/mock-api-kms').Comment[];
};

export type CommentMutationPayload = {
  articleId: number;
  author: string;
  authorRole: string;
  content: string;
};

export type ArticleRatingResponse = {
  success: boolean;
  message?: string;
  rating?: import('@/constants/mock-api-kms').ArticleRating;
};
