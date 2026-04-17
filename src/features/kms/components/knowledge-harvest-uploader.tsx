'use client';

import { UploadButton } from '@uploadthing/react';
import type { AppFileRouter } from '@/lib/uploadthing';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

interface KnowledgeHarvestUploaderProps {
  onUploadComplete: (url: string, fileName: string) => void;
  existingUrl?: string;
}

export function KnowledgeHarvestUploader({
  onUploadComplete,
  existingUrl
}: KnowledgeHarvestUploaderProps) {
  const [mediaUrl, setMediaUrl] = useState(existingUrl || '');

  const handleUploadComplete = (res: { url: string; name: string }[]) => {
    if (res && res.length > 0) {
      const uploaded = res[0];
      setMediaUrl(uploaded.url);
      onUploadComplete(uploaded.url, uploaded.name);
      toast.success('Recording uploaded successfully!');
    }
  };

  const handleRemove = () => {
    setMediaUrl('');
    onUploadComplete('', '');
  };

  return (
    <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
      <div className='flex items-start gap-3'>
        <div className='h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0'>
          <Icons.video className='h-5 w-5' />
        </div>
        <div className='flex-1'>
          <h4 className='text-sm font-bold text-green-900'>Knowledge Harvest: Exit Library</h4>
          <p className='text-xs text-green-700 mt-1 mb-3'>
            We highly encourage recording a short 2-5 minute video or audio summarizing your &quot;Street Intuition&quot; and complex problem-solving experiences.
          </p>
          
          {mediaUrl ? (
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 text-green-600 bg-white border border-green-200 rounded px-2 py-1.5 text-xs w-fit'>
                <Icons.check className='h-3 w-3' />
                Recording Attached ({mediaUrl.split('/').pop() || 'file'})
              </div>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-7 text-xs'
                  onClick={() => window.open(mediaUrl, '_blank')}
                >
                  <Icons.eye className='h-3 w-3 mr-1' />
                  Preview
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50'
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-3'>
              <UploadButton<AppFileRouter, 'knowledgeHarvest'>
                endpoint='knowledgeHarvest'
                onClientUploadComplete={handleUploadComplete}
                onUploadError={(error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
                onUploadBegin={() => {
                  toast.info('Upload started...');
                }}
                className='ut-button:bg-green-600 ut-button:hover:bg-green-700 ut-button:text-white ut-button:rounded-md ut-button:text-sm ut-button:px-3 ut-button:py-1.5'
              />
              <p className='text-[10px] text-green-600'>
                Supports video (up to 256MB) or audio (up to 64MB)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
