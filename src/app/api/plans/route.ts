import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { Plans } from '@/db/schema';

export async function GET() {
  try {
    const plans = await db.select().from(Plans);
    return NextResponse.json(plans);
  } catch (error) {
    console.error('Failed to fetch plans:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
