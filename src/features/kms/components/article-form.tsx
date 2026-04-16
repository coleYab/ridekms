'use client';

import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as z from 'zod';
import { articleSchema, type ArticleFormValues } from '@/features/kms/schemas/article';
import { articleCategories } from '@/constants/mock-api-kms';
import { createArticle, updateArticle } from '@/features/kms/api/service';
import type { Article } from '@/features/kms/api/types';

export default function ArticleForm({
  initialData,
  pageTitle
}: {
  initialData: Article | null;
  pageTitle: string;
}) {
  const router = useRouter();
  const isEdit = !!initialData;

  const createMutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      toast.success('Article created successfully');
      router.push('/dashboard/kms/repository');
    },
    onError: () => {
      toast.error('Failed to create article');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: Parameters<typeof updateArticle>[1] }) =>
      updateArticle(id, values),
    onSuccess: () => {
      toast.success('Article updated successfully');
      router.push('/dashboard/kms/repository');
    },
    onError: () => {
      toast.error('Failed to update article');
    }
  });

  const form = useAppForm({
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
      category: initialData?.category ?? '',
      tags: initialData?.tags.join(', ') ?? '',
      author: initialData?.author ?? '',
      featured: initialData?.featured ?? false
    } as ArticleFormValues,
    validators: {
      onSubmit: articleSchema
    },
    onSubmit: ({ value }) => {
      const tags = value.tags.split(',').map((t) => t.trim()).filter(Boolean);
      const payload = {
        title: value.title,
        content: value.content,
        category: value.category,
        tags,
        author: value.author,
        featured: value.featured ?? false
      };

      if (isEdit && initialData) {
        updateMutation.mutate({ id: initialData.id, values: payload });
      } else {
        createMutation.mutate(payload);
      }
    }
  });

  const { FormTextField, FormSelectField, FormTextareaField, FormCheckboxField } =
    useFormFields<ArticleFormValues>();

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>{pageTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form.AppForm>
          <form.Form className='space-y-6'>
            <FormTextField
              name='title'
              label='Title'
              required
              placeholder='Enter article title'
              validators={{
                onBlur: z.string().min(5, 'Title must be at least 5 characters.')
              }}
            />

            <FormTextareaField
              name='content'
              label='Content'
              required
              placeholder='Write your article content here...'
              className='min-h-[200px]'
              validators={{
                onBlur: z.string().min(20, 'Content must be at least 20 characters.')
              }}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormSelectField
                name='category'
                label='Category'
                required
                placeholder='Select a category'
                options={articleCategories.map((c) => ({ value: c.value, label: c.label }))}
              />

              <FormTextField
                name='author'
                label='Author'
                required
                placeholder='Author name'
                validators={{
                  onBlur: z.string().min(2, 'Author name is required.')
                }}
              />
            </div>

            <FormTextField
              name='tags'
              label='Tags'
              placeholder='Enter tags separated by commas (e.g., navigation, safety, tips)'
              description='Separate tags with commas'
            />

            <FormCheckboxField
              name='featured'
              label='Featured Article'
              description='Mark this article as featured'
            />

            <div className='flex items-center gap-4 pt-4'>
              <Button
                type='submit'
                isLoading={isPending}
              >
                {isEdit ? 'Update Article' : 'Create Article'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.push('/dashboard/kms/repository')}
              >
                Cancel
              </Button>
            </div>
          </form.Form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
}
