import { NextResponse } from 'next/server';
import { submitExitKnowledge } from '@/lib/mongo-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitExitKnowledge(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error submitting exit knowledge:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit exit knowledge' },
      { status: 500 }
    );
  }
}
