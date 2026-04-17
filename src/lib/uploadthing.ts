import { createUploadthing } from 'uploadthing/next-legacy';
import { UTApi } from 'uploadthing/server';
import type { FileRouter } from 'uploadthing/next-legacy';

export const utapi = new UTApi();

const createUploadThingRouter = createUploadthing();

export const uploadRouter = {
  audioUploader: createUploadThingRouter({
    audio: { maxFileSize: '32MB', maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
  videoUploader: createUploadThingRouter({
    video: { maxFileSize: '128MB', maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
  mediaUploader: createUploadThingRouter({
    image: { maxFileSize: '4MB', maxFileCount: 10 },
    video: { maxFileSize: '128MB', maxFileCount: 3 },
    audio: { maxFileSize: '32MB', maxFileCount: 5 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
  knowledgeHarvest: createUploadThingRouter({
    video: { maxFileSize: '256MB', maxFileCount: 1 },
    audio: { maxFileSize: '64MB', maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url, name: file.name };
  }),
} satisfies FileRouter;

export type AppFileRouter = typeof uploadRouter;
