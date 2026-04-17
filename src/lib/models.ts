import mongoose, { Schema, type Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, required: true },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Article = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export interface IExpert extends Document {
  name: string;
  role: string;
  department: string;
  expertise: string[];
  bio: string;
  avatar: string;
  articlesCount: number;
  joinedAt: Date;
}

const ExpertSchema = new Schema<IExpert>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    expertise: [{ type: String }],
    bio: { type: String },
    avatar: { type: String },
    articlesCount: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Expert = mongoose.models.Expert || mongoose.model<IExpert>('Expert', ExpertSchema);

export interface IExitKnowledge extends Document {
  fullName: string;
  employeeId: string;
  department: string;
  role: string;
  yearsOfService: string;
  lastWorkDate: string;
  reasonForLeaving: string;
  keyKnowledge: string;
  undocumentedProcesses: string;
  adviceForSuccessor: string;
  contactsToShare: string;
  mediaUrl: string;
  checklist: {
    documentsHanded: boolean;
    contactsShared: boolean;
    processesDocumented: boolean;
    trainingProvided: boolean;
    handoverCompleted: boolean;
  };
  status: 'pending' | 'submitted' | 'reviewed';
  createdAt: Date;
  updatedAt: Date;
}

const ExitKnowledgeSchema = new Schema<IExitKnowledge>(
  {
    fullName: { type: String, required: true },
    employeeId: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    yearsOfService: { type: String, required: true },
    lastWorkDate: { type: String, required: true },
    reasonForLeaving: { type: String },
    keyKnowledge: { type: String, required: true },
    undocumentedProcesses: { type: String },
    adviceForSuccessor: { type: String },
    contactsToShare: { type: String },
    mediaUrl: { type: String },
    checklist: {
      documentsHanded: { type: Boolean, default: false },
      contactsShared: { type: Boolean, default: false },
      processesDocumented: { type: Boolean, default: false },
      trainingProvided: { type: Boolean, default: false },
      handoverCompleted: { type: Boolean, default: false },
    },
    status: { type: String, enum: ['pending', 'submitted', 'reviewed'], default: 'submitted' },
  },
  { timestamps: true }
);

export const ExitKnowledge = mongoose.models.ExitKnowledge || mongoose.model<IExitKnowledge>('ExitKnowledge', ExitKnowledgeSchema);

export interface ILandmark extends Document {
  name: string;
  nameAmharic: string;
  nameOromo: string;
  description: string;
  latitude: number;
  longitude: number;
  category: string;
  notes: string;
  author: string;
  verified: boolean;
}

const LandmarkSchema = new Schema<ILandmark>(
  {
    name: { type: String, required: true },
    nameAmharic: { type: String },
    nameOromo: { type: String },
    description: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    category: { type: String, required: true },
    notes: { type: String },
    author: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Landmark = mongoose.models.Landmark || mongoose.model<ILandmark>('Landmark', LandmarkSchema);
