'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';
import { getCommentsByArticleId, createComment, voteComment, getArticleRating, voteArticle } from '@/features/kms/api/service';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ArticleCommentsProps {
  articleId: number;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function CommentSkeleton() {
  return (
    <div className='space-y-3'>
      <div className='flex items-start gap-3'>
        <Skeleton className='h-10 w-10 rounded-full' />
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
    </div>
  );
}

function RatingSkeleton() {
  return (
    <div className='flex items-center gap-4'>
      <Skeleton className='h-10 w-24' />
      <Skeleton className='h-10 w-24' />
    </div>
  );
}

export default function ArticleComments({ articleId }: ArticleCommentsProps) {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [showReplyForm, setShowReplyForm] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const { data: commentsData, isLoading: commentsLoading } = useQuery({
    queryKey: ['kms', 'comments', articleId],
    queryFn: () => getCommentsByArticleId(articleId)
  });

  const { data: ratingData, isLoading: ratingLoading } = useQuery({
    queryKey: ['kms', 'rating', articleId],
    queryFn: () => getArticleRating(articleId)
  });

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kms', 'comments', articleId] });
      setNewComment('');
      setAuthorName('');
    }
  });

  const voteCommentMutation = useMutation({
    mutationFn: voteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kms', 'comments', articleId] });
    }
  });

  const voteArticleMutation = useMutation({
    mutationFn: ({ vote }: { vote: 'helpful' | 'notHelpful' }) =>
      voteArticle(articleId, vote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kms', 'rating', articleId] });
    }
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;
    
    createCommentMutation.mutate({
      articleId,
      author: authorName,
      authorRole: 'Driver',
      content: newComment
    });
  };

  const rating = ratingData?.rating;

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Was this helpful?</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {ratingLoading ? (
            <RatingSkeleton />
          ) : rating ? (
            <>
              <div className='flex items-center gap-4'>
                <Button
                  variant={rating.userVote === 'helpful' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => voteArticleMutation.mutate({ vote: 'helpful' })}
                  disabled={rating.userVote !== null}
                  className={cn(
                    rating.userVote === 'helpful' && 'bg-green-600 hover:bg-green-700'
                  )}
                >
                  <Icons.thumbsUp className='mr-2 h-4 w-4' />
                  Helpful ({rating.helpful})
                </Button>
                <Button
                  variant={rating.userVote === 'notHelpful' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => voteArticleMutation.mutate({ vote: 'notHelpful' })}
                  disabled={rating.userVote !== null}
                  className={cn(
                    rating.userVote === 'notHelpful' && 'bg-red-600 hover:bg-red-700'
                  )}
                >
                  <Icons.thumbsDown className='mr-2 h-4 w-4' />
                  Not Helpful ({rating.notHelpful})
                </Button>
              </div>
              {rating.userVote && (
                <p className='text-sm text-muted-foreground'>
                  Thank you for your feedback!
                </p>
              )}
            </>
          ) : (
            <p className='text-sm text-muted-foreground'>No ratings yet</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Discussion ({commentsData?.comments.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <form onSubmit={handleSubmitComment} className='space-y-3'>
            <Textarea
              placeholder='Share your thoughts or ask a question...'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className='min-h-[100px]'
            />
            <div className='flex items-center gap-3'>
              <input
                type='text'
                placeholder='Your name'
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className='flex-1 px-3 py-2 border rounded-md text-sm'
              />
              <Button type='submit' disabled={!newComment.trim() || !authorName.trim()}>
                Post Comment
              </Button>
            </div>
          </form>

          <div className='border-t pt-6 space-y-6'>
            {commentsLoading ? (
              <>
                <CommentSkeleton />
                <CommentSkeleton />
              </>
            ) : commentsData?.comments.length === 0 ? (
              <p className='text-center text-muted-foreground py-8'>
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              commentsData?.comments.map((comment) => (
                <div key={comment.id} className='space-y-3'>
                  <div className='flex items-start gap-3'>
                    <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
                      <Icons.user className='h-5 w-5 text-primary' />
                    </div>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium text-sm'>{comment.author}</span>
                        <span className='text-xs bg-muted px-2 py-0.5 rounded'>{comment.authorRole}</span>
                        <span className='text-xs text-muted-foreground'>{formatDate(comment.created_at)}</span>
                      </div>
                      <p className='text-sm'>{comment.content}</p>
                      <div className='flex items-center gap-4'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-7 text-xs'
                          onClick={() => voteCommentMutation.mutate(comment.id)}
                        >
                          <Icons.thumbsUp className='mr-1 h-3 w-3' />
                          Helpful ({comment.helpful})
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-7 text-xs'
                          onClick={() => setShowReplyForm(showReplyForm === comment.id ? null : comment.id)}
                        >
                          <Icons.message className='mr-1 h-3 w-3' />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>

                  {comment.replies.length > 0 && (
                    <div className='ml-12 space-y-3 border-l-2 pl-4'>
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className='space-y-1'>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium text-sm'>{reply.author}</span>
                            <span className='text-xs text-muted-foreground'>{formatDate(reply.created_at)}</span>
                          </div>
                          <p className='text-sm text-muted-foreground'>{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {showReplyForm === comment.id && (
                    <div className='ml-12 border-l-2 pl-4 space-y-2'>
                      <Textarea
                        placeholder='Write a reply...'
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className='min-h-[80px]'
                      />
                      <div className='flex gap-2'>
                        <Button size='sm' onClick={() => {
                          setReplyContent('');
                          setShowReplyForm(null);
                        }}>
                          Reply
                        </Button>
                        <Button size='sm' variant='ghost' onClick={() => setShowReplyForm(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
