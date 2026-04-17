import { connectDB } from './db';
import { Article, Expert, ExitKnowledge, Landmark } from './models';
import type {
  ArticleFilters,
  ArticlesResponse,
  ArticleByIdResponse,
  ArticleMutationPayload,
  DashboardStatsResponse,
  ExpertsResponse,
  LandmarkMutationPayload,
  LandmarksResponse,
  LandmarkByIdResponse,
} from '@/features/kms/api/types';

export async function getArticles(filters: ArticleFilters): Promise<ArticlesResponse> {
  await connectDB();
  
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;
  
  const query: Record<string, unknown> = {};
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { content: { $regex: filters.search, $options: 'i' } },
    ];
  }
  if (filters.category) {
    query.category = filters.category;
  }
  
  const [articles, total_articles] = await Promise.all([
    Article.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Article.countDocuments(query),
  ]);
  
  return {
    success: true,
    time: new Date().toISOString(),
    message: 'Articles retrieved successfully',
    total_articles,
    offset: skip,
    limit,
    articles,
  };
}

export async function getArticleById(id: number): Promise<ArticleByIdResponse> {
  await connectDB();
  
  const article = await Article.findById(id);
  if (!article) {
    return { success: false, message: 'Article not found' };
  }
  
  return { success: true, article };
}

export async function createArticle(data: ArticleMutationPayload) {
  await connectDB();
  
  const article = await Article.create(data);
  return { success: true, article };
}

export async function updateArticle(id: number, data: Partial<ArticleMutationPayload>) {
  await connectDB();
  
  const article = await Article.findByIdAndUpdate(id, data, { new: true });
  if (!article) {
    return { success: false, message: 'Article not found' };
  }
  
  return { success: true, article };
}

export async function deleteArticle(id: number) {
  await connectDB();
  
  const article = await Article.findByIdAndDelete(id);
  if (!article) {
    return { success: false, message: 'Article not found' };
  }
  
  return { success: true };
}

export async function getDashboardStats(): Promise<DashboardStatsResponse> {
  await connectDB();
  
  const [totalArticles, totalExperts, recentArticles] = await Promise.all([
    Article.countDocuments(),
    Expert.countDocuments(),
    Article.find().sort({ createdAt: -1 }).limit(5),
  ]);
  
  const totalViews = await Article.aggregate([
    { $group: { _id: null, total: { $sum: '$views' } } }
  ]);
  
  return {
    success: true,
    stats: {
      totalArticles,
      totalViews: totalViews[0]?.total || 0,
      totalExperts,
      totalLessons: 0,
      recentArticles,
    },
  };
}

export async function getExperts(): Promise<ExpertsResponse> {
  await connectDB();
  
  const experts = await Expert.find().sort({ joinedAt: -1 });
  return { success: true, experts };
}

export async function getLandmarks(params?: { category?: string }): Promise<LandmarksResponse> {
  await connectDB();
  
  const query: Record<string, unknown> = {};
  if (params?.category) {
    query.category = params.category;
  }
  
  const landmarks = await Landmark.find(query).sort({ createdAt: -1 });
  return { success: true, landmarks };
}

export async function getLandmarkById(id: number): Promise<LandmarkByIdResponse> {
  await connectDB();
  
  const landmark = await Landmark.findById(id);
  if (!landmark) {
    return { success: false, message: 'Landmark not found' };
  }
  
  return { success: true, landmark };
}

export async function createLandmark(data: LandmarkMutationPayload) {
  await connectDB();
  
  const landmark = await Landmark.create(data);
  return { success: true, landmark };
}

export async function updateLandmark(id: number, data: Partial<LandmarkMutationPayload>) {
  await connectDB();
  
  const landmark = await Landmark.findByIdAndUpdate(id, data, { new: true });
  if (!landmark) {
    return { success: false, message: 'Landmark not found' };
  }
  
  return { success: true, landmark };
}

export async function deleteLandmark(id: number) {
  await connectDB();
  
  const landmark = await Landmark.findByIdAndDelete(id);
  if (!landmark) {
    return { success: false, message: 'Landmark not found' };
  }
  
  return { success: true };
}

export async function submitExitKnowledge(data: {
  fullName: string;
  employeeId: string;
  department: string;
  role: string;
  yearsOfService: string;
  lastWorkDate: string;
  reasonForLeaving?: string;
  keyKnowledge: string;
  undocumentedProcesses?: string;
  adviceForSuccessor?: string;
  contactsToShare?: string;
  mediaUrl?: string;
  checklist: {
    documentsHanded: boolean;
    contactsShared: boolean;
    processesDocumented: boolean;
    trainingProvided: boolean;
    handoverCompleted: boolean;
  };
}) {
  await connectDB();
  
  const exitKnowledge = await ExitKnowledge.create(data);
  return { success: true, exitKnowledge };
}

export async function getExitKnowledgeList() {
  await connectDB();
  
  const records = await ExitKnowledge.find().sort({ createdAt: -1 });
  return { success: true, records };
}
