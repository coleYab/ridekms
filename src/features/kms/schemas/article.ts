import * as z from 'zod';
import { articleCategories, type ArticleCategory } from '@/constants/mock-api-kms';

const categoryValues = articleCategories.map((c) => c.value) as [ArticleCategory, ...ArticleCategory[]];

export const articleSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters.')
    .max(200, 'Title must be at most 200 characters.'),
  content: z
    .string()
    .min(20, 'Content must be at least 20 characters.')
    .max(10000, 'Content must be at most 10000 characters.'),
  category: z.enum(categoryValues),
  tags: z.string().min(1, 'Add at least one tag.'),
  author: z.string().min(2, 'Author name is required.'),
  featured: z.boolean().optional()
});

export type ArticleFormValues = z.infer<typeof articleSchema>;
