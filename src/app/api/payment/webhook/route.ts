import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { Subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order_id, transaction_status } = body;

    if (!order_id || !transaction_status) {
      return NextResponse.json(
        { error: 'Invalid notification' },
        { status: 400 }
      );
    }

    let status = 'pending';
    if (
      transaction_status === 'capture' ||
      transaction_status === 'settlement' ||
      transaction_status === 'captured'
    ) {
      status = 'active';
    } else if (
      transaction_status === 'deny' ||
      transaction_status === 'cancel' ||
      transaction_status === 'expire'
    ) {
      status = 'cancelled';
    }

    await db
      .update(Subscriptions)
      .set({
        status,
        paymentId: body.transaction_id,
        updatedAt: new Date(),
      })
      .where(eq(Subscriptions.id, order_id));

    return NextResponse.json(
      { message: 'Notification processed' },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
