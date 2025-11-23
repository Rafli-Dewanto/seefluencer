'use server';

import { db } from '@/db/drizzle';
import { UserProgress } from '@/db/schema';
import { nanoid } from 'nanoid';
import { eq, and } from 'drizzle-orm';

export async function toggleLessonCompletion(
  userId: string,
  lessonId: string,
  completed: boolean
) {
  const existing = await db
    .select()
    .from(UserProgress)
    .where(
      and(eq(UserProgress.userId, userId), eq(UserProgress.lessonId, lessonId))
    );

  if (existing.length > 0) {
    await db
      .update(UserProgress)
      .set({
        completed,
        completedAt: new Date(),
      })
      .where(
        and(
          eq(UserProgress.userId, userId),
          eq(UserProgress.lessonId, lessonId)
        )
      );
  } else {
    await db.insert(UserProgress).values({
      id: nanoid(),
      userId,
      lessonId,
      completed,
      completedAt: new Date(),
    });
  }
}
