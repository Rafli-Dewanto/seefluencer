import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db/drizzle';
import { Plans, Subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId } = await request.json();

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    const plan = await db
      .select()
      .from(Plans)
      .where(eq(Plans.id, planId))
      .limit(1);

    if (plan.length === 0) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    const selectedPlan = plan[0];

    const existingSubscription = await db
      .select()
      .from(Subscriptions)
      .where(eq(Subscriptions.userId, session.user.id))
      .limit(1);

    if (
      existingSubscription.length > 0 &&
      existingSubscription[0].status === 'active'
    ) {
      return NextResponse.json(
        { error: 'User already has an active subscription' },
        { status: 400 }
      );
    }

    const subscriptionId = nanoid();
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + selectedPlan.duration);

    await db.insert(Subscriptions).values({
      id: subscriptionId,
      userId: session.user.id,
      planId: selectedPlan.id,
      status: 'pending',
      startDate,
      endDate,
      paymentProvider: 'midtrans',
    });

    const transactionDetails = {
      transaction_details: {
        order_id: subscriptionId,
        gross_amount: selectedPlan.price,
      },
      customer_details: {
        first_name: session.user.name || 'User',
        email: session.user.email,
      },
      item_details: [
        {
          id: selectedPlan.id,
          price: selectedPlan.price,
          quantity: 1,
          name: selectedPlan.name,
        },
      ],
    };

    const transaction = await snap.createTransaction(transactionDetails);

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
