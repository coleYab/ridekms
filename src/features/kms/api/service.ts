import { fakeKMS } from '@/constants/mock-api-kms';
import type {
  ArticleFilters,
  ArticlesResponse,
  ArticleByIdResponse,
  ArticleMutationPayload,
  DashboardStatsResponse,
  ExpertsResponse,
  LessonsResponse,
  ProTipsResponse,
  ProTipByIdResponse,
  LandmarksResponse,
  LandmarkByIdResponse,
  LandmarkMutationPayload,
  CommentsResponse,
  CommentMutationPayload,
  ArticleRatingResponse,
  SentimentLogsResponse,
  CulturalEventsResponse
} from './types';

export async function getSentimentLogs(): Promise<SentimentLogsResponse> {
  return fakeKMS.getSentimentLogs();
}

export async function getCulturalEvents(): Promise<CulturalEventsResponse> {
  return fakeKMS.getCulturalEvents();
}

export async function getArticles(filters: ArticleFilters): Promise<ArticlesResponse> {
  return fakeKMS.getArticles(filters);
}

export async function getArticleById(id: number): Promise<ArticleByIdResponse> {
  return fakeKMS.getArticleById(id);
}

export async function createArticle(data: ArticleMutationPayload) {
  return fakeKMS.createArticle({ ...data, featured: data.featured ?? false });
}

export async function updateArticle(id: number, data: Partial<ArticleMutationPayload>) {
  return fakeKMS.updateArticle(id, data);
}

export async function deleteArticle(id: number) {
  return fakeKMS.deleteArticle(id);
}

export async function getDashboardStats(): Promise<DashboardStatsResponse> {
  return fakeKMS.getDashboardStats();
}

export async function getExperts(): Promise<ExpertsResponse> {
  return fakeKMS.getExperts();
}

export async function getLessons(): Promise<LessonsResponse> {
  return fakeKMS.getLessons();
}

export async function getProTips(): Promise<ProTipsResponse> {
  return fakeKMS.getProTips();
}

export async function getProTipById(id: number): Promise<ProTipByIdResponse> {
  return fakeKMS.getProTipById(id);
}

export async function getLandmarks(params?: { category?: string }): Promise<LandmarksResponse> {
  return fakeKMS.getLandmarks(params);
}

export async function getLandmarkById(id: number): Promise<LandmarkByIdResponse> {
  return fakeKMS.getLandmarkById(id);
}

export async function createLandmark(data: LandmarkMutationPayload) {
  return fakeKMS.createLandmark({ ...data, verified: false });
}

export async function updateLandmark(id: number, data: Partial<LandmarkMutationPayload>) {
  return fakeKMS.updateLandmark(id, data);
}

export async function deleteLandmark(id: number) {
  return fakeKMS.deleteLandmark(id);
}

export async function getCommentsByArticleId(articleId: number): Promise<CommentsResponse> {
  return fakeKMS.getCommentsByArticleId(articleId);
}

export async function createComment(data: CommentMutationPayload) {
  return fakeKMS.createComment(data);
}

export async function addCommentReply(commentId: number, data: { author: string; content: string }) {
  return fakeKMS.addCommentReply(commentId, data);
}

export async function voteComment(commentId: number) {
  return fakeKMS.voteComment(commentId);
}

export async function getArticleRating(articleId: number): Promise<ArticleRatingResponse> {
  return fakeKMS.getArticleRating(articleId);
}

export async function voteArticle(articleId: number, vote: 'helpful' | 'notHelpful') {
  return fakeKMS.voteArticle(articleId, vote);
}

export async function getHuddles() {
  await new Promise(r => setTimeout(r, 200));
  return { success: true, huddles: fakeKMS.huddles };
}

export async function getProfiles() {
  await new Promise(r => setTimeout(r, 200));
  return { success: true, profiles: fakeKMS.profiles };
}

export async function getBookmarks(userId: number) {
  await new Promise(r => setTimeout(r, 200));
  return { success: true, bookmarks: fakeKMS.bookmarks.filter(b => b.userId === userId) };
}

export async function getCollections(userId: number) {
  await new Promise(r => setTimeout(r, 200));
  return { success: true, collections: fakeKMS.collections.filter(c => c.userId === userId) };
}

export async function getArticleVersions(articleId: number) {
  await new Promise(r => setTimeout(r, 200));
  return { success: true, versions: fakeKMS.versions.filter(v => v.articleId === articleId) };
}

export async function toggleBookmark(userId: number, type: string, itemId: number) {
  await new Promise(r => setTimeout(r, 100));
  return { success: true };
}

export async function searchAll(query: string) {
  return fakeKMS.searchAll(query);
}
