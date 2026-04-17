import { createRouteHandler } from 'uploadthing/next-legacy';
import { uploadRouter } from '@/lib/uploadthing';

const handler = createRouteHandler({
  router: uploadRouter,
});

export async function GET(req: Request) {
  const response = await handler(req as never, {} as never);
  return response;
}

export async function POST(req: Request) {
  const response = await handler(req as never, {} as never);
  return response;
}
